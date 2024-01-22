// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, BreadcrumbGroup, Button, HelpPanel, SpaceBetween } from '@cloudscape-design/components';
import formatDate from 'date-fns/format';
import { resourcesBreadcrumbs } from '../../common/breadcrumbs';
import { ExternalLinkGroup } from '../commons';

export const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourcesBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export const ToolsContent = () => (
  <HelpPanel
    header={<h2>Distributions</h2>}
    footer={
      <ExternalLinkGroup
        items={[
          {
            href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-working-with.html',
            text: 'Working with distributions',
          },
          {
            href: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-returned.html',
            text: 'Values that CloudFront displays on the console',
          },
        ]}
      />
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

export const ManualRefresh = ({ onRefresh, loading, lastRefresh, disabled }) => {
  return (
    <SpaceBetween data-testid="manual-refresh" direction="horizontal" size="xs" alignItems="center">
      {lastRefresh && (
        <Box variant="p" fontSize="body-s" padding="n" color="text-status-inactive" textAlign="right">
          <span aria-live="polite" aria-atomic="true">
            Last updated
            <br />
            {formatDate(lastRefresh, "MMMM d, yyyy, HH:mm ('UTC'xxx)")}
          </span>
        </Box>
      )}
      <Button
        iconName="refresh"
        ariaLabel="Refresh"
        loadingText="Refreshing table content"
        loading={loading}
        onClick={onRefresh}
        disabled={disabled}
      />
    </SpaceBetween>
  );
};
