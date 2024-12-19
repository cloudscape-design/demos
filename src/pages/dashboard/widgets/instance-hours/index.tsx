// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

import { barChartInstructions, commonChartProps, dateFormatter } from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { cpuDomain, cpuSeries } from './data';

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
      detailPopoverSeriesContent={({ series, y }) => ({
        key: series.title,
        value: (
          <Link
            external={true}
            href="#"
            ariaLabel={`See details for ${y} hours on ${series.title} (opens in a new tab)`}
          >
            {y}
          </Link>
        ),
      })}
    />
  );
}
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
