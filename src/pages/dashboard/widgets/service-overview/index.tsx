// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';
import { WidgetConfig } from '../interfaces';
import { Box, ColumnLayout, Link } from '@cloudscape-design/components';

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
    <ColumnLayout columns={4} variant="text-grid" minColumnWidth={170}>
      <div>
        <Box variant="awsui-key-label">Running instances</Box>
        <Link variant="awsui-value-large" href="#">
          14
        </Link>
      </div>
      <div>
        <Box variant="awsui-key-label">Volumes</Box>
        <Link variant="awsui-value-large" href="#">
          126
        </Link>
      </div>
      <div>
        <Box variant="awsui-key-label">Security groups</Box>
        <Link variant="awsui-value-large" href="#">
          116
        </Link>
      </div>
      <div>
        <Box variant="awsui-key-label">Load balancers</Box>
        <Link variant="awsui-value-large" href="#">
          28
        </Link>
      </div>
    </ColumnLayout>
  );
}
