// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';

import Chat from './chat';

import '../../styles/base.scss';

// The Chat component owns its own AppLayout, so we don't wrap it here.
function App() {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <Chat />
    </I18nProvider>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
