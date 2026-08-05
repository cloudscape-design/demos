// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Box from '@cloudscape-design/components/box';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { DemoPrompt, ScriptedResponse } from '../chat-common/scripted-responses';
import SuggestionPrompts from '../chat-common/suggestion-prompts';
import { getCustomSuggestionButtonStyle } from './custom-theme-styles';
import { useDarkMode } from './use-chat-theme';

// Sortable comparison table (custom demo only).
interface InstanceRow {
  type: string;
  vcpus: number;
  memoryGiB: number;
  pricePerHour: number;
}

const instanceRows: InstanceRow[] = [
  { type: 't3.micro', vcpus: 2, memoryGiB: 1, pricePerHour: 0.0104 },
  { type: 't3.small', vcpus: 2, memoryGiB: 2, pricePerHour: 0.0208 },
  { type: 'c5.large', vcpus: 2, memoryGiB: 4, pricePerHour: 0.085 },
  { type: 'm5.large', vcpus: 2, memoryGiB: 8, pricePerHour: 0.096 },
  { type: 'r5.large', vcpus: 2, memoryGiB: 16, pricePerHour: 0.126 },
  { type: 'm5.xlarge', vcpus: 4, memoryGiB: 16, pricePerHour: 0.192 },
];

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<InstanceRow>> = [
  { id: 'type', header: 'Instance type', cell: item => item.type, sortingField: 'type', isRowHeader: true },
  { id: 'vcpus', header: 'vCPUs', cell: item => item.vcpus, sortingField: 'vcpus' },
  { id: 'memory', header: 'Memory (GiB)', cell: item => item.memoryGiB, sortingField: 'memoryGiB' },
  {
    id: 'price',
    header: 'Price / hour (USD)',
    cell: item => `$${item.pricePerHour.toFixed(4)}`,
    sortingField: 'pricePerHour',
  },
];

const ComparisonTable: React.FC = () => {
  // Sorting via the collection hook so column headers sort reliably.
  const { items, collectionProps } = useCollection(instanceRows, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
  });

  return (
    <Table
      variant="embedded"
      items={items}
      columnDefinitions={columnDefinitions}
      {...collectionProps}
      ariaLabels={{ tableLabel: 'EC2 instance comparison' }}
    />
  );
};

// Scripted response + greeting entry (custom demo only)

// Wrapper that resolves dark-mode at render time and passes the custom button style to SuggestionPrompts.
function CustomSuggestionPrompts({
  items,
  onSelect,
}: {
  items: readonly { id: string; text: string }[];
  onSelect: (text: string) => void;
}) {
  const isDark = useDarkMode();
  return <SuggestionPrompts items={items} onSelect={onSelect} buttonStyle={getCustomSuggestionButtonStyle(isDark)} />;
}

export const comparisonTableResponse: ScriptedResponse = {
  match: ['comparison table', 'compare instances', 'compare ec2', 'sortable table'],
  build: (_timestamp, sendAsUser) => ({
    content: (
      <Box variant="p">
        Here&apos;s a comparison of common EC2 instance types. Select any column header to sort — try sorting by price
        or memory.
      </Box>
    ),
    contentToCopy:
      'EC2 instance comparison: t3.micro, t3.small, c5.large, m5.large, r5.large, m5.xlarge (sortable by vCPUs, memory, and price).',
    extraMessages: [{ type: 'artifact', content: <ComparisonTable /> }],
    supportPrompts: (
      <CustomSuggestionPrompts
        items={[
          { id: 'artifacts', text: 'Show artifact previews' },
          { id: 'thinking', text: 'Show thinking' },
        ]}
        onSelect={sendAsUser}
      />
    ),
  }),
};

export const comparisonTableDemoPrompt: DemoPrompt = {
  prompt: 'Show a comparison table',
  label: 'Comparison table (sortable)',
};
