// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Container, Header, LineChart } from '@cloudscape-design/components';
import {
  commonChartProps,
  networkTrafficSeries,
  dateTimeFormatter,
  lineChartInstructions,
  networkTrafficDomain,
} from './common';

export default function NetworkTraffic() {
  return (
    <Container
      className="custom-dashboard-container"
      header={
        <Header variant="h2" description="Incoming and outgoing network traffic">
          Network traffic
        </Header>
      }
    >
      <LineChart
        {...commonChartProps}
        height={220}
        series={networkTrafficSeries}
        yDomain={[0, 200000]}
        xDomain={networkTrafficDomain}
        xScaleType="time"
        xTitle="Time (UTC)"
        yTitle="Data transferred"
        ariaLabel="Network traffic"
        ariaDescription={`Line chart showing transferred data of all your instances. ${lineChartInstructions}`}
        i18nStrings={{
          ...commonChartProps.i18nStrings,
          filterLabel: 'Filter displayed instances',
          filterPlaceholder: 'Filter instances',
          xTickFormatter: dateTimeFormatter,
        }}
      />
    </Container>
  );
}
