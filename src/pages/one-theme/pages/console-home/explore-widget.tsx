// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import type { SelectProps } from '@cloudscape-design/components/select';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';

import { WidgetContainer } from './widget-container';

interface Activity {
  name: string;
  reward: string;
  status: 'Complete' | 'Expiring';
}

const ACTIVITIES: Activity[] = [
  { name: 'Launch an instance using EC2', reward: '$20', status: 'Expiring' },
  { name: 'Use a foundation model in the Amazon Bedrock', reward: '$20', status: 'Complete' },
  { name: 'Build a serverless web app using AWS Lambda', reward: '$20', status: 'Complete' },
  { name: 'Set up a cost budget using AWS Budgets', reward: '$20', status: 'Complete' },
  { name: 'Create an Amazon RDS Database', reward: '$20', status: 'Complete' },
];

const FILTER_OPTIONS: SelectProps.Option[] = [
  {
    value: 'earn-credits',
    label: 'Earn AWS credits',
    description: 'Complete activities to earn AWS credits',
  },
];

function StatusCell({ status }: { status: Activity['status'] }) {
  return <StatusIndicator type={status === 'Complete' ? 'success' : 'error'}>{status}</StatusIndicator>;
}

export function ExploreWidget() {
  const [selectedFilter, setSelectedFilter] = useState<SelectProps.Option>(FILTER_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <WidgetContainer title="Explore AWS">
      <SpaceBetween size="m">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Select
            selectedOption={selectedFilter}
            onChange={({ detail }) => setSelectedFilter(detail.selectedOption)}
            options={FILTER_OPTIONS}
            placeholder="Filter"
            ariaLabel="Filter activities"
            inlineLabelText="Filter"
            triggerVariant="option"
          />
          <Pagination
            currentPageIndex={currentPage}
            pagesCount={3}
            onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber}`,
            }}
          />
        </div>

        <KeyValuePairs
          columns={2}
          items={[
            {
              label: 'Activities completed',
              value: <Box fontSize="heading-l">4 of 5</Box>,
            },
            {
              label: 'Total credits earned',
              value: (
                <Box fontSize="heading-l">
                  $80 of 100{' '}
                  <Box display="inline" fontSize="body-s">
                    USD
                  </Box>
                </Box>
              ),
            },
          ]}
        />

        <Table
          variant="borderless"
          items={ACTIVITIES}
          columnDefinitions={[
            {
              id: 'activity',
              header: 'Activity',
              cell: item => <Link href="#">{item.name}</Link>,
              sortingField: 'name',
              width: '60%',
            },
            {
              id: 'reward',
              header: 'Reward',
              cell: item => item.reward,
              width: '20%',
            },
            {
              id: 'status',
              header: 'Status',
              cell: item => <StatusCell status={item.status} />,
              sortingField: 'status',
              width: '20%',
            },
          ]}
        />
      </SpaceBetween>
    </WidgetContainer>
  );
}
