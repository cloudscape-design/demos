// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import { applyTheme } from '@cloudscape-design/components/theming';

import { resourceCreateBreadcrumbs } from '../../common/breadcrumbs';
import customTheme from '../../common/theme-definition';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { FormFull, FormHeader } from './components/form';
import ToolsContent from './components/tools-content';
applyTheme({ theme: customTheme });

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceCreateBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const loadHelpPanelContent = (index: number) => {
    setToolsIndex(index);
    setToolsOpen(true);
    appLayout.current?.focusToolsClose();
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="form"
      content={
        <FormFull
          loadHelpPanelContent={loadHelpPanelContent}
          header={<FormHeader loadHelpPanelContent={loadHelpPanelContent} />}
        />
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      tools={ToolsContent[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}
