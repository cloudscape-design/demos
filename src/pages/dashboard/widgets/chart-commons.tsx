// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box } from '@cloudscape-design/components';

export const percentageFormatter = (value: number) => `${(value * 100).toFixed(0)}%`;

const numberTickFormatter = (value: number) => {
  if (Math.abs(value) < 1000) {
    return value.toString();
  }
  return (value / 1000).toFixed() + 'k';
};

export const dateTimeFormatter = (date: Date) =>
  date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    .split(',')
    .join('\n');

export const dateFormatter = (date: Date) =>
  date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour12: false,
    })
    .split(' ')
    .join('\n');

export const commonChartProps = {
  loadingText: 'Loading chart',
  errorText: 'Error loading data.',
  recoveryText: 'Retry',
  empty: (
    <Box textAlign="center" color="inherit">
      <b>No data available</b>
      <Box variant="p" color="inherit">
        There is no data available
      </Box>
    </Box>
  ),
  noMatch: (
    <Box textAlign="center" color="inherit">
      <b>No matching data</b>
      <Box variant="p" color="inherit">
        There is no matching data to display
      </Box>
    </Box>
  ),
  i18nStrings: {
    filterLabel: 'Filter displayed data',
    filterPlaceholder: 'Filter data',
    filterSelectedAriaLabel: 'selected',
    legendAriaLabel: 'Legend',
    chartAriaRoleDescription: 'line chart',
    xAxisAriaRoleDescription: 'x axis',
    yAxisAriaRoleDescription: 'y axis',
    yTickFormatter: numberTickFormatter,
  },
};

export const lineChartInstructions =
  'Use up/down arrow keys to navigate between series, and left/right arrow keys to navigate within a series.';

export const barChartInstructions = 'Use left/right arrow keys to navigate between data groups.';
