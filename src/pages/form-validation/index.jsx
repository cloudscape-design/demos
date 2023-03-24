// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, AppLayout, BreadcrumbGroup, ContentLayout, Link, SpaceBetween } from '@cloudscape-design/components';
import { Navigation, Notifications } from '../commons/common-components';
import { appLayoutAriaLabels } from '../../i18n-strings';
import { resourceCreateBreadcrumbs } from '../../common/breadcrumbs';
import { FormContentReadOnlyWithErrors, FormHeader } from '../form/components/form-content';
import ToolsContent from '../form/components/tools-content';
import '../../styles/form.scss';

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceCreateBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

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
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <FormHeader loadHelpPanelContent={loadHelpPanelContent} />
              <Alert statusIconAriaLabel="Info" header="Read-only form validation">
                This demo showcases a read-only form validation by marking any fields that contain an error and display
                an error message under the field.
              </Alert>
            </SpaceBetween>
          }
        >
          <FormContentReadOnlyWithErrors loadHelpPanelContent={loadHelpPanelContent} />
        </ContentLayout>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      tools={ToolsContent[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      ariaLabels={appLayoutAriaLabels}
      notifications={<Notifications />}
    />
  );
}

createRoot(document.getElementById('app')).render(<App />);
