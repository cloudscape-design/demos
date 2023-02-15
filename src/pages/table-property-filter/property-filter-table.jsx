// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';

import { FullPageHeader } from '../commons';
import { TableNoMatchState, TableEmptyState } from '../commons/common-components';
import {
  distributionTableAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  paginationAriaLabels,
  propertyFilterI18nStrings,
} from '../../i18n-strings';
import { Preferences } from '../table/table-config';

import '../../styles/base.scss';

export function PropertyFilterTable({
  data,
  loadHelpPanelContent,
  columnDefinitions,
  saveWidths,
  preferences,
  setPreferences,
  filteringProperties,
}) {
  const { items, actions, filteredItemsCount, collectionProps, paginationProps, propertyFilterProps } = useCollection(
    data,
    {
      propertyFiltering: {
        filteringProperties,
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: (
          <TableNoMatchState
            onClearFilter={() => {
              actions.setPropertyFiltering({ tokens: [], operation: 'and' });
            }}
          />
        ),
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  return (
    <Table
      {...collectionProps}
      items={items}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      ariaLabels={distributionTableAriaLabels}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      onColumnWidthsChange={saveWidths}
      header={
        <FullPageHeader
          selectedItemsCount={collectionProps.selectedItems.length}
          counter={getHeaderCounterText(data, collectionProps.selectedItems)}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      loadingText="Loading distributions"
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          i18nStrings={propertyFilterI18nStrings}
          countText={getTextFilterCounterText(filteredItemsCount)}
          expandToViewport={true}
        />
      }
      pagination={<Pagination {...paginationProps} ariaLabels={paginationAriaLabels} />}
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}
