// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from '../../common/theme-cw';
applyTheme({ theme: themeCoreConfig });

import { BreadcrumbGroup, Header, SpaceBetween, SplitPanel } from '@cloudscape-design/components';

import { Notifications } from '../commons';
import {
  CustomAppLayout,
  DemoTopNavigation,
  GlobalSplitPanelContent,
  useGlobalSplitPanel,
} from '../commons/common-components';
import ButtonsInputsDropdowns from './buttons-inputs-dropdowns';
import Chat from './chat';
import FormControls from './form-controls';
import Images from './images';
import KvpForm from './kvp-form';
import NavigationComponents from './navigation-components';
import StatusComponents from './status-components';
import TableAndCards from './table-and-cards';
import Typography from './typography';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';

function App() {
  const { splitPanelOpen, onSplitPanelToggle, splitPanelSize, onSplitPanelResize, splitPanelPreferences } =
    useGlobalSplitPanel();

  return (
    <>
      <DemoTopNavigation />
      <CustomAppLayout
        toolsHide={true}
        navigationHide={true}
        contentType="wizard"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Home', href: '#/' },
              { text: 'Design details', href: '#/' },
              { text: 'Components overview', href: '#/components-overview' },
            ]}
          />
        }
        notifications={<Notifications />}
        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={onSplitPanelToggle}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={onSplitPanelResize}
        splitPanelPreferences={splitPanelPreferences}
        splitPanel={
          <SplitPanel header="Design exploration">
            <GlobalSplitPanelContent />
          </SplitPanel>
        }
        content={
          <SpaceBetween direction="vertical" size="xl">
            <Header
              variant="h1"
              description="This page shows a representative subset of Cloudscape components for demonstration purposes. It doesn't include every component permutation, but provides a sample selection to help you see your theme applied across the system."
            >
              Components overview page
            </Header>
            <div id="typography">
              <Typography />
            </div>
            <div id="buttons-inputs-dropdowns">
              <ButtonsInputsDropdowns />
            </div>
            <div id="form-controls">
              <FormControls />
            </div>
            <div id="navigation-components">
              <NavigationComponents />
            </div>
            <div id="table-and-cards">
              <TableAndCards />
            </div>
            <div id="chat">
              <Chat />
            </div>
            <div id="status-components">
              <StatusComponents />
            </div>
            <div id="images">
              <Images />
            </div>
            <div id="kvp-form">
              <KvpForm />
            </div>
          </SpaceBetween>
        }
      />
    </>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
