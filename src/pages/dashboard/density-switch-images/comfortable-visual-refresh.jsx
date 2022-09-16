// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { getClassName, TableRows, WindowPath, TopNavigation, ColumnHeaders } from './common';

const comfortableImage = (
  <svg viewBox="0 0 230 107" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={true}>
    <WindowPath />
    <TopNavigation />
    <g className="awsui-context-content-header">
      <path className={getClassName('header')} d="M24 8.00006H211V33.0001H24V8.00006Z" />
      <g className={getClassName('default')}>
        <circle cx="29" cy="15.5001" r="2.5" className={getClassName('disabled')} />
        <path d="M47 14.0001H77.1484V17.0001H47V14.0001Z" />
        <path d="M121 15.5C121 13.567 122.567 12 124.5 12H137.86C139.793 12 141.36 13.567 141.36 15.5V15.5C141.36 17.433 139.793 19 137.86 19H124.5C122.567 19 121 17.433 121 15.5V15.5Z" />
        <path d="M145 15.5C145 13.567 146.567 12 148.5 12H161.86C163.793 12 165.36 13.567 165.36 15.5V15.5C165.36 17.433 163.793 19 161.86 19H148.5C146.567 19 145 17.433 145 15.5V15.5Z" />
        <path
          d="M168 15.5C168 13.567 169.567 12 171.5 12H184.86C186.793 12 188.36 13.567 188.36 15.5V15.5C188.36 17.433 186.793 19 184.86 19H171.5C169.567 19 168 17.433 168 15.5V15.5Z"
          className={getClassName('primary')}
        />
        <circle cx="206.5" cy="15.5001" r="2.5" className={getClassName('disabled')} />
      </g>
      <ColumnHeaders offset={25} />
    </g>
    <TableRows offsetTop={37} rows={6} />
  </svg>
);

export default comfortableImage;
