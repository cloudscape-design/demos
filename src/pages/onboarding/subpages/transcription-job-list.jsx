// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  BreadcrumbGroup,
  Button,
  Hotspot,
  Header,
  Link,
  SpaceBetween,
  StatusIndicator,
  Table,
  Box,
} from '@cloudscape-design/components';
import { CustomAppLayout } from '../layout';
import { useStore } from '../store';

const columnDefinitions = [
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
          items={[{ name: 'MyTranscriptionJob' }]}
          stickyHeader={true}
          variant="full-page"
          columnDefinitions={columnDefinitions}
        />
      }
    />
  );
};
