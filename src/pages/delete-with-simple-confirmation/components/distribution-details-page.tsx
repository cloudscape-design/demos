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
  SpaceBetween,
} from '@cloudscape-design/components';

import { DistributionResource } from '../../../resources/types';
import { Navigation } from '../../commons';
import { CustomAppLayout } from '../../commons/common-components';
import { SettingsDetails } from '../../details/components/settings-details';

interface DistributionDetailsPageProps {
  distribution: DistributionResource;
  onDeleteInit: () => void;
  notifications: FlashbarProps.MessageDefinition[];
}
export function DistributionDetailsPage({ distribution, onDeleteInit, notifications }: DistributionDetailsPageProps) {
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
            {distribution.id}
          </Header>
          <Container header={<Header variant="h2">Distribution settings</Header>}>
            <SettingsDetails isInProgress={false} distribution={distribution} />
          </Container>
        </SpaceBetween>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Distributions', href: '#' },
            { text: distribution.id, href: '#' + distribution.id },
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
