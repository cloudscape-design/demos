// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, Button, Header, Link, StatusIndicator, Table } from '@cloudscape-design/components';

export default function Alarms() {
  const alarmsDefinition = [
    {
      id: 'name',
      header: 'Alarm name',
      cell: item => <Link href="#">{item.name}</Link>,
      minWidth: 341,
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ statusText, status }) => <StatusIndicator type={status}>{statusText}</StatusIndicator>,
      minWidth: 164,
    },
  ];
  const alarmsItems = [
    { name: 'TargetTracking-table/divstable', statusText: 'In alarm', status: 'warning' },
    { name: 'TargetTracking-table/divstable', statusText: 'In alarm', status: 'warning' },
    { name: 'TargetTracking-table/AppSyncCommentTable', statusText: 'In alarm', status: 'warning' },
    { name: 'awsroute53-303920aa-0498-4129-a1b7', statusText: 'In alarm', status: 'warning' },
    { name: 'awsdynamodb-test0mark0test-Consumed-read', statusText: 'Insufficient data', status: 'pending' },
  ];
  return (
    <Table
      disableContentPaddings={true}
      resizableColumns={true}
      items={alarmsItems}
      columnDefinitions={alarmsDefinition}
      header={
        <Header
          variant="h2"
          counter="(150)"
          actions={
            <Button variant="normal" href="#" iconName="external" iconAlign="right">
              View in Cloudwatch
            </Button>
          }
        >
          Alarms
        </Header>
      }
      footer={
        <Box textAlign="center">
          <Link href="#">View all alarms</Link>
        </Box>
      }
    />
  );
}
