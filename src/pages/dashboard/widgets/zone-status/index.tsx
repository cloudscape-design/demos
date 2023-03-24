// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Header, PieChart, PieChartProps } from '@cloudscape-design/components';
import { colorChartsStatusPositive, colorChartsStatusHigh } from '@cloudscape-design/design-tokens';
import { percentageFormatter } from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { ResponsiveChartContainer } from '../../components/responsive-chart-container';

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

function ZoneStatusHeader() {
  return (
    <Header variant="h2">
      Zone status - <i>beta</i>
    </Header>
  );
}

function getChartSize(height: number): PieChartProps['size'] {
  if (height < 150) {
    return 'small';
  }
  if (height < 300) {
    return 'medium';
  }
  return 'large';
}

function ZoneStatusContent() {
  const hideFilter = true;
  return (
    <ResponsiveChartContainer
      hideFilter={hideFilter}
      render={height => (
        <PieChart
          size={getChartSize(height)}
          data={[
            { title: 'Operating normally', value: 18, color: colorChartsStatusPositive },
            { title: 'Disrupted', value: 2, color: colorChartsStatusHigh },
          ]}
          ariaLabel="Zone status chart"
          ariaDescription="Pie chart summarizing the status of all zones."
          hideFilter={hideFilter}
          segmentDescription={(datum, sum) => `${datum.value} zones, ${percentageFormatter(datum.value / sum)}`}
          detailPopoverContent={(datum, sum) => [
            {
              key: 'Zone count',
              value: datum.value,
            },
            {
              key: 'Percentage',
              value: percentageFormatter(datum.value / sum),
            },
          ]}
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            detailPopoverDismissAriaLabel: 'Dismiss',

            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'pie chart',
            segmentAriaRoleDescription: 'segment',
          }}
        />
      )}
    />
  );
}
