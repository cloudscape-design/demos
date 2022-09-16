// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Link, StatusIndicator } from '@cloudscape-design/components';

export const CARD_DEFINITIONS = {
  header: item => (
    <div>
      <Link fontSize="heading-m" href="#">
        {item.id}
      </Link>
    </div>
  ),
  sections: [
    {
      id: 'domainName',
      header: 'Domain name',
      content: item => item.domainName,
    },
    {
      id: 'deliveryMethod',
      header: 'Delivery method',
      content: item => item.deliveryMethod,
    },
    {
      id: 'priceClass',
      header: 'Price class',
      content: item => item.priceClass,
    },
    {
      id: 'sslCertificate',
      header: 'SSL certificate',
      content: item => item.sslCertificate,
    },
    {
      id: 'origin',
      header: 'Origin',
      content: item => item.origin,
    },
    {
      id: 'status',
      header: 'Status',
      content: item => item.status,
    },
    {
      id: 'state',
      header: 'State',
      content: item => (
        <StatusIndicator type={item.state === 'Deactivated' ? 'error' : 'success'}>{item.state}</StatusIndicator>
      ),
    },
    {
      id: 'logging',
      header: 'Logging',
      content: item => item.logging,
    },
  ],
};

export const VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main distribution properties',
    options: [
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
  visibleContent: ['domainName', 'deliveryMethod', 'status'],
};
