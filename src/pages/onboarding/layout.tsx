// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Tabs from '@cloudscape-design/components/tabs';
import TutorialPanel from '@cloudscape-design/components/tutorial-panel';

import { CustomAppLayout as AppLayout, Notifications } from '../commons/common-components';
import { helpPanelContent } from './help-panel-content';
import { tutorialPanelI18nStrings } from './i18n';
import { useStore } from './store';

interface CustomAppLayoutProps extends AppLayoutProps {
  initialHelpPanelPage: string;
}

export function CustomAppLayout({ initialHelpPanelPage, ...props }: CustomAppLayoutProps) {
  const { state, actions, appLayoutRef } = useStore();

  useEffect(() => {
    actions.setHelpPanelTopic(initialHelpPanelPage);
    // update only on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tutorialPdfDownloadUrl = window.location.href;

  return (
    <AppLayout
      ref={appLayoutRef}
      navigationOpen={false}
      onNavigationChange={() => {
        /*this functionality is not represented in this demo*/
      }}
      toolsOpen={state.toolsOpen}
      onToolsChange={event => actions.setToolsOpen(event.detail.open)}
      toolsWidth={330}
      notifications={<Notifications />}
      tools={
        <Tabs
          activeTabId={state.toolsTab}
          onChange={event => actions.setToolsTab(event.detail.activeTabId)}
          tabs={[
            { id: 'help-panel', label: 'Info', content: helpPanelContent[state.helpPanelTopic] },
            {
              id: 'tutorials-panel',
              label: 'Tutorials',
              content: (
                <TutorialPanel
                  i18nStrings={tutorialPanelI18nStrings}
                  tutorials={state.tutorials}
                  onFeedbackClick={() => window.prompt('Please enter your feedback here (this will not be saved):')}
                  downloadUrl={tutorialPdfDownloadUrl}
                />
              ),
            },
          ]}
        />
      }
      {...props}
    />
  );
}
