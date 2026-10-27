// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useRef, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Distribution } from '../../fake-server/types';
import {
  distributionTableAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  renderAriaLive,
} from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from '../commons/table-config';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { Breadcrumbs, ToolsContent } from './common-components';

import '../../styles/base.scss';

const INVALIDATION_COLUMN_ID = 'createInvalidation';

// In-context actions belong in the last columns of the table. One frequently repeated action is kept
// visible as an inline link button, while the remaining actions stay grouped in the actions dropdown.
function createInvalidationColumn(
  onCreateInvalidation: (item: Distribution) => void,
  pendingInvalidationIds: readonly string[],
): TableProps.ColumnDefinition<Distribution> {
  return {
    id: INVALIDATION_COLUMN_ID,
    header: 'Invalidation',
    minWidth: 170,
    cell: item => (
      <Button
        variant="inline-link"
        ariaLabel={`Create invalidation for ${item.id}`}
        loading={pendingInvalidationIds.includes(item.id)}
        loadingText={`Creating invalidation for ${item.id}`}
        onClick={() => onCreateInvalidation(item)}
      >
        Create invalidation
      </Button>
    ),
  };
}

function insertBeforeActions(
  columnDefinitions: TableProps.ColumnDefinition<Distribution>[],
  column: TableProps.ColumnDefinition<Distribution>,
) {
  const actionsIndex = columnDefinitions.findIndex(({ id }) => id === 'actions');
  const insertAt = actionsIndex === -1 ? columnDefinitions.length : actionsIndex;
  return [...columnDefinitions.slice(0, insertAt), column, ...columnDefinitions.slice(insertAt)];
}

function insertBeforeActionsPreference<T extends { id: string }>(options: readonly T[], option: T) {
  const actionsIndex = options.findIndex(({ id }) => id === 'actions');
  const insertAt = actionsIndex === -1 ? options.length : actionsIndex;
  return [...options.slice(0, insertAt), option, ...options.slice(insertAt)];
}

const CONTENT_DISPLAY_OPTIONS: CollectionPreferencesProps.ContentDisplayOption[] = insertBeforeActionsPreference(
  DEFAULT_PREFERENCES.contentDisplay!.map(({ id }): CollectionPreferencesProps.ContentDisplayOption => ({
    id,
    label: COLUMN_DEFINITIONS.find(column => column.id === id)?.header as string,
    alwaysVisible: id === 'id' || undefined,
  })),
  { id: INVALIDATION_COLUMN_ID, label: 'Invalidation' },
);

const TABLE_PREFERENCES: CollectionPreferencesProps.Preferences = {
  ...DEFAULT_PREFERENCES,
  contentDisplay: insertBeforeActionsPreference(DEFAULT_PREFERENCES.contentDisplay!, {
    id: INVALIDATION_COLUMN_ID,
    visible: true,
  }),
};

interface TableContentProps {
  distributions: Distribution[];
  loadHelpPanelContent: () => void;
}

function TableContent({ distributions, loadHelpPanelContent }: TableContentProps) {
  const [pendingInvalidationIds, setPendingInvalidationIds] = useState<string[]>([]);
  const allColumnDefinitions = useMemo(
    () =>
      insertBeforeActions(
        COLUMN_DEFINITIONS,
        createInvalidationColumn(item => {
          setPendingInvalidationIds(ids => [...ids, item.id]);
          // Stands in for the request that creates the invalidation.
          setTimeout(() => setPendingInvalidationIds(ids => ids.filter(id => id !== item.id)), 1500);
        }, pendingInvalidationIds),
      ),
    [pendingInvalidationIds],
  );
  const [columnDefinitions, saveWidths] = useColumnWidths('React-Table-Widths', allColumnDefinitions);
  // Key bumped because the default content display gained the invalidation column: preferences saved
  // under the previous key would keep the new column hidden.
  const [preferences, setPreferences] = useLocalStorage('React-Table-Preferences-V2', TABLE_PREFERENCES);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    distributions,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    },
  );
  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences?.contentDisplay}
      items={items}
      selectionType="multi"
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
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
          selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
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
          countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
        />
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
        />
      }
    />
  );
}

export interface AppProps {
  distributions: Distribution[];
}

export function App({ distributions }: AppProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

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
