// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import { isVisualRefresh } from '../../../../common/apply-mode';
import { WidgetConfig } from '../interfaces';

export const alarms: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'table',
    title: 'Alarms',
    description: 'View all your alarms',
    disableContentPaddings: !isVisualRefresh,
    header: AlarmsHeader,
    content: AlarmsContent,
    footer: AlarmsFooter,
  },
};

interface Item {
  name: string;
  statusText: string;
  status: StatusIndicatorProps.Type;
}

function AlarmsHeader() {
  return (
    <Header
      counter="(150)"
      actions={
        <Button variant="normal" href="#" iconName="external" iconAlign="right">
          View in Cloudwatch
        </Button>
      }
    >
      Alarms
    </Header>
  );
}

function AlarmsFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View all alarms
      </Link>
    </Box>
  );
}

const alarmsDefinition: TableProps<Item>['columnDefinitions'] = [
  {
    id: 'name',
    header: 'Alarm name',
    cell: item => <Link href="#">{item.name}</Link>,
    width: 341,
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ statusText, status }) => <StatusIndicator type={status}>{statusText}</StatusIndicator>,
    width: 164,
  },
];

const alarmsItems: TableProps<Item>['items'] = [
  { name: 'TargetTracking-table/divstable', statusText: 'In alarm', status: 'warning' },
  { name: 'TargetTracking-table/divstable', statusText: 'In alarm', status: 'warning' },
  { name: 'awsroute53-303920aa-0498-4129-a1b7', statusText: 'In alarm', status: 'warning' },
  { name: 'awsdynamodb-test0mark0test-Consumed-read', statusText: 'Insufficient data', status: 'pending' },
];

function AlarmsContent() {
  return (
    <Table variant="borderless" resizableColumns={true} items={alarmsItems} columnDefinitions={alarmsDefinition} />
  );
}
