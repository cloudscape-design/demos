// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Header, PieChart } from '@cloudscape-design/components';
import { colorChartsStatusPositive, colorChartsStatusHigh } from '@cloudscape-design/design-tokens';
import { percentageFormatter } from '../chart-commons';
import { WidgetConfig } from '../interfaces';

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

function ZoneStatusContent() {
  return (
    <PieChart
      hideFilter={true}
      fitHeight={true}
      size="small"
      data={[
        { title: 'Operating normally', value: 18, color: colorChartsStatusPositive },
        { title: 'Disrupted', value: 2, color: colorChartsStatusHigh },
      ]}
      ariaLabel="Zone status chart"
      ariaDescription="Pie chart summarizing the status of all zones."
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
  );
}
