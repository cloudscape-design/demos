// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';

import { CustomAppLayout, Notifications } from '../commons/common-components';
import Chat from './chat';

import '../../styles/base.scss';

function App() {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <CustomAppLayout
        maxContentWidth={1280}
        toolsHide
        navigationHide
        content={<Chat />}
        notifications={<Notifications />}
      />
    </I18nProvider>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
