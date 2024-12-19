// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { BehaviorsTable } from './components/behaviors-table';
import { Breadcrumbs } from './components/breadcrumbs';
import { DistSettings } from './components/dist-settings';
import { DistributionDetails } from './components/distribution-details';
import { OriginsTable } from './components/origins-table';
import { PageHeader } from './components/page-header';
import { TagsTable } from './components/tags-table';
import ToolsContent from './tools-content';

export function App() {
  const [toolsIndex, setToolsIndex] = useState<number>(0);
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const loadHelpPanelContent = (index: number): void => {
    setToolsIndex(index);
    setToolsOpen(true);
    appLayout.current?.focusToolsClose();
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      content={
        <SpaceBetween size="m">
          <PageHeader
            buttons={[
              { text: 'Edit', itemType: 'action', id: 'edit' },
              { text: 'Delete', itemType: 'action', id: 'delete' },
            ]}
          />
          <SpaceBetween size="l">
            <DistSettings isInProgress={true} loadHelpPanelContent={loadHelpPanelContent} />
            <OriginsTable />
            <BehaviorsTable />
            <TagsTable loadHelpPanelContent={loadHelpPanelContent} />
            <DistributionDetails />
          </SpaceBetween>
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      tools={ToolsContent[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: { open: boolean } }) => setToolsOpen(detail.open)}
      contentType="default"
      notifications={<Notifications />}
    />
  );
}
