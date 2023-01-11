// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusIndicator, Link } from '@cloudscape-design/components';
import { addColumnSortLabels } from '../../common/labels';
import { DateTimeForm, formatDateTime } from './table-date-filter-forms';

export const COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: 'id',
    sortingField: 'id',
    header: 'Distribution ID',
    cell: item => (
      <div>
        <Link href="#">{item.id}</Link>
      </div>
    ),
    minWidth: 180,
  },
  {
    id: 'state',
    sortingField: 'state',
    header: 'State',
    cell: item => (
      <StatusIndicator type={item.state === 'Deactivated' ? 'error' : 'success'}>{item.state}</StatusIndicator>
    ),
    minWidth: 120,
  },
  {
    id: 'domainName',
    sortingField: 'domainName',
    cell: item => item.domainName,
    header: 'Domain name',
    minWidth: 160,
  },
  {
    id: 'createdAt',
    sortingField: 'createdAt',
    cell: item => item.date.toISOString(),
    header: 'Created at',
    minWidth: 240,
  },
  {
    id: 'deliveryMethod',
    sortingField: 'deliveryMethod',
    header: 'Delivery method',
    cell: item => item.deliveryMethod,
    minWidth: 100,
  },
  {
    id: 'priceClass',
    sortingField: 'priceClass',
    header: 'Price class',
    cell: item => item.priceClass,
    minWidth: 100,
  },
  {
    id: 'sslCertificate',
    sortingField: 'sslCertificate',
    header: 'SSL certificate',
    cell: item => item.sslCertificate,
    minWidth: 100,
  },
  {
    id: 'origin',
    sortingField: 'origin',
    header: 'Origin',
    cell: item => item.origin,
    minWidth: 100,
  },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => item.status,
    minWidth: 100,
  },
  {
    id: 'logging',
    sortingField: 'logging',
    header: 'Logging',
    cell: item => item.logging,
    minWidth: 100,
  },
]);

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ['id', 'domainName', 'createdAt', 'deliveryMethod', 'sslCertificate', 'status', 'state'],
  wraplines: false,
  stripedRows: false,
};

export const FILTERING_PROPERTIES = [
  {
    propertyLabel: 'Domain name',
    key: 'domainName',
    groupValuesLabel: 'Domain name values',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Delivery method',
    key: 'deliveryMethod',
    groupValuesLabel: 'Delivery method values',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Price class',
    key: 'priceClass',
    groupValuesLabel: 'Price class values',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Origin',
    key: 'origin',
    groupValuesLabel: 'Origin values',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Status',
    key: 'status',
    groupValuesLabel: 'Status values',
    operators: [':', '!:', '=', '!='],
  },
  { propertyLabel: 'State', key: 'state', groupValuesLabel: 'State values', operators: [':', '!:', '=', '!='] },
  {
    propertyLabel: 'Logging',
    key: 'logging',
    groupValuesLabel: 'Logging values',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'SSL certificate',
    key: 'sslCertificate',
    groupValuesLabel: 'SSL certificate values',
    operators: [':', '!:', '=', '!='],
  },
  {
    key: 'date',
    propertyLabel: 'Created at',
    groupValuesLabel: 'Created at value',
    defaultOperator: '>',
    operators: ['<', '<=', '>', '>='].map(operator => ({
      operator,
      form: DateTimeForm,
      format: formatDateTime,
      match: 'datetime',
    })),
  },
  // Example for date(only) property:
  // {
  //   key: 'createdAt',
  //   propertyLabel: 'Created at',
  //   groupValuesLabel: '',
  //   operators: ['=', '!=', '<', '<=', '>', '>='].map(operator => ({
  //     operator,
  //     form: DateForm,
  //     match: 'date',
  //   })),
  // },
].sort((a, b) => a.propertyLabel.localeCompare(b.propertyLabel));
