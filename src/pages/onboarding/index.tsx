// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from '../../common/theme-cw';
import { App } from './root';
import { Router } from './router';
import { StoreProvider } from './store';

import '../../styles/base.scss';

applyTheme({ theme: themeCoreConfig });
createRoot(document.getElementById('app')!).render(
  <StoreProvider>
    <App>
      <Router initialPage="create-transcription-job" />
    </App>
  </StoreProvider>,
);
