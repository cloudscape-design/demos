// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Header, SpaceBetween } from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
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
    <I18nProvider locale="en" messages={[messages]}>
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
    </I18nProvider>
  );
}

const defaultState = {
  sslCertificate: 'default',
  cloudFrontRootObject: '',
  cloudFrontRootObjectError: '',
  alternativeDomainNames: '',
  alternativeDomainNamesError: '',
  s3BucketSelectedOption: null,
  s3BucketSelectedOptionError: null,
  certificateExpiryDate: '',
  certificateExpiryDateError: '',
  certificateExpiryTime: '',
  certificateExpiryTimeError: '',
  httpVersion: 'http2',
  ipv6isOn: false,
  functions: [],
  functionsError: '',
  functionsFileErrors: [],
  originId: '',
  originIdError: '',
  customHeaders: '',
  customHeadersError: '',
};

const requiredFields = [
  'cloudFrontRootObject',
  's3BucketSelectedOption',
  'certificateExpiryDate',
  'certificateExpiryTime',
  'functions',
  'originId',
  'customHeaders',
];

const getErrorAttribute = attribute => attribute + 'Error';

export function FormContent({ loadHelpPanelContent }) {
  const [data, setData] = useState(defaultState);

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
  const [data, setData] = useState(defaultState);

  useEffect(() => {
    const isDirty = JSON.stringify(data) !== JSON.stringify(defaultState);
    updateDirty(isDirty);
  }, [data]);

  return (
    <BaseFormContent
      onCancelClick={onCancelClick}
      content={<DistributionsPanel loadHelpPanelContent={loadHelpPanelContent} data={data} setData={setData} />}
    />
  );
};

export const FormValidationContent = ({ loadHelpPanelContent, validation = true }) => {
  const [attemptedToSubmit, setAttemptedToSubmit] = useState(false);
  const [formErrorText, setFormErrorText] = useState(null);
  const [data, setData] = useState(defaultState);

  useEffect(() => {
    if (validation && attemptedToSubmit) {
      const newState = { ...data };

      requiredFields.forEach(attribute => {
        const errorAttribute = getErrorAttribute(attribute);
        const { errorText } = validateField(attribute, newState[attribute], attemptedToSubmit, newState[attribute]);
        newState[errorAttribute] = errorText;
      });

      setData(newState);
      focusTopMostError(newState);
      setAttemptedToSubmit(false);
    }
  }, [attemptedToSubmit]);

  const refs = {
    cloudFrontRootRef: useRef(null),
    s3BucketSelectedOptionRef: useRef(null),
    certificateExpiryDateRef: useRef(null),
    certificateExpiryTimeRef: useRef(null),
    functionsRef: useRef(null),
    originIdRef: useRef(null),
    customHeadersRef: useRef(null),
  };

  const focus = ref => ref.current?.focus();

  const focusTopMostError = state => {
    if (state.cloudFrontRootObjectError) {
      focus(refs.cloudFrontRootRef);
      return;
    }

    let hasError = false;

    Object.keys(refs).map(ref => {
      const error = ref.replace('Ref', 'Error');

      if (!hasError && state[error]) {
        if (refs[ref].current?.focus) {
          focus(refs[ref]);
        }
        if (refs[ref].current?.focusAddButton) {
          refs[ref].current?.focusAddButton();
        }
        hasError = true;
        return;
      }
    });
    return;
  };

  return (
    <BaseFormContent
      content={
        <SpaceBetween size="l">
          <DistributionsPanel
            loadHelpPanelContent={loadHelpPanelContent}
            validation={true}
            data={data}
            setData={setData}
            refs={refs}
          />
          <OriginPanel
            loadHelpPanelContent={loadHelpPanelContent}
            validation={true}
            attemptedToSubmit={attemptedToSubmit}
            data={data}
            setData={setData}
            refs={refs}
          />
          <CacheBehaviorPanel loadHelpPanelContent={loadHelpPanelContent} />
          <TagsPanel loadHelpPanelContent={loadHelpPanelContent} />
        </SpaceBetween>
      }
      onSubmitClick={() => {
        setAttemptedToSubmit(true);
        setFormErrorText(
          "CloudFront can't create the new distribution because of a permissions problem with your IAM role."
        );
      }}
      errorText={formErrorText}
    />
  );
};
