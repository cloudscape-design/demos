// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  CollectionPreferences,
  StatusIndicator,
  Link,
  Select,
  Input,
  Autosuggest,
} from '@cloudscape-design/components';
import { createTableSortLabelFn } from '../../i18n-strings';

const rawColumns = [
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
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({ ...column, ariaLabel: createTableSortLabelFn(column) }));

export const serverSideErrorsStore = new Map();

// Please do not use this in any real code, this is not a good regular expression for domain names
// A better regex would be something like: /^((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/
// or one of the regular expressions mentioned here:
//    https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
export const domainNameRegex = /^(?:[\w_-]+\.){1,3}(?:com|net|org)$/i;
export const INVALID_DOMAIN_MESSAGE = 'Valid domain name ends with .com, .org, or .net.';

const editableColumns = {
  state: {
    minWidth: 200,
    editConfig: {
      ariaLabel: 'Edit state',
      errorIconAriaLabel: 'State Validation Error',
      editIconAriaLabel: 'editable',
      editingCell: (item, { setValue, currentValue }) => {
        const options = [
          { value: 'Activated', label: 'Activated' },
          { value: 'Deactivated', label: 'Deactivated' },
        ];
        return (
          <Select
            autoFocus={true}
            expandToViewport={true}
            ariaLabel="Select desired state"
            options={options}
            onChange={event => {
              setValue(event.detail.selectedOption.value);
            }}
            selectedOption={options.find(option => option.value === (currentValue ?? item.state))}
          />
        );
      },
    },
    cell: item => {
      return <StatusIndicator type={item.state === 'Deactivated' ? 'error' : 'success'}>{item.state}</StatusIndicator>;
    },
  },
  domainName: {
    minWidth: 180,
    editConfig: {
      ariaLabel: 'Edit domain name',
      errorIconAriaLabel: 'Domain Name Validation Error',
      editIconAriaLabel: 'editable',
      validation(item, value) {
        if (serverSideErrorsStore.has(item)) {
          if (value) {
            serverSideErrorsStore.set(item, domainNameRegex.test(value) ? undefined : INVALID_DOMAIN_MESSAGE);
          }
          return serverSideErrorsStore.get(item);
        }
      },
      editingCell: (item, { setValue, currentValue }) => {
        return (
          <Input
            autoFocus={true}
            ariaLabel="Edit domain name"
            value={currentValue ?? item.domainName}
            onChange={event => {
              setValue(event.detail.value);
            }}
            placeholder="Enter domain name"
          />
        );
      },
    },
    cell: item => {
      return item.domainName;
    },
  },
  sslCertificate: {
    minWidth: 180,
    editConfig: {
      ariaLabel: 'Edit SSL certificate',
      errorIconAriaLabel: 'Certificate Validation Error',
      editIconAriaLabel: 'editable',

      editingCell: (item, { setValue, currentValue }) => {
        const options = [
          { value: 'Default', label: 'Default ' },
          { value: 'ACM', label: 'ACM' },
          { value: 'Custom', label: 'Custom' },
        ];
        return (
          <Autosuggest
            autoFocus={true}
            value={currentValue ?? item.sslCertificate}
            onChange={event => setValue(event.detail.value)}
            options={options}
            enteredTextLabel={value => `Use custom certificate "${value}"`}
            expandToViewport={true}
            ariaLabel="SSL Certificate"
            clearAriaLabel="Clear"
            placeholder="Select an SSL certificate"
          />
        );
      },
    },
    cell: item => {
      return item.sslCertificate;
    },
  },
};

export const EDITABLE_COLUMN_DEFINITIONS = COLUMN_DEFINITIONS.map(column => {
  if (editableColumns[column.id]) {
    return {
      ...column,
      minWidth: Math.max(column.minWidth || 0, 176),
      ...editableColumns[column.id],
    };
  }
  return column;
});

const VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main distribution properties',
    options: [
      { id: 'id', label: 'Distribution ID' },
      { id: 'domainName', label: 'Domain name' },
      { id: 'deliveryMethod', label: 'Delivery method' },
      { id: 'priceClass', label: 'Price class' },
      { id: 'sslCertificate', label: 'SSL certificate' },
      { id: 'origin', label: 'Origin' },
      { id: 'status', label: 'Status' },
      { id: 'state', label: 'State' },
      { id: 'logging', label: 'Logging' },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Distributions' },
  { value: 30, label: '30 Distributions' },
  { value: 50, label: '50 Distributions' },
];

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ['id', 'domainName', 'deliveryMethod', 'sslCertificate', 'status', 'state'],
  wrapLines: false,
  stripedRows: false,
};

export const EDITABLE_PREFERENCES = {
  pageSize: 30,
  visibleContent: ['id', 'domainName', 'deliveryMethod', 'sslCertificate', 'state'],
  wrapLines: false,
  stripedRows: false,
};

export const Preferences = ({
  preferences,
  setPreferences,
  disabled,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  visibleContentOptions = VISIBLE_CONTENT_OPTIONS,
}) => (
  <CollectionPreferences
    title="Preferences"
    confirmLabel="Confirm"
    cancelLabel="Cancel"
    disabled={disabled}
    preferences={preferences}
    onConfirm={({ detail }) => setPreferences(detail)}
    pageSizePreference={{
      title: 'Page size',
      options: pageSizeOptions,
    }}
    wrapLinesPreference={{
      label: 'Wrap lines',
      description: 'Check to see all the text and wrap the lines',
    }}
    stripedRowsPreference={{
      label: 'Striped rows',
      description: 'Check to add alternating shaded rows',
    }}
    visibleContentPreference={{
      title: 'Select visible columns',
      options: visibleContentOptions,
    }}
  />
);
