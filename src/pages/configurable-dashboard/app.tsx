// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { DashboardMainInfo } from '../dashboard/components/header';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import Palette from './components/palette';
import { Content } from './content';
import { StoredWidgetPlacement } from './interfaces';
import { allWidgets, getPaletteWidgets } from './widgets';

const supportedWidgets = new Set(Object.keys(allWidgets));

export function App() {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useLocalStorage('React-ConfigurableDashboard-SplitPanelSize', 360);
  const [layout, setLayout, resetLayout] = useLocalStorage<ReadonlyArray<StoredWidgetPlacement>>(
    'ConfigurableDashboards-widgets-layout',
  );
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <DashboardMainInfo />);
  // some deleted/unavailable widgets might be dangling in localStorage, therefore we need to filter them
  const filteredLayout = layout?.filter(item => supportedWidgets.has(item.id));

  const loadHelpPanelContent = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayoutRef.current?.focusToolsClose();
  };

  return (
    <HelpPanelProvider value={loadHelpPanelContent}>
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
            setSplitPanelOpen={setSplitPanelOpen}
          />
        }
        splitPanel={
          <SplitPanel header="Add widgets" closeBehavior="hide" hidePreferencesButton={true}>
            <Palette items={getPaletteWidgets(filteredLayout ?? [])} />
          </SplitPanel>
        }
        splitPanelPreferences={{ position: 'side' }}
        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={event => setSplitPanelSize(event.detail.size)}
      />
    </HelpPanelProvider>
  );
}
