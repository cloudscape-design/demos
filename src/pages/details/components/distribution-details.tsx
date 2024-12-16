// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CodeView } from '@cloudscape-design/code-view';
import jsonHighlight from '@cloudscape-design/code-view/highlight/json';
import xmlHighlight from '@cloudscape-design/code-view/highlight/xml';
import yamlHighlight from '@cloudscape-design/code-view/highlight/yaml';
import { Container, Header, Tabs } from '@cloudscape-design/components';

import { codeSnippets } from '../details-code-snippets';

export const DistributionDetails = () => {
  return (
    <Container header={<Header variant="h2">Distribution configuration details</Header>}>
      <Tabs
        tabs={[
          {
            label: 'JSON',
            id: 'json',
            content: <CodeView highlight={jsonHighlight} lineNumbers content={codeSnippets.json} />,
          },
          {
            label: 'YAML',
            id: 'yaml',
            content: <CodeView highlight={yamlHighlight} lineNumbers content={codeSnippets.yaml} />,
          },
          {
            label: 'XML',
            id: 'xml',
            content: <CodeView highlight={xmlHighlight} lineNumbers content={codeSnippets.xml} />,
          },
        ]}
      />
    </Container>
  );
};
