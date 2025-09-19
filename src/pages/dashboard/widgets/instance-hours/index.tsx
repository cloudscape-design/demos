// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

import {
  barChartInstructions,
  commonChartProps,
  dateFormatter,
  numberTickFormatter,
  useHighcharts,
} from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { cpuData, cpuSeries } from './data';

function InstanceHoursHeader() {
  return (
    <Header variant="h2" description="Daily instance hours by instance type">
      Instance hours
    </Header>
  );
}

function InstanceHoursContent() {
  const highcharts = useHighcharts();
  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      stacking="normal"
      fitHeight={true}
      chartHeight={25}
      xAxis={{
        type: 'category',
        title: 'Date',
        categories: cpuData.map(datum => dateFormatter(datum.date)),
      }}
      yAxis={{ title: 'Total instance hours', min: 0, max: 2000, valueFormatter: numberTickFormatter }}
      ariaLabel="Instance hours"
      series={cpuSeries}
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        chartRoleDescription: `Bar chart showing total instance hours per instance type over the last 15 days. ${barChartInstructions}`,
        seriesFilterLabel: 'Filter displayed instance types',
        seriesFilterPlaceholder: 'Filter instance types',
      }}
      tooltip={{
        point: ({ item }) => ({
          key: item.series.name,
          value: (
            <Link
              external={true}
              href="#"
              ariaLabel={`See details for ${item.y} hours on ${item.series.name} (opens in a new tab)`}
            >
              {item.y}
            </Link>
          ),
        }),
      }}
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
