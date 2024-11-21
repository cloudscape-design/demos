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
    cell: item => (item.inAlarm ? <Badge color="severity-high">ALARM</Badge> : '-'),
    sortingField: 'inAlarm',
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
    id: 'isEBSOptimized',
    header: 'EBS optimized',
    cell: item => (item.isEBSOptimized ? 'Yes' : 'No'),
    sortingField: 'isEBSOptimized',
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
];

export const filteringProperties: PropertyFilterProps.FilteringProperty[] = [
  {
    key: 'id',
    propertyLabel: 'Instance ID',
    groupValuesLabel: 'Instance ID values',
    operators: ['=', ':'],
  },
  {
    key: 'type',
    propertyLabel: 'Instance type',
    groupValuesLabel: 'Type values',
    operators: ['=', '!='],
  },
  {
    key: 'state',
    propertyLabel: 'State',
    groupValuesLabel: 'State values',
    operators: ['=', '!='],
  },
  {
    key: 'inAlarm',
    propertyLabel: 'Alarm state',
    groupValuesLabel: 'Alarm state values',
    operators: ['='],
  },
  {
    key: 'platformDetails',
    propertyLabel: 'Platform',
    groupValuesLabel: 'Platform values',
    operators: ['=', '!='],
  },
  {
    key: 'availabilityZone',
    propertyLabel: 'Availability zone',
    groupValuesLabel: 'availabilityZone values',
    operators: ['=', ':', '!=', '!:'],
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
    operators: ['=', '!=', '>', '>=', '<', '<='],
  },
  {
    key: 'rootDeviceType',
    propertyLabel: 'Root device typer',
    groupValuesLabel: 'Root device type values',
    operators: ['=', '!='],
  },
  {
    key: 'isEBSOptimized',
    propertyLabel: 'EBS optimized',
    groupValuesLabel: 'EBS optimized values',
    operators: ['='],
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
            id: 'isEBSOptimized',
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
