// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import {
  AppLayoutProps,
  BreadcrumbGroup,
  Button,
  Container,
  Form,
  Header,
  NonCancelableCustomEvent,
  SpaceBetween,
  TagEditor,
  TagEditorProps,
} from '@cloudscape-design/components';

import { resourceManageTagsBreadcrumbs } from '../../common/breadcrumbs';
import { tagEditorI18nStrings } from '../../i18n-strings/tag-editor';
import { TagsResource } from '../../resources/types';
import { CustomAppLayout, InfoLink, Navigation, Notifications } from '../commons/common-components';
import ToolsContent from './components/tools-content';

import '../../styles/base.scss';

type Tag = TagsResource['resourceTags'][number];

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceManageTagsBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [tags, setTags] = useState<TagEditorProps.Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  async function loadTags() {
    const isUserTag = (tag: Tag) => tag.key.indexOf('aws:') !== 0;
    const mapExistingTag = (tag: Tag) => ({ ...tag, existing: true });

    const { ResourceTagMappingList } = await window.FakeServer.GetResources();
    const tags = ResourceTagMappingList.reduce<Tag[]>(
      (tags, resourceTagMapping) => [...tags, ...resourceTagMapping.Tags],
      []
    )
      .filter(isUserTag)
      .map(mapExistingTag);

    setLoading(false);
    setTags(tags);
  }

  useEffect(() => {
    loadTags();
  }, []);

  function onChange({ detail }: NonCancelableCustomEvent<TagEditorProps.ChangeDetail>) {
    const { tags } = detail;
    setTags([...tags]);
  }

  function handleInfoClick() {
    setToolsIndex(0);
    setToolsOpen(true);
    appLayoutRef.current?.focusToolsClose();
  }

  return (
    <CustomAppLayout
      ref={appLayoutRef}
      contentType="form"
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      tools={ToolsContent[toolsIndex]}
      notifications={<Notifications />}
      content={
        <SpaceBetween size="m">
          <Header variant="h1">Manage tags</Header>
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
                    info={<InfoLink onFollow={handleInfoClick} />}
                    description="A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your AWS costs."
                  >
                    Tags
                  </Header>
                }
              >
                <TagEditor
                  tags={tags}
                  onChange={onChange}
                  keysRequest={() => window.FakeServer.GetTagKeys().then(({ TagKeys }) => TagKeys)}
                  valuesRequest={key =>
                    window.FakeServer.GetTagValues(key as keyof TagsResource['valueMap']).then(
                      ({ TagValues }) => TagValues
                    )
                  }
                  loading={loading}
                  i18nStrings={tagEditorI18nStrings}
                />
              </Container>
            </Form>
          </form>
        </SpaceBetween>
      }
    />
  );
}
