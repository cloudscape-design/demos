// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { createRoot } from 'react-dom/client';
import React, { useRef, useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Table,
  CollectionPreferencesProps,
  AppLayoutProps,
  Header,
  PropertyFilter,
} from '@cloudscape-design/components';
import { getHeaderCounterText } from '../../i18n-strings';
import '../../styles/base.scss';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { allInstances } from './expandable-rows-data';
import { createColumns, createPreferences, filteringProperties } from './expandable-rows-configs';
import { ariaLabels, getMatchesCountText } from './common';

function App() {
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({
    pageSize: 10,
    wrapLines: true,
    stickyColumns: { first: 0, last: 1 },
  });
  const getScopedInstances = (selected: null | string) =>
    selected === null ? allInstances : allInstances.filter(i => i.path.includes(selected));

  const { items, collectionProps, propertyFilterProps, filteredItemsCount, actions } = useCollection(allInstances, {
    pagination: undefined,
    sorting: {},
    filtering: {},
    propertyFiltering: { filteringProperties },
    selection: { trackBy: 'name', keepSelection: false },
    expandableRows: {
      getId: item => item.name,
      getParentId: item => item.parentName,
    },
  });

  // Decorate path options to only show the last node and not the full path.
  const filteringOptions = propertyFilterProps.filteringOptions.map(option =>
    option.propertyKey === 'path' ? { ...option, value: option.value.split(',')[0] } : option
  );

  const expandedInstances = collectionProps.expandableRows?.expandedItems ?? [];

  const columnDefinitions = createColumns({
    getInstanceProps: instance => {
      const children = collectionProps.expandableRows?.getItemChildren(instance).length ?? 0;
      const scopedInstances = getScopedInstances(instance.name);
      const instanceActions = [
        {
          id: 'expand-all',
          text: `Expand cluster`,
          hidden: !children,
          onClick: () => {
            actions.setExpandedItems([...expandedInstances, ...scopedInstances]);
          },
        },
        {
          id: 'collapse-all',
          text: `Collapse cluster`,
          hidden: !children,
          onClick: () => {
            actions.setExpandedItems(expandedInstances.filter(i => !scopedInstances.includes(i)));
          },
        },
      ];
      return { children, actions: instanceActions };
    },
  });

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <Table
          {...collectionProps}
          stickyColumns={preferences.stickyColumns}
          resizableColumns={true}
          stickyHeader={true}
          selectionType="single"
          columnDefinitions={columnDefinitions}
          items={items}
          ariaLabels={ariaLabels}
          wrapLines={preferences.wrapLines}
          columnDisplay={preferences.contentDisplay}
          preferences={createPreferences({ preferences, setPreferences })}
          submitEdit={() => {}}
          variant="full-page"
          header={
            <Header variant="h1" counter={getHeaderCounterText(allInstances, collectionProps.selectedItems)}>
              Databases
            </Header>
          }
          filter={
            <PropertyFilter
              {...propertyFilterProps}
              filteringOptions={filteringOptions}
              countText={getMatchesCountText(filteredItemsCount ?? 0)}
              filteringPlaceholder="Search databases"
            />
          }
        />
      }
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}

createRoot(document.getElementById('app')!).render(<App />);
