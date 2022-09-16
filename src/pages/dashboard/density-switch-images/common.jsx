// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

export const getClassName = element => `density-switch-${element}`;

const TableRow = ({ offset, separator = true, compact = false }) => {
  const offsetTop = 0.4482;
  const offsetBottom = 3.4482;
  const separatorDistance = compact ? 7 : 8;
  return (
    <g transform={`translate(0, ${offset})`} className={getClassName('disabled')}>
      <path d={`M53 ${offsetTop}H56V${offsetBottom}H53V${offsetTop}Z`} />
      <path d={`M61 ${offsetTop}H85V${offsetBottom}H61V${offsetTop}Z`} className={getClassName('secondary')} />
      <path d={`M138 ${offsetTop}H118V${offsetBottom}H138V${offsetTop}Z`} />
      <path d={`M185 ${offsetTop}H141V${offsetBottom}H185V${offsetTop}Z`} />
      {separator && (
        <path d={`M48 ${separatorDistance}H187.387`} className={getClassName('separator')} strokeLinecap="square" />
      )}
    </g>
  );
};

export const TableRows = ({ offsetTop, rows, compact = false }) => {
  const distance = compact ? 10 : 12;
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
    d="M24 1.00006H211C211.552 1.00006 212 1.44778 212 2.00006V105C212 105.552 211.552 106 211 106H24C23.4477 106 23 105.552 23 105V2.00006C23 1.44778 23.4477 1.00006 24 1.00006Z"
    className={getClassName('window')}
    strokeWidth="2"
  />
);
export const TopNavigation = () => (
  <g className="awsui-context-top-navigation">
    <rect x="24" y="2" width="187" height="6" className={getClassName('top-navigation')} />
  </g>
);

export const ColumnHeaders = ({ offset }) => (
  <g transform={`translate(0, ${offset})`} className={getClassName('default')}>
    <path d="M138 0.4483H118V3.4483H138V0.4483Z" />
    <path d="M185 0.4483H141V3.4483H185V0.4483Z" />
    <path d="M61 0.4483H85V3.4483H61V0.4483Z" />
    <path d="M53 0.4483H56V3.4483H53V0.4483Z" />
  </g>
);
