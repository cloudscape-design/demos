// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, Header, Link, StatusIndicator, Table } from '@cloudscape-design/components';

export default function Events() {
  const eventsDefinition = [
    {
      id: 'name',
      header: 'Event name',
      cell: item => item.name,
      minWidth: 135,
      width: 140,
    },
    {
      id: 'status',
      header: 'Event status',
      cell: ({ statusText, status }) => <StatusIndicator type={status}>{statusText}</StatusIndicator>,
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
  const eventsItems = [
    {
      name: 'my-instance-1',
      id: 'i-b4b5f3b29ac6f0e',
      type: 'instance-stop',
      statusText: 'Scheduled',
      status: 'pending',
    },
    {
      name: 'my-instance-2',
      id: 'i-f0eb5f329ab4bc6',
      type: 'instance-stop',
      statusText: 'Scheduled',
      status: 'pending',
    },
    {
      name: 'my-instance-3',
      id: 'i-29ab4bebc6f05f3',
      type: 'instance-stop',
      statusText: 'Ongoing',
      status: 'success',
    },
    {
      name: 'my-instance-4',
      id: 'i-329ab4bc6f0eb5f',
      type: 'instance-stop',
      statusText: 'Ongoing',
      status: 'success',
    },
    {
      name: 'my-instance-5',
      id: 'i-b4beb29a5f3c6f0',
      type: 'instance-stop',
      statusText: 'Ongoing',
      status: 'success',
    },
    {
      name: 'my-instance-6',
      id: 'i-f0eb5f329ab4bc6',
      type: 'instance-stop',
      statusText: 'Ongoing',
      status: 'success',
    },
    {
      name: 'my-instance-7',
      id: 'i-9ab4bc6f0eb5f32',
      type: 'instance-stop',
      statusText: 'Ongoing',
      status: 'success',
    },
  ];
  return (
    <Table
      className="custom-dashboard-container"
      resizableColumns={true}
      header={<Header counter="(8)">Events</Header>}
      items={eventsItems}
      columnDefinitions={eventsDefinition}
      disableContentPaddings={true}
      footer={
        <Box textAlign="center">
          <Link href="#">View all events</Link>
        </Box>
      }
    />
  );
}
