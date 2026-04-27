// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { getHeaderCounterText, getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import DATA, { Instance } from '../../resources/instances';
import { FullPageHeader } from '../commons';
import { CustomAppLayout, Notifications, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { Preferences } from '../commons/table-config';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { RebootModal } from './reboot-modal';
import { Breadcrumbs, Navigation, ToolsContent } from './table-select-dropdown-components';
import {
  COLUMN_DEFINITIONS,
  CONTENT_DISPLAY_OPTIONS,
  PAGE_SIZE_OPTIONS,
  PREFERENCES,
} from './table-select-dropdown-config';

import '../../styles/base.scss';
const predicates: Record<string, (item: Instance) => boolean> = {
  aurora: i => i.engine === 'Aurora',
  mysql: i => i.engine === 'MySQL',
  postgresql: i => i.engine === 'PostgreSQL',
  available: i => i.status === 'available',
  unavailable: i => i.status === 'unavailable',
};
function TableContent({ loadHelpPanelContent }: { loadHelpPanelContent: () => void }) {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableSelectDropdown-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TableSelectDropdown-Preferences', PREFERENCES);
  const [rebootModalVisible, setRebootModalVisible] = useState(false);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(DATA, {
    filtering: {
      empty: <TableEmptyState resourceName="Instance" />,
      noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
    },
    pagination: { pageSize: preferences?.pageSize },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {
      trackBy: 'id',
      crossPageSelection: {},
      selectionControllerItems: (visibleItems, selectedItems) => {
        const allSelected = (predicate: (item: Instance) => boolean) => {
          const matching = visibleItems.filter(predicate);
          return matching.length > 0 && matching.every(m => selectedItems.some(s => s.id === m.id));
        };
        const hasMatching = (predicate: (item: Instance) => boolean) => visibleItems.some(predicate);
        return [
          {
            text: 'Select by engine',
            items: [
              {
                id: 'aurora',
                text: 'Aurora',
                itemType: 'checkbox' as const,
                checked: allSelected(predicates.aurora),
                disabled: !hasMatching(predicates.aurora),
              },
              {
                id: 'mysql',
                text: 'MySQL',
                itemType: 'checkbox' as const,
                checked: allSelected(predicates.mysql),
                disabled: !hasMatching(predicates.mysql),
              },
              {
                id: 'postgresql',
                text: 'PostgreSQL',
                itemType: 'checkbox' as const,
                checked: allSelected(predicates.postgresql),
                disabled: !hasMatching(predicates.postgresql),
              },
            ],
          },
          {
            text: 'Select by status',
            items: [
              {
                id: 'available',
                text: 'Available',
                itemType: 'checkbox' as const,
                checked: allSelected(predicates.available),
                disabled: !hasMatching(predicates.available),
              },
              {
                id: 'unavailable',
                text: 'Unavailable',
                itemType: 'checkbox' as const,
                checked: allSelected(predicates.unavailable),
                disabled: !hasMatching(predicates.unavailable),
              },
            ],
          },
          { id: 'select-none', text: 'Select none', disabled: selectedItems.length === 0 },
        ];
      },
      onSelectionControllerItemClick: (detail, visibleItems, collectionActions, allItems) => {
        if (detail.id === 'select-none') {
          collectionActions.setSelectedItems([]);
          return;
        }
        const predicate = predicates[detail.id];
        if (!predicate) {
          return;
        }
        const currentSelected = (collectionProps.selectedItems ?? []) as Instance[];
        const matching = visibleItems.filter(predicate) as Instance[];
        const allMatching = (allItems as Instance[]).filter(predicate);
        if (detail.checked) {
          const existing = new Set(currentSelected.map(s => s.id));
          collectionActions.setSelectedItems([...currentSelected, ...matching.filter(m => !existing.has(m.id))]);
        } else {
          collectionActions.setSelectedItems(currentSelected.filter(s => !matching.some(m => m.id === s.id)));
        }
        return { allMatchingItems: allMatching };
      },
    },
  });
  const selectedItems = collectionProps.selectedItems ?? [];
  const hasSelection = selectedItems.length > 0;
  // Cross-page selection notification driven by the hook
  return (
    <>
      <Table
        {...collectionProps}
        enableKeyboardNavigation={true}
        columnDefinitions={columnDefinitions}
        columnDisplay={preferences?.contentDisplay}
        items={items}
        selectionType="multi"
        variant="full-page"
        stickyHeader={true}
        resizableColumns={true}
        onColumnWidthsChange={saveWidths}
        wrapLines={preferences?.wrapLines}
        stripedRows={preferences?.stripedRows}
        contentDensity={preferences?.contentDensity}
        stickyColumns={preferences?.stickyColumns}
        ariaLabels={{
          selectionGroupLabel: 'Instance selection',
          allItemsSelectionLabel: () =>
            `${selectedItems.length} ${selectedItems.length === 1 ? 'instance' : 'instances'} selected`,
          itemSelectionLabel: (_data, item) => item.id,
          tableLabel: 'Instances',
          selectionControllerLabel: 'Instance selection options',
        }}
        renderAriaLive={renderAriaLive}
        header={
          <FullPageHeader
            title="Instances"
            selectedItemsCount={selectedItems.length}
            counter={getHeaderCounterText(DATA, selectedItems)}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <ButtonDropdown
                  disabled={!hasSelection}
                  items={[
                    { id: 'reboot', text: 'Reboot DB instance' },
                    { id: 'terminate', text: 'Terminate DB instance' },
                    { id: 'create-replica', text: 'Create read replica' },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id === 'reboot') {
                      setRebootModalVisible(true);
                    }
                  }}
                >
                  Instance actions
                </ButtonDropdown>
                <Button variant="primary">Launch DB instance</Button>
              </SpaceBetween>
            }
            onInfoLinkClick={loadHelpPanelContent}
          />
        }
        filter={
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Filter instances"
            filteringPlaceholder="Find instances"
            filteringClearAriaLabel="Clear"
            countText={getTextFilterCounterText(filteredItemsCount)}
          />
        }
        pagination={<Pagination {...paginationProps} />}
        preferences={
          <Preferences
            preferences={preferences}
            setPreferences={setPreferences}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
          />
        }
      />
      <RebootModal
        instances={selectedItems as Instance[]}
        visible={rebootModalVisible}
        onDiscard={() => setRebootModalVisible(false)}
        onConfirm={() => {
          setRebootModalVisible(false);
          actions.setSelectedItems([]);
        }}
      />
    </>
  );
}
export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/instances" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <TableContent
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
