// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  PRICE_CLASS_OPTIONS,
  SSL_CERTIFICATE_OPTIONS,
  SUPPORTED_HTTP_VERSIONS_OPTIONS,
  TOOLS_CONTENT,
} from './edit-config';
import {
  BreadcrumbGroup,
  Button,
  Checkbox,
  Container,
  ContentLayout,
  Form,
  Header,
  ExpandableSection,
  Input,
  FormField,
  RadioGroup,
  SpaceBetween,
  Link,
  Textarea,
} from '@cloudscape-design/components';
import { Navigation, CustomAppLayout } from '../commons/common-components';
import { resourceEditBreadcrumbs } from '../../common/breadcrumbs';
import { InfoLink, Notifications } from '../commons/common-components';
import '../../styles/form.scss';

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceEditBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

const DistributionsFooter = props => {
  const [comment, setComment] = useState('');
  const [rootObject, setRootObject] = useState('');
  const [supportedHttpVersions, setSupportedHttpVersions] = useState(SUPPORTED_HTTP_VERSIONS_OPTIONS[0].value);
  const [loggingEnabled, setLoggingEnabled] = useState(false);
  const [ipv6Enabled, setIpv6Enabled] = useState(false);
  return (
    <ExpandableSection headerText="Additional settings" variant="footer">
      <SpaceBetween size="l">
        <FormField
          label="Supported HTTP versions"
          description="Choose the version of the HTTP protocol that you want CloudFront to accept for viewer requests."
          stretch={true}
        >
          <RadioGroup
            items={SUPPORTED_HTTP_VERSIONS_OPTIONS}
            value={supportedHttpVersions}
            onChange={event => setSupportedHttpVersions(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField
          label="Root object"
          info={<InfoLink id="root-info-link" onFollow={() => props.loadHelpPanelContent(3)} />}
          description="Type the name of the object that you want CloudFront to return when a viewer request points to your root URL."
        >
          <Input
            placeholder="index.html"
            value={rootObject}
            onChange={event => setRootObject(event.detail.value)}
            ariaRequired={true}
          />
        </FormField>
        <FormField label="Logging">
          <Checkbox checked={loggingEnabled} onChange={event => setLoggingEnabled(event.detail.checked)}>
            Turn on logging
          </Checkbox>
        </FormField>
        <FormField label="IPv6">
          <Checkbox checked={ipv6Enabled} onChange={event => setIpv6Enabled(event.detail.checked)}>
            Enabled
          </Checkbox>
        </FormField>
        <FormField label="Comment">
          <Textarea value={comment} onChange={({ detail }) => setComment(detail.value)} />
        </FormField>
      </SpaceBetween>
    </ExpandableSection>
  );
};

const Content = props => {
  const [cNames, setCnames] = useState('');
  const [priceClass, setPriceClass] = useState(PRICE_CLASS_OPTIONS[0].value);
  const [tlsCertificate, setTlsCertificate] = useState(SSL_CERTIFICATE_OPTIONS[0].value);
  return (
    <form onSubmit={event => event.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link">Cancel</Button>
            <Button variant="primary">Save changes</Button>
          </SpaceBetween>
        }
      >
        <Container
          header={<Header variant="h2">Distribution settings</Header>}
          footer={<DistributionsFooter loadHelpPanelContent={index => props.loadHelpPanelContent(index)} />}
        >
          <SpaceBetween size="l">
            <FormField label="Price class" stretch={true}>
              <RadioGroup
                items={PRICE_CLASS_OPTIONS}
                value={priceClass}
                onChange={event => setPriceClass(event.detail.value)}
              />
            </FormField>
            <FormField
              label={
                <>
                  Alternative domain names (CNAMEs)<i> - optional</i>
                </>
              }
              info={<InfoLink id="cname-info-link" onFollow={() => props.loadHelpPanelContent(1)} />}
              description="You must list any custom domain names that you use in addition to the CloudFront domain name for the URLs for your files."
              constraintText="Specify up to 100 CNAMEs separated with commas or put each on a new line."
              stretch={true}
            >
              <Textarea
                placeholder="www.one.example.com,www.two.example.com"
                value={cNames}
                onChange={({ detail }) => setCnames(detail.value)}
              />
            </FormField>
            <FormField
              label="SSL/TLS certificate"
              info={<InfoLink id="ssl-info-link" onFollow={() => props.loadHelpPanelContent(2)} />}
              stretch={true}
            >
              <RadioGroup
                items={SSL_CERTIFICATE_OPTIONS}
                value={tlsCertificate}
                onChange={event => setTlsCertificate(event.detail.value)}
                ariaRequired={true}
              />
            </FormField>
            <Button>Request or import a certificate with AWS Certificate Manager (ACM)</Button>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { toolsIndex: 0, toolsOpen: false };
    this.appLayout = createRef();
  }

  loadHelpPanelContent(toolsIndex) {
    this.setState({ toolsIndex, toolsOpen: true });
    this.appLayout.current?.focusToolsClose();
  }

  render() {
    return (
      <CustomAppLayout
        ref={this.appLayout}
        contentType="form"
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                info={
                  <Link id="main-info-link" variant="info" onFollow={() => this.loadHelpPanelContent(0)}>
                    Info
                  </Link>
                }
              >
                Edit SLCCSMWOHOFUY0
              </Header>
            }
          >
            <Content loadHelpPanelContent={index => this.loadHelpPanelContent(index)} />
          </ContentLayout>
        }
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        tools={TOOLS_CONTENT[this.state.toolsIndex]}
        toolsOpen={this.state.toolsOpen}
        onToolsChange={({ detail }) => this.setState({ toolsOpen: detail.open })}
        notifications={<Notifications />}
      />
    );
  }
}

createRoot(document.getElementById('app')).render(<App />);
