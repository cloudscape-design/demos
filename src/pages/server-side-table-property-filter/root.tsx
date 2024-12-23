// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import intersection from 'lodash/intersection';

import { PropertyFilterQuery } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter, { PropertyFilterProps } from '@cloudscape-design/components/property-filter';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { Distribution } from '../../fake-server/types';
import {
  distributionTableAriaLabels,
  getHeaderCounterServerSideText,
  getTextFilterCounterServerSideText,
  propertyFilterI18nStrings,
  renderAriaLive,
} from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import { CustomAppLayout, Navigation, Notifications, TableNoMatchState } from '../commons/common-components';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from '../commons/table-config';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { useDistributions, UseDistributionsParams } from '../server-side-table/hooks';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { FILTERING_PROPERTIES } from '../table-property-filter/table-property-filter-config';
import { useDistributionsPropertyFiltering } from './hooks';

import '../../styles/base.scss';

const DEFAULT_FILTERING_QUERY: PropertyFilterQuery = { tokens: [], operation: 'and' };
const DEFAULT_SORTING_IS_DESCENDING = false;

interface ServerSidePropertyFilterTable {
  columnDefinitions: TableProps.ColumnDefinition<Distribution>[];
  saveWidths: TableProps['onColumnWidthsChange'];
  loadHelpPanelContent: () => void;
}

function ServerSidePropertyFilterTable({
  columnDefinitions,
  saveWidths,
  loadHelpPanelContent,
}: ServerSidePropertyFilterTable) {
  const [selectedItems, setSelectedItems] = useState<Distribution[]>([]);
  const [preferences, setPreferences] = useLocalStorage(
    'React-ServerSideTablePropertyFilter-Preferences',
    DEFAULT_PREFERENCES
  );
  const [sortingDescending, setSortingDescending] = useState(DEFAULT_SORTING_IS_DESCENDING);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringQuery, setFilteringQuery] = useState<PropertyFilterQuery>(DEFAULT_FILTERING_QUERY);
  const [sortingColumn, setSortingColumn] = useState<TableProps.SortingColumn<Distribution>>(columnDefinitions[0]);

  const { pageSize } = preferences;
  const params: UseDistributionsParams = {
    pagination: {
      currentPageIndex,
      pageSize,
    },
    sorting: {
      sortingColumn,
      sortingDescending,
    },
    filtering: {
      filteringTokens: filteringQuery.tokenGroups ?? filteringQuery.tokens,
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

  const handleSortingChange: TableProps['onSortingChange'] = event => {
    setSortingDescending(event.detail.isDescending ?? DEFAULT_SORTING_IS_DESCENDING);
    setSortingColumn(event.detail.sortingColumn);
  };

  const handleClearFilter = () => {
    setFilteringQuery(DEFAULT_FILTERING_QUERY);
  };

  const handlePropertyFilteringChange: PropertyFilterProps['onChange'] = ({ detail }) => {
    setFilteringQuery(detail);
  };

  return (
    <Table
      enableKeyboardNavigation={true}
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
          counter={loading !== undefined ? getHeaderCounterServerSideText(totalCount, selectedItems.length) : undefined}
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
          countText={
            pageSize !== undefined ? getTextFilterCounterServerSideText(items, pagesCount, pageSize) : undefined
          }
          expandToViewport={true}
          enableTokenGroups={true}
        />
      }
      pagination={
        <Pagination
          pagesCount={pagesCount}
          disabled={loading}
          currentPageIndex={serverPageIndex ?? 0}
          onChange={event => setCurrentPageIndex(event.detail.currentPageIndex)}
        />
      }
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

export function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths(
    'React-ServerSideTablePropertyFilter-Widths',
    COLUMN_DEFINITIONS
  );
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
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