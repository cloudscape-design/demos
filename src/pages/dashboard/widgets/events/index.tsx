// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Box,
  Header,
  Link,
  StatusIndicator,
  StatusIndicatorProps,
  Table,
  TableProps,
} from '@cloudscape-design/components';
import { WidgetConfig } from '../interfaces';
import { eventsItems } from './data';
import { isVisualRefresh } from '../../../../common/apply-mode';

export const events: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2 },
  data: {
    icon: 'table',
    title: 'Events',
    description: 'View your service events',
    disableContentPaddings: !isVisualRefresh,
    header: EventsHeader,
    content: EventsContent,
    footer: EventsFooter,
  },
};

function EventsHeader() {
  return <Header counter={`(${eventsItems.length})`}>Events</Header>;
}

function EventsFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View all events
      </Link>
    </Box>
  );
}

const eventsDefinition: Array<TableProps.ColumnDefinition<(typeof eventsItems)[0]>> = [
  {
    id: 'name',
    header: 'Event name',
    cell: item => item.name,
    minWidth: 135,
    width: 140,
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Event status',
    cell: ({ statusText, status }) => (
      <StatusIndicator type={status as StatusIndicatorProps.Type}>{statusText}</StatusIndicator>
    ),
    minWidth: 120,
    width: 130,
  },
  {
    id: 'id',
    header: 'Event ID',
    cell: item => <Link href="#">{item.id}</Link>,
    minWidth: 165,
    width: 170,
  },
  {
    id: 'type',
    header: 'Event type',
    cell: item => item.type,
    minWidth: 130,
    width: 135,
  },
];

export default function EventsContent() {
  return (
    <Table variant="borderless" resizableColumns={true} items={eventsItems} columnDefinitions={eventsDefinition} />
  );
}
