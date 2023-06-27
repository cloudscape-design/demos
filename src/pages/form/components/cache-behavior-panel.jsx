// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import {
  Button,
  CodeEditor,
  ColumnLayout,
  Container,
  Header,
  Input,
  FormField,
  RadioGroup,
  SpaceBetween,
} from '@cloudscape-design/components';
import {
  ALLOWED_HTTP_METHOD_OPTIONS,
  CODE_EDITOR_I18N_STRINGS,
  FORWARD_HEADER_OPTIONS,
  VIEWER_PROTOCOL_POLICY_OPTIONS,
} from '../form-config';
import { InfoLink } from '../../commons/common-components';
import CacheBehaviorFooter from './cache-behavior-footer';

export default function CacheBehaviorPanel({ loadHelpPanelContent, readOnlyWithErrors = false }) {
  const [minimumTtl, setMinimumTtl] = useState(0);
  const [maximumTtl, setMaximumTtl] = useState(31536000);
  const [defaultTtl, setDefaultTtl] = useState(86400);

  const [viewerProtocolPolicy, setViewerProtocolPolicy] = useState(VIEWER_PROTOCOL_POLICY_OPTIONS[0].value);
  const [allowedHttpMethods, setAllowedHttpMethods] = useState(ALLOWED_HTTP_METHOD_OPTIONS[0].value);
  const [forwardHeaders, setForwardHeaders] = useState(FORWARD_HEADER_OPTIONS[0].value);
  const [ace, setAce] = useState(undefined);
  const [codeEditorLoading, setCodeEditorLoading] = useState(true);
  const [codeEditorValue, setCodeEditorValue] = useState(readOnlyWithErrors ? '{ invalidJson }' : '');
  const [codeEditorPreferences, setCodeEditorPreferences] = useState(undefined);

  useEffect(() => {
    setCodeEditorLoading(true);
    import('ace-builds').then(ace => {
      ace.config.set('basePath', './libs/ace/');
      setAce(ace);
      setCodeEditorLoading(false);
    });
  }, []);

  const onCodeEditorChange = e => {
    !readOnlyWithErrors && setCodeEditorValue(e.detail.value);
  };

  const onCodeEditorPreferencesChange = e => {
    !readOnlyWithErrors && setCodeEditorPreferences(e.detail);
  };

  return (
    <Container
      id="cache-behavior-panel"
      className="custom-screenshot-hide"
      header={
        <Header variant="h2" info={<InfoLink onFollow={() => loadHelpPanelContent(9)} />}>
          Cache behavior settings
        </Header>
      }
      footer={<CacheBehaviorFooter readOnlyWithErrors={readOnlyWithErrors} />}
    >
      <SpaceBetween size="l">
        <FormField label="Viewer protocol policy" stretch={true}>
          <RadioGroup
            items={VIEWER_PROTOCOL_POLICY_OPTIONS}
            value={viewerProtocolPolicy}
            onChange={event => !readOnlyWithErrors && setViewerProtocolPolicy(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Allowed HTTP methods" stretch={true}>
          <RadioGroup
            items={ALLOWED_HTTP_METHOD_OPTIONS}
            value={allowedHttpMethods}
            onChange={event => !readOnlyWithErrors && setAllowedHttpMethods(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Forward headers" description="Cache your objects based on header values." stretch={true}>
          <RadioGroup
            items={FORWARD_HEADER_OPTIONS}
            value={forwardHeaders}
            onChange={event => !readOnlyWithErrors && setForwardHeaders(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Object caching" stretch={true} description="Cache your objects based on header values.">
          <ColumnLayout columns={4}>
            <FormField label="Minimum TTL">
              <Input
                type="number"
                value={minimumTtl}
                onChange={event => !readOnlyWithErrors && setMinimumTtl(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <FormField label="Maximum TTL">
              <Input
                type="number"
                value={maximumTtl}
                onChange={event => !readOnlyWithErrors && setMaximumTtl(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <FormField label="Default TTL">
              <Input
                type="number"
                value={defaultTtl}
                onChange={event => !readOnlyWithErrors && setDefaultTtl(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <div className="custom-header">
              <Button>Set to default</Button>
            </div>
          </ColumnLayout>
        </FormField>
        <FormField label="Create policy" description="Create a policy for your cache behavior settings." stretch={true}>
          <CodeEditor
            ace={ace}
            value={codeEditorValue}
            language="json"
            onChange={onCodeEditorChange}
            preferences={codeEditorPreferences}
            onPreferencesChange={onCodeEditorPreferencesChange}
            loading={codeEditorLoading}
            i18nStrings={CODE_EDITOR_I18N_STRINGS}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
}
