// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppLayout, BreadcrumbGroup, ContentLayout } from '@cloudscape-design/components';
import { Navigation, Notifications } from '../commons/common-components';
import { appLayoutLabels } from '../../common/labels';
import { resourceCreateBreadcrumbs } from '../../common/breadcrumbs';
import { FormContent, FormHeader } from './components/form-content';
import ToolsContent from './components/tools-content';
import '../../styles/form.scss';

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceCreateBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef()

  const loadHelpPanelContent = index => {
    setToolsIndex(index);
    setToolsOpen(true);
    appLayout.current?.focusToolsClose();
  };

  return (
    <AppLayout
      ref={appLayout}
      contentType="form"
      content={
        <ContentLayout header={<FormHeader loadHelpPanelContent={loadHelpPanelContent} />}>
          <FormContent loadHelpPanelContent={loadHelpPanelContent} />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      tools={ToolsContent[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      ariaLabels={appLayoutLabels}
      notifications={<Notifications />}
    />
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
