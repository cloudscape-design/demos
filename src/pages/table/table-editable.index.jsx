// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { createRoot } from 'react-dom/client';
import React, { useRef, useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { Button, Pagination, Table, TextFilter } from '@cloudscape-design/components';
import { distributionEditLabels, paginationLabels } from '../../common/labels';
import { useLocalStorage } from '../../common/localStorage';
import { getFilterCounterText } from '../../common/tableCounterStrings';
import '../../styles/base.scss';
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { useColumnWidths } from '../commons/use-column-widths';
import { Breadcrumbs, FullPageHeader, ToolsContent } from './common-components';
import {
  EDITABLE_PREFERENCES,
  EDITABLE_COLUMN_DEFINITIONS,
  Preferences,
  serverSideErrorsStore,
  domainNameRegex,
  INVALID_DOMAIN_MESSAGE,
} from './table-config';

const withSideEffect =
  (fn, sideEffect) =>
  (...args) => {
    sideEffect(...args);
    return fn(...args);
  };

const fakeDataFetch = delay => new Promise(resolve => setTimeout(() => resolve(), delay));

function TableContent({ loadHelpPanelContent, distributions }) {
  const [loading, setLoading] = useState(false);
  const [tableItems, setTableItems] = useState(distributions);
  const [columnDefinitions, saveWidths] = useColumnWidths('React-EditableTable-Widths', EDITABLE_COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage(
    'React-EditableDistributionsTable-Preferences',
    EDITABLE_PREFERENCES
  );
  const [currentPageItemsSnapshot, setCurrentPageItemsSnapshot] = useState(null);

  const persistChanges = () => {
    setTableItems(tableItems);
    setCurrentPageItemsSnapshot(null);
  };

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps, allPageItems } =
    useCollection(tableItems, {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    });

  const tablePaginationProps = {
    ...paginationProps,
    onChange: withSideEffect(paginationProps.onChange, persistChanges),
  };

  const tableFilterProps = {
    ...filterProps,
    onChange: withSideEffect(filterProps.onChange, persistChanges),
  };

  const tableCollectionProps = {
    ...collectionProps,
    onSortingChange: withSideEffect(collectionProps.onSortingChange, persistChanges),
  };

  const onRefresh = async () => {
    setLoading(true);
    await fakeDataFetch(500);
    persistChanges();
    setLoading(false);
  };

  const refreshButtonProps = { onClick: onRefresh };

  const handleSubmit = async (currentItem, column, value) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let fullCollection = tableItems;

    serverSideErrorsStore.delete(currentItem);

    if (column.id === 'domainName' && !domainNameRegex.test(value)) {
      serverSideErrorsStore.set(currentItem, INVALID_DOMAIN_MESSAGE);
      throw new Error('Inline error');
    }

    const newItem = { ...currentItem, [column.id]: value };

    if (collectionProps.sortingColumn === column) {
      actions.setSorting(null);
      fullCollection = allPageItems;
    }

    if (filterProps.filteringText) {
      fullCollection = tableItems;
    }

    if (collectionProps.sortingColumn === column || filterProps.filteringText) {
      setCurrentPageItemsSnapshot(items.map(item => (item === currentItem ? newItem : item)));
    }

    setTableItems(fullCollection.map(item => (item === currentItem ? newItem : item)));
  };

  return (
    <Table
      {...tableCollectionProps}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      items={currentPageItemsSnapshot || items}
      submitEdit={handleSubmit}
      ariaLabels={distributionEditLabels}
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      selectionType="multi"
      loading={loading}
      header={
        <FullPageHeader
          selectedItems={tableCollectionProps.selectedItems}
          totalItems={distributions}
          loadHelpPanelContent={loadHelpPanelContent}
          extraActions={<Button iconName="refresh" ariaLabel="Refresh" {...refreshButtonProps} />}
        />
      }
      filter={
        <TextFilter
          {...tableFilterProps}
          filteringAriaLabel="Filter distributions"
          filteringPlaceholder="Find distributions"
          countText={getFilterCounterText(filteredItemsCount)}
        />
      }
      pagination={<Pagination {...tablePaginationProps} ariaLabels={paginationLabels} />}
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

function App({ distributions }) {
  const appLayout = useRef();
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <TableContent
          distributions={distributions}
          loadHelpPanelContent={() => {
            setToolsOpen(true);
            appLayout.current?.focusToolsClose();
          }}
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

const dataProvider = new DataProvider();

const root = createRoot(document.getElementById('app'));

dataProvider.getData('distributions').then(distributions => {
  root.render(<App distributions={distributions} />);
});
