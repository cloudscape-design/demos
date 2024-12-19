// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Hotspot from '@cloudscape-design/components/hotspot';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { ExternalLink } from '../../commons';
import { CustomAppLayout } from '../layout';
import { useStore } from '../store';

export const TranscriptionJobDetailsPage = () => {
  const {
    actions: { makeHelpPanelHandler },
  } = useStore();
  return (
    <CustomAppLayout
      navigationOpen={false}
      initialHelpPanelPage="expiration"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#root' },
            { text: 'Transcription jobs', href: '#transcription-job-list' },
            { text: 'MyTranscriptionJob', href: '#transcription-job-details' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <SpaceBetween size="m">
          <Header
            variant="h1"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Download full transcript</Button>
                <Button>Delete</Button>
                <Button>Copy</Button>
              </SpaceBetween>
            }
          >
            MyTranscriptionJob
          </Header>
          <SpaceBetween size="xl">
            <Container header={<Header>Job settings</Header>}>
              <KeyValuePairs
                columns={4}
                items={[
                  {
                    type: 'group',
                    items: [
                      {
                        label: 'Name',
                        value: 'MyTranscriptionJob',
                      },
                      {
                        label: 'Status',
                        value: <StatusIndicator>Complete</StatusIndicator>,
                      },
                      {
                        label: 'Language',
                        value: 'English, US (en-US)',
                      },
                      {
                        label: 'Language settings',
                        value: 'Specific language',
                      },
                      {
                        label: 'Expiration',
                        info: (
                          <Link variant="info" onFollow={makeHelpPanelHandler('expiration')}>
                            Info
                          </Link>
                        ),
                        value: 'The transcription is available for 88 more days.',
                      },
                    ],
                  },
                  {
                    type: 'group',
                    items: [
                      { label: 'Model', value: 'None' },
                      { label: 'Created', value: '11/12/2020, 11:25:44 AM' },
                      { label: 'Started', value: '11/12/2020, 11:25:44 AM' },
                      { label: 'Ended', value: '11/12/2020, 11:26:39 AM' },
                      { label: 'Input file format', value: 'mp3' },
                      { label: 'Audio sampling rate', value: '44100 Hz' },
                    ],
                  },
                  {
                    type: 'group',
                    items: [
                      { label: 'Audio identification', value: 'Deactivated' },
                      { label: 'Alternative results', value: 'Deactivated' },
                      { label: 'Custom vocabulary', value: 'None' },
                      { label: 'Automatic content redaction', value: 'None' },
                      { label: 'Vocabulary filter', value: '-' },
                    ],
                  },
                  {
                    type: 'group',
                    items: [
                      {
                        label: 'Input data location',
                        value: (
                          <ExternalLink variant="primary">
                            <span style={{ wordBreak: 'break-all' }}>
                              s3://audiofile001001001/transcribe-sample.5fc2109bb28268d10fbc677e64b7e59256783d3c.mp3
                            </span>
                          </ExternalLink>
                        ),
                      },
                      {
                        label: 'Output data location',
                        value: 'Service-managed S3 bucket',
                      },
                    ],
                  },
                ]}
              />
            </Container>
            <Container
              header={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Header description="Select download to save a local copy of the transcription.">
                    Transcription preview
                  </Header>
                  <Hotspot hotspotId="transcription-job-details-transcription-preview" direction="left" />
                </div>
              }
            >
              <div className="transcription-output-preview">
                <Box padding={{ left: 'xl', vertical: 's', right: 'xxl', bottom: 'xl' }}>
                  machine learning is employed in a range of computing tasks where designing and programming explicit
                  algorithms with good performance is difficult or infeasible Example Applications include email
                  filtering detection of network intruders and computer vision Machine learning is closely related to
                  computational statistics which also focuses on predictions making through the use of computer It has
                  strong ties to mathematical optimization which delivers methods theory and application domains to the
                  field
                </Box>
              </div>
            </Container>
          </SpaceBetween>
        </SpaceBetween>
      }
    />
  );
};
