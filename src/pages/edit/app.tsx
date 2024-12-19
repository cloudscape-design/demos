// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CustomAppLayout, Navigation } from '../commons/common-components';
import { Notifications } from '../commons/common-components';
import { Breadcrumbs } from './components/breadcrumbs';
import { Content } from './components/content';
import { TOOLS_CONTENT } from './edit-config';

export const App = () => {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);
  const [toolsIndex, setToolsIndex] = React.useState(0);
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const loadHelpPanelContent = (toolsIndex: number) => {
    setToolsIndex(toolsIndex);
    setToolsOpen(true);
    appLayoutRef.current?.focusToolsClose();
  };
  return (
    <CustomAppLayout
      ref={appLayoutRef}
      contentType="form"
      content={
        <form onSubmit={event => event.preventDefault()}>
          <Form
            header={
              <Header
                variant="h1"
                info={
                  <Link id="main-info-link" variant="info" onFollow={() => loadHelpPanelContent(0)}>
                    Info
                  </Link>
                }
              >
                Edit SLCCSMWOHOFUY0
              </Header>
            }
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Save changes</Button>
              </SpaceBetween>
            }
          >
            <Content loadHelpPanelContent={index => loadHelpPanelContent(index)} />
          </Form>
        </form>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      tools={TOOLS_CONTENT[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => {
        setToolsOpen(detail.open);
      }}
      notifications={<Notifications />}
    />
  );
};
