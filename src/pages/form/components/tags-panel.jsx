// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Container, Header, TagEditor } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import { tagEditorI18nStrings } from '../../../i18n-strings/tag-editor';

export default function TagsPanel({ loadHelpPanelContent, refs, setErrors }) {
  const [tags, setTags] = useState([]);

  const onChange = ({ detail }) => {
    const { tags } = detail;
    setTags(tags);

    if (setErrors) {
      setErrors({ tags: !detail.valid ? 'invalid' : '' });
    }
  };

  return (
    <Container
      id="tags-panel"
      header={
        <Header
          variant="h2"
          info={<InfoLink onFollow={() => loadHelpPanelContent(10)} />}
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
        valuesRequest={key => window.FakeServer.GetTagValues(key).then(({ TagValues }) => TagValues)}
        i18nStrings={tagEditorI18nStrings}
        ref={refs?.tags}
      />
    </Container>
  );
}
