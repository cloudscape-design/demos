// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  BreadcrumbGroup,
  Button,
  Box,
  Container,
  ColumnLayout,
  ContentLayout,
  Hotspot,
  Header,
  Link,
  StatusIndicator,
  SpaceBetween,
} from '@cloudscape-design/components';
import { ExternalLink } from '../../commons';
import { CustomAppLayout } from '../layout';
import { useStore } from '../store';

const ValueWithLabel = ({ label, children }) => (
  <div>
    <Box variant="awsui-key-label">{label}</Box>
    <div>{children}</div>
  </div>
);

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
        <ContentLayout
          header={
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
          }
        >
          <SpaceBetween size="xl">
            <Container header={<Header>Job settings</Header>}>
              <ColumnLayout columns={4} variant="text-grid">
                <SpaceBetween size="l">
                  <ValueWithLabel label="Name">MyTranscriptionJob</ValueWithLabel>
                  <ValueWithLabel label="Status">
                    <StatusIndicator>Complete</StatusIndicator>
                  </ValueWithLabel>
                  <ValueWithLabel label="Language">English, US (en-US)</ValueWithLabel>

                  <ValueWithLabel label="Language settings">Specific language</ValueWithLabel>

                  <ValueWithLabel
                    label={
                      <>
                        Expiration{' '}
                        <Link variant="info" onFollow={makeHelpPanelHandler('expiration')}>
                          Info
                        </Link>
                      </>
                    }
                  >
                    The transcription is available for 88 more days.
                  </ValueWithLabel>
                </SpaceBetween>
                <SpaceBetween size="l">
                  <ValueWithLabel label="Model">None</ValueWithLabel>
                  <ValueWithLabel label="Created">11/12/2020, 11:25:44 AM</ValueWithLabel>
                  <ValueWithLabel label="Started">11/12/2020, 11:25:44 AM</ValueWithLabel>
                  <ValueWithLabel label="Ended">11/12/2020, 11:26:39 AM</ValueWithLabel>
                  <ValueWithLabel label="Input file format">mp3</ValueWithLabel>
                  <ValueWithLabel label="Audio sampling rate">44100 Hz</ValueWithLabel>
                </SpaceBetween>
                <SpaceBetween size="l">
                  <ValueWithLabel label="Audio identification">Deactivated</ValueWithLabel>
                  <ValueWithLabel label="Alternative results">Deactivated</ValueWithLabel>
                  <ValueWithLabel label="Custom vocabulary">None</ValueWithLabel>
                  <ValueWithLabel label="Automatic content redaction">None</ValueWithLabel>
                  <ValueWithLabel label="Vocabulary filter">-</ValueWithLabel>
                </SpaceBetween>
                <SpaceBetween size="l">
                  <ValueWithLabel label="Input data location">
                    <ExternalLink variant="primary">
                      <span style={{ wordBreak: 'break-all' }}>
                        s3://audiofile001001001/transcribe-sample.5fc2109bb28268d10fbc677e64b7e59256783d3c.mp3
                      </span>
                    </ExternalLink>
                  </ValueWithLabel>
                  <ValueWithLabel label="Output data location">Service-managed S3 bucket</ValueWithLabel>
                </SpaceBetween>
              </ColumnLayout>
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
        </ContentLayout>
      }
    />
  );
};
