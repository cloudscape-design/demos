// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, ColumnLayout, Container, Header, Link } from '@cloudscape-design/components';
import { externalLinkProps } from '../../../common/labels';

export function AccountAttributes() {
  return (
    <Container header={<Header variant="h2">Account attributes</Header>}>
      <Box variant="awsui-key-label">Supported platforms</Box>
      <Box variant="p">
        The account supports both the EC2-Classic platform and VPCs in this region, but the region does not have a
        default VPC.
      </Box>
      <Box padding={{ vertical: 'xxs' }}>
        <Link href="#" {...externalLinkProps}>
          Learn more
        </Link>
      </Box>
    </Container>
  );
}

export function FeaturesSpotlight() {
  return (
    <Container
      header={
        <Header variant="h2" description="Updates on features available in N. Virginia region">
          Features spotlight
        </Header>
      }
    >
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <Box color="text-label">August 26, 2019</Box>
          <Box padding={{ vertical: 'xxs' }}>
            <Link href="#">Amazon EC2 Fleet Functionality</Link>
          </Box>
          <Box variant="p">
            Amazon EC2 Auto Scaling now lets you provision and automatically scale instances across purchase options,
            Availability Zones (AZ), and instance families in a single Auto Scaling group (ASG), to optimize scale,
            performance, and cost.
          </Box>
          <Box padding={{ vertical: 'xxs' }}>
            <Link href="#" {...externalLinkProps}>
              Learn more
            </Link>
          </Box>
        </div>
        <div>
          <Box color="text-label">September 9, 2019</Box>
          <Box padding={{ vertical: 'xxs' }}>
            <Link href="#">Amazon EC2 Hibernation Now Available on Amazon Linux 2</Link>
          </Box>
          <Box variant="p">
            Amazon EC2 expands Hibernation support for Amazon Linux 2. You can now hibernate newly launched EC2
            Instances running Amazon Linux 2, in addition to Amazon Linux and Ubuntu 18.04 LTS OS.
          </Box>
          <Box padding={{ vertical: 'xxs' }}>
            <Link href="#" {...externalLinkProps}>
              Learn more
            </Link>
          </Box>
        </div>
      </ColumnLayout>
    </Container>
  );
}
