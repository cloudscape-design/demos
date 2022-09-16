// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppLayout, Container, ContentLayout, Header, SpaceBetween } from '@cloudscape-design/components';
import { BehaviorsTable, Breadcrumbs, OriginsTable, PageHeader, SettingsDetails, TagsTable } from './common-components';
import { Navigation, InfoLink, Notifications } from '../commons/common-components';
import ToolsContent from './components/tools-content';
import { appLayoutLabels } from '../../common/labels';
import '../../styles/base.scss';

const DistSettings = ({ updateTools, isInProgress }) => (
  <Container
    header={
      <Header
        variant="h2"
        info={<InfoLink onFollow={() => updateTools(0)} ariaLabel={'Information about distribution settings.'} />}
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
  }

  updateTools(index) {
    this.setState({ toolsIndex: index, toolsOpen: true });
  }

  render() {
    return (
      <AppLayout
        content={
          <ContentLayout
            header={
              <PageHeader buttons={[{ text: 'Edit' }, { text: 'Delete' }]} updateTools={this.updateTools.bind(this)} />
            }
          >
            <SpaceBetween size="l">
              <DistSettings isInProgress={true} updateTools={this.updateTools.bind(this)} />
              <OriginsTable />
              <BehaviorsTable />
              <TagsTable updateTools={this.updateTools.bind(this)} />
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
