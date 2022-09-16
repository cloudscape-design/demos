// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Container, Header, PieChart } from '@cloudscape-design/components';
import { colorChartsStatusPositive, colorChartsStatusHigh } from '@cloudscape-design/design-tokens';
import { percentageFormatter } from './common';

export default function ZoneStatus() {
  return (
    <Container
      className="custom-dashboard-container"
      header={
        <Header variant="h2">
          Zone status - <i>beta</i>
        </Header>
      }
    >
      <PieChart
        size="medium"
        data={[
          { title: 'Operating normally', value: 18, color: colorChartsStatusPositive },
          { title: 'Disrupted', value: 2, color: colorChartsStatusHigh },
        ]}
        ariaLabel="Zone status chart"
        ariaDescription="Pie chart summarizing the status of all zones."
        hideFilter={true}
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
    </Container>
  );
}
