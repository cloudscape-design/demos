// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import styles from './styles.module.scss';

interface TableRowProps {
  offset: number;
  separator?: boolean;
  compact?: boolean;
  isHeader?: boolean;
}

export const TableRow = ({ offset, separator = true, compact = false, isHeader = false }: TableRowProps) => {
  const offsetTop = 0.4482;
  const offsetBottom = 3.4482;
  const separatorDistance = compact ? 7 : 8;
  return (
    <g transform={`translate(-22, ${offset})`} className={isHeader ? styles['column-header'] : styles.disabled}>
      <path d={`M53 ${offsetTop}H56V${offsetBottom}H53V${offsetTop}Z`} strokeLinecap="round" />
      <path
        d={`M61 ${offsetTop}H85V${offsetBottom}H61V${offsetTop}Z`}
        className={!isHeader ? styles.secondary : undefined}
        strokeLinecap="round"
      />
      <path d={`M138 ${offsetTop}H118V${offsetBottom}H138V${offsetTop}Z`} className={styles.secondary} />
      <path d={`M185 ${offsetTop}H141V${offsetBottom}H185V${offsetTop}Z`} className={styles.secondary} />
      {separator && <path d={`M48 ${separatorDistance}H187.387`} className={styles.separator} strokeLinecap="round" />}
    </g>
  );
};

interface TableRowsProps {
  offsetTop: number;
  rows: number;
  compact?: boolean;
}

export const TableRows = ({ offsetTop, rows, compact = false }: TableRowsProps) => {
  const distance = compact ? 10 : 13;
  return (
    <g>
      {[...Array(rows)].map((_, index) => (
        <TableRow key={index} offset={offsetTop + index * distance} compact={compact} separator={index + 1 !== rows} />
      ))}
    </g>
  );
};

export const WindowPath = () => (
  <path
    d="M186 1H6C3.23858 1 1 3.23858 1 6V100C1 102.761 3.23858 105 6 105H186C188.761 105 191 102.761 191 100V6C191 3.23858 188.761 1 186 1Z"
    className={styles.window}
    strokeWidth="2"
  />
);
export const TopNavigation = () => (
  <g className="awsui-context-top-navigation">
    <rect x="24" y="2" width="187" height="6" className={styles['top-navigation']} />
  </g>
);
