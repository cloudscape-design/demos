// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import DataProvider from '../commons/data-provider';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from '../commons/table-config';
import { Pagination, Table, TextFilter } from '@cloudscape-design/components';
import { FullPageHeader } from '../commons';
import { Breadcrumbs, ToolsContent } from './common-components';
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import {
  distributionTableAriaLabels,
  getTextFilterCounterText,
  getHeaderCounterText,
  renderAriaLive,
} from '../../i18n-strings';
import '../../styles/base.scss';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';

function TableContent({ distributions, loadHelpPanelContent }) {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-Table-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-Table-Preferences', DEFAULT_PREFERENCES);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    distributions,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );
  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      items={items}
      selectionType="multi"
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
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
          selectedItemsCount={collectionProps.selectedItems.length}
          counter={getHeaderCounterText(distributions, collectionProps.selectedItems)}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter distributions"
          filteringPlaceholder="Find distributions"
          filteringClearAriaLabel="Clear"
          countText={getTextFilterCounterText(filteredItemsCount)}
        />
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

function App({ distributions }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
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
      stickyNotifications
    />
  );
}

new DataProvider().getData('distributions').then(distributions => {
  createRoot(document.getElementById('app')).render(<App distributions={distributions} />);
});
