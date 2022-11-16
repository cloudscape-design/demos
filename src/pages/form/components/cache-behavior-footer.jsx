// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import {
  Box,
  Button,
  ExpandableSection,
  FormField,
  Input,
  Checkbox,
  RadioGroup,
  ColumnLayout,
  SpaceBetween,
} from '@cloudscape-design/components';
import { COOKIE_OPTIONS, CURRENT_COMPRESSION_OPTIONS, QUERY_STRING_OPTIONS } from '../form-config';

export default function CacheBehaviorFooter({ readOnlyWithErrors = false }) {
  const [lambdaType, setLambdaType] = useState('');
  const [lambdaArn, setLambdaArn] = useState('');
  const [cookies, setCookies] = useState(COOKIE_OPTIONS[0].value);
  const [queryStringSettings, setQueryStringSettings] = useState(QUERY_STRING_OPTIONS[0].value);
  const [smoothStreaming, setSmoothStreaming] = useState(false);
  const [requireSignature, setRequireSignature] = useState(false);
  const [compressionMode, setCompressionMode] = useState(CURRENT_COMPRESSION_OPTIONS[0].value);

  const changeHandler = (callBackFn, value) => {
    if (readOnlyWithErrors) {
      return;
    }
    callBackFn(value);
  };

  return (
    <ExpandableSection headerText="Additional settings" variant="footer">
      <SpaceBetween size="l">
        <div>
          <Box variant="awsui-key-label">Path pattern</Box>
          <div>Default (*)</div>
        </div>
        <FormField
          label="Cookies"
          description="Include all user cookies in the request URLs that it forwards to your origin."
          stretch={true}
        >
          <RadioGroup
            items={COOKIE_OPTIONS}
            value={cookies}
            onChange={event => changeHandler(setCookies, event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField
          label="Query string forwarding and caching"
          description="Query string parameters you want CloudFront to forward to the origin."
          stretch={true}
        >
          <RadioGroup
            items={QUERY_STRING_OPTIONS}
            value={queryStringSettings}
            onChange={event => changeHandler(setQueryStringSettings, event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Smooth Streaming">
          <Checkbox
            checked={smoothStreaming}
            onChange={event => changeHandler(setSmoothStreaming, event.detail.checked)}
          >
            Turn on Microsoft Smooth Streaming
          </Checkbox>
        </FormField>
        <FormField label="Viewer access">
          <Checkbox
            checked={requireSignature}
            onChange={event => changeHandler(setRequireSignature, event.detail.checked)}
          >
            Require signed URL or signed cookie
          </Checkbox>
        </FormField>
        <FormField label="Content compression" stretch={true}>
          <RadioGroup
            items={CURRENT_COMPRESSION_OPTIONS}
            value={compressionMode}
            onChange={event => changeHandler(setCompressionMode, event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField
          label={<Box variant="h3">Lambda functions</Box>}
          description="These functions run in response to CloudFront events."
          stretch={true}
        >
          <ColumnLayout columns={3}>
            <FormField label="Type">
              <Input
                ariaRequired={true}
                value={lambdaType}
                onChange={event => changeHandler(setLambdaType, event.detail.value)}
              />
            </FormField>
            <FormField label="ARN">
              <Input
                ariaRequired={true}
                value={lambdaArn}
                onChange={event => changeHandler(setLambdaArn, event.detail.value)}
              />
            </FormField>
            <div className="custom-header">
              <Button>Add lambda function</Button>
            </div>
          </ColumnLayout>
        </FormField>
      </SpaceBetween>
    </ExpandableSection>
  );
}
