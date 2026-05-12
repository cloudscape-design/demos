// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import * as awsui from '@cloudscape-design/design-tokens';

import { WidgetContainer } from './widget-container';

const COST_DATA = [
  { x: 'Jul', y: 0 },
  { x: 'Aug', y: 0 },
  { x: 'Sep', y: 0 },
  { x: 'Oct', y: 0 },
  { x: 'Nov', y: 0 },
  { x: 'Dec', y: 0 },
];

export function CostUsageWidget() {
  const headerActions = (
    <SpaceBetween direction="horizontal" size="xs">
      <Button>Upgrade plan</Button>
      <Button variant="icon" iconName="ellipsis" ariaLabel="More options" />
    </SpaceBetween>
  );

  return (
    <WidgetContainer
      title="Cost and usage"
      actions={headerActions}
      footerText="Go to Billing and Cost Management"
      footerHref="#/courtyard/billing"
    >
      <SpaceBetween size="m">
        <Box color="text-body-secondary" fontSize="body-m">
          Credits cover your free plan costs. Your access to AWS services will end when credits are depleted or free
          period ends.
        </Box>

        <KeyValuePairs
          columns={2}
          items={[
            {
              label: 'Credits remaining',
              value: (
                <Box fontSize="heading-xl">
                  $100.00{' '}
                  <Box fontSize="body-m" display="inline">
                    USD
                  </Box>
                </Box>
              ),
            },
            {
              label: 'Days remaining',
              value: (
                <Box fontSize="heading-xl">
                  180 days{' '}
                  <Box fontSize="body-s" color="text-body-secondary" display="inline">
                    (Jan 12, 2025)
                  </Box>
                </Box>
              ),
            },
          ]}
        />

        <div style={{ height: 1, backgroundColor: awsui.colorBorderDividerDefault }} />

        <BarChart
          series={[
            {
              title: 'Cost',
              type: 'bar',
              data: COST_DATA,
            },
          ]}
          xDomain={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          yDomain={[0, 10]}
          xTitle=""
          yTitle="Cost ($)"
          xScaleType="categorical"
          height={120}
          hideFilter={true}
          hideLegend={true}
          empty={
            <Box textAlign="center" color="text-body-secondary">
              No data available
            </Box>
          }
          i18nStrings={{
            xTickFormatter: value => String(value),
            yTickFormatter: value => `$${value}`,
          }}
        />
      </SpaceBetween>
    </WidgetContainer>
  );
}
