// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusIndicator, Link, Box } from '@cloudscape-design/components';
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
    minWidth: 100,
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
    header: 'Logging',
    cell: item => item.logging,
    minWidth: 100,
  },
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
        {item.medicalSupplies.toFixed(2)}
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
        {item.medicalSupplies.toFixed(2)}
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
        {item.medicalSupplies.toFixed(2)}
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
        {item.medicalSupplies.toFixed(2)}
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
        {item.medicalSupplies.toFixed(2)}
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
];

export const COLUMN_DEFINITIONS = relatedColumnDefinitions.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn(column),
}));

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
];

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
      medicalSupplies: -50.25,
    },
    {
      id: 'design-income',
      name: 'Design income',
      medicalSupplies: 300,
      parentId: 'income',
    },
    {
      id: 'discounts-given',
      name: 'Discounts given',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'income',
    },
    {
      id: 'landscaping-services',
      name: 'Landscaping services',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
    },
    {
      id: 'job-materials',
      name: 'Job materials',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'landscaping-services',
    },
    {
      id: 'labor',
      name: 'Labor',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'landscaping-services',
    },
    {
      id: 'installation',
      name: 'Installation',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'labor',
    },
    {
      id: 'maintainence-and-repair',
      name: 'Maintenance and repair',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'labor',
    },
    {
      id: 'total-labor',
      name: 'Total labor',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'labor',
      isTotal: true,
    },
    {
      id: 'fountains-and-garden',
      name: 'Fountains and garden',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'job-materials',
    },
    {
      id: 'plants-and-soil',
      name: 'Plants and soil',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'job-materials',
    },
    {
      id: 'total-job-materials',
      name: 'Total job materials',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'job-materials',
      isTotal: true,
    },
    {
      id: 'total-landscaping',
      name: 'Total',
      medicalSupplies: -50.25,
      pyesCakes: -8.75,
      barnettDesign: -30.5,
      totalSharaBarnett: -30.5,
      parentId: 'landscaping-services',
      isTotal: true,
    },
  ];
};

