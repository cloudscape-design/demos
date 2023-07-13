// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import intersection from 'lodash/intersection';
import { FILTERING_PROPERTIES } from '../table-property-filter/table-property-filter-config';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { CustomAppLayout, Navigation, Notifications, TableNoMatchState } from '../commons/common-components';
import { FullPageHeader } from '../commons';
import {
  distributionTableAriaLabels,
  getHeaderCounterServerSideText,
  getTextFilterCounterServerSideText,
  propertyFilterI18nStrings,
  renderAriaLive,
} from '../../i18n-strings';
import { useLocalStorage } from '../commons/use-local-storage';
import '../../styles/base.scss';
import { useColumnWidths } from '../commons/use-column-widths';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from '../commons/table-config';
import { useDistributions } from '../server-side-table/hooks';
import { useDistributionsPropertyFiltering } from './hooks';

const DEFAULT_FILTERING_QUERY = { tokens: [], operation: 'and' };

function ServerSidePropertyFilterTable({ columnDefinitions, saveWidths, loadHelpPanelContent }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [preferences, setPreferences] = useLocalStorage(
    'React-ServerSideTablePropertyFilter-Preferences',
    DEFAULT_PREFERENCES
  );
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
      columnDisplay={preferences.contentDisplay}
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      header={
        <FullPageHeader
          selectedItemsCount={selectedItems.length}
          counter={!loading && getHeaderCounterServerSideText(totalCount, selectedItems.length)}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      loadingText="Loading distributions"
      empty={<TableNoMatchState onClearFilter={handleClearFilter} />}
      filter={
        <PropertyFilter
          i18nStrings={propertyFilterI18nStrings}
          filteringProperties={filteringProperties}
          filteringOptions={filteringOptions}
          query={filteringQuery}
          onChange={handlePropertyFilteringChange}
          onLoadItems={handleLoadItems}
          filteringStatusType={filteringStatus}
          customGroupsText={[{ group: 'tags', properties: 'Tags', values: 'Tags values' }]}
          countText={getTextFilterCounterServerSideText(items, pagesCount, pageSize)}
          expandToViewport={true}
        />
      }
      pagination={
        <Pagination
          pagesCount={pagesCount}
          disabled={loading}
          currentPageIndex={serverPageIndex}
          onChange={event => setCurrentPageIndex(event.detail.currentPageIndex)}
        />
      }
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths(
    'React-ServerSideTablePropertyFilter-Widths',
    COLUMN_DEFINITIONS
  );
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

createRoot(document.getElementById('app')).render(<App />);
