// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './root';
import { Router } from './router';
import { StoreProvider } from './store';

createRoot(document.getElementById('app')!).render(
  <StoreProvider>
    <App>
      <Router initialPage="create-transcription-job" />
    </App>
  </StoreProvider>,
);
