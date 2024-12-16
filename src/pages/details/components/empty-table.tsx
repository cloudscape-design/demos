// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { Button, Header, SpaceBetween, Table, TableProps } from '@cloudscape-design/components';

import { TableEmptyState } from '../../commons/common-components';

export function EmptyTable<T>({
  title,
  columnDefinitions,
}: {
  title: string;
  columnDefinitions: TableProps.ColumnDefinition<T>[];
}) {
  const items: T[] = [];
  return (
    <Table
      enableKeyboardNavigation={true}
      empty={<TableEmptyState resourceName={title} />}
      columnDefinitions={columnDefinitions}
      items={items}
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={true}>Edit</Button>
              <Button disabled={true}>Delete</Button>
              <Button>Create {title.toLowerCase()}</Button>
            </SpaceBetween>
          }
        >{`${title}s`}</Header>
      }
    />
  );
}
