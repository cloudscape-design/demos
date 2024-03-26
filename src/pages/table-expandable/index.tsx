// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Table,
  CollectionPreferencesProps,
  PropertyFilter,
  SpaceBetween,
  Button,
  TableProps,
} from '@cloudscape-design/components';
import { getHeaderCounterText, getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import '../../styles/base.scss';
import { FullPageHeader } from '../commons/common-components';
import { tableAriaLabels, createColumns, filteringProperties, TablePreferences } from './table-configs';
import allInstances, { Instance } from '../../resources/related-instances';
import '../../styles/base.scss';
import { PageLayout } from './page-components';

function App() {
  const [ariaLiveMessage, setAriaLiveMessage] = useState('');
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({
    wrapLines: true,
    stickyColumns: { first: 0, last: 1 },
  });

  const { items, collectionProps, propertyFilterProps, filteredItemsCount, actions } = useCollection(allInstances, {
    sorting: {},
    propertyFiltering: {
      filteringProperties,
    },
    selection: {},
    expandableRows: {
      getId: item => item.name,
      getParentId: item => item.parentName,
    },
  });

  const isItemExpandable = collectionProps.expandableRows?.isItemExpandable ?? (() => false);
  const getItemChildren = collectionProps.expandableRows?.getItemChildren ?? (() => []);
  const allFilteredClusters = getFlatItems(items, getItemChildren).filter(isItemExpandable);
  const expandedItems = collectionProps.expandableRows?.expandedItems ?? [];
  const columnDefinitions = createColumns({
    getInstanceProps: instance => {
      const children = getItemChildren(instance).length;
      const clusterInstances = allFilteredClusters.filter(item => item.path.includes(instance.name));
      const isClusterFullyExpanded = clusterInstances.every(item => expandedItems.includes(item));
      const isClusterFullyCollapsed = clusterInstances.every(item => !expandedItems.includes(item));
      const instanceActions = [
        {
          id: 'expand-all',
          text: `Expand cluster`,
          hidden: !children,
          disabled: isClusterFullyExpanded,
          onClick: () => {
            actions.setExpandedItems([...expandedItems, ...clusterInstances]);
            setAriaLiveMessage(
              `Displaying all ${clusterInstances.length - 1} related instances for cluster ${instance.name}`
            );
          },
        },
        {
          id: 'collapse-all',
          text: `Collapse cluster`,
          hidden: !children,
          disabled: isClusterFullyCollapsed,
          onClick: () => {
            actions.setExpandedItems(expandedItems.filter(item => !clusterInstances.includes(item)));
            setAriaLiveMessage('');
          },
        },
      ];
      return { children, actions: instanceActions };
    },
  });

  const onExpandableItemToggle: TableProps.OnExpandableItemToggle<Instance> = event => {
    // Call collection-hooks-provided handler to update state.
    collectionProps.expandableRows?.onExpandableItemToggle(event);

    // Add custom logic on cluster expand.
    const cluster = event.detail.item;
    const clusterExpanded = event.detail.expanded;
    if (clusterExpanded) {
      setAriaLiveMessage(`Displaying ${getItemChildren(cluster).length} related instances for cluster ${cluster.name}`);
    } else {
      setAriaLiveMessage('');
    }
  };
  const expandableRows = collectionProps.expandableRows
    ? { ...collectionProps.expandableRows, onExpandableItemToggle }
    : undefined;

  return (
    <PageLayout>
      {({ openTools }) => (
        <>
          <Table
            {...collectionProps}
            stickyColumns={preferences.stickyColumns}
            resizableColumns={true}
            stickyHeader={true}
            selectionType="single"
            columnDefinitions={columnDefinitions}
            items={items}
            ariaLabels={tableAriaLabels}
            wrapLines={preferences.wrapLines}
            columnDisplay={preferences.contentDisplay}
            preferences={<TablePreferences preferences={preferences} setPreferences={setPreferences} />}
            submitEdit={() => {}}
            variant="full-page"
            renderAriaLive={renderAriaLive}
            header={
              <FullPageHeader
                title="Instances"
                selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
                counter={getHeaderCounterText(allInstances, collectionProps.selectedItems)}
                actions={
                  <SpaceBetween size="xs" direction="horizontal">
                    <Button disabled={collectionProps.selectedItems?.length === 0}>Instance actions</Button>
                    <Button>Restore from S3</Button>
                    <Button variant="primary">Launch DB instance</Button>
                  </SpaceBetween>
                }
                onInfoLinkClick={openTools}
              />
            }
            filter={
              <PropertyFilter
                {...propertyFilterProps}
                countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
                filteringPlaceholder="Search databases"
              />
            }
            expandableRows={expandableRows}
          />

          <span aria-live="polite" aria-atomic="true" className="screenreader-only">
            {ariaLiveMessage}
          </span>
        </>
      )}
    </PageLayout>
  );
}

function getFlatItems<T>(items: readonly T[], getItemChildren: (item: T) => T[]): T[] {
  const flatItems: T[] = [];
  function traverse(item: T) {
    flatItems.push(item);
    getItemChildren(item).forEach(traverse);
  }
  items.forEach(traverse);
  return flatItems;
}

createRoot(document.getElementById('app')!).render(<App />);
