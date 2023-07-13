// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
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
  propertyFilterI18nStrings,
  renderAriaLive,
} from '../../i18n-strings';
import DataProvider from '../commons/data-provider';
import { Preferences } from '../commons/table-config';

import '../../styles/base.scss';

export function PropertyFilterTable({
  loadHelpPanelContent,
  columnDefinitions,
  contentDisplayOptions,
  saveWidths,
  preferences,
  setPreferences,
  filteringProperties,
}) {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { items, actions, filteredItemsCount, collectionProps, paginationProps, propertyFilterProps } = useCollection(
    distributions,
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

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
      setLoading(false);
    });
  }, []);

  return (
    <Table
      {...collectionProps}
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      onColumnWidthsChange={saveWidths}
      header={
        <FullPageHeader
          selectedItemsCount={collectionProps.selectedItems.length}
          counter={!loading && getHeaderCounterText(distributions, collectionProps.selectedItems)}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      loading={loading}
      loadingText="Loading distributions"
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          i18nStrings={propertyFilterI18nStrings}
          countText={getTextFilterCounterText(filteredItemsCount)}
          expandToViewport={true}
        />
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          contentDisplayOptions={contentDisplayOptions}
        />
      }
    />
  );
}
