// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Cards from '@cloudscape-design/components/cards';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

import { cardItems, RandomData, tableItems } from './component-data';
import { Section } from './utils';

export default function TableAndCards() {
  const [selectedItems, setSelectedItems] = useState({
    table: [tableItems[2]],
    cards: [cardItems[1]],
  });

  return (
    // Cards already have built-in margin so the space between is smaller than oter sections
    <SpaceBetween size="xxs">
      <Section header="Cards" container={false}>
        <Cards
          items={cardItems}
          cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
          cardDefinition={{
            header: (item: RandomData) => (
              <Link href="#" fontSize="heading-m">
                {item.name}
              </Link>
            ),
            sections: [
              {
                id: 'description',
                header: 'Description',
                content: item => item.description,
                width: 85,
              },
              {
                id: 'cost',
                header: 'Cost',
                content: item => item.amount,
                width: 15,
              },
            ],
          }}
          selectionType="multi"
          selectedItems={selectedItems.cards}
          onSelectionChange={({ detail }) =>
            setSelectedItems(prevState => ({ ...prevState, cards: detail.selectedItems }))
          }
          ariaLabels={{
            itemSelectionLabel: (e, item) => `Select ${item.name}`,
            selectionGroupLabel: 'Item selection',
          }}
        />
      </Section>
      <Section header="Table" container={false}>
        <Table
          items={tableItems}
          columnDefinitions={[
            { header: 'Name', cell: (item: RandomData) => <Link href="#">{item.name}</Link> },
            { header: 'Description', cell: (item: RandomData) => item.description },
          ]}
          selectionType="multi"
          selectedItems={selectedItems.table}
          onSelectionChange={({ detail }) =>
            setSelectedItems(prevState => ({ ...prevState, table: detail.selectedItems }))
          }
          ariaLabels={{
            itemSelectionLabel: (e, item) => `Select ${item.name}`,
            allItemsSelectionLabel: () => 'Select all items',
            selectionGroupLabel: 'Item selection',
          }}
        />
      </Section>
    </SpaceBetween>
  );
}
