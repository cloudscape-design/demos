// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import S3ResourceSelector, { S3ResourceSelectorProps } from '@cloudscape-design/components/s3-resource-selector';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { readFromS3Breadcrumbs } from '../../common/breadcrumbs';
import { getItems, requestAsyncRegions, S3FetchError } from '../../common/s3-resource-selector/mock-request';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { ErrorAlert, ErrorAlertError } from './common';

import '../../styles/base.scss';

const DEFAULT_SERVER_ERROR: ErrorAlertError = {
  type: 'error',
  header: 'Unknown Error',
  message: 'Something went wrong',
};

const Breadcrumbs = () => (
  <BreadcrumbGroup items={readFromS3Breadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

function S3ResourceSelectorContainer() {
  const [serverSideError, setServerSideError] = useState<ErrorAlertError>();
  const [resource, setResource] = useState({ uri: '' });
  const [errorText, setErrorText] = useState<string>();
  const [viewHref, setViewHref] = useState('');

  async function fetch(resourceType: S3ResourceSelectorProps.SelectableItems, bucket?: string, path?: string) {
    setServerSideError(undefined);
    try {
      const objects = await getItems(bucket, path);
      if (resourceType === 'buckets') {
        await Promise.all(objects.map(bucket => requestAsyncRegions(bucket)));
      }
      return objects;
    } catch (error) {
      if (error instanceof S3FetchError) {
        setServerSideError(error);
      } else {
        setServerSideError(DEFAULT_SERVER_ERROR);
      }

      throw error;
    }
  }

  //
  // Resource has been confirmed:
  // Modal submit / Version picker selection / Uri input field change event
  //
  const onChange: S3ResourceSelectorProps['onChange'] = ({ detail }) => {
    const { errorText, resource } = detail;
    setErrorText(errorText);
    setResource(resource);
    setViewHref(resource.uri !== '' && !errorText ? 'https://amazons3.demo.s3-resource-selector/test/1' : '');
  };

  return (
    <FormField
      label="Read simulations from S3"
      description="Choose a simulation in Amazon S3. Amazon S3 is object storage built to store and retrieve data. For objects in a bucket with versioning activated, you can choose the most recent or a previous version of the object."
      constraintText="Use s3://bucket/prefix/object format."
      errorText={errorText}
      stretch={true}
    >
      <S3ResourceSelector
        alert={serverSideError && <ErrorAlert error={serverSideError} />}
        resource={resource}
        viewHref={viewHref}
        selectableItemsTypes={['objects', 'versions']}
        objectsIsItemDisabled={object => object.IsFolder === true}
        bucketsVisibleColumns={['Name', 'Region', 'CreationDate']}
        i18nStrings={{ inContextInputPlaceholder: 's3://bucket/prefix/object' }}
        fetchBuckets={() => fetch('buckets')}
        fetchObjects={(bucket, path) => fetch('objects', bucket, path)}
        fetchVersions={(bucket, path) => fetch('versions', bucket, path)}
        onChange={onChange}
      />
    </FormField>
  );
}

export function App() {
  return (
    <CustomAppLayout
      contentType="form"
      content={
        <form onSubmit={event => event.preventDefault()}>
          <Form
            header={<Header variant="h1">Run simulation</Header>}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Run</Button>
              </SpaceBetween>
            }
          >
            <Container header={<Header variant="h2">Simulations</Header>}>
              <S3ResourceSelectorContainer />
            </Container>
          </Form>
        </form>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      toolsHide={true}
      notifications={<Notifications />}
    />
  );
}
