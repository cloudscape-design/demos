// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import Divider from '@cloudscape-design/components/divider';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import List from '@cloudscape-design/components/list';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Steps from '@cloudscape-design/components/steps';

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

function getDaysAgoLabel(daysAgo: number): string {
  if (daysAgo === 0) {
    return 'Today';
  }
  if (daysAgo === 1) {
    return 'Yesterday';
  }
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="chat-date-separator">
      <Divider />
      <Box color="text-body-secondary" fontSize="body-s">
        <span className="chat-date-separator__label">{label}</span>
      </Box>
      <Divider />
    </div>
  );
}

export interface ConversationItem {
  id: string;
  title: string;
  description: string;
  href: string;
  timestamp: string;
}

export interface ConversationGroup {
  label: string;
  items: ConversationItem[];
}

export const conversationGroups: ConversationGroup[] = [
  {
    label: getDaysAgoLabel(0),
    items: [
      {
        id: 't-1',
        title: 'EC2 instance optimization',
        description: 'Analyzing compute resources and cost efficiency.',
        href: '#/c/t-1',
        timestamp: '5:02pm',
      },
      {
        id: 't-2',
        title: 'Monthly cost analysis',
        description: 'Reviewing AWS spending patterns and trends.',
        href: '#/c/t-2',
        timestamp: '4:42pm',
      },
      {
        id: 't-3',
        title: 'VPC network configuration',
        description: 'Setting up secure network architecture.',
        href: '#/c/t-3',
        timestamp: '3:14pm',
      },
      {
        id: 't-4',
        title: 'Lambda function deployment',
        description: 'Automating serverless application workflows.',
        href: '#/c/t-4',
        timestamp: '2:11pm',
      },
      {
        id: 't-5',
        title: 'S3 bucket security audit',
        description: 'Implementing encryption and access controls.',
        href: '#/c/t-5',
        timestamp: '6:41pm',
      },
    ],
  },
  {
    label: getDaysAgoLabel(3),
    items: [
      {
        id: 'y-1',
        title: 'CloudWatch monitoring setup',
        description: 'Configuring alerts and dashboards.',
        href: '#/c/y-1',
        timestamp: '11:21pm',
      },
      {
        id: 'y-2',
        title: 'IAM policy configuration',
        description: 'Defining user permissions and access controls.',
        href: '#/c/y-2',
        timestamp: '10:32am',
      },
      {
        id: 'y-3',
        title: 'RDS database migration',
        description: 'Planning data transfer strategy.',
        href: '#/c/y-3',
        timestamp: '9:14am',
      },
    ],
  },
];

export const conversationCount = 33;

const conversationFilterOptions: SelectProps.Options = [
  { value: 'all', label: 'Choose an option' },
  { value: 'today', label: getDaysAgoLabel(0) },
  { value: 'older', label: getDaysAgoLabel(3) },
  { value: 'week', label: 'Past 7 days' },
];

const conversationActions = [
  { id: 'share', text: 'Share' },
  { id: 'rename', text: 'Rename' },
  { id: 'delete', text: 'Delete' },
];

function getVisibleConversationGroups(filterValue: string): ConversationGroup[] {
  switch (filterValue) {
    case 'today':
      return conversationGroups.filter(g => g.label === getDaysAgoLabel(0));
    case 'older':
      return conversationGroups.filter(g => g.label === getDaysAgoLabel(3));
    default:
      return conversationGroups;
  }
}

