// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {
  Box,
  ButtonDropdown,
  CollectionPreferences,
  CollectionPreferencesProps,
  Link,
  Popover,
  PropertyFilterProps,
  SpaceBetween,
  StatusIndicator,
  TableProps,
} from '@cloudscape-design/components';
import { Instance, InstanceType } from './common';

const columnLabel = (column: string) => (sortState: TableProps.LabelData) => {
  const ascending = !sortState.descending;
  return `${column}, ${sortState.sorted ? `sorted ${ascending ? 'ascending' : 'descending'}` : 'not sorted'}.`;
};

const contentDisplayPreferenceI18nStrings: Partial<CollectionPreferencesProps.ContentDisplayPreference> = {
  liveAnnouncementDndStarted: (position, total) => `Picked up item at position ${position} of ${total}`,
  liveAnnouncementDndDiscarded: 'Reordering canceled',
  liveAnnouncementDndItemReordered: (initialPosition, currentPosition, total) =>
    initialPosition === currentPosition
      ? `Moving item back to position ${currentPosition} of ${total}`
      : `Moving item to position ${currentPosition} of ${total}`,
  liveAnnouncementDndItemCommitted: (initialPosition, finalPosition, total) =>
    initialPosition === finalPosition
      ? `Item moved back to its original position ${initialPosition} of ${total}`
      : `Item moved from position ${initialPosition} to position ${finalPosition} of ${total}`,
  dragHandleAriaDescription:
    "Use Space or Enter to activate drag for an item, then use the arrow keys to move the item's position. To complete the position move, use Space or Enter, or to discard the move, use Escape.",
  dragHandleAriaLabel: 'Drag handle',
};

export function createColumns({
  getInstanceProps,
}: {
  getInstanceProps: (instance: Instance) => {
    children: number;
    actions: ReadonlyArray<{
      id: string;
      text: string;
      disabled?: boolean;
      hidden?: boolean;
      onClick: () => void;
    }>;
  };
}): TableProps.ColumnDefinition<Instance>[] {
  return [
    {
      id: 'name',
      header: 'DB Name',
      cell: item => <Link href={`#${item.name}`}>{item.name}</Link>,
      ariaLabel: columnLabel('DB Name'),
      sortingField: 'name',
      minWidth: 200,
    },
    {
      id: 'role',
      header: 'Role',
      cell: item => (
        <InstanceTypeWrapper instanceType={item.type}>
          {item.type === 'instance' ? item.role : `${item.role} (${getInstanceProps(item).children})`}
        </InstanceTypeWrapper>
      ),
      ariaLabel: columnLabel('Role'),
      sortingField: 'role',
    },
    {
      id: 'activity',
      header: 'Activity',
      cell: item => (
        <Box fontSize="body-s" color="text-body-secondary">
          {item.selectsPerSecond !== null ? `${item.selectsPerSecond} Selects/Sec` : '-'}
        </Box>
      ),
      ariaLabel: columnLabel('Activity'),
      sortingField: 'selectsPerSecond',
    },
    {
      id: 'state',
      header: 'State',
      cell: item => {
        const selfState = (() => {
          switch (item.state) {
            case 'RUNNING':
              return <StatusIndicator type="success">Running</StatusIndicator>;
            case 'STOPPED':
              return <StatusIndicator type="stopped">Stopped</StatusIndicator>;
            case 'TERMINATED':
              return <StatusIndicator type="error">Terminated</StatusIndicator>;
          }
        })();
        if (item.type === 'instance') {
          return selfState;
        }
        return (
          <Popover
            dismissButton={false}
            position="top"
            size="small"
            content={
              <SpaceBetween size="s" direction="horizontal">
                <StatusIndicator type="success">{item.stateGrouped.RUNNING}</StatusIndicator>
                <StatusIndicator type="stopped">{item.stateGrouped.STOPPED}</StatusIndicator>
                <StatusIndicator type="error">{item.stateGrouped.TERMINATED}</StatusIndicator>
              </SpaceBetween>
            }
          >
            {selfState}
          </Popover>
        );
      },
      ariaLabel: columnLabel('State'),
      sortingField: 'state',
    },
    {
      id: 'engine',
      header: 'Engine',
      cell: item => item.engine,
      ariaLabel: columnLabel('Engine'),
      sortingField: 'engine',
    },
    {
      id: 'size',
      header: 'Size',
      cell: item => <InstanceTypeWrapper instanceType={item.type}>{item.sizeGrouped || '-'}</InstanceTypeWrapper>,
      ariaLabel: columnLabel('Size'),
      sortingField: 'sizeGrouped',
    },
    {
      id: 'region',
      header: 'Region & AZ',
      cell: item => <InstanceTypeWrapper instanceType={item.type}>{item.regionGrouped}</InstanceTypeWrapper>,
      ariaLabel: columnLabel('Region & AZ'),
      sortingField: 'regionGrouped',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: item => {
        const { actions } = getInstanceProps(item);
        if (actions.filter(action => !action.hidden).length === 0) {
          return (
            <ButtonDropdown
              variant="inline-icon"
              ariaLabel={`Instance ${item.name} actions`}
              disabled={true}
              items={[]}
            />
          );
        }
        return (
          <ButtonDropdown
            expandToViewport={true}
            items={actions.filter(action => !action.hidden)}
            variant="inline-icon"
            ariaLabel={`Instance ${item.name} actions`}
            onItemClick={event => actions.find(action => action.id === event.detail.id)!.onClick()}
          />
        );
      },
    },
  ];
}

