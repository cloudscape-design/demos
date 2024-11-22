// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  CollectionPreferences,
  CollectionPreferencesProps,
  Link,
  Icon,
  Box,
  Badge,
  PropertyFilterProps,
  StatusIndicator,
  CardsProps,
  SpaceBetween,
  Checkbox,
  ExpandableSection,
} from '@cloudscape-design/components';
import { MarketPlaceItem } from './interface';

export const cardsAriaLabels: CardsProps<{ id: string }>['ariaLabels'] = {
  selectionGroupLabel: 'group label',
  itemSelectionLabel: ({ selectedItems }, item) => {
    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
    return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
  },
  cardsLabel: 'Instances table',
};

export const COLUMN_DEFINITIONS: CardsProps.CardDefinition<MarketPlaceItem> = {
  header: item => <Link href={`#${item.id}`}>{item.name}</Link>,
  sections: [
    {
      id: 'vendor',
      header: 'Vendor',
      content: item => (
        <Link external={true} href={`#${item.vendorName}`}>
          {item.vendorName}
        </Link>
      ),
    },
    {
      id: 'rating',
      content: item =>
        item.rating ? (
          <Box>
            {item.rating + ' '}
            <Icon name="star" />
          </Box>
        ) : (
          <Box fontSize="body-s" color="text-body-secondary">
            No rating
          </Box>
        ),
    },
    {
      id: 'price',
      header: 'Price',
      content: item => (
        <SpaceBetween size="xxs">
          <SpaceBetween direction="horizontal" size="xs">
            {item.yearlyPrice ? `${item.yearlyPrice} ($/year)` : null}
            <Badge color={item.pricingModel === 'Free' ? 'green' : 'severity-low'}>{item.pricingModel}</Badge>
          </SpaceBetween>
          {item.freeTrial === 'Yes' ? <Badge color={'blue'}>Free trial</Badge> : null}
        </SpaceBetween>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      content: item => <Box>{item.category}</Box>,
    },
    {
      id: 'deliveryMethod',
      header: 'Delivery method',
      content: item => <Box>{item.deliveryMethod}</Box>,
    },
    {
      id: 'architecture',
      header: 'Architecture',
      content: item => {
        const os = item.operatingSystem === '-' ? '-' : `${item.operatingSystem}, `;
        const architecture = item.architecture === '-' ? '' : `${item.architecture}`;
        return (
          <Box>
            {os}
            {architecture}
          </Box>
        );
      },
    },
  ],
};

export const filteringProperties: PropertyFilterProps.FilteringProperty[] = [
  {
    key: 'name',
    propertyLabel: 'Name',
    groupValuesLabel: '-',
    operators: ['='],
  },
  {
    key: 'vendorName',
    propertyLabel: 'Vendor',
    groupValuesLabel: '-',
    operators: ['='],
  },
  {
    key: 'freeTrial',
    propertyLabel: 'freeTrial',
    groupValuesLabel: 'freeTrial',
    operators: [{ operator: '=', tokenType: 'enum' }],
  },
  {
    key: 'yearlyPrice',
    propertyLabel: 'yearlyPrice',
    groupValuesLabel: 'yearlyPrice',
    operators: ['=', '!=', '>=', '<='],
  },
  {
    key: 'pricingModel',
    propertyLabel: 'pricingModel',
    groupValuesLabel: 'pricingModel',
    operators: ['='],
  },
  {
    key: 'category',
    propertyLabel: 'category',
    groupValuesLabel: 'category',
    operators: ['='],
  },
  {
    key: 'rating',
    propertyLabel: 'rating',
    groupValuesLabel: 'rating',
    operators: ['=', '!=', '>=', '<='],
  },
  {
    key: 'numberOfReviews',
    propertyLabel: 'numberOfReviews',
    groupValuesLabel: 'numberOfReviews',
    operators: ['=', '!=', '>=', '<='],
  },
  {
    key: 'category',
    propertyLabel: 'category',
    groupValuesLabel: 'category',
    operators: ['='],
  },
  {
    key: 'deliveryMethod',
    propertyLabel: 'deliveryMethod',
    groupValuesLabel: 'deliveryMethod',
    operators: ['='],
  },
  {
    key: 'operatingSystem',
    propertyLabel: 'operatingSystem',
    groupValuesLabel: 'operatingSystem',
    operators: ['='],
  },
  {
    key: 'contractType',
    propertyLabel: 'contractType',
    groupValuesLabel: 'contractType',
    operators: ['='],
  },
];

export interface CustomPrefs {
  andOrFilter: boolean;
}

export function TablePreferences({
  preferences,
  setPreferences,
}: {
  preferences: CollectionPreferencesProps.Preferences<CustomPrefs>;
  setPreferences: (next: CollectionPreferencesProps.Preferences) => void;
}) {
  return (
    <CollectionPreferences
      title="Preferences"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      onConfirm={({ detail }) => setPreferences(detail)}
      preferences={preferences}
      customPreference={(customValue: CustomPrefs, setCustomValue: (value: CustomPrefs) => void) => (
        <ExpandableSection variant="footer" defaultExpanded={true} headerText="Filter settings">
          <SpaceBetween size="xs">
            <Checkbox
              checked={customValue?.andOrFilter}
              onChange={({ detail }) => setCustomValue({ ...customValue, andOrFilter: detail.checked })}
            >
              Use and/or filter
            </Checkbox>
          </SpaceBetween>
        </ExpandableSection>
      )}
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