export function ConversationsList({ onNewChat }: { onNewChat?: () => void }) {
  const [selectedFilter, setSelectedFilter] = useState<SelectProps.Option>(
    conversationFilterOptions[0] as SelectProps.Option,
  );
  const visibleGroups = getVisibleConversationGroups(selectedFilter.value ?? 'all');

  return (
    <SpaceBetween size="s">
      <Header
        counter={`(${conversationCount})`}
        actions={onNewChat && <Button iconName="add-plus" variant="icon" ariaLabel="New chat" onClick={onNewChat} />}
      >
        Conversation history
      </Header>

      <Select
        selectedOption={selectedFilter}
        onChange={({ detail }) => setSelectedFilter(detail.selectedOption)}
        options={conversationFilterOptions}
        inlineLabelText="Filter"
        placeholder="Choose an option"
      />

      {visibleGroups.map(group => (
        <React.Fragment key={group.label}>
          <DateSeparator label={group.label} />
          <List
            ariaLabel={`${group.label} conversations`}
            items={group.items}
            disablePaddings
            renderItem={item => ({
              id: item.id,
              content: (
                <Link href={item.href} variant="secondary">
                  {item.title}
                </Link>
              ),
              secondaryContent: (
                <Box color="text-body-secondary" fontSize="body-s">
                  {item.description}
                </Box>
              ),
              actions: (
                <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                  <Box color="text-body-secondary" fontSize="body-s">
                    {item.timestamp}
                  </Box>
                  <ButtonDropdown
                    variant="icon"
                    ariaLabel={`Actions for ${item.title}`}
                    expandToViewport={true}
                    items={conversationActions}
                  />
                </SpaceBetween>
              ),
            })}
          />
        </React.Fragment>
      ))}

      <Divider />
      <Box textAlign="center">
        <Button variant="link">View more</Button>
      </Box>
    </SpaceBetween>
  );
}

interface EventLogEntry {
  time: string;
  text: string;
}

interface EventLogGroup {
  label: string;
  entries: EventLogEntry[];
}

const eventLogData: EventLogGroup[] = [
  {
    label: getDaysAgoLabel(1),
    entries: [
      { time: '2:34:01 PM', text: 'Initializing workspace environment' },
      { time: '2:34:05 PM', text: 'Reading project configuration file' },
      { time: '2:34:20 PM', text: 'Parsing package.json dependencies' },
      { time: '2:35:08 PM', text: 'Creating src directory structure' },
      { time: '2:35:40 PM', text: 'Installing npm dependencies' },
      { time: '2:37:42 PM', text: 'Dependency installation complete' },
      { time: '2:37:59 PM', text: 'Generating TypeScript configuration' },
      { time: '2:38:12 PM', text: 'Writing App.tsx component' },
      { time: '2:38:28 PM', text: 'Creating TodoList component file' },
      { time: '2:39:38 PM', text: 'Adding CSS module styles' },
      { time: '2:39:51 PM', text: 'Writing unit test for TodoList' },
    ],
  },
  {
    label: getDaysAgoLabel(0),
    entries: [
      { time: '9:12:04 AM', text: 'Running ESLint on source files' },
      { time: '9:12:12 AM', text: 'Lint check passed' },
      { time: '9:12:18 AM', text: 'Compiling TypeScript to JavaScript' },
      { time: '9:13:22 AM', text: 'Build failed: missing type export' },
      { time: '9:14:30 AM', text: 'Fixing type export in index.ts' },
      { time: '9:15:49 AM', text: 'Rebuilding project' },
      { time: '9:16:04 AM', text: 'Build completed successfully' },
    ],
  },
];

const eventLogFilterOptions: SelectProps.Options = [
  { value: 'all', label: 'Choose an option' },
  { value: 'yesterday', label: getDaysAgoLabel(1) },
  { value: 'today', label: getDaysAgoLabel(0) },
  { value: 'week', label: 'Past 7 days' },
];

export function EventLog() {
  const [selectedFilter, setSelectedFilter] = useState<SelectProps.Option>(
    eventLogFilterOptions[0] as SelectProps.Option,
  );

  const visibleGroups =
    selectedFilter.value === 'all' || selectedFilter.value === 'week'
      ? eventLogData
      : eventLogData.filter(g => {
          if (selectedFilter.value === 'today') {
            return g.label === getDaysAgoLabel(0);
          }
          if (selectedFilter.value === 'yesterday') {
            return g.label === getDaysAgoLabel(1);
          }
          return true;
        });

  return (
    <SpaceBetween size="s">
      <Select
        selectedOption={selectedFilter}
        onChange={({ detail }) => setSelectedFilter(detail.selectedOption)}
        options={eventLogFilterOptions}
        inlineLabelText="Filter"
        placeholder="Choose an option"
      />

      {visibleGroups.map(group => (
        <React.Fragment key={group.label}>
          <DateSeparator label={group.label} />
          <Steps
            ariaLabel={`${group.label} events`}
            steps={group.entries.map(entry => ({
              status: 'log' as const,
              annotation: entry.time,
              header: entry.text,
            }))}
          />
        </React.Fragment>
      ))}
    </SpaceBetween>
  );
}
