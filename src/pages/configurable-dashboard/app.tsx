// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import {
  CustomAppLayout,
  DemoTopNavigation,
  GlobalSplitPanelContent,
  useGlobalSplitPanel,
} from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { DashboardMainInfo } from '../dashboard/components/header';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import { Content } from './content';
import { StoredWidgetPlacement } from './interfaces';
import { allWidgets } from './widgets';

import '../../styles/top-navigation.scss';

const supportedWidgets = new Set(Object.keys(allWidgets));

export function App() {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  const [toolsOpen, setToolsOpen] = useState(false);
  const [layout, setLayout, resetLayout] = useLocalStorage<ReadonlyArray<StoredWidgetPlacement>>(
    'ConfigurableDashboards-widgets-layout',
  );
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <DashboardMainInfo />);
  // some deleted/unavailable widgets might be dangling in localStorage, therefore we need to filter them
  const filteredLayout = layout?.filter(item => supportedWidgets.has(item.id));

  const {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize: globalSplitPanelSize,
    onSplitPanelResize,
    splitPanelPreferences,
  } = useGlobalSplitPanel();

  const loadHelpPanelContent = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayoutRef.current?.focusToolsClose();
  };

  return (
    <HelpPanelProvider value={loadHelpPanelContent}>
      <>
        <DemoTopNavigation />
        <CustomAppLayout
          ref={appLayoutRef}
          contentType="dashboard"
          breadcrumbs={<Breadcrumbs items={[{ text: 'Dashboard', href: '#/' }]} />}
          navigation={<DashboardSideNavigation />}
          toolsOpen={toolsOpen}
          tools={toolsContent}
          onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          notifications={<Notifications />}
          content={
            <Content
              layout={filteredLayout ?? null}
              setLayout={setLayout}
              resetLayout={resetLayout}
              setSplitPanelOpen={() => {
                /* noop */
              }}
            />
          }
          splitPanel={
            <SplitPanel header="Design exploration">
              <GlobalSplitPanelContent />
            </SplitPanel>
          }
          splitPanelPreferences={splitPanelPreferences}
          splitPanelOpen={splitPanelOpen}
          onSplitPanelToggle={onSplitPanelToggle}
          splitPanelSize={globalSplitPanelSize}
          onSplitPanelResize={onSplitPanelResize}
        />
      </>
    </HelpPanelProvider>
  );
}
