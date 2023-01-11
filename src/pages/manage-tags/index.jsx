// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { Component, createRef } from 'react';
import { createRoot } from 'react-dom/client';

import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Form,
  Header,
  SpaceBetween,
  TagEditor,
} from '@cloudscape-design/components';
import { Navigation, InfoLink, Notifications } from '../commons/common-components';
import { appLayoutLabels } from '../../common/labels';
import { resourceManageTagsBreadcrumbs } from '../../common/breadcrumbs';
import { tagEditor as i18nStrings } from '../../common/i18nStrings';
import ToolsContent from './components/tools-content';

import '../../styles/base.scss';

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceManageTagsBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { toolsIndex: 0, toolsOpen: false, tags: [], valid: true, loading: true };
    this.loadTags();
    this.appLayout = createRef();
  }

  async loadTags() {
    const isUserTag = tag => tag.key.indexOf('aws:') !== 0;
    const mapExistingTag = tag => ({ ...tag, existing: true });

    const { ResourceTagMappingList } = await window.FakeServer.GetResources();
    const tags = ResourceTagMappingList.reduce((tags, resourceTagMapping) => [...tags, ...resourceTagMapping.Tags], [])
      .filter(isUserTag)
      .map(mapExistingTag);

    this.setState({
      loading: false,
      tags,
    });
  }

  onChange({ detail }) {
    const { tags, valid } = detail;
    this.setState({ tags, valid });
  }

  content() {
    const handleInfoClick = () => {
      this.setState({ toolsIndex: 0, toolsOpen: true });
      this.appLayout.current?.focusToolsClose();
    };
    return (
      <ContentLayout header={<Header variant="h1">Manage tags</Header>}>
        <form onSubmit={event => event.preventDefault()}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Save changes</Button>
              </SpaceBetween>
            }
          >
            <Container
              header={
                <Header
                  variant="h2"
                  info={<InfoLink onFollow={handleInfoClick} ariaLabel={'Information about tags.'} />}
                  description="A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your AWS costs."
                >
                  Tags
                </Header>
              }
            >
              <TagEditor
                i18nStrings={i18nStrings}
                tags={this.state.tags}
                onChange={this.onChange.bind(this)}
                keysRequest={() => window.FakeServer.GetTagKeys().then(({ TagKeys }) => TagKeys)}
                valuesRequest={key => window.FakeServer.GetTagValues(key).then(({ TagValues }) => TagValues)}
                loading={this.state.loading}
              />
            </Container>
          </Form>
        </form>
      </ContentLayout>
    );
  }

  render() {
    return (
      <AppLayout
        ref={this.appLayout}
        contentType="form"
        content={this.content()}
        headerSelector="#header"
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        toolsOpen={this.state.toolsOpen}
        onToolsChange={({ detail }) => this.setState({ toolsOpen: detail.open })}
        tools={ToolsContent[this.state.toolsIndex]}
        ariaLabels={appLayoutLabels}
        notifications={<Notifications />}
      />
    );
  }
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
