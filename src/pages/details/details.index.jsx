// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { AppLayout, Container, ContentLayout, Header, SpaceBetween } from '@cloudscape-design/components';
import { BehaviorsTable, Breadcrumbs, OriginsTable, PageHeader, SettingsDetails, TagsTable } from './common-components';
import { Navigation, InfoLink, Notifications } from '../commons/common-components';
import ToolsContent from './components/tools-content';
import { appLayoutLabels } from '../../common/labels';
import '../../styles/base.scss';

const DistSettings = ({ loadHelpPanelContent, isInProgress }) => (
  <Container
    header={
      <Header
        variant="h2"
        info={<InfoLink onFollow={() => loadHelpPanelContent(0)} ariaLabel={'Information about distribution settings.'} />}
      >
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
      <AppLayout
        ref={this.appLayout}
        content={
          <ContentLayout
            header={
              <PageHeader buttons={[{ text: 'Edit' }, { text: 'Delete' }]} loadHelpPanelContent={this.loadHelpPanelContent.bind(this)} />
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
        headerSelector="#header"
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        tools={ToolsContent[this.state.toolsIndex]}
        toolsOpen={this.state.toolsOpen}
        onToolsChange={({ detail }) => this.setState({ toolsOpen: detail.open })}
        contentType="default"
        ariaLabels={appLayoutLabels}
        notifications={<Notifications />}
      />
    );
  }
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
