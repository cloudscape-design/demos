// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { BreadcrumbGroup, HelpPanel, Icon } from '@cloudscape-design/components';
import { resourcesBreadcrumbs } from '../../common/breadcrumbs';
import { ExternalLinkItem } from '../commons';

export const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourcesBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export const ToolsContent = () => (
  <HelpPanel
    header={<h2>Distributions</h2>}
    footer={
      <>
        <h3>
          Learn more{' '}
          <span role="img" aria-label="Icon external Link">
            <Icon name="external" />
          </span>
        </h3>
        <ul>
          <li>
            <ExternalLinkItem
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-working-with.html"
              text="Working with distributions"
            />
          </li>
          <li>
            <ExternalLinkItem
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-returned.html"
              text="Values that CloudFront displays on the console"
            />
          </li>
        </ul>
      </>
    }
  >
    <p>
      View your current distributions and related information such as the associated domain names, delivery methods, SSL
      certificates, and more. To drill down even further into the details, choose the name of an individual
      distribution.
    </p>
  </HelpPanel>
);

export const EC2ToolsContent = () => (
  <HelpPanel header={<h2>Instances</h2>}>
    <p>
      View your current instances and related information such as the instance ID, instance type, instance status, and
      more. To drill down even further into the details, select an individual instance.
    </p>
  </HelpPanel>
);
