// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Link, StatusIndicator } from '@cloudscape-design/components';
import { Preferences } from '../commons/table-config';
import { baseTableAriaLabels } from '../../i18n-strings';

export const EC2Preferences = props => (
  <Preferences
    pageSizeOptions={[
      { value: 10, label: '10 instances' },
      { value: 30, label: '30 instances' },
      { value: 50, label: '50 instances' },
    ]}
    contentDisplayOptions={[
      { id: 'id', label: 'Instance ID', alwaysVisible: true },
      { id: 'type', label: 'Instance type' },
      { id: 'publicDns', label: 'Public DNS' },
      { id: 'monitoring', label: 'Monitoring' },
      { id: 'state', label: 'Instance state' },
    ]}
    {...props}
  />
);

export const COLUMN_DEFINITIONS_MAIN = [
  {
    id: 'id',
    header: 'Instance ID',
    cell: item => <Link href="#">{item.id}</Link>,
    isRowHeader: true,
  },
  {
    id: 'state',
    header: 'Instance state',
    cell: item => (
      <>
        <StatusIndicator type={item.state === 'Activated' ? 'success' : 'error'}> {item.state} </StatusIndicator>
      </>
    ),
  },
  {
    id: 'type',
    header: 'Instance type',
    cell: item => item.type,
  },
  {
    id: 'publicDns',
    header: 'Public DNS',
    cell: item => item.publicDns,
  },
  {
    id: 'monitoring',
    header: 'Monitoring',
    cell: item => item.monitoring,
  },
];

export const COLUMN_DEFINITIONS_PANEL_CONTENT_SINGLE = [
  {
    id: 'type',
    header: 'Type',
    cell: item => item.type,
    isRowHeader: true,
  },
  {
    id: 'protocol',
    header: 'Protocol',
    cell: item => item.protocol,
  },
  {
    id: 'portRange',
    header: 'Port range',
    cell: item => item.portRange,
  },
  {
    id: 'source',
    header: 'Source',
    cell: item => item.source,
  },
  {
    id: 'description',
    header: 'Description',
    cell: item => item.description,
  },
];

export const SELECTION_LABELS = {
  ...baseTableAriaLabels,
  selectionGroupLabel: 'Instance selection',
};

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  contentDisplay: [
    { id: 'id', visible: true },
    { id: 'type', visible: true },
    { id: 'publicDns', visible: true },
    { id: 'monitoring', visible: true },
    { id: 'state', visible: true },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};
