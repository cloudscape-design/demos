// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import Table, { TableProps } from '@cloudscape-design/components/table';
import React from 'react';
import styles from './styles.module.scss';

// workaround component, because embedded table is not available in Cloudscape classic design
export function EmbeddedTable(props: TableProps) {
  return (
    <div className={styles.tableWrapper}>
      <Table variant="embedded" {...props} />
    </div>
  );
}
