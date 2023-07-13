// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, Box, BreadcrumbGroup, ContentLayout, Modal, Button, SpaceBetween } from '@cloudscape-design/components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { resourceCreateBreadcrumbs } from '../../common/breadcrumbs';
import { FormHeader, FormLimitedContent } from '../form/components/form-content';
import ToolsContent from '../form/components/tools-content';
import '../../styles/form.scss';

function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const appLayout = useRef();

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  const onBeforeUnload = evt => {
    if (dirty) {
      // Cancel the event as stated by the standard.
      evt.preventDefault();
      // Chrome requires returnValue to be set.
      evt.returnValue = '';
    }
  };

  const onNavigate = evt => {
    // keep the locked href for our demo pages
    evt.preventDefault();

    if (dirty) {
      setModalVisible(true);
    }
  };

  const loadHelpPanelContent = index => {
    setToolsIndex(index);
    setToolsOpen(true);
    appLayout.current?.focusToolsClose();
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="form"
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <FormHeader loadHelpPanelContent={loadHelpPanelContent} />
              <Alert statusIconAriaLabel="Info" header="Communicate unsaved changes on the page">
                This demo showcases how to communicate to users that the changes will be discarded when they leave the
                page. To see the confirmation modal, make some edits on the form then leave the page. The Cloudscape
                modal will be triggered when you use the buttons/links to exit the form. The browser-native modal will
                be triggered when you close or reload the browser tab.
              </Alert>
            </SpaceBetween>
          }
        >
          <FormLimitedContent
            onCancelClick={onNavigate}
            loadHelpPanelContent={loadHelpPanelContent}
            updateDirty={dirty => setDirty(dirty)}
          />
          <Modal
            visible={modalVisible}
            header="Leave page"
            closeAriaLabel="Close modal"
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="link"
                    onClick={() => {
                      setModalVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary">Leave</Button>
                </SpaceBetween>
              </Box>
            }
          >
            <Alert type="warning" statusIconAriaLabel="Warning">
              Are you sure that you want to leave the current page? The changes that you made won't be saved.
            </Alert>
          </Modal>
        </ContentLayout>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={resourceCreateBreadcrumbs}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
          onFollow={onNavigate}
        />
      }
      navigation={<Navigation activeHref="#/distributions" onFollowHandler={onNavigate} />}
      tools={ToolsContent[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}

createRoot(document.getElementById('app')).render(<App />);
