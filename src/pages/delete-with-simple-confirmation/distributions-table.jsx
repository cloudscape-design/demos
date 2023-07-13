// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { Button, Pagination, Table, TextFilter, SpaceBetween, Link } from '@cloudscape-design/components';
import { FullPageHeader, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import ItemState from './item-state';
import {
  getTextFilterCounterText,
  distributionTableAriaLabels,
  createTableSortLabelFn,
  getHeaderCounterText,
  renderAriaLive,
} from '../../i18n-strings';

const rawColumns = [
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
    cell: item => <ItemState state={item.state} />,
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

export default function DistributionsTable({ distributions, selectedItems, onSelectionChange, onDelete }) {
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
    }
  );

  return (
    <Table
      {...collectionProps}
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
