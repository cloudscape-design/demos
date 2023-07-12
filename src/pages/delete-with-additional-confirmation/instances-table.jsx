// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { Button, Pagination, Table, TextFilter, SpaceBetween, Link } from '@cloudscape-design/components';
import { TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { getTextFilterCounterText, getHeaderCounterText, renderAriaLive } from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import ItemState from '../delete-with-simple-confirmation/item-state';

const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: 'Instance ID',
    cell: item => <Link href={`#${item.id}`}>{item.id}</Link>,
    isRowHeader: true,
  },
  {
    id: 'state',
    header: 'Instance state',
    cell: item => <ItemState state={item.state} />,
  },
  {
    id: 'type',
    header: 'Instance type',
    cell: item => item.type,
  },
  {
    id: 'publicDns',
    header: 'Public DNS',
    cell: item => item.publicDns,
  },
  {
    id: 'monitoring',
    header: 'Monitoring',
    cell: item => item.monitoring,
  },
];

export default function InstancesTable({ instances, selectedItems, onSelectionChange, onDelete }) {
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    instances,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Instance" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: 50 },
      selection: {},
    }
  );

  const deletingItemsSelected = selectedItems.filter(it => it.state === 'deleting').length > 0;

  return (
    <Table
      {...collectionProps}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      columnDefinitions={COLUMN_DEFINITIONS}
      items={items}
      selectionType="multi"
      ariaLabels={{
        itemSelectionLabel: (_data, row) => `select ${row.id}`,
        allItemsSelectionLabel: () => 'select all',
        selectionGroupLabel: 'Instance selection',
      }}
      renderAriaLive={renderAriaLive}
      variant="full-page"
      stickyHeader={true}
      header={
        <FullPageHeader
          title="Instances"
          counter={getHeaderCounterText(instances, selectedItems)}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={selectedItems.length !== 1}>View details</Button>
              <Button disabled={selectedItems.length !== 1}>Edit</Button>
              <Button disabled={selectedItems.length === 0 || deletingItemsSelected} onClick={onDelete}>
                Delete
              </Button>
              <Button variant="primary">Create instance</Button>
            </SpaceBetween>
          }
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
    />
  );
}