export function createPreferences({
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
      pageSizePreference={{
        title: 'Select page size',
        options: [
          { value: 10, label: '10 Instances' },
          { value: 25, label: '25 Instances' },
          { value: 50, label: '50 Instances' },
        ],
      }}
      contentDisplayPreference={{
        title: 'Column preferences',
        description: 'Customize the columns visibility and order.',
        options: [
          {
            id: 'name',
            label: 'DB Name',
            alwaysVisible: true,
          },
          {
            id: 'role',
            label: 'Role',
          },
          {
            id: 'activity',
            label: 'Activity',
          },
          {
            id: 'state',
            label: 'State',
          },
          {
            id: 'engine',
            label: 'Engine',
          },
          {
            id: 'size',
            label: 'Size',
          },
          {
            id: 'region',
            label: 'Region & AZ',
          },
          {
            id: 'actions',
            label: 'Actions',
          },
        ],
        ...contentDisplayPreferenceI18nStrings,
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

export const filteringProperties: PropertyFilterProps.FilteringProperty[] = [
  {
    key: 'path',
    propertyLabel: 'DB Name',
    groupValuesLabel: 'DB Name values',
    // Use custom matchers so that when filtering item by name all its children are matched as well.
    operators: [
      {
        operator: '=',
        match: (path: unknown, token: null | string) => Array.isArray(path) && path.includes(token),
      },
      // The contains operator is listed to support free-text matching.
      {
        operator: ':',
        match: (path: unknown, token: null | string) =>
          Array.isArray(path) && path.some(entry => entry.includes(token)),
      },
    ],
  },
  {
    key: 'role',
    propertyLabel: 'Role',
    groupValuesLabel: 'Role values',
    operators: ['='],
  },
  {
    key: 'state',
    propertyLabel: 'State',
    groupValuesLabel: 'State values',
    operators: ['=', '!='],
  },
  {
    key: 'engine',
    propertyLabel: 'Engine',
    groupValuesLabel: 'Engine values',
    operators: ['=', '!=', ':'],
  },
  {
    key: 'size',
    propertyLabel: 'Size',
    groupValuesLabel: 'Size values',
    operators: ['=', '!=', ':'],
  },
  {
    key: 'region',
    propertyLabel: 'Region',
    groupValuesLabel: 'Region values',
    operators: ['=', '!=', ':'],
  },
];

function InstanceTypeWrapper({ instanceType, children }: { instanceType: InstanceType; children: React.ReactNode }) {
  return (
    <Box
      fontWeight={instanceType === 'instance' ? 'normal' : 'bold'}
      color={instanceType === 'instance' ? 'inherit' : 'text-body-secondary'}
    >
      {children}
    </Box>
  );
}
