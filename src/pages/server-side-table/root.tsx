// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import intersection from 'lodash/intersection';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Pagination from '@cloudscape-design/components/pagination';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Distribution } from '../../fake-server/types';
import {
  distributionTableAriaLabels,
  getHeaderCounterServerSideText,
  getTextFilterCounterServerSideText,
  renderAriaLive,
} from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import { CustomAppLayout, Navigation, Notifications, TableNoMatchState } from '../commons/common-components';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from '../commons/table-config';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { useDistributions, UseDistributionsParams } from './hooks';

import '../../styles/base.scss';

interface ServerSideTableProps {
  columnDefinitions: TableProps.ColumnDefinition<Distribution>[];
  saveWidths: TableProps['onColumnWidthsChange'];
  loadHelpPanelContent: () => void;
}

function ServerSideTable({ columnDefinitions, saveWidths, loadHelpPanelContent }: ServerSideTableProps) {
  const [selectedItems, setSelectedItems] = useState<Distribution[]>([]);
  const [preferences, setPreferences] = useLocalStorage('React-ServerSideTable-Preferences', DEFAULT_PREFERENCES);
  const [descendingSorting, setDescendingSorting] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringText, setFilteringText] = useState('');
  const [delayedFilteringText, setDelayedFilteringText] = useState('');
  const [sortingColumn, setSortingColumn] = useState<TableProps.SortingColumn<Distribution>>(columnDefinitions[0]);

  const { pageSize } = preferences ?? {};
  const params: UseDistributionsParams = {
    pagination: {
      currentPageIndex,
      pageSize,
    },
    sorting: {
      sortingColumn,
      sortingDescending: descendingSorting,
    },
    filtering: {
      filteringText: delayedFilteringText,
    },
  };
  const { items, loading, totalCount, pagesCount, currentPageIndex: serverPageIndex } = useDistributions(params);

  useEffect(() => {
    setSelectedItems(oldSelected => intersection(items, oldSelected));
  }, [items]);

  const onSortingChange: TableProps['onSortingChange'] = event => {
    setDescendingSorting(event.detail.isDescending ?? false);
    setSortingColumn(event.detail.sortingColumn);
  };

  const onClearFilter = () => {
    setFilteringText('');
    setDelayedFilteringText('');
  };

  return (
    <Table
      enableKeyboardNavigation={true}
      loading={loading}
      selectedItems={selectedItems}
      items={items}
      onSortingChange={onSortingChange}
      onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={descendingSorting}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences?.contentDisplay}
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences?.wrapLines}
      stripedRows={preferences?.stripedRows}
      contentDensity={preferences?.contentDensity}
      stickyColumns={preferences?.stickyColumns}
      header={
        <FullPageHeader
          selectedItemsCount={selectedItems.length}
          counter={!loading ? getHeaderCounterServerSideText(totalCount, selectedItems.length) : undefined}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      loadingText="Loading distributions"
      empty={<TableNoMatchState onClearFilter={onClearFilter} />}
      filter={
        <TextFilter
          filteringText={filteringText}
          onChange={({ detail }) => setFilteringText(detail.filteringText)}
          onDelayedChange={() => setDelayedFilteringText(filteringText)}
          filteringAriaLabel="Filter distributions"
          filteringPlaceholder="Find distributions"
          filteringClearAriaLabel="Clear"
          countText={
            pageSize !== undefined ? getTextFilterCounterServerSideText(items, pagesCount, pageSize) : undefined
          }
        />
      }
      pagination={
        <Pagination
          pagesCount={pagesCount}
          currentPageIndex={serverPageIndex ?? 0}
          disabled={loading}
          onChange={event => setCurrentPageIndex(event.detail.currentPageIndex)}
        />
      }
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

export function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableServerSide-Widths', COLUMN_DEFINITIONS);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <ServerSideTable
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
    />
  );
}
