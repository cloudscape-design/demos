// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Hotspot from '@cloudscape-design/components/hotspot';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { CustomAppLayout } from '../layout';
import { useStore } from '../store';

interface Item {
  name: string;
}

const items: Item[] = [
  {
    name: 'MyTranscriptionJob',
  },
];

const columnDefinitions: TableProps.ColumnDefinition<Item>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: item => (
      <>
        <Link href={`#transcription-job-details`}>{item.name}</Link>
        {item.name === 'MyTranscriptionJob' && (
          <Box display="inline" padding={{ left: 'xxs' }}>
            <Hotspot hotspotId="transcription-jobs-new-transcription-job-name" side="right" direction="bottom" />
          </Box>
        )}
      </>
    ),
    isRowHeader: true,
  },
  { id: 'status', header: 'Status', cell: () => <StatusIndicator>Complete</StatusIndicator> },
  { id: 'language', header: 'Language', cell: () => 'English, US (en-US)' },
  { id: 'language-settings', header: 'Language settings', cell: () => 'Specific language' },
  { id: 'model-type', header: 'Model type', cell: () => 'General' },
  { id: 'model-name', header: 'Model name', cell: () => '-' },
];

export const TranscriptionJobListPage = () => {
  const {
    actions: { makeHelpPanelHandler },
  } = useStore();

  return (
    <CustomAppLayout
      initialHelpPanelPage="transcription-jobs"
      contentType="table"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#root' },
            { text: 'Transcription jobs', href: '#transcription-job-list' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <Table
          enableKeyboardNavigation={true}
          selectionType="single"
          trackBy="name"
          header={
            <Header
              variant="awsui-h1-sticky"
              info={
                <Link variant="info" onFollow={makeHelpPanelHandler('transcription-jobs')}>
                  Info
                </Link>
              }
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button disabled>Download</Button>
                  <Button disabled>Copy</Button>
                  <Button disabled>Delete</Button>
                  <Button variant="primary" href="#create-transcription-job">
                    Create job
                  </Button>
                </SpaceBetween>
              }
            >
              Transcription jobs
            </Header>
          }
          items={items}
          stickyHeader={true}
          variant="full-page"
          columnDefinitions={columnDefinitions}
        />
      }
    />
  );
};
