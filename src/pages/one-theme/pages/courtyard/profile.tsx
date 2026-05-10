// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

export default function ProfilePage() {
  return (
    <SpaceBetween size="l">
      <Header variant="h1">Profile</Header>

      <Container
        header={
          <Header
            variant="h2"
            description="Your profile is connected to your AWS Builder ID. AWS applies changes to your profile anywhere that you use AWS Builder ID to sign in."
            actions={
              <Button href="https://profile.aws.amazon.com/#/profile/details" external={true}>
                Manage profile
              </Button>
            }
          >
            Profile info
          </Header>
        }
      >
        <KeyValuePairs
          columns={2}
          items={[
            { label: 'Name', value: 'Alice Dev' },
            { label: 'Email', value: 'alicedev@example.com' },
            { label: 'AWS Builder ID', value: 'alicedev' },
            { label: 'Member since', value: 'April 2024' },
          ]}
        />
      </Container>

      <Container
        header={
          <Header
            variant="h2"
            description="Used for billing and account correspondence."
            actions={<Button>Edit</Button>}
          >
            Contact information
          </Header>
        }
      >
        <KeyValuePairs
          columns={2}
          items={[
            { label: 'Full name', value: 'Alice Dev' },
            { label: 'Company', value: 'Example Inc.' },
            { label: 'Country', value: 'United States' },
            { label: 'Address', value: '123 Example St, Seattle, WA 98101' },
            { label: 'Phone', value: '+1 (555) 222-3333' },
          ]}
        />
      </Container>

      <Container
        header={
          <Header
            variant="h2"
            description="Verify your identity to access additional AWS services."
            actions={<Button variant="primary">Start verification</Button>}
          >
            Customer verification
          </Header>
        }
      >
        <SpaceBetween size="s">
          <FormField label="Status">
            <StatusIndicator type="pending">Not yet verified</StatusIndicator>
          </FormField>
          <FormField label="Next step">Upload a government-issued ID to complete verification.</FormField>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
