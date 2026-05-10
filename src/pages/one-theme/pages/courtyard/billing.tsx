// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import * as awsui from '@cloudscape-design/design-tokens';

const SPEND_BY_WORKSPACE = [
  { workspace: 'starter-home-alice', mtd: 24.18, limit: 50, lastMonth: 31.4 },
  { workspace: 'prototyping', mtd: 12.04, limit: 25, lastMonth: 18.9 },
  { workspace: 'team-sandbox', mtd: 0, limit: 10, lastMonth: 2.1 },
  { workspace: 'analytics-ws', mtd: 0, limit: 0, lastMonth: 0 },
];

const SPEND_TREND = [
  { x: 'Dec', y: 48.2 },
  { x: 'Jan', y: 52.3 },
  { x: 'Feb', y: 40.1 },
  { x: 'Mar', y: 56.7 },
  { x: 'Apr', y: 38.5 },
  { x: 'May', y: 36.22 },
];

function BalanceCard() {
  return (
    <Container
      fitHeight={true}
      header={
        <Header
          description="Your balance for the current billing cycle"
          actions={
            <Link href="#" variant="primary">
              View history
            </Link>
          }
        >
          Balance
        </Header>
      }
      footer={
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <Box color="text-body-secondary">Visa •••• 4242</Box>
          <Link href="#">Manage payment</Link>
        </SpaceBetween>
      }
    >
      <KeyValuePairs
        columns={1}
        items={[
          {
            label: 'Amount due',
            value: (
              <Box variant="h1">
                <span style={{ color: awsui.colorTextAccent }}>$36.22</span> USD
              </Box>
            ),
          },
        ]}
      />
    </Container>
  );
}

function ChargesSummary() {
  return (
    <Container header={<Header>Charges for the current billing period</Header>}>
      <SpaceBetween size="m">
        <ColumnLayout columns={3} variant="text-grid">
          <SpaceBetween size="xxs">
            <Box variant="awsui-key-label">Month-to-date</Box>
            <Box fontSize="heading-xl" fontWeight="bold">
              $36.22
            </Box>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box variant="awsui-key-label">Forecast</Box>
            <Box fontSize="heading-xl" fontWeight="bold">
              $48.50
            </Box>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box variant="awsui-key-label">Previous month</Box>
            <Box fontSize="heading-xl" fontWeight="bold">
              $52.40
            </Box>
          </SpaceBetween>
        </ColumnLayout>
        <BarChart
          series={[{ title: 'Total cost', type: 'bar', data: SPEND_TREND }]}
          xDomain={SPEND_TREND.map(p => p.x)}
          yDomain={[0, 60]}
          xTitle="Month"
          yTitle="Cost ($)"
          xScaleType="categorical"
          height={160}
          hideFilter={true}
          hideLegend={true}
          i18nStrings={{
            xTickFormatter: v => String(v),
            yTickFormatter: v => `$${v}`,
          }}
        />
      </SpaceBetween>
    </Container>
  );
}

export default function BillingPage() {
  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button>Upgrade plan</Button>
            <Button variant="primary">Redeem credit</Button>
          </SpaceBetween>
        }
      >
        Billing
      </Header>

      <Grid gridDefinition={[{ colspan: { default: 12, s: 3 } }, { colspan: { default: 12, s: 9 } }]}>
        <BalanceCard />
        <ChargesSummary />
      </Grid>

      <Table
        header={<Header counter={`(${SPEND_BY_WORKSPACE.length})`}>Spend by project account</Header>}
        items={SPEND_BY_WORKSPACE}
        trackBy="workspace"
        columnDefinitions={[
          {
            id: 'workspace',
            header: 'Project account',
            cell: item => <Link href="#">{item.workspace}</Link>,
            sortingField: 'workspace',
          },
          {
            id: 'mtd',
            header: 'Month-to-date spend',
            cell: item => `$${item.mtd.toFixed(2)}`,
            sortingField: 'mtd',
          },
          {
            id: 'progress',
            header: 'Progress vs. spend limit',
            cell: item =>
              item.limit > 0 ? (
                <ProgressBar
                  value={(item.mtd / item.limit) * 100}
                  additionalInfo={`$${item.mtd.toFixed(2)} / $${item.limit.toFixed(2)}`}
                />
              ) : (
                <Box color="text-body-secondary">No limit set</Box>
              ),
          },
          {
            id: 'lastMonth',
            header: 'Last month',
            cell: item => `$${item.lastMonth.toFixed(2)}`,
            sortingField: 'lastMonth',
          },
        ]}
      />
    </SpaceBetween>
  );
}
