// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { BarChart, Header } from '@cloudscape-design/components';
import { commonChartProps, dateFormatter, barChartInstructions } from '../chart-commons';
import { cpuSeries, cpuDomain } from './data';
import { WidgetConfig } from '../interfaces';

export const instanceHours: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    icon: 'barChart',
    title: 'Instance hours',
    description: 'Daily instance hours by instance type',
    header: InstanceHoursHeader,
    content: InstanceHoursContent,
    staticMinHeight: 560,
  },
};

function InstanceHoursHeader() {
  return (
    <Header variant="h2" description="Daily instance hours by instance type">
      Instance hours
    </Header>
  );
}

function InstanceHoursContent() {
  return (
    <BarChart
      {...commonChartProps}
      fitHeight={true}
      height={25}
      yDomain={[0, 2000]}
      xDomain={cpuDomain}
      xScaleType="categorical"
      stackedBars={true}
      hideFilter={true}
      series={cpuSeries}
      xTitle="Date"
      yTitle="Total instance hours"
      ariaLabel="Instance hours"
      ariaDescription={`Bar chart showing total instance hours per instance type over the last 15 days. ${barChartInstructions}`}
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        filterLabel: 'Filter displayed instance types',
        filterPlaceholder: 'Filter instance types',
        xTickFormatter: dateFormatter,
      }}
    />
  );
}
