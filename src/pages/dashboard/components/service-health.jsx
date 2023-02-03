// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, HelpPanel, Container, Header, StatusIndicator, ColumnLayout } from '@cloudscape-design/components';
import { ExternalLinkGroup, InfoLink } from '../../commons';

function ServiceHealthInfo() {
  return (
    <HelpPanel
      header={<h2>Service health</h2>}
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'Service health dashboard' },
            { href: '#', text: 'Personal health dashboard' },
          ]}
        />
      }
    >
      <p>Amazon Web Services publishes our most up-to-the-minute information on service availability</p>
    </HelpPanel>
  );
}

export default function ServiceHealth(props) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          info={
            <InfoLink
              onFollow={() => props.loadHelpPanelContent(<ServiceHealthInfo />)}
              ariaLabel={'Information about service health.'}
            />
          }
        >
          Service health - <em>new</em>
        </Header>
      }
    >
      <ColumnLayout columns="2">
        <div>
          <Box variant="awsui-key-label">Region</Box>
          <div>US East (N. Virginia)</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Status</Box>
          <StatusIndicator type="success">Service is operating normally</StatusIndicator>
        </div>
      </ColumnLayout>
    </Container>
  );
}
