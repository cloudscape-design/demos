// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Link from '@cloudscape-design/components/link';

import { commonChartProps, dateTimeFormatter, lineChartInstructions } from '../chart-commons';
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
  return (
    <LineChart
      {...commonChartProps}
      hideFilter={true}
      fitHeight={true}
      height={25}
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
      detailPopoverSeriesContent={({ series, y }) => ({
        key: (
          <Link external={true} href="#">
            {series.title}
          </Link>
        ),
        value: y,
      })}
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
