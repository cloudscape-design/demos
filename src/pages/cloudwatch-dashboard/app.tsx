// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Alert from '@cloudscape-design/components/alert';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Navigation, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import Breadcrumbs from './components/breadcrumbs';
import DashboardComponent from './components/dashboard-wrapper';
import { config, definition, headerText } from './config';
import { DevSameOriginWarning } from './same-origin-warning';

export function App() {
  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="m">
          <Header variant="h1">{headerText}</Header>
          <SpaceBetween size="l">
            <DevSameOriginWarning />
            <Alert statusIconAriaLabel="Info" header="Development guidelines for CloudWatch integration">
              This page showcases the official way to integrate a CloudWatch dashboard in a console, as explained in the{' '}
              <Link href="https://code.amazon.com/packages/CloudWatchDashboards-Inside/trees/mainline">
                integration package readme
              </Link>
              .
            </Alert>
            <DashboardComponent definition={definition} config={config} />
          </SpaceBetween>
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/monitoring" />}
      toolsHide={true}
      contentType="default"
      notifications={<Notifications />}
    />
  );
}
