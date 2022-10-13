// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Button, Form, Header, SpaceBetween } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import CacheBehaviorPanel from './cache-behavior-panel';
import ContentDeliveryPanel from './content-delivery-panel';
import DistributionsPanel from './distribution-panel';
import OriginPanel from './origin-panel';
import TagsPanel from './tags-panel';

export function FormHeader({ updateTools }) {
  return (
    <Header
      variant="h1"
      info={
        <InfoLink
          id="form-main-info-link"
          onFollow={() => updateTools(0)}
          ariaLabel={'Information about how to create a distribution.'}
        />
      }
      description="When you create an Amazon CloudFront distribution, you tell CloudFront where to find your content by specifying your origin servers."
    >
      Create distribution
    </Header>
  );
}

function BaseFormContent({ content, onCancelClick, errorText = null }) {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button variant="primary">Create distribution</Button>
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

export function FormContent({ updateTools }) {
  return (
    <BaseFormContent
      content={
        <SpaceBetween size="l">
          <ContentDeliveryPanel updateTools={updateTools} />
          <DistributionsPanel updateTools={updateTools} />
          <OriginPanel updateTools={updateTools} />
          <CacheBehaviorPanel updateTools={updateTools} />
          <TagsPanel updateTools={updateTools} />
        </SpaceBetween>
      }
    />
  );
}

export const FormLimitedContent = ({ updateTools, updateDirty, onCancelClick }) => {
  return (
    <BaseFormContent
      onCancelClick={onCancelClick}
      content={<DistributionsPanel updateTools={updateTools} updateDirty={updateDirty} />}
    />
  );
};

export const FormContentReadOnlyWithErrors = ({ updateTools }) => {
  return (
    <BaseFormContent
      content={
        <SpaceBetween size="l">
          <DistributionsPanel updateTools={updateTools} readOnlyWithErrors={true} />
          <OriginPanel updateTools={updateTools} readOnlyWithErrors={true} />
          <CacheBehaviorPanel updateTools={updateTools} readOnlyWithErrors={true} />
          <TagsPanel updateTools={updateTools} readOnlyWithErrors={true} />
        </SpaceBetween>
      }
      errorText="CloudFront can’t create the new distribution because of a permissions problem with your IAM role."
    />
  );
};
