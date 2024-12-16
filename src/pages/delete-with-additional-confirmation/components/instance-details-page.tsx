// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import {
  BreadcrumbGroup,
  Button,
  Container,
  Flashbar,
  FlashbarProps,
  Header,
  KeyValuePairs,
  SpaceBetween,
} from '@cloudscape-design/components';

import { EC2Instance } from '../../../resources/types';
import { Navigation } from '../../commons';
import { CustomAppLayout } from '../../commons/common-components';
import ItemState from '../../delete-with-simple-confirmation/components/item-state';

interface InstanceDetailsPageProps {
  instance: EC2Instance;
  onDeleteInit: () => void;
  notifications: FlashbarProps.MessageDefinition[];
}
export function InstanceDetailsPage({ instance, onDeleteInit, notifications }: InstanceDetailsPageProps) {
  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="m">
          <Header
            variant="h1"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Edit</Button>
                <Button onClick={onDeleteInit}>Delete</Button>
              </SpaceBetween>
            }
          >
            {instance.id}
          </Header>
          <Container header={<Header variant="h2">Instance details</Header>}>
            <KeyValuePairs
              columns={4}
              items={[
                {
                  label: 'Instance ID',
                  value: instance.id,
                },
                {
                  label: 'Public DNS',
                  value: instance.publicDns,
                },
                {
                  label: 'Monitoring',
                  value: instance.monitoring,
                },
                {
                  label: 'Instance state',
                  value: <ItemState state={instance.state} />,
                },
                {
                  label: 'Instance type',
                  value: instance.type,
                },
              ]}
            />
          </Container>
        </SpaceBetween>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Instances', href: '#' },
            { text: instance.id, href: '#' + instance.id },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      notifications={<Flashbar items={notifications} stackItems={true} />}
      navigation={<Navigation activeHref="#" />}
      navigationOpen={false}
      toolsHide={true}
    />
  );
}
