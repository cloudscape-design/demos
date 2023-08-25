// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, Header, Link } from '@cloudscape-design/components';
import { WidgetConfig } from '../interfaces';

export const accountAttributes: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 1 },
  data: {
    icon: 'list',
    title: 'Account attributes',
    description: 'General info about current account',
    header: AccountAttributesHeader,
    content: AccountAttributesContent,
    footer: AccountAttributesFooter,
  },
};

function AccountAttributesHeader() {
  return <Header variant="h2">Account attributes</Header>;
}

function AccountAttributesFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        Learn more
      </Link>
    </Box>
  );
}

function AccountAttributesContent() {
  return (
    <>
      <Box variant="awsui-key-label">Supported platforms</Box>
      <Box variant="p">
        The account supports both the EC2-Classic platform and VPCs in this region, but the region does not have a
        default VPC.
      </Box>
    </>
  );
}
