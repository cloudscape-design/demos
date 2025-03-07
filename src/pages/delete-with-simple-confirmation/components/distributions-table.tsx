// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import {
  createTableSortLabelFn,
  distributionTableAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  renderAriaLive,
} from '../../../i18n-strings';
import { DistributionResource } from '../../../resources/types';
import { FullPageHeader, TableEmptyState, TableNoMatchState } from '../../commons/common-components';
import ItemState from './item-state';

const rawColumns: TableProps.ColumnDefinition<DistributionResource>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Distribution ID',
    cell: item => (
      <div>
        <Link href={`#${item.id}`}>{item.id}</Link>
      </div>
    ),
    minWidth: 180,
  },
  {
    id: 'state',
    sortingField: 'state',
    header: 'State',
    cell: item => <ItemState state={item.state ?? 'Unknown'} />,
    minWidth: 120,
  },
  {
    id: 'domainName',
    sortingField: 'domainName',
    cell: item => item.domainName,
    header: 'Domain name',
    minWidth: 160,
    isRowHeader: true,
  },
  {
    id: 'deliveryMethod',
    sortingField: 'deliveryMethod',
    header: 'Delivery method',
    cell: item => item.deliveryMethod,
    minWidth: 100,
  },
  {
    id: 'sslCertificate',
    sortingField: 'sslCertificate',
    header: 'SSL certificate',
    cell: item => item.sslCertificate,
    minWidth: 100,
  },
  {
    id: 'origin',
    sortingField: 'origin',
    header: 'Origin',
    cell: item => item.origin,
    minWidth: 100,
  },
];
const columnDefinitions = rawColumns.map(column => ({ ...column, ariaLabel: createTableSortLabelFn(column) }));

interface DistributionsTableProps {
  distributions: DistributionResource[];
  selectedItems: DistributionResource[];
  onSelectionChange: (event: {
    detail: {
      selectedItems: DistributionResource[];
    };
  }) => void;
  onDelete: () => void;
}
export default function DistributionsTable({
  distributions,
  selectedItems,
  onSelectionChange,
  onDelete,
}: DistributionsTableProps) {
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    distributions,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: 50 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    },
  );

  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      columnDefinitions={columnDefinitions}
      items={items}
      selectionType="multi"
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
      variant="full-page"
      stickyHeader={true}
      header={
        <FullPageHeader
          title="Distributions"
          selectedItemsCount={selectedItems.length}
          counter={getHeaderCounterText(distributions, selectedItems)}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={selectedItems.length !== 1}>View details</Button>
              <Button disabled={selectedItems.length !== 1}>Edit</Button>
              <Button disabled={selectedItems.length === 0} onClick={onDelete}>
                Delete
              </Button>
              <Button variant="primary">Create distribution</Button>
            </SpaceBetween>
          }
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
    />
  );
}