export const genOldData = () => {
  return [
    {
      id: '14043ebf-9912-412c-b4f9-511tre',
      parentId: '13043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_14',
      creationDate: 1605316140,
      lastUpdateDate: 1614904140,
      status: 'ACTIVE',
    },
    {
      id: '18043ebf-9912-412c-b4f9-511tre',
      parentId: '16043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_18',
      creationDate: 1605316180,
      lastUpdateDate: 1614904180,
      status: 'ACTIVE',
    },
    {
      id: '17043ebf-9912-412c-b4f9-511tre',
      parentId: '16043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_17',
      creationDate: 1605316170,
      lastUpdateDate: 1614904170,
      status: 'ACTIVE',
    },
    {
      id: '16043ebf-9912-412c-b4f9-5114e3',
      parentId: '1238bf23-a2e1-4fa7-8ba8-111111',
      name: 'hierarchy_16',
      creationDate: 1605316160,
      lastUpdateDate: 1614904160,
      status: 'ACTIVE',
    },
    {
      id: '15043ebf-9912-412c-b4f9-511tre',
      parentId: '13043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_15',
      creationDate: 1605316150,
      lastUpdateDate: 1614904150,
      status: 'ACTIVE',
    },
    {
      id: '41043ebf-9912-412c-b4f9-5114e3',
      parentId: '7e38bf23-a2e1-4fa7-8ba8-111111',
      name: 'hierarchy_3',
      creationDate: 1605316303,
      lastUpdateDate: 1614904303,
      status: 'ACTIVE',
    },
    {
      id: '7e38bf23-a2e1-4fa7-8ba8-111111',
      parentId: '7e38bf23-a2e1-4fa7-8ba8-1232313213',
      name: 'hierarchy_2',
      creationDate: 1605316202,
      lastUpdateDate: 1614904202,
      status: 'ACTIVE',
    },
    {
      arn: 'arn:aws:iotsitewise:us-east-1:956523055275:asset/a044f631-ea39-4c2e-a8ef-631f1c0f4bc8',
      assetModelId: 'ae65323e-6778-420b-ac1' + 'a-eff7a8950300',
      creationDate: 1605316299,
      id: 'a044f631-ea39-4c2e-a8ef-631f1c0f4bc8',
      lastUpdateDate: 1614904229,
      name: 'Alarm parent asset',
      status: 'ACTIVE',
    },
    {
      arn: 'arn:aws:iotsitewise:us-east-1:956523055275:asset/0fe0238d-5704-4907-9f74-9ea3a2a41c9d',
      assetModelId: '1b2890d5-88cb-4869-9e93-6e2e0a6407bd',
      creationDate: 1617121611,
      id: '0fe0238d-5704-4907-9f74-9ea3a2a41c9d',
      lastUpdateDate: 1621547348,
      name: 'zz_Asset_6016_of_10000',
      status: 'FAILED',
    },
    {
      arn: 'arn:aws:iotsitewise:us-east-1:956523055275:asset/4f037ba9-b002-4ab5-bd89-32b64425707a',
      assetModelId: '1b2890d5-88cb-4869-9e93-6e2e0a6407bd',
      creationDate: 1617122142,
      id: '4f037ba9-b002-4ab5-bd89-32b64425707a',
      lastUpdateDate: 1621547370,
      name: 'zz_Asset_7198_of_10000',
      status: 'FAILED',
    },
    {
      id: '7e38bf23-a2e1-4fa7-8ba8-1232313213',
      parentId: 'a044f631-ea39-4c2e-a8ef-631f1c0f4bc8',
      name: 'hierarchy_1',
      creationDate: 1605316100,
      lastUpdateDate: 1614904100,
      status: 'ACTIVE',
    },
    {
      id: '41043ebf-9912-412c-b4f9-511tre',
      parentId: '41043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_4',
      creationDate: 1605316404,
      lastUpdateDate: 1614904404,
      status: 'ACTIVE',
    },
    {
      id: '51043ebf-9912-412c-b4f9-511tre',
      parentId: '41043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_5',
      creationDate: 1605316505,
      lastUpdateDate: 1614904505,
      status: 'ACTIVE',
    },
    {
      id: '61043ebf-9912-412c-b4f9-5114e3',
      parentId: '7e38bf23-a2e1-4fa7-8ba8-111111',
      name: 'hierarchy_6',
      creationDate: 1605316606,
      lastUpdateDate: 1614904606,
      status: 'ACTIVE',
    },
    {
      id: '71043ebf-9912-412c-b4f9-511tre',
      parentId: '61043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_7',
      creationDate: 1605316707,
      lastUpdateDate: 1614904707,
      status: 'ACTIVE',
    },
    {
      id: '81043ebf-9912-412c-b4f9-511tre',
      parentId: '61043ebf-9912-412c-b4f9-5114e3',
      name: 'hierarchy_8',
      creationDate: 1605316808,
      lastUpdateDate: 1614904808,
      status: 'ACTIVE',
    },
    {
      id: '1038bf23-a2e1-4fa7-8ba8-1232313213',
      parentId: 'a044f631-ea39-4c2e-a8ef-631f1c0f4bc8',
      name: 'hierarchy_10',
      creationDate: 1605316100,
      lastUpdateDate: 1614904100,
      status: 'ACTIVE',
    },
    {
      id: '1138bf23-a2e1-4fa7-8ba8-1232313213',
      parentId: '1038bf23-a2e1-4fa7-8ba8-1232313213',
      name: 'hierarchy_11',
      creationDate: 1605316110,
      lastUpdateDate: 1614904110,
      status: 'ACTIVE',
    },
    {
      id: '1238bf23-a2e1-4fa7-8ba8-111111',
      parentId: '1138bf23-a2e1-4fa7-8ba8-1232313213',
      name: 'hierarchy_12',
      creationDate: 1605316120,
      lastUpdateDate: 1614904120,
      status: 'ACTIVE',
    },
    {
      id: '13043ebf-9912-412c-b4f9-5114e3',
      parentId: '1238bf23-a2e1-4fa7-8ba8-111111',
      name: 'hierarchy_13',
      creationDate: 1605316130,
      lastUpdateDate: 1614904130,
      status: 'ACTIVE',
    },
  ];
};
