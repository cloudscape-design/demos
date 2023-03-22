// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import { ResponsiveChartContainer } from '../../components/responsive-chart-container';

const costs: BarChartProps<string>['series'] = [
  {
    type: 'bar',
    title: 'Value',
    data: [
      { x: 'A', y: 170.25 },
      { x: 'B', y: 116.07 },
      { x: 'C', y: 54.19 },
      { x: 'D', y: 15.18 },
      { x: 'E', y: 15.03 },
      { x: 'F', y: 49.85 },
    ],
  },
];

export function BreakdownChart() {
  const hideFilter = true;
  const hideLegend = true;
  return (
    <ResponsiveChartContainer
      hideFilter={hideFilter}
      hideLegend={hideLegend}
      render={height => (
        <BarChart
          hideFilter={hideFilter}
          hideLegend={hideLegend}
          xScaleType="categorical"
          xTitle="Chars"
          yTitle="Numbers"
          series={costs}
          height={height}
        />
      )}
    />
  );
}
