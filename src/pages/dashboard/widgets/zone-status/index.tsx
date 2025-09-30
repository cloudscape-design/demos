// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { PieChart } from '@cloudscape-design/chart-components';
import Header from '@cloudscape-design/components/header';
import { colorChartsStatusHigh, colorChartsStatusPositive } from '@cloudscape-design/design-tokens';

import { percentageFormatter, useHighcharts } from '../chart-commons';
import { WidgetConfig } from '../interfaces';

function ZoneStatusHeader() {
  return (
    <Header variant="h2">
      Zone status - <i>beta</i>
    </Header>
  );
}

function ZoneStatusContent() {
  const highcharts = useHighcharts();
  return (
    <PieChart
      highcharts={highcharts}
      fitHeight={true}
      series={{
        type: 'pie',
        name: 'Zone status',
        data: [
          { name: 'Operating normally', y: 18, color: colorChartsStatusPositive },
          { name: 'Disrupted', y: 2, color: colorChartsStatusHigh },
        ],
      }}
      ariaLabel="Zone status chart"
      segmentDescription={({ segmentValue, totalValue }) =>
        `${segmentValue} zones, ${percentageFormatter(segmentValue / totalValue)}`
      }
      tooltip={{
        details: ({ segmentValue, totalValue }) => [
          {
            key: 'Zone count',
            value: segmentValue,
          },
          {
            key: 'Percentage',
            value: percentageFormatter(segmentValue / totalValue),
          },
        ],
      }}
      i18nStrings={{
        chartRoleDescription: 'Pie chart summarizing the status of all zones.',
        seriesFilterLabel: 'Filter displayed data',
        seriesFilterPlaceholder: 'Filter data',
        seriesFilterSelectedAriaLabel: 'selected',
        detailPopoverDismissAriaLabel: 'Dismiss',
        legendAriaLabel: 'Legend',
        segmentRoleDescription: 'segment',
      }}
    />
  );
}

export const zoneStatus: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    icon: 'pieChart',
    title: 'Zone status',
    description: 'Zone status report',
    header: ZoneStatusHeader,
    content: ZoneStatusContent,
    staticMinHeight: 450,
  },
};
