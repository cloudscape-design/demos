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

function FormActions({ onCancelClick }) {
  return (
    <SpaceBetween direction="horizontal" size="xs">
      <Button variant="link" onClick={onCancelClick}>
        Cancel
      </Button>
      <Button data-testid="create" variant="primary">
        Create distribution
      </Button>
    </SpaceBetween>
  );
}

function BaseForm({ content, onCancelClick, errorText = null, onSubmitClick, header }) {
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
        header={header}
        actions={<FormActions onCancelClick={onCancelClick} />}
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
  codeEditor: '',
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
  codeEditor: '',
  tags: '',
};

const fieldsToValidate = [
  'cloudFrontRootObject',
  's3BucketSelectedOption',
  'alternativeDomainNames',
  'certificateExpiryDate',
  'certificateExpiryTime',
  'functions',
  'originId',
  'codeEditor',
];

export function FormFull({ loadHelpPanelContent, header }) {
  const [data, _setData] = useState(defaultData);
  const setData = (updateObj = {}) => _setData(prevData => ({ ...prevData, ...updateObj }));

  return (
    <BaseForm
      header={header}
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

export const LimitedForm = ({ loadHelpPanelContent, updateDirty, onCancelClick, header }) => {
  const [data, _setData] = useState(defaultData);
  const setData = (updateObj = {}) => _setData(prevData => ({ ...prevData, ...updateObj }));

  useEffect(() => {
    const isDirty = JSON.stringify(data) !== JSON.stringify(defaultData);
    updateDirty(isDirty);
  }, [data]);

  return (
    <BaseForm
      header={header}
      onCancelClick={onCancelClick}
      content={<DistributionsPanel loadHelpPanelContent={loadHelpPanelContent} data={data} setData={setData} />}
    />
  );
};

export const FormWithValidation = ({ loadHelpPanelContent, header }) => {
  const [formErrorText, setFormErrorText] = useState(null);
  const [data, _setData] = useState(defaultData);
  const [errors, _setErrors] = useState(defaultErrors);

  const setErrors = (updateObj = {}) => _setErrors(prevErrors => ({ ...prevErrors, ...updateObj }));
  const setData = (updateObj = {}) => _setData(prevData => ({ ...prevData, ...updateObj }));

  const refs = {
    cloudFrontRootObject: useRef(null),
    alternativeDomainNames: useRef(null),
    s3BucketSelectedOption: useRef(null),
    certificateExpiryDate: useRef(null),
    certificateExpiryTime: useRef(null),
    functions: useRef(null),
    originId: useRef(null),
    customHeaders: useRef(null),
    codeEditor: useRef(null),
    tags: useRef(null),
  };

  const onSubmit = () => {
    setFormErrorText(
      <>
        You have reached the maximum amount of distributions you can create.{' '}
        <Link external variant="primary" href="#">
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

    setData({ customHeaders: validatedItems });

    return customHeadersError;
  };

  return (
    <BaseForm
      header={header}
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
          <CacheBehaviorPanel
            loadHelpPanelContent={loadHelpPanelContent}
            refs={refs}
            validation={true}
            errors={errors}
            setErrors={setErrors}
            setData={setData}
          />
          <TagsPanel loadHelpPanelContent={loadHelpPanelContent} refs={refs} setErrors={setErrors} />
        </SpaceBetween>
      }
      onSubmitClick={onSubmit}
      errorText={formErrorText}
    />
  );
};
