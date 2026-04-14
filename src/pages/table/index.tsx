// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from '../../common/theme-cw';
import { Distribution } from '../../fake-server/types';
import DataProvider from '../commons/data-provider';
import { App } from './root';

import '../../styles/base.scss';

new DataProvider().getDataWithDates<Distribution>('distributions').then(distributions => {
  applyTheme({ theme: themeCoreConfig });
  createRoot(document.getElementById('app')!).render(<App distributions={distributions} />);
});
