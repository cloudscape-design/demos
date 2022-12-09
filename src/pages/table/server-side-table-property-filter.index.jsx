// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import intersection from 'lodash/intersection';
import {
  COLUMN_DEFINITIONS,
  PROPERTY_FILTERING_I18N_CONSTANTS,
  FILTERING_PROPERTIES,
} from './table-property-filter-config';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import ProperttyFilter from '@cloudscape-design/components/property-filter';
import { Breadcrumbs, FullPageHeader, ToolsContent } from './common-components';
import { CustomAppLayout, Navigation, Notifications, TableNoMatchState } from '../commons/common-components';
import { paginationLabels, distributionSelectionLabels } from '../../common/labels';
import { useLocalStorage } from '../../common/localStorage';
import '../../styles/base.scss';
import { useColumnWidths } from '../commons/use-column-widths';
import { DEFAULT_PREFERENCES, Preferences } from './table-config';
import { useDistributions, useDistributionsPropertyFiltering } from './hooks';
import { getServerFilterCounterText } from '../../common/tableCounterStrings';

const DEFAULT_FILTERING_QUERY = { tokens: [], operation: 'and' };

function ServerSidePropertyFilterTable({ columnDefinitions, saveWidths, loadHelpPanelContent }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [preferences, setPreferences] = useLocalStorage('React-DistributionsTable-Preferences', DEFAULT_PREFERENCES);
  const [sortingDescending, setSortingDescending] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringQuery, setFilteringQuery] = useState(DEFAULT_FILTERING_QUERY);
  const [sortingColumn, setSortingColumn] = useState(columnDefinitions[0]);

  const { pageSize } = preferences;
  const params = {
    pagination: {
      currentPageIndex,
      pageSize,
    },
    sorting: {
      sortingColumn,
      sortingDescending,
    },
    filtering: {
      filteringTokens: filteringQuery.tokens,
      filteringOperation: filteringQuery.operation,
    },
  };
  const { items, loading, totalCount, pagesCount, currentPageIndex: serverPageIndex } = useDistributions(params);
  const {
    status: filteringStatus,
    filteringOptions,
    filteringProperties,
    handleLoadItems,
  } = useDistributionsPropertyFiltering(FILTERING_PROPERTIES);

  useEffect(() => {
    setSelectedItems(oldSelected => intersection(items, oldSelected));
  }, [items]);

  const handleSortingChange = event => {
    setSortingDescending(event.detail.isDescending);
    setSortingColumn(event.detail.sortingColumn);
  };

  const handleClearFilter = () => {
    setFilteringQuery(DEFAULT_FILTERING_QUERY);
  };

  const handlePropertyFilteringChange = ({ detail }) => setFilteringQuery(detail);

  return (
    <Table
      loading={loading}
      selectedItems={selectedItems}
      items={items}
      onSortingChange={handleSortingChange}
      onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      ariaLabels={distributionSelectionLabels}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      header={
        <FullPageHeader
          selectedItems={selectedItems}
          totalItems={totalCount}
          loadHelpPanelContent={loadHelpPanelContent}
          serverSide={true}
        />
      }
      loadingText="Loading distributions"
      empty={<TableNoMatchState onClearFilter={handleClearFilter} />}
      filter={
        <ProperttyFilter
          i18nStrings={PROPERTY_FILTERING_I18N_CONSTANTS}
          filteringProperties={filteringProperties}
          filteringOptions={filteringOptions}
          query={filteringQuery}
          onChange={handlePropertyFilteringChange}
          onLoadItems={handleLoadItems}
          filteringStatusType={filteringStatus}
          customGroupsText={[{ group: 'tags', properties: 'Tags', values: 'Tags values' }]}
          countText={`${getServerFilterCounterText(items, pagesCount, pageSize)}`}
          expandToViewport={true}
        />
      }
      pagination={
        <Pagination
          pagesCount={pagesCount}
          disabled={loading}
          currentPageIndex={serverPageIndex}
          onChange={event => setCurrentPageIndex(event.detail.currentPageIndex)}
          ariaLabels={paginationLabels}
        />
      }
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableServerSide-Widths', COLUMN_DEFINITIONS);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();
  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <ServerSidePropertyFilterTable
          columnDefinitions={columnDefinitions}
          saveWidths={saveWidths}
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

const root = createRoot(document.getElementById('app'));
root.render(<App />);
