// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from '../../common/theme-core';
applyTheme({ theme: themeCoreConfig });

import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Notifications } from '../commons';
import { CustomAppLayout, DemoTopNavigation } from '../commons/common-components';
import ButtonsInputsDropdowns from './buttons-inputs-dropdowns';
import Chat from './chat';
import FormControls from './form-controls';
import NavigationComponents from './navigation-components';
import StatusComponents from './status-components';
import TableAndCards from './table-and-cards';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';

function App() {
  return (
    <>
      <DemoTopNavigation />
      <CustomAppLayout
        toolsHide={true}
        navigationHide={true}
        contentType="wizard"
        notifications={<Notifications />}
        content={
          <SpaceBetween direction="vertical" size="xl">
            <Header
              variant="h1"
              description="This page shows a representative subset of Cloudscape components for demonstration purposes. It doesn't include every component permutation, but provides a sample selection to help you see your theme applied across the system."
            >
              Components overview page
            </Header>
            <ButtonsInputsDropdowns />
            <FormControls />
            <NavigationComponents />
            <TableAndCards />
            <Chat />
            <StatusComponents />
          </SpaceBetween>
        }
      />
    </>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
