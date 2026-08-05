// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import List from '@cloudscape-design/components/list';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ReactComponent as DiagramDark } from '../../resources/landing-page/cloudfront-diagram-dark.svg';
import { ReactComponent as DiagramLight } from '../../resources/landing-page/cloudfront-diagram-light.svg';
import {
  CustomAppLayout,
  ExternalLink,
  ExternalLinkGroup,
  Navigation,
  Notifications,
} from '../commons/common-components';

import '../../styles/landing-page.scss';

const cloudfrontDistributions = [{ value: '1', label: 'Web delivery method' }];

const Content = () => {
  const [selectedOption, setSelectedOption] = React.useState<SelectProps.Option>(cloudfrontDistributions[0]);
  return (
    <Box margin={{ bottom: 'l' }}>
      <div className="custom-home__header">
        <Box padding={{ vertical: 'xxxl', horizontal: 's' }}>
          <div className="custom-home__grid-container">
            <Grid
              disableGutters
              gridDefinition={[
                { offset: { l: 2, xxs: 1 }, colspan: { l: 8, xxs: 10 } },
                { colspan: { xl: 6, l: 5, s: 6, xxs: 10 }, offset: { l: 2, xxs: 1 } },
                { colspan: { xl: 2, l: 3, s: 4, xxs: 10 }, offset: { s: 0, xxs: 1 } },
              ]}
            >
              <Box fontWeight="light" padding={{ top: 'xs' }}>
                <div className="custom-home__category">Networking &amp; Content Delivery</div>
              </Box>
              <div className="custom-home__header-title">
                <Box variant="h1" fontWeight="heavy" padding="n" fontSize="display-l" color="inherit">
                  Amazon CloudFront
                </Box>
                <Box fontWeight="light" padding={{ bottom: 's' }} fontSize="display-l" color="inherit">
                  Fast and reliable delivery of your static content
                </Box>
                <Box variant="p" fontWeight="light">
                  <span className="custom-home__header-sub-title">
                    Amazon CloudFront is a global content delivery network service (CDN) that accelerates delivery of
                    your websites, APIs, video content or other web assets through CDN caching.
                  </span>
                </Box>
              </div>
              <div className="custom-home__header-cta">
                <Container>
                  <SpaceBetween size="xl">
                    <Box variant="h2" padding="n">
                      Create distribution
                    </Box>
                    <FormField stretch={true} label="Delivery method">
                      <Select
                        selectedAriaLabel="Selected"
                        options={cloudfrontDistributions}
                        selectedOption={selectedOption}
                        ariaRequired={true}
                        onChange={e => setSelectedOption(e.detail.selectedOption)}
                      />
                    </FormField>
                    <Button href="#" variant="primary">
                      Next step
                    </Button>
                  </SpaceBetween>
                </Container>
              </div>
            </Grid>
          </div>
        </Box>
      </div>

      <Box padding={{ top: 'xxxl', horizontal: 's' }}>
        <div className="custom-home__grid-container">
          <Grid
            disableGutters
            gridDefinition={[
              { colspan: { xl: 6, l: 5, s: 6, xxs: 10 }, offset: { l: 2, xxs: 1 } },
              { colspan: { xl: 2, l: 3, s: 4, xxs: 10 }, offset: { s: 0, xxs: 1 } },
            ]}
          >
            <div className="custom-home__main-content">
              <SpaceBetween size="xxl">
                <div>
                  <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'n' }}>
                    How it works
                  </Box>
                  <Container>
                    <div
                      role="img"
                      aria-label="End user traffic enters the nearest AWS Edge Location protected by AWS Shield and AWS WAF before it passes through Regional Edge Caches and Origin Shield to the Application Content Origin"
                    >
                      <div className="awsui-util-hide-in-dark-mode" aria-hidden="true">
                        <DiagramLight />
                      </div>
                      <div className="awsui-util-show-in-dark-mode" aria-hidden="true">
                        <DiagramDark />
                      </div>
                    </div>
                  </Container>
                </div>

                <div>
                  <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'n' }}>
                    Benefits and features
                  </Box>
                  <Container>
                    <ColumnLayout columns={2} variant="text-grid">
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          CloudFront console
                        </Box>
                        <Box variant="p">
                          Create, monitor, and manage your content delivery with a few simple clicks on the CloudFront
                          console.
                        </Box>
                      </div>
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Static and dynamic content
                        </Box>
                        <Box variant="p">
                          Deliver both static content and dynamic content that you can personalize for individual users.
                        </Box>
                      </div>
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Reporting and analytics
                        </Box>
                        <Box variant="p">
                          Get detailed cache statistics reports, monitor your CloudFront usage in near real-time, track
                          your most popular objects, and set alarms on operational metrics.
                        </Box>
                      </div>
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Tools and libraries
                        </Box>
                        <Box variant="p">
                          Take advantage of a variety of tools and libraries for managing your CloudFront distribution,
                          like the CloudFront API, the AWS Command Line Interface (AWS CLI), and the AWS SDKs.
                        </Box>
                      </div>
                    </ColumnLayout>
                  </Container>
                </div>
                <div>
                  <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'n' }}>
                    Use cases
                  </Box>
                  <Container>
                    <ColumnLayout columns={2} variant="text-grid">
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Configure multiple origins
                        </Box>
                        <Box variant="p">
                          Configure multiple origin servers and multiple cache behaviors based on URL path patterns on
                          your website. Use AWS origins such as Amazon S3 or Elastic Load Balancing, and add your own
                          custom origins to the mix.
                        </Box>
                        <Link
                          external={true}
                          href="#"
                          ariaLabel="Learn more about multiple origins configuration, opens in new tab"
                          variant="primary"
                        >
                          Learn more
                        </Link>
                      </div>
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Deliver streaming video
                        </Box>
                        <Box variant="p">
                          Use CloudFront to deliver on-demand video without the need to set up or operate any media
                          servers. CloudFront supports multiple protocols for media streaming.
                        </Box>
                        <Link
                          external={true}
                          href="#"
                          ariaLabel="Learn more about video streaming with CloudFront, opens in new tab"
                          variant="primary"
                        >
                          Learn more
                        </Link>
                      </div>
                    </ColumnLayout>
                  </Container>
                </div>
                <div>
                  <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'n' }}>
                    Related services
                  </Box>
                  <Container>
                    <ColumnLayout columns={2} variant="text-grid">
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Amazon S3
                        </Box>
                        <Box variant="p">Use Amazon S3 to store the content that CloudFront delivers.</Box>
                        <Link
                          external={true}
                          href="#"
                          ariaLabel="Learn more about Amazon S3, opens in new tab"
                          variant="primary"
                        >
                          Learn more
                        </Link>
                      </div>
                      <div>
                        <Box variant="h3" padding={{ top: 'n' }}>
                          Amazon Route 53
                        </Box>
                        <Box variant="p">
                          Use Amazon Route 53 to route DNS queries for your domain name to your CloudFront distribution.
                        </Box>
                        <Link
                          external={true}
                          href="#"
                          ariaLabel="Learn more about Amazon Route 53, opens in new tab"
                          variant="primary"
                        >
                          Learn more
                        </Link>
                      </div>
                    </ColumnLayout>
                  </Container>
                </div>
              </SpaceBetween>
            </div>
            <div className="custom-home__sidebar">
              <SpaceBetween size="xxl">
                <Container header={<Header variant="h2">Pricing (US)</Header>}>
                  <List
                    ariaLabel="Pricing details"
                    disablePaddings
                    items={[
                      {
                        scale: '10 TB',
                        price: 0.085,
                      },
                      {
                        scale: '100 TB',
                        price: 0.065,
                      },
                      {
                        scale: '524 TB',
                        price: 0.035,
                      },
                      {
                        scale: '4 PB',
                        price: 0.025,
                      },
                      {
                        link: 'Cost calculator',
                      },
                    ]}
                    renderItem={item => ({
                      id: item.scale || item.link!,
                      content: item.scale ? (
                        `${item.scale}/month`
                      ) : (
                        <ExternalLink variant="primary">{item.link}</ExternalLink>
                      ),
                      actions: item.price ? (
                        <Box variant="span" color="text-body-secondary">
                          ${item.price} per GB
                        </Box>
                      ) : null,
                    })}
                  />
                </Container>

                <ExternalLinkGroup
                  header="Getting started"
                  groupAriaLabel="Getting started documentation, Links open in a new tab"
                  variant="container"
                  items={[
                    {
                      href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html',
                      text: 'What is Amazon CloudFront?',
                    },
                    {
                      href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html',
                      text: 'Getting started with CloudFront',
                    },
                    {
                      href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-working-with.html',
                      text: 'Working with CloudFront distributions',
                    },
                  ]}
                />

                <ExternalLinkGroup
                  header="More resources"
                  groupAriaLabel="Additional resource links, Links open in a new tab"
                  variant="container"
                  items={[
                    { href: 'https://aws.amazon.com/documentation/cloudfront/', text: 'Documentation' },
                    { href: '#', text: 'FAQ' },
                    { href: '#', text: 'CloudFront forum' },
                    { href: '#', text: 'Contact us' },
                  ]}
                />
              </SpaceBetween>
            </div>
          </Grid>
        </div>
      </Box>
    </Box>
  );
};

export function App() {
  const [navigationOpen, setNavigationOpen] = React.useState(false);
  return (
    <CustomAppLayout
      disableContentPaddings={true}
      content={<Content />}
      navigation={<Navigation activeHref="#/" />}
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      toolsHide={true}
      notifications={<Notifications />}
      headerVariant="high-contrast"
    />
  );
}
