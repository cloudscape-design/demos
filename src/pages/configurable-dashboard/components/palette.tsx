// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Button, SpaceBetween, TextFilter } from '@cloudscape-design/components';
import ItemsPalette, { ItemsPaletteProps } from '@cloudscape-design/board-components/items-palette';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { EmptyState } from '../../dashboard/components/empty-state';
import { WidgetDataType } from '../../dashboard/widgets/interfaces';
import { PaletteItem } from './palette-item';
import { paletteI18nStrings } from '../i18n-strings';
import { getTextFilterCounterText } from '../../../i18n-strings';

function compareStrings(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

interface PaletteProps {
  items: ReadonlyArray<ItemsPaletteProps.Item<WidgetDataType>>;
}

export default function Palette({ items: allItems }: PaletteProps) {
  const { items, filterProps, collectionProps, filteredItemsCount, actions } = useCollection(allItems, {
    filtering: {
      filteringFunction: (item, filteringText) =>
        compareStrings(item.data.title, filteringText) || compareStrings(item.data.description, filteringText),
      empty: (
        <EmptyState
          title="No more widgets"
          description="All widgets were added to the dashboard already."
          verticalCenter={true}
        />
      ),
      noMatch: (
        <EmptyState
          title="No matches"
          description="We can't find a match."
          verticalCenter={true}
          action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
        />
      ),
    },
    sorting: {
      defaultState: {
        sortingColumn: { sortingComparator: (a, b) => (a.data.title > b.data.title ? 1 : -1) },
      },
    },
  });

  return (
    <SpaceBetween size="l">
      <TextFilter
        {...filterProps}
        filteringAriaLabel="Filter widgets"
        filteringPlaceholder="Find widgets"
        filteringClearAriaLabel="Clear"
        countText={getTextFilterCounterText(filteredItemsCount!)}
      />
      {items.length > 0 ? (
        <ItemsPalette
          items={items}
          i18nStrings={paletteI18nStrings}
          renderItem={(item, { showPreview }) => (
            <PaletteItem
              title={item.data.title}
              description={item.data.description}
              iconName={item.data.icon}
              showPreview={showPreview}
            />
          )}
        />
      ) : (
        collectionProps.empty
      )}
    </SpaceBetween>
  );
}
