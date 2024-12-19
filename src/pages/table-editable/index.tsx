// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Distribution } from '../../fake-server/types';
import DataProvider from '../commons/data-provider';
import { App } from './root';

const dataProvider = new DataProvider();

dataProvider.getData<Distribution>('distributions').then(distributions => {
  createRoot(document.getElementById('app')!).render(<App distributions={distributions} />);
});
