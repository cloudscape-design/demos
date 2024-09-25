// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { ButtonDropdown, Flashbar, Pagination, PropertyFilter, Select, Table } from '@cloudscape-design/components';
import { FILTERING_PROPERTIES } from '../table-property-filter/table-property-filter-config';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES } from '../commons/table-config';
import { useDisclaimerFlashbarItem } from '../commons/disclaimer-flashbar-item';
import { Preferences } from '../commons/table-config';
import DataProvider from '../commons/data-provider';
import {
  getTextFilterCounterText,
  getHeaderCounterText,
  renderAriaLive,
  propertyFilterI18nStrings,
  distributionTableAriaLabels,
} from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState, Navigation } from '../commons/common-components';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { FullPageHeader } from '../commons';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { useFilterSets } from './use-filter-sets';
import '../../styles/table-select.scss';

const defaultFilterSets = [
  {
    name: 'Active web distributions',
    query: {
      operation: 'and',
      tokens: [
        { propertyKey: 'deliveryMethod', operator: '=', value: 'Web' },
        { propertyKey: 'state', operator: '=', value: 'Activated' },
      ],
    },
  },
  {
    name: 'Distributions with buckets',
    query: {
      operation: 'and',
      tokens: [{ propertyKey: 'origin', operator: ':', value: 'BUCKET' }],
    },
  },
  {
    name: 'Best performance in buckets 1,2',
    query: {
      operation: 'and',
      tokenGroups: [
        {
          operation: 'or',
          tokens: [
            { propertyKey: 'origin', operator: '=', value: 'EXAMPLE-BUCKET-1.s3.amazon' },
            { propertyKey: 'origin', operator: '=', value: 'EXAMPLE-BUCKET-2.s3.amazon' },
          ],
        },
        { propertyKey: 'priceClass', operator: '=', value: 'Use all edge locations (best performance)' },
      ],
      tokens: [],
    },
  },
];

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableSavedFilters-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TableSavedFilters-Preferences', DEFAULT_PREFERENCES);

  const disclaimerItem = useDisclaimerFlashbarItem(() => {
    setFlashNotifications(currentNotifications => currentNotifications.filter(item => item.id !== disclaimerItem.id));
  });
  const [flashNotifications, setFlashNotifications] = useState(disclaimerItem ? [disclaimerItem] : []);

  const [savedFilterSets, setSavedFilterSets] = useState(defaultFilterSets);
  const selectRef = useRef(null);

  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { items, actions, filteredItemsCount, collectionProps, propertyFilterProps, paginationProps } = useCollection(
    distributions,
    {
      propertyFiltering: {
        filteringProperties: FILTERING_PROPERTIES,
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: (
          <TableNoMatchState
            onClearFilter={() =>
              actions.setPropertyFiltering({ tokens: [], operation: propertyFilterProps.query.operation })
            }
          />
        ),
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  const { buttonDropdownProps, selectProps, actionModal } = useFilterSets({
    filterSets: savedFilterSets,
    query: propertyFilterProps.query,
    filteringProperties: propertyFilterProps.filteringProperties,
    selectRef,
    updateFilters: query => {
      actions.setPropertyFiltering(query);
    },
    updateSavedFilterSets: newFilterSets => {
      setSavedFilterSets(newFilterSets);

      // Persist the new filters here
    },
    showNotification: notification => {
      setFlashNotifications([
        {
          ...notification,
          onDismiss: () => {
            setFlashNotifications(currentNotifications =>
              currentNotifications.filter(item => item.id !== notification.id)
            );
          },
        },
        ...flashNotifications,
      ]);
    },
  });

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
      setLoading(false);
    });
  }, []);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Flashbar stackItems={true} items={flashNotifications} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <>
          <Table
            {...collectionProps}
            enableKeyboardNavigation={true}
            columnDefinitions={columnDefinitions}
            columnDisplay={preferences.contentDisplay}
            items={items}
            variant="full-page"
            stickyHeader={true}
            resizableColumns={true}
            onColumnWidthsChange={saveWidths}
            wrapLines={preferences.wrapLines}
            stripedRows={preferences.stripedRows}
            contentDensity={preferences.contentDensity}
            stickyColumns={preferences.stickyColumns}
            selectionType="multi"
            ariaLabels={distributionTableAriaLabels}
            renderAriaLive={renderAriaLive}
            header={
              <FullPageHeader
                selectedItemsCount={collectionProps.selectedItems.length}
                counter={!loading && getHeaderCounterText(distributions, collectionProps.selectedItems)}
                onInfoLinkClick={() => {
                  setToolsOpen(true);
                  appLayout.current?.focusToolsClose();
                }}
              />
            }
            loading={loading}
            loadingText="Loading distributions"
            filter={
              <PropertyFilter
                {...propertyFilterProps}
                filteringAriaLabel="Find resources"
                filteringPlaceholder="Find resources"
                i18nStrings={propertyFilterI18nStrings}
                countText={getTextFilterCounterText(filteredItemsCount)}
                expandToViewport={true}
                enableTokenGroups={true}
                customControl={
                  <Select
                    {...selectProps}
                    inlineLabelText="Saved filter sets"
                    data-testid="saved-filters"
                    ref={selectRef}
                  />
                }
                customFilterActions={<ButtonDropdown {...buttonDropdownProps} data-testid="filter-actions" />}
              />
            }
            pagination={<Pagination {...paginationProps} />}
            preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
          />
          {actionModal}
        </>
      }
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
}

createRoot(document.getElementById('app')).render(<App />);
