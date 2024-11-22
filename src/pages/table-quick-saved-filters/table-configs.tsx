// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  CollectionPreferences,
  CollectionPreferencesProps,
  Link,
  Badge,
  PropertyFilterProps,
  StatusIndicator,
  TableProps,
  SpaceBetween,
} from '@cloudscape-design/components';
import { EC2Instance } from '../commons/interfaces';

export const tableAriaLabels: TableProps<{ id: string }>['ariaLabels'] = {
  selectionGroupLabel: 'group label',
  itemSelectionLabel: ({ selectedItems }, item) => {
    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
    return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
  },
  tableLabel: 'Instances table',
};

export const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<EC2Instance>[] = [
  {
    id: 'id',
    header: 'Instance ID',
    cell: item => <Link href={`#${item.id}`}>{item.id}</Link>,
    sortingField: 'id',
    minWidth: 200,
    isRowHeader: true,
  },
  {
    id: 'state',
    header: 'State',
    cell: item => {
      switch (item.state) {
        case 'Running':
          return <StatusIndicator type="success">Running</StatusIndicator>;
        case 'Pending':
          return <StatusIndicator type="pending">Pending</StatusIndicator>;
        case 'Stopping':
          return <StatusIndicator type="in-progress">Stopping</StatusIndicator>;
        case 'Stopped':
          return <StatusIndicator type="stopped">Stopped</StatusIndicator>;
        case 'Shutting down':
          return <StatusIndicator type="in-progress">Shutting down</StatusIndicator>;
        case 'Terminated':
          return <StatusIndicator type="stopped">Terminated</StatusIndicator>;
        default:
          return <StatusIndicator type="error">Unknown</StatusIndicator>;
      }
    },
    sortingField: 'state',
  },
  {
    id: 'type',
    header: 'Instance type',
    cell: item => item.type,
    sortingField: 'type',
  },
  {
    id: 'alarm',
    header: 'Alarm state',
    cell: item => (item.alarmState === 'ALARM' ? <Badge color="severity-high">ALARM</Badge> : '-'),
    sortingField: 'alarmState',
  },
  {
    id: 'publicDns',
    header: 'DNS',
    cell: item => item.publicDns,
    sortingField: 'publicDns',
  },
  {
    id: 'averageLatency',
    header: 'Average latency (mb/s)',
    cell: item => item.averageLatency,
    sortingField: 'averageLatency',
  },
  {
    id: 'monitoring',
    header: 'Monitoring',
    cell: item => item.monitoring || '-',
    sortingField: 'monitoring',
  },
  {
    id: 'launchTime',
    header: 'Launch time',
    cell: item => item.launchTime,
    sortingField: 'launchTime',
  },
  {
    id: 'EBSOptimized',
    header: 'EBS optimized',
    cell: item => item.EBSOptimized,
    sortingField: 'EBSOptimized',
  },
  {
    id: 'rootDeviceType',
    header: 'Root device type',
    cell: item => item.rootDeviceType,
    sortingField: 'rootDeviceType',
  },
  {
    id: 'platformDetails',
    header: 'Platform',
    cell: item => item.platformDetails,
    sortingField: 'platformDetails',
  },
  {
    id: 'volume',
    header: 'Volume',
    cell: item => item.volume,
    sortingField: 'volume',
  },
  {
    id: 'numOfvCpu',
    header: 'vCPU number',
    cell: item => item.numOfvCpu,
    sortingField: 'numOfvCpu',
  },
  {
    id: 'availabilityZone',
    header: 'Availability zone',
    cell: item => item.availabilityZone,
    sortingField: 'availabilityZone',
  },
  {
    id: 'loadBalancers',
    header: 'Load balancers',
    minWidth: 250,
    cell: item => (
      <SpaceBetween size="s" direction="horizontal">
        {(item.loadBalancers ?? []).map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </SpaceBetween>
    ),
  },
];

export const filteringProperties: PropertyFilterProps.FilteringProperty[] = [
  {
    key: 'id',
    propertyLabel: 'Instance ID',
    groupValuesLabel: 'Instance ID values',
    operators: ['=', '!='],
  },
  {
    key: 'type',
    propertyLabel: 'Instance type',
    groupValuesLabel: 'Type values',
    operators: [
      { operator: '=', tokenType: 'enum' },
      { operator: '!=', tokenType: 'enum' },
    ],
  },
  {
    key: 'state',
    propertyLabel: 'State',
    groupValuesLabel: 'State values',
    operators: [
      { operator: '=', tokenType: 'enum' },
      { operator: '!=', tokenType: 'enum' },
    ],
  },
  {
    key: 'alarmState',
    propertyLabel: 'Alarm state',
    groupValuesLabel: 'Alarm state values',
    operators: [{ operator: '=', tokenType: 'enum' }],
  },
  {
    key: 'platformDetails',
    propertyLabel: 'Platform',
    groupValuesLabel: 'Platform values',
    operators: [
      { operator: '=', tokenType: 'enum' },
      { operator: '!=', tokenType: 'enum' },
    ],
  },
  {
    key: 'availabilityZone',
    propertyLabel: 'Availability zone',
    groupValuesLabel: 'Availability zone values',
    operators: [
      { operator: '=', tokenType: 'enum' },
      { operator: '!=', tokenType: 'enum' },
    ],
  },
  {
    key: 'numOfvCpu',
    propertyLabel: 'vCPU number',
    groupValuesLabel: 'vCPU number values',
    operators: ['=', '!=', '>', '>=', '<', '<='],
  },
  {
    key: 'averageLatency',
    propertyLabel: 'Average latency (mb / s)',
    groupValuesLabel: 'Average latency values',
    operators: ['>', '>=', '<', '<='],
  },
  {
    key: 'rootDeviceType',
    propertyLabel: 'Root device type',
    groupValuesLabel: 'Root device type values',
    operators: [
      { operator: '=', tokenType: 'enum' },
      { operator: '!=', tokenType: 'enum' },
    ],
  },
  {
    key: 'EBSOptimized',
    propertyLabel: 'EBS optimized',
    groupValuesLabel: 'EBS optimized values',
    operators: [
      { operator: '=', tokenType: 'enum' },
      { operator: '!=', tokenType: 'enum' },
    ],
  },
  {
    key: 'loadBalancers',
    propertyLabel: 'Load balancer',
    groupValuesLabel: 'Load balancer values',
    operators: [
      { operator: '=', tokenType: 'enum', match: ((v: unknown[], t: unknown[]) => checkArrayMatches(v, t)) as any },
      { operator: '!=', tokenType: 'enum', match: ((v: unknown[], t: unknown[]) => !checkArrayMatches(v, t)) as any },
      { operator: ':', tokenType: 'enum', match: ((v: unknown[], t: unknown[]) => checkArrayContains(v, t)) as any },
      { operator: '!:', tokenType: 'enum', match: ((v: unknown[], t: unknown[]) => !checkArrayContains(v, t)) as any },
    ],
  },
];

export function TablePreferences({
  preferences,
  setPreferences,
}: {
  preferences: CollectionPreferencesProps.Preferences;
  setPreferences: (next: CollectionPreferencesProps.Preferences) => void;
}) {
  return (
    <CollectionPreferences
      title="Preferences"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      onConfirm={({ detail }) => setPreferences(detail)}
      preferences={preferences}
      contentDisplayPreference={{
        title: 'Column preferences',
        description: 'Customize the columns visibility and order.',
        options: [
          {
            id: 'id',
            label: 'Instance ID',
            alwaysVisible: true,
          },
          {
            id: 'state',
            label: 'State',
            alwaysVisible: true,
          },
          {
            id: 'type',
            label: 'Instance type',
          },
          {
            id: 'alarm',
            label: 'Alarm state',
          },
          {
            id: 'publicDns',
            label: 'DNS',
          },
          {
            id: 'averageLatency',
            label: 'Average latency',
          },
          {
            id: 'monitoring',
            label: 'Monitoring',
          },
          {
            id: 'rootDeviceType',
            label: 'Root device type',
          },
          {
            id: 'EBSOptimized',
            label: 'EBS optimized',
          },
          {
            id: 'platformDetails',
            label: 'Platform',
          },
          {
            id: 'launchTime',
            label: 'Launch time',
          },
          {
            id: 'volume',
            label: 'Volume',
          },
          {
            id: 'availabilityZone',
            label: 'Availability zone',
          },
          {
            id: 'loadBalancers',
            label: 'Load balancers',
          },
        ],
      }}
      wrapLinesPreference={{
        label: 'Wrap lines',
        description: 'Wrap lines description',
      }}
      stickyColumnsPreference={{
        firstColumns: {
          title: 'First column(s)',
          description: 'Keep the first column(s) visible while horizontally scrolling table content.',
          options: [
            { label: 'None', value: 0 },
            { label: 'First column', value: 1 },
            { label: 'First two columns', value: 2 },
          ],
        },
        lastColumns: {
          title: 'Stick last visible column',
          description: 'Keep the last column visible when tables are wider than the viewport.',
          options: [
            { label: 'Last column', value: 1 },
            { label: 'Last two columns', value: 2 },
          ],
        },
      }}
    />
  );
}

function checkArrayMatches(value: unknown[], token: unknown[]) {
  if (!Array.isArray(value) || !Array.isArray(token) || value.length !== token.length) {
    return false;
  }
  const valuesMap = value.reduce<Map<unknown, number>>(
    (map, value) => map.set(value, (map.get(value) ?? 0) + 1),
    new Map()
  );
  for (const tokenEntry of token) {
    const count = valuesMap.get(tokenEntry);
    if (count) {
      count === 1 ? valuesMap.delete(tokenEntry) : valuesMap.set(tokenEntry, count - 1);
    } else {
      return false;
    }
  }
  return valuesMap.size === 0;
}

function checkArrayContains(value: unknown[], token: unknown[]) {
  if (!Array.isArray(value) || !Array.isArray(token)) {
    return false;
  }
  const valuesSet = new Set(value);
  for (const tokenEntry of token) {
    if (!valuesSet.has(tokenEntry)) {
      return false;
    }
  }
  return true;
}
