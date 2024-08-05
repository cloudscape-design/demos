// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';

import { Breadcrumbs, Notifications, HelpPanelProvider } from '../commons';
import { useLocalStorage } from '../commons/use-local-storage';
import { DashboardMainInfo } from '../dashboard/components/header';
import { CustomAppLayout } from '../commons/common-components';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import { getPaletteWidgets } from './widgets';
import Palette from './components/palette';
import { Content } from './content';
import { StoredWidgetPlacement } from './interfaces';

const splitPanelMaxSize = 360;

export function App() {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useLocalStorage('React-ConfigurableDashboard-SplitPanelSize', 360);
  const [layout, setLayout, resetLayout] = useLocalStorage<ReadonlyArray<StoredWidgetPlacement> | null>(
    'ConfigurableDashboards-widgets-layout',
    null
  );
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <DashboardMainInfo />);

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
            layout={layout}
            setLayout={setLayout}
            resetLayout={resetLayout}
            setSplitPanelOpen={setSplitPanelOpen}
          />
        }
        splitPanel={
          <SplitPanel header="Add widgets" closeBehavior="hide" hidePreferencesButton={true}>
            <Palette items={getPaletteWidgets(layout ?? [])} />
          </SplitPanel>
        }
        splitPanelPreferences={{ position: 'side' }}
        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={event => setSplitPanelSize(Math.min(event.detail.size, splitPanelMaxSize))}
      />
    </HelpPanelProvider>
  );
}
