// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useContainerQuery } from '@cloudscape-design/component-toolkit';
import styles from './styles.module.scss';

interface ResponsiveChartContainerProps {
  hideFilter?: boolean;
  hideLegend?: boolean;
  render: (availableHeight: number) => React.ReactNode;
}

// approximate values
const chartMargins = 100;
const filterHeight = 75;
const legendHeight = 60;

export function ResponsiveChartContainer({ render, hideFilter, hideLegend }: ResponsiveChartContainerProps) {
  const [availableHeight, ref] = useContainerQuery(rect => rect.borderBoxHeight);
  return (
    <div ref={ref} className={styles.measureRoot}>
      <div className={styles.content}>
        {availableHeight
          ? render(availableHeight - chartMargins - (hideLegend ? 0 : legendHeight) - (hideFilter ? 0 : filterHeight))
          : null}
      </div>
    </div>
  );
}
