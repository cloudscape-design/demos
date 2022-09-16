// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Box, Button, Header, Link, StatusIndicator, Table } from '@cloudscape-design/components';

export default function InstancesLimits() {
  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectionChangeHandler = event => setSelectedItems(event.detail.selectedItems);
  const instanceLimitsDefinition = [
    {
      id: 'name',
      header: 'Name',
      cell: item => item.name,
      minWidth: 315,
    },
    {
      id: 'status',
      header: 'Status (usage/limit)',
      cell: ({ statusText, status }) => <StatusIndicator type={status}>{statusText}</StatusIndicator>,
      minWidth: 200,
    },
  ];
  const instanceLimitsItems = [
    { name: 'Running on-demand all G instances', statusText: '900 used/920 limit', status: 'warning' },
    { name: 'Running on-demand all P instances', statusText: '692 used/692 limit', status: 'warning' },
    { name: 'Running on-demand all Standard instances', statusText: '50 used/10304 limit', status: 'success' },
    { name: 'Running on-demand all X instances', statusText: '0 used/560 limit', status: 'success' },
    { name: 'Running on-demand all F instances', statusText: '0 used/176 limit', status: 'success' },
  ];

  return (
    <Table
      resizableColumns={true}
      items={instanceLimitsItems}
      columnDefinitions={instanceLimitsDefinition}
      selectionType="single"
      trackBy="name"
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChangeHandler}
      ariaLabels={{
        itemSelectionLabel: (data, row) => `select ${row.name}`,
        allItemsSelectionLabel: () => 'select all',
        selectionGroupLabel: 'On-demand instance limit selection',
      }}
      header={
        <Header
          variant="h2"
          actions={
            <Button
              variant="normal"
              href="#"
              iconName="external"
              iconAlign="right"
              disabled={selectedItems.length === 0}
            >
              Request limit increase
            </Button>
          }
        >
          On-demand instance limits
        </Header>
      }
      footer={
        <Box textAlign="center">
          <Link href="#">View all instance limits</Link>
        </Box>
      }
    />
  );
}
