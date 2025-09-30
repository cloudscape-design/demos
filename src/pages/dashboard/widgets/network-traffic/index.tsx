// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

import {
  commonChartProps,
  dateTimeFormatter,
  lineChartInstructions,
  numberTickFormatter,
  useHighcharts,
} from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { networkTrafficDomain, networkTrafficSeries } from './data';

function NetworkTrafficHeader() {
  return (
    <Header variant="h2" description="Incoming and outgoing network traffic">
      Network traffic
    </Header>
  );
}

export default function NetworkTrafficContent() {
  const highcharts = useHighcharts();
  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      fitHeight={true}
      chartHeight={25}
      series={networkTrafficSeries}
      xAxis={{
        type: 'datetime',
        min: networkTrafficDomain.min,
        max: networkTrafficDomain.max,
        title: 'Time (UTC)',
        valueFormatter: dateTimeFormatter,
      }}
      yAxis={{
        title: 'Data transferred',
        min: 0,
        max: 200000,
        valueFormatter: numberTickFormatter,
      }}
      ariaLabel="Network traffic"
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        chartRoleDescription: `Line chart showing transferred data of all your instances. ${lineChartInstructions}`,
        seriesFilterLabel: 'Filter displayed instances',
        seriesFilterPlaceholder: 'Filter instances',
      }}
      tooltip={{
        point: ({ item }) => ({
          key: (
            <Link external={true} href="#">
              {item.series.name}
            </Link>
          ),
          value: item.y,
        }),
      }}
    />
  );
}
export const networkTraffic: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    icon: 'lineChart',
    title: 'Network traffic',
    description: 'Incoming and outgoing network traffic',
    header: NetworkTrafficHeader,
    content: NetworkTrafficContent,
    staticMinHeight: 560,
  },
};
