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
  FORWARD_HEADER_OPTIONS,
  VIEWER_PROTOCOL_POLICY_OPTIONS,
  CODE_EDITOR_THEMES,
} from '../form-config';
import { InfoLink } from '../../commons/common-components';
import CacheBehaviorFooter from './cache-behavior-footer';

const defaultState = { minimumTtl: 0, maximumTtl: 31536000, defaultTtl: 86400 };

export default function CacheBehaviorPanel({
  loadHelpPanelContent,
  validation,
  errors = {},
  setErrors,
  setData,
  refs,
}) {
  const [minimumTtl, setMinimumTtl] = useState(defaultState.minimumTtl);
  const [maximumTtl, setMaximumTtl] = useState(defaultState.maximumTtl);
  const [defaultTtl, setDefaultTtl] = useState(defaultState.defaultTtl);

  const [viewerProtocolPolicy, setViewerProtocolPolicy] = useState(VIEWER_PROTOCOL_POLICY_OPTIONS[0].value);
  const [allowedHttpMethods, setAllowedHttpMethods] = useState(ALLOWED_HTTP_METHOD_OPTIONS[0].value);
  const [forwardHeaders, setForwardHeaders] = useState(FORWARD_HEADER_OPTIONS[0].value);
  const [ace, setAce] = useState(undefined);
  const [codeEditorLoading, setCodeEditorLoading] = useState(true);
  const [codeEditorValue, setCodeEditorValue] = useState('');
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
    const { value } = e.detail;
    setCodeEditorValue(value);

    if (validation) {
      setData({ codeEditor: value });
      setErrors({ codeEditor: '' });
    }
  };

  const onCodeEditorPreferencesChange = e => {
    setCodeEditorPreferences(e.detail);
  };

  const onSetToDefault = () => {
    setMinimumTtl(defaultState.minimumTtl);
    setMaximumTtl(defaultState.maximumTtl);
    setDefaultTtl(defaultState.defaultTtl);
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
      footer={<CacheBehaviorFooter />}
    >
      <SpaceBetween size="l">
        <FormField label="Viewer protocol policy" stretch={true}>
          <RadioGroup
            items={VIEWER_PROTOCOL_POLICY_OPTIONS}
            value={viewerProtocolPolicy}
            onChange={event => setViewerProtocolPolicy(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Allowed HTTP methods" stretch={true}>
          <RadioGroup
            items={ALLOWED_HTTP_METHOD_OPTIONS}
            value={allowedHttpMethods}
            onChange={event => setAllowedHttpMethods(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Forward headers" description="Cache your objects based on header values." stretch={true}>
          <RadioGroup
            items={FORWARD_HEADER_OPTIONS}
            value={forwardHeaders}
            onChange={event => setForwardHeaders(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Object caching" stretch={true} description="Cache your objects based on header values.">
          <ColumnLayout columns={4}>
            <FormField label="Minimum TTL">
              <Input
                type="number"
                value={minimumTtl}
                onChange={event => setMinimumTtl(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <FormField label="Maximum TTL">
              <Input
                type="number"
                value={maximumTtl}
                onChange={event => setMaximumTtl(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <FormField label="Default TTL">
              <Input
                type="number"
                value={defaultTtl}
                onChange={event => setDefaultTtl(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <div className="custom-header">
              <Button formAction="none" onClick={onSetToDefault}>
                Set to default
              </Button>
            </div>
          </ColumnLayout>
        </FormField>
        <FormField
          label="Create policy"
          description="Create a policy for your cache behavior settings."
          stretch={true}
          errorText={errors.codeEditor}
        >
          <CodeEditor
            ace={ace}
            value={codeEditorValue}
            language="json"
            onChange={onCodeEditorChange}
            preferences={codeEditorPreferences}
            onPreferencesChange={onCodeEditorPreferencesChange}
            loading={codeEditorLoading}
            themes={CODE_EDITOR_THEMES}
            ref={refs?.codeEditor}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
}
