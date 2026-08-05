// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';

import CustomChatPage from './custom-chat-page';

import '../../styles/base.scss';

// CustomChatPage applies the custom theme and owns its own AppLayoutToolbar, so it isn't wrapped here.
function App() {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <CustomChatPage />
    </I18nProvider>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
