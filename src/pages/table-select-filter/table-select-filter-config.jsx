// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusComponent } from './table-select-filter-components';
import { Link, Box } from '@cloudscape-design/components';
import { createTableSortLabelFn } from '../../i18n-strings';

const rawColumns = [
  {
    id: 'id',
    header: 'DB instance',
    cell: item => <Link href="#">{item.id}</Link>,
    sortingComparator: (item1, item2) => item1.id.substring(13, item2.length) - item2.id.substring(13, item1.length),
  },
  {
    id: 'status',
    header: 'Status',
    cell: item => <StatusComponent status={item.status} />,
    sortingField: 'status',
  },
  {
    id: 'engine',
    header: 'Engine',
    cell: item => item.engine,
    sortingField: 'engine',
  },
  {
    id: 'version',
    header: 'Engine version',
    cell: item => item.version,
    sortingField: 'version',
  },
  {
    id: 'activity',
    header: 'Active connections',
    cell: item => <Box textAlign="right">{item.activity}</Box>,
    sortingField: 'activity',
  },
  {
    id: 'maint',
    header: 'Maintenance',
    cell: item => item.maint,
    sortingField: 'maint',
  },
  {
    id: 'class',
    header: 'Class',
    cell: item => item.class,
    sortingField: 'class',
  },
  {
    id: 'zone',
    header: 'Zone',
    cell: item => item.zone,
    sortingField: 'zone',
  },
  {
    id: 'iops',
    header: 'IOPS',
    cell: item => <Box textAlign="right">{item.iops}</Box>,
    sortingField: 'iops',
  },
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({ ...column, ariaLabel: createTableSortLabelFn(column) }));

export const SEARCHABLE_COLUMNS = ['id', 'engine', 'version', 'status', 'class', 'activity', 'zone', 'iops', 'maint'];

export const CONTENT_DISPLAY_OPTIONS = [
  { id: 'id', label: 'DB instance', alwaysVisible: true },
  { id: 'status', label: 'Status' },
  { id: 'engine', label: 'Engine' },
  { id: 'version', label: 'Engine version' },
  { id: 'activity', label: 'Active connections' },
  { id: 'maint', label: 'Maintenance' },
  { id: 'class', label: 'Class' },
  { id: 'zone', label: 'Zone' },
  { id: 'iops', label: 'IOPS' },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Instances' },
  { value: 30, label: '30 Instances' },
  { value: 50, label: '50 Instances' },
];
