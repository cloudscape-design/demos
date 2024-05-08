// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { TableRows, TableRow, WindowPath, TopNavigation } from './common';
import styles from './styles.module.scss';

const compactImage = (
  <svg width="192" height="106" viewBox="0 0 192 106" fill="none" xmlns="http://www.w3.org/2000/svg">
    <WindowPath />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 15C18 14.4477 18.4477 14 19 14H47C47.5523 14 48 14.4477 48 15V19C48 19.5523 47.5523 20 47 20H19C18.4477 20 18 19.5523 18 19V15Z"
      className={styles.default}
    />
    <rect opacity="0.6" x="130.28" y="14" width="20.36" height="6" rx="3" className={styles.secondary} />
    <rect x="153.64" y="14" width="20.36" height="6" rx="3" className={styles.primary} />

    <TableRows offsetTop={32} compact={true} rows={7} />
  </svg>
);

export default compactImage;
