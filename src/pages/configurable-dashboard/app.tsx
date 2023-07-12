// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import Board from '@cloudscape-design/board-components/board';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, Notifications, HelpPanelProvider } from '../commons';
import { useLocalStorage } from '../commons/use-local-storage';
import { DashboardHeader, DashboardMainInfo } from '../dashboard/components/header';
import { CustomAppLayout } from '../commons/common-components';
import { EmptyState } from '../dashboard/components/empty-state';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import { getBoardWidgets, getPaletteWidgets, exportLayout } from './widgets';
import Palette from './components/palette';
import { ConfigurableWidget } from './components/configurable-widget';
import { ResetButton } from './components/reset-button';
import { PageBanner } from './components/page-banner';
import { boardI18nStrings } from './i18n-strings';
import { useItemsLayout } from './use-items-layout';

const splitPanelMaxSize = 360;

export function App() {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useLocalStorage('React-ConfigurableDashboard-SplitPanelSize', 360);
  const [ref, layout, setLayout, resetLayout] = useItemsLayout();
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
          <ContentLayout
            header={
              <>
                <DashboardHeader
                  actions={
                    <SpaceBetween size="xs" direction="horizontal">
                      <ResetButton onReset={resetLayout}>Reset to default layout</ResetButton>
                      <Button iconName="add-plus" onClick={() => setSplitPanelOpen(true)}>
                        Add widget
                      </Button>
                    </SpaceBetween>
                  }
                />
                <PageBanner />
              </>
            }
          >
            <div ref={ref}>
              <Board
                empty={
                  <EmptyState
                    title="No widgets"
                    description="There are no widgets on the dashboard."
                    verticalCenter={true}
                    action={
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button onClick={resetLayout}>Reset to default layout</Button>
                        <Button iconName="add-plus" onClick={() => setSplitPanelOpen(true)}>
                          Add widget
                        </Button>
                      </SpaceBetween>
                    }
                  />
                }
                i18nStrings={boardI18nStrings}
                items={getBoardWidgets(layout)}
                onItemsChange={({ detail: { items } }) => {
                  setLayout(exportLayout(items));
                }}
                renderItem={(item, actions) => {
                  const Wrapper = item.data.provider ?? React.Fragment;
                  return (
                    <Wrapper>
                      <ConfigurableWidget config={item.data} onRemove={actions.removeItem} />
                    </Wrapper>
                  );
                }}
              />
            </div>
          </ContentLayout>
        }
        splitPanel={
          <SplitPanel header="Add widgets" closeBehavior="hide" hidePreferencesButton={true}>
            <Palette items={getPaletteWidgets(layout)} />
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
