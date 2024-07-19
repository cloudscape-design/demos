// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';
import { WidgetConfig } from '../interfaces';
import { Link, KeyValuePairs } from '@cloudscape-design/components';

export const serviceOverview: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 3 },
  data: {
    icon: 'list',
    title: 'Service overview',
    description: 'Overview of all your resources',
    header: ServiceOverviewHeader,
    content: ServiceOverviewWidget,
  },
};

function ServiceOverviewHeader() {
  return (
    <Header variant="h2" description="Viewing data from N. Virginia region">
      Service overview - <em>new</em>
    </Header>
  );
}

function ServiceOverviewWidget() {
  return (
    <KeyValuePairs
      columns={4}
      items={[
        {
          label: 'Running instances',
          value: (
            <Link variant="awsui-value-large" href="#" ariaLabel="Running instances (14)">
              14
            </Link>
          ),
        },
        {
          label: 'Volumes',
          value: (
            <Link variant="awsui-value-large" href="#" ariaLabel="Volumes (126)">
              126
            </Link>
          ),
        },
        {
          label: 'Security groups',
          value: (
            <Link variant="awsui-value-large" href="#" ariaLabel="Security groups (116)">
              116
            </Link>
          ),
        },
        {
          label: 'Load balancers',
          value: (
            <Link variant="awsui-value-large" href="#" ariaLabel="Load balancers (28)">
              28
            </Link>
          ),
        },
      ]}
    />
  );
}
