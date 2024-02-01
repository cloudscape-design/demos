// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box } from '@cloudscape-design/components';

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: [
    'name',
    'olgasbakery',
    'francescosgardentools',
    'wesscomics',
    'lidiasbooks',
    'thecarmechanics',
    'jeffsspaceships',
    'designtools',
    'keyboardkings',
    'monitormogals',
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
  { id: 'olgasbakery', label: `Olga's Bakery` },
  { id: 'francescosgardentools', label: `Francesco's Garden Tools` },
  { id: 'wesscomics', label: `Wes's Comics` },
  { id: 'lidiasbooks', label: `Lidia's Books` },
  { id: 'thecarmechanics', label: `The Car Mechanics` },
  { id: 'jeffsspaceships', label: `Jeff's Spaceships` },
  { id: 'designtools', label: `Design Tools` },
  { id: 'keyboardkings', label: `Keyboard Kings` },
  { id: 'monitorMogals', label: `Monitor Mogals` },
  { id: 'total', label: 'Total' },
];

const getAriaLabel = (label, sorted, descending) => {
  return `${label}, ${sorted ? `sorted ${descending ? 'descending' : 'ascending'}` : 'not sorted'}.`;
};

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
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel('Line item', sorted, descending);
    },
  },

  {
    id: 'olgasbakery',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Olga's Bakery
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.jeffsSpaceships?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel(`Olga's Bakery`, sorted, descending);
    },
  },
  {
    id: 'francescosgardentools',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Francesco's Garden Tools
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.jeffsSpaceships?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel(`Francesco's Garden Tools`, sorted, descending);
    },
  },
  {
    id: 'wesscomics',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Wes's Comics
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.jeffsSpaceships?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel(`Wes's Comics`, sorted, descending);
    },
  },
  {
    id: 'thecarmechanics',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        The Car Mechanics
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.jeffsSpaceships?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel(`The Car Mechanics`, sorted, descending);
    },
  },

  {
    id: 'jeffsspaceships',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Jeff's Spaceships
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.jeffsSpaceships?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel(`Jeff's Spaceships`, sorted, descending);
    },
  },
  {
    sortingField: 'designtools',
    id: 'designtools',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Design Tools
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.designTools?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel('Design Tools', sorted, descending);
    },
  },
  {
    sortingField: 'keyboardkings',
    id: 'keyboardkings',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Keyboard Kings
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.keyboardKings?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel('Keyboard Kings', sorted, descending);
    },
  },
  {
    sortingField: 'monitorMogals',
    id: 'monitorMogals',
    header: (
      <Box fontWeight="heavy" textAlign="right" color="text-body-secondary">
        Monitor Mogals
      </Box>
    ),
    cell: item => (
      <Box textAlign="right" fontWeight={item.isTotal ? 'bold' : 'normal'}>
        {item.monitorMogals?.toFixed(2)}
      </Box>
    ),
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel('Monitor Mogals', sorted, descending);
    },
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
    ariaLabel: ({ sorted, descending }) => {
      return getAriaLabel('Total', sorted, descending);
    },
  },
];

export const COLUMN_DEFINITIONS = relatedColumnDefinitions.map(column => ({
  ...column,
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
      jeffsSpaceships: 300,
      total: 1500,
      parentId: 'income',
    },
    {
      id: 'discounts-given',
      name: 'Discounts given',
      jeffsSpaceships: -50,
      monitorMogals: -20,
      keyboardKings: -30.5,
      designTools: -30.5,
      total: -331,
      parentId: 'income',
    },
    {
      id: 'interior-design-services',
      name: 'Interior design services',
      jeffsSpaceships: 40,
      monitorMogals: 10,
      keyboardKings: 30,
      designTools: 30,
      total: 270,
    },
    {
      id: 'job-materials',
      name: 'Job materials',
      parentId: 'interior-design-services',
    },
    {
      id: 'labor',
      name: 'Labor',
      parentId: 'interior-design-services',
    },
    {
      id: 'installation',
      name: 'Installation',
      jeffsSpaceships: 50.25,
      monitorMogals: 10,
      keyboardKings: 30.5,
      designTools: 30.5,
      total: 322.25,
      parentId: 'labor',
    },
    {
      id: 'maintainence-and-repair',
      name: 'Maintenance and repair',
      jeffsSpaceships: 50.25,
      monitorMogals: 10,
      keyboardKings: 30.5,
      designTools: 30.5,
      total: 322.25,
      parentId: 'labor',
    },
    {
      id: 'total-labor',
      name: 'Total labor',
      jeffsSpaceships: 100.5,
      monitorMogals: 20,
      keyboardKings: 61,
      designTools: 61,
      total: 644.5,
      parentId: 'labor',
      isTotal: true,
    },
    {
      id: 'furnishings',
      name: 'Furnishings',
      jeffsSpaceships: 50.25,
      monitorMogals: 10,
      keyboardKings: 30.5,
      designTools: 30.5,
      total: 322.25,
      parentId: 'job-materials',
    },
    {
      id: 'rugs-and-carpeting',
      name: 'Rugs and carpeting',
      jeffsSpaceships: 50.25,
      monitorMogals: 10,
      keyboardKings: 30.5,
      designTools: 30.5,
      total: 322.25,
      parentId: 'job-materials',
    },
    {
      id: 'total-job-materials',
      name: 'Total job materials',
      jeffsSpaceships: 100.5,
      monitorMogals: 20,
      keyboardKings: 61,
      designTools: 61,
      total: 644.5,
      parentId: 'job-materials',
      isTotal: true,
    },
    {
      id: 'total-interior-design',
      name: 'Total',
      jeffsSpaceships: 241,
      monitorMogals: 50,
      keyboardKings: 152.5,
      designTools: 152.5,
      total: 1560,
      parentId: 'interior-design-services',
      isTotal: true,
    },
  ];
};
