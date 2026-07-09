// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from '../../common/theme-core';
import { CustomAppLayout, DemoTopNavigation, Notifications } from '../commons/common-components';
import Chat from './chat';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';
function App() {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <>
        <DemoTopNavigation />
        <CustomAppLayout
          maxContentWidth={1280}
          toolsHide
          navigationHide
          content={<Chat />}
          notifications={<Notifications />}
        />
      </>
    </I18nProvider>
  );
}

applyTheme({ theme: themeCoreConfig });
createRoot(document.getElementById('app')!).render(<App />);
