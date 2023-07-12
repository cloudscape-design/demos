// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Container, ContentLayout, Header, SpaceBetween } from '@cloudscape-design/components';
import { BehaviorsTable, Breadcrumbs, OriginsTable, PageHeader, SettingsDetails, TagsTable } from './common-components';
import { Navigation, InfoLink, Notifications, CustomAppLayout } from '../commons/common-components';
import ToolsContent from './tools-content';
import '../../styles/base.scss';

const DistSettings = ({ loadHelpPanelContent, isInProgress }) => (
  <Container
    header={
      <Header variant="h2" info={<InfoLink onFollow={() => loadHelpPanelContent(0)} />}>
        Distribution settings
      </Header>
    }
  >
    <SettingsDetails isInProgress={isInProgress} />
  </Container>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toolsIndex: 0, toolsOpen: false };
    this.appLayout = createRef();
  }

  loadHelpPanelContent(index) {
    this.setState({ toolsIndex: index, toolsOpen: true });
    this.appLayout.current?.focusToolsClose();
  }

  render() {
    return (
      <CustomAppLayout
        ref={this.appLayout}
        content={
          <ContentLayout
            header={
              <PageHeader
                buttons={[{ text: 'Edit' }, { text: 'Delete' }]}
                loadHelpPanelContent={this.loadHelpPanelContent.bind(this)}
              />
            }
          >
            <SpaceBetween size="l">
              <DistSettings isInProgress={true} loadHelpPanelContent={this.loadHelpPanelContent.bind(this)} />
              <OriginsTable />
              <BehaviorsTable />
              <TagsTable loadHelpPanelContent={this.loadHelpPanelContent.bind(this)} />
            </SpaceBetween>
          </ContentLayout>
        }
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        tools={ToolsContent[this.state.toolsIndex]}
        toolsOpen={this.state.toolsOpen}
        onToolsChange={({ detail }) => this.setState({ toolsOpen: detail.open })}
        contentType="default"
        notifications={<Notifications />}
      />
    );
  }
}

createRoot(document.getElementById('app')).render(<App />);
