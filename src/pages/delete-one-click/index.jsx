// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  Button,
  Container,
  ContentLayout,
  Form,
  Header,
  SpaceBetween,
  TagEditor,
} from '@cloudscape-design/components';
import { Navigation, Notifications } from '../commons/common-components';
import { CustomAppLayout } from '../commons/common-components';
import { Breadcrumbs } from '../details/common-components';

import '../../styles/base.scss';

import { tagEditorI18nStrings } from '../../i18n-strings/tag-editor';

async function loadTags() {
  const isUserTag = tag => tag.key.indexOf('aws:') !== 0;
  const mapExistingTag = tag => ({ ...tag, existing: true });

  const { ResourceTagMappingList } = await window.FakeServer.GetResources();
  const tags = ResourceTagMappingList.reduce((tags, resourceTagMapping) => [...tags, ...resourceTagMapping.Tags], [])
    .filter(isUserTag)
    .map(mapExistingTag);

  return tags;
}

function loadTagKeys() {
  return window.FakeServer.GetTagKeys().then(({ TagKeys }) => TagKeys);
}

function loadTagValues(key) {
  return window.FakeServer.GetTagValues(key).then(({ TagValues }) => TagValues);
}

const Info = () => (
  <Alert statusIconAriaLabel="Info">This page illustrates the use of the one-click delete pattern.</Alert>
);

function App() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (loading) {
      loadTags().then(tags => {
        setLoading(false);
        setTags(tags);
      });
    }
  }, [loading]);

  const onChange = ({ detail }) => {
    setTags(detail.tags);
    setIsValid(detail.valid);
  };

  const onSubmit = event => {
    if (isValid) {
      setTags(tags.map(tag => ({ ...tag, existing: true })).filter(tag => !tag.markedForRemoval));
    }
    event.preventDefault();
  };

  const onCancel = () => {
    setLoading(true);
  };

  return (
    <CustomAppLayout
      contentType="form"
      content={
        <ContentLayout header={<Header variant="h1">Manage tags</Header>}>
          <SpaceBetween size="m">
            <Info />
            <form onSubmit={onSubmit}>
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="link" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button variant="primary" disabled={loading || !isValid}>
                      Save changes
                    </Button>
                  </SpaceBetween>
                }
              >
                <Container
                  header={
                    <Header
                      variant="h2"
                      description="A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your AWS costs."
                    >
                      Tags
                    </Header>
                  }
                >
                  <TagEditor
                    tags={tags}
                    onChange={onChange}
                    keysRequest={loadTagKeys}
                    valuesRequest={loadTagValues}
                    loading={loading}
                    i18nStrings={tagEditorI18nStrings}
                  />
                </Container>
              </Form>
            </form>
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      toolsHide={true}
      notifications={<Notifications />}
    />
  );
}

createRoot(document.getElementById('app')).render(<App />);
