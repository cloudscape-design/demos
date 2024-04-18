// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Header, SpaceBetween, Link } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import ContentDeliveryPanel from './content-delivery-panel';
import CacheBehaviorPanel from './cache-behavior-panel';
import DistributionsPanel from './distribution-panel';
import OriginPanel from './origin-panel';
import TagsPanel from './tags-panel';
import validateField from '../form-validation-config';

export function FormHeader({ loadHelpPanelContent }) {
  return (
    <Header
      variant="h1"
      info={<InfoLink id="form-main-info-link" onFollow={() => loadHelpPanelContent(0)} />}
      description="When you create an Amazon CloudFront distribution, you tell CloudFront where to find your content by specifying your origin servers."
    >
      Create distribution
    </Header>
  );
}

function BaseFormContent({ content, onCancelClick, errorText = null, onSubmitClick }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (onSubmitClick) {
          onSubmitClick();
        }
      }}
    >
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button data-testid="create" variant="primary">
              Create distribution
            </Button>
          </SpaceBetween>
        }
        errorText={errorText}
        errorIconAriaLabel="Error"
      >
        {content}
      </Form>
    </form>
  );
}

const defaultData = {
  sslCertificate: 'default',
  cloudFrontRootObject: '',
  alternativeDomainNames: '',
  s3BucketSelectedOption: null,
  certificateExpiryDate: '',
  certificateExpiryTime: '',
  httpVersion: 'http2',
  ipv6isOn: false,
  functions: [],
  originId: '',
  customHeaders: [{}],
};
const defaultErrors = {
  cloudFrontRootObject: '',
  alternativeDomainNames: '',
  s3BucketSelectedOption: null,
  certificateExpiryDate: '',
  certificateExpiryTime: '',
  functions: '',
  functionFiles: [],
  originId: '',
  customHeaders: '',
};

const fieldsToValidate = [
  'cloudFrontRootObject',
  's3BucketSelectedOption',
  'alternativeDomainNames',
  'certificateExpiryDate',
  'certificateExpiryTime',
  'functions',
  'originId',
];

export function FormContent({ loadHelpPanelContent }) {
  const [data, setData] = useState(defaultData);

  return (
    <BaseFormContent
      content={
        <SpaceBetween size="l">
          <ContentDeliveryPanel loadHelpPanelContent={loadHelpPanelContent} />
          <DistributionsPanel loadHelpPanelContent={loadHelpPanelContent} data={data} setData={setData} />
          <OriginPanel loadHelpPanelContent={loadHelpPanelContent} data={data} setData={setData} />
          <CacheBehaviorPanel loadHelpPanelContent={loadHelpPanelContent} />
          <TagsPanel loadHelpPanelContent={loadHelpPanelContent} />
        </SpaceBetween>
      }
    />
  );
}

export const FormLimitedContent = ({ loadHelpPanelContent, updateDirty, onCancelClick }) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const isDirty = JSON.stringify(data) !== JSON.stringify(defaultData);
    updateDirty(isDirty);
  }, [data]);

  return (
    <BaseFormContent
      onCancelClick={onCancelClick}
      content={<DistributionsPanel loadHelpPanelContent={loadHelpPanelContent} data={data} setData={setData} />}
    />
  );
};

export const FormValidationContent = ({ loadHelpPanelContent }) => {
  const [formErrorText, setFormErrorText] = useState(null);
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState(defaultErrors);

  const refs = {
    cloudFrontRootObject: useRef(null),
    alternativeDomainNames: useRef(null),
    s3BucketSelectedOption: useRef(null),
    certificateExpiryDate: useRef(null),
    certificateExpiryTime: useRef(null),
    functions: useRef(null),
    originId: useRef(null),
    customHeaders: useRef(null),
  };

  const onSubmit = () => {
    setFormErrorText(
      <>
        You have reached the maximum amount of distributions you can create.{' '}
        <Link external href="#">
          Learn more about distribution limits
        </Link>
      </>
    );

    const newErrors = { ...errors };

    fieldsToValidate.forEach(attribute => {
      const { errorText } = validateField(attribute, data[attribute], data[attribute]);
      newErrors[attribute] = errorText;
    });
    newErrors.customHeaders = validateCustomHeaders();

    setErrors(newErrors);
    focusTopMostError(newErrors);
  };

  const shouldFocus = (errorsState, attribute) => {
    let shouldFocus = errorsState[attribute]?.length > 0;

    if (attribute === 'functions' && !shouldFocus) {
      shouldFocus = errorsState.functionFiles?.length > 0;
    }

    return shouldFocus;
  };

  const focusTopMostError = errorsState => {
    for (const [attribute, ref] of Object.entries(refs)) {
      if (shouldFocus(errorsState, attribute)) {
        if (ref.current?.focus) {
          return ref.current.focus();
        }

        if (ref.current?.focusAddButton) {
          return ref.current.focusAddButton();
        }
      }
    }
  };

  const validateCustomHeaders = () => {
    // Custom header errors are embedded in individual header items
    // customHeadersError here sets errors.customHeaders so that when there are
    // errors on submission, customHeaders is focused
    let customHeadersError = '';

    const validatedItems = data.customHeaders.map(item => {
      const { errorText: keyError } = validateField('customHeaders', item.key, 'name');
      const { errorText: valueError } = validateField('customHeaders', item.value, 'value');

      customHeadersError = keyError || valueError;

      return { ...item, keyError, valueError };
    });

    setData({ ...data, customHeaders: validatedItems });

    return customHeadersError;
  };

  return (
    <BaseFormContent
      content={
        <SpaceBetween size="l">
          <DistributionsPanel
            loadHelpPanelContent={loadHelpPanelContent}
            validation={true}
            data={data}
            errors={errors}
            setData={setData}
            setErrors={setErrors}
            refs={refs}
          />
          <OriginPanel
            loadHelpPanelContent={loadHelpPanelContent}
            validation={true}
            data={data}
            errors={errors}
            setData={setData}
            setErrors={setErrors}
            refs={refs}
          />
          <CacheBehaviorPanel loadHelpPanelContent={loadHelpPanelContent} />
          <TagsPanel loadHelpPanelContent={loadHelpPanelContent} />
        </SpaceBetween>
      }
      onSubmitClick={onSubmit}
      errorText={formErrorText}
    />
  );
};
