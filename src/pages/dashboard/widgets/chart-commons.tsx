// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import type Highcharts from 'highcharts';

import { CartesianChartProps } from '@cloudscape-design/chart-components';
import Box from '@cloudscape-design/components/box';

export const percentageFormatter = (value: number) => `${(value * 100).toFixed(0)}%`;

export const numberTickFormatter = (value: number | null) => {
  if (value === null) {
    return '';
  }
  if (Math.abs(value) < 1000) {
    return value.toString();
  }
  return (value / 1000).toFixed() + 'k';
};

export const dateTimeFormatter = (date: number | null) =>
  date
    ? new Date(date)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        })
        .split(',')
        .join('\n')
    : '';

export const dateFormatter = (date: number | null) =>
  date
    ? new Date(date)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour12: false,
        })
        .split(' ')
        .join('\n')
    : '';

export const commonChartProps: Omit<CartesianChartProps, 'highcharts' | 'series'> = {
  noData: {
    statusType: 'finished',
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
  },
  i18nStrings: {
    loadingText: 'Loading chart',
    errorText: 'Error loading data.',
    recoveryText: 'Retry',
    seriesFilterLabel: 'Filter displayed data',
    seriesFilterPlaceholder: 'Filter data',
    seriesFilterSelectedAriaLabel: 'selected',
    legendAriaLabel: 'Legend',
    xAxisRoleDescription: 'x axis',
    yAxisRoleDescription: 'y axis',
  },
};

export const lineChartInstructions =
  'Use up/down arrow keys to navigate between series, and left/right arrow keys to navigate within a series.';

export const barChartInstructions = 'Use left/right arrow keys to navigate between data groups.';

export const useHighcharts = () => {
  const [highcharts, setHighcharts] = useState<typeof Highcharts | null>(null);
  useEffect(() => {
    const load = async () => {
      const importedHighcharts = await import('highcharts');
      await import('highcharts/modules/accessibility');
      await import('highcharts/highcharts-more');
      setHighcharts(importedHighcharts);
    };
    load();
  }, []);
  return highcharts;
};
