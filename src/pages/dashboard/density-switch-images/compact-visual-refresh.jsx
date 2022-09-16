// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { getClassName, TableRows, WindowPath, TopNavigation, ColumnHeaders } from './common';

const compactImage = (
  <svg viewBox="0 0 230 107" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={true}>
    <WindowPath />
    <TopNavigation />
    <g className="awsui-context-content-header">
      <path className={getClassName('header')} d="M24 8.00006H211V26.0001H24V8.00006Z" />
      <g className={getClassName('default')}>
        <circle cx="29" cy="14.5001" r="2.5" className={getClassName('disabled')} />
        <path d="M47 13.0001H77.1484V16.0001H47V13.0001Z" />
        <path d="M121 14C121 12.8954 121.895 12 123 12H139.36C140.465 12 141.36 12.8954 141.36 14V14C141.36 15.1046 140.465 16 139.36 16H123C121.895 16 121 15.1046 121 14V14Z" />
        <path d="M145 14C145 12.8954 145.895 12 147 12H163.36C164.465 12 165.36 12.8954 165.36 14V14C165.36 15.1046 164.465 16 163.36 16H147C145.895 16 145 15.1046 145 14V14Z" />
        <path
          d="M168 14C168 12.8954 168.895 12 170 12H186.36C187.465 12 188.36 12.8954 188.36 14V14C188.36 15.1046 187.465 16 186.36 16H170C168.895 16 168 15.1046 168 14V14Z"
          className={getClassName('primary')}
        />
        <circle cx="206.5" cy="14.5001" r="2.5" className={getClassName('disabled')} />
        <ColumnHeaders offset={20} />
      </g>
    </g>
    <TableRows offsetTop={29} compact={true} rows={8} />
  </svg>
);

export default compactImage;
