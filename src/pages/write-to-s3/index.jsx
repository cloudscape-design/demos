// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import {
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Form,
  Header,
  FormField,
  SpaceBetween,
  S3ResourceSelector,
} from '@cloudscape-design/components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { writeToS3Breadcrumbs } from '../../common/breadcrumbs';
import { getItems, requestAsyncAttribute } from '../../common/s3-resource-selector/mock-request';
import { ErrorAlert } from '../read-from-s3/common';

import '../../styles/base.scss';

const i18nStringsWriteMode = {
  modalTitle: 'Choose destination for simulations',
  inContextInputPlaceholder: 's3://bucket/prefix',
};

const Breadcrumbs = () => (
  <BreadcrumbGroup items={writeToS3Breadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

class S3ResourceSelectorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverSideError: null,
      resource: { uri: '' },
      alert: null,
      errorText: null,
      viewHref: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  async fetch(resourceType, bucket, path) {
    this.setState({ serverSideError: null });

    try {
      const result = await getItems(resourceType, bucket, path);
      if (resourceType === 'buckets') {
        await Promise.all(result.map(bucket => requestAsyncAttribute(bucket, 'Region')));
      }
      return result;
    } catch (error) {
      this.setState({
        serverSideError: error,
      });
      throw error;
    }
  }

  //
  // Resource has been confirmed:
  // Modal submit / Version picker selection / Uri input field change event
  //
  onChange({ detail }) {
    const { resource, errorText } = detail;

    this.setState({
      errorText,
      resource,
      viewHref: resource.uri !== '' && !errorText ? 'https://amazons3.demo.s3-resource-selector/test/1' : '',
    });
  }

  render() {
    const { errorText, resource, serverSideError, viewHref } = this.state;
    const s3ResourceSelectorProps = {
      alert: serverSideError && <ErrorAlert error={serverSideError} />,
      resource: resource,
      viewHref: viewHref,
      selectableItemsTypes: ['buckets', 'objects'],
      objectsIsItemDisabled: object => !object.IsFolder,
      bucketsVisibleColumns: ['Name', 'Region', 'CreationDate'],
      i18nStrings: i18nStringsWriteMode,
      fetchBuckets: () => this.fetch('buckets'),
      fetchObjects: (bucket, path) => this.fetch('objects', bucket, path),
      fetchVersions: (bucket, path) => this.fetch('versions', bucket, path),
      onChange: this.onChange,
    };
    return (
      <FormField
        label="Write simulations to S3"
        description="Enter a destination in Amazon S3 where your simulation will be stored. Amazon S3 is object storage built to store and retrieve data."
        constraintText="Use s3://bucket/prefix format."
        errorText={errorText}
        stretch={true}
        i18nStrings={{ errorIconAriaLabel: 'Error' }}
      >
        <S3ResourceSelector {...s3ResourceSelectorProps} />
      </FormField>
    );
  }
}

class App extends Component {
  content() {
    return (
      <ContentLayout header={<Header variant="h1">Create simulation</Header>}>
        <form onSubmit={event => event.preventDefault()}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Create</Button>
              </SpaceBetween>
            }
          >
            <Container header={<Header variant="h2">Simulations</Header>}>
              <S3ResourceSelectorContainer />
            </Container>
          </Form>
        </form>
      </ContentLayout>
    );
  }

  render() {
    return (
      <CustomAppLayout
        contentType="form"
        content={this.content()}
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        toolsHide={true}
        notifications={<Notifications />}
      />
    );
  }
}

createRoot(document.getElementById('app')).render(<App />);
