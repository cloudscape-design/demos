// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box } from '@cloudscape-design/components';
import { createTableSortLabelFn } from '../../i18n-strings';

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: [
    'name',
    'amysbirdsanctuary',
    'billswindsurfshop',
    'coolcars',
    'diegorodriguez',
    'medicalSupplies',
    'pyesCakes',
    'barnettDesign',
    'totalSharaBarnett',
    'total',
  ],
  wrapLines: false,
  stripedRows: true,
  contentDensity: 'compact',
  stickyColumns: { first: 1, last: 1 },
};

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Line items' },
  { value: 30, label: '30 Line items' },
  { value: 50, label: '50 Line items' },
];

export const CONTENT_DISPLAY_OPTIONS = [
  { id: 'name', label: 'Line item', alwaysVisible: true },
  { id: 'amysbirdsanctuary', label: 'Amys Bird Sanctuary' },
  { id: 'billswindsurfshop', label: 'Bills Windsurf Shop' },
  { id: 'coolcars', label: 'Cool cars' },
  { id: 'diegorodriguez', label: 'Diego Rodriguez' },
  { id: 'medicalSupplies', label: 'Medical supplies' },
  { id: 'pyesCakes', label: 'Pyes Cakes' },
  { id: 'barnettDesign', label: 'Barnett Design' },
  { id: 'totalSharaBarnett', label: 'Total Shara Barnett' },
  { id: 'total', label: 'Total' },
];

export const relatedColumnDefinitions = [
  {
    sortingField: 'name',
    id: 'name',
    header: (
      <Box fontWeight="heavy" color="text-body-secondary">
        Line item
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.name}
      </Box>
    ),
  },

  {
    id: 'amysbirdsanctuary',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Amy's Bird Sanctuary
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.medicalSupplies?.toFixed(2)}
      </Box>
    ),
  },
  {
    id: 'billswindsurfshop',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Bill's Windsurf Shop
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.medicalSupplies?.toFixed(2)}
      </Box>
    ),
  },
  {
    id: 'coolcars',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Cool cars
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.medicalSupplies?.toFixed(2)}
      </Box>
    ),
  },
  {
    id: 'diegorodriguez',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Diego Rodriguez
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.medicalSupplies?.toFixed(2)}
      </Box>
    ),
  },

  {
    id: 'medicalSupplies',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Medical supplies
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.medicalSupplies?.toFixed(2)}
      </Box>
    ),
  },
  {
    sortingField: 'pyesCakes',
    id: 'pyesCakes',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Pye's cakes
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.pyesCakes?.toFixed(2)}
      </Box>
    ),
  },
  {
    sortingField: 'barnettDesign',
    id: 'barnettDesign',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Barnett Design
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.barnettDesign?.toFixed(2)}
      </Box>
    ),
  },
  {
    sortingField: 'totalSharaBarnett',
    id: 'totalSharaBarnett',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Total Shara Barnett
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.totalSharaBarnett?.toFixed(2)}
      </Box>
    ),
  },
  {
    sortingField: 'total',
    id: 'total',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Total
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.total ? item.total.toFixed(2) : '-'}
      </Box>
    ),
  },
];

export const COLUMN_DEFINITIONS = relatedColumnDefinitions.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn(column),
}));

export const PROPERTY_FILTERING_I18N_CONSTANTS = {
  filteringAriaLabel: 'your choice',
  dismissAriaLabel: 'Dismiss',
  clearAriaLabel: 'Clear',

  filteringPlaceholder: 'Filter distributions by text, property or value',
  groupValuesText: 'Values',
  groupPropertiesText: 'Properties',
  operatorsText: 'Operators',

  operationAndText: 'and',
  operationOrText: 'or',

  operatorLessText: 'Less than',
  operatorLessOrEqualText: 'Less than or equal',
  operatorGreaterText: 'Greater than',
  operatorGreaterOrEqualText: 'Greater than or equal',
  operatorContainsText: 'Contains',
  operatorDoesNotContainText: 'Does not contain',
  operatorEqualsText: 'Equals',
  operatorDoesNotEqualText: 'Does not equal',

  editTokenHeader: 'Edit filter',
  propertyText: 'Property',
  operatorText: 'Operator',
  valueText: 'Value',
  cancelActionText: 'Cancel',
  applyActionText: 'Apply',
  allPropertiesLabel: 'All properties',

  tokenLimitShowMore: 'Show more',
  tokenLimitShowFewer: 'Show fewer',
  clearFiltersText: 'Clear filters',
  removeTokenButtonAriaLabel: () => 'Remove token',
  enteredTextLabel: text => `Use: "${text}"`,
};

export const genData = () => {
  return [
    {
      id: 'income',
      name: 'Income',
    },
    {
      id: 'design-income',
      name: 'Design income',
      medicalSupplies: 300,
      total: 1500,
      parentId: 'income',
    },
    {
      id: 'discounts-given',
      name: 'Discounts given',
      medicalSupplies: -50,
      pyesCakes: -20,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      total: -331,
      parentId: 'income',
    },
    {
      id: 'landscaping-services',
      name: 'Landscaping services',
      medicalSupplies: 40,
      pyesCakes: 10,
      barnettDesign: 30,
      totalSharaBarnett: 30,
      total: 270,
    },
    {
      id: 'job-materials',
      name: 'Job materials',
      parentId: 'landscaping-services',
    },
    {
      id: 'labor',
      name: 'Labor',
      parentId: 'landscaping-services',
    },
    {
      id: 'installation',
      name: 'Installation',
      medicalSupplies: 50.25,
      pyesCakes: 10,
      barnettDesign: 30.5,
      totalSharaBarnett: 30.5,
      total: 322.25,
      parentId: 'labor',
    },
    {
      id: 'maintainence-and-repair',
      name: 'Maintenance and repair',
      medicalSupplies: 50.25,
      pyesCakes: 10,
      barnettDesign: 30.5,
      totalSharaBarnett: 30.5,
      total: 322.25,
      parentId: 'labor',
    },
    {
      id: 'total-labor',
      name: 'Total labor',
      medicalSupplies: 100.5,
      pyesCakes: 20,
      barnettDesign: 61,
      totalSharaBarnett: 61,
      total: 644.5,
      parentId: 'labor',
      isTotal: true,
    },
    {
      id: 'fountains-and-garden',
      name: 'Fountains and garden',
      medicalSupplies: 50.25,
      pyesCakes: 10,
      barnettDesign: 30.5,
      totalSharaBarnett: 30.5,
      total: 322.25,
      parentId: 'job-materials',
    },
    {
      id: 'plants-and-soil',
      name: 'Plants and soil',
      medicalSupplies: 50.25,
      pyesCakes: 10,
      barnettDesign: 30.5,
      totalSharaBarnett: 30.5,
      total: 322.25,
      parentId: 'job-materials',
    },
    {
      id: 'total-job-materials',
      name: 'Total job materials',
      medicalSupplies: 100.5,
      pyesCakes: 20,
      barnettDesign: 61,
      totalSharaBarnett: 61,
      total: 644.5,
      parentId: 'job-materials',
      isTotal: true,
    },
    {
      id: 'total-landscaping',
      name: 'Total',
      medicalSupplies: 241,
      pyesCakes: 50,
      barnettDesign: 152.5,
      totalSharaBarnett: 152.5,
      total: 1560,
      parentId: 'landscaping-services',
      isTotal: true,
    },
  ];
};
