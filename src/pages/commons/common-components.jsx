// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { forwardRef } from 'react';
import { AppLayout, Badge, Box, Button, Link, SpaceBetween } from '@cloudscape-design/components';
import { appLayoutAriaLabels } from '../../i18n-strings';

// backward compatibility
export * from './index';

export const ec2NavItems = [
  { type: 'link', text: 'Instances', href: '#/instances' },
  { type: 'link', text: 'Instance types', href: '#/instance-types' },
  { type: 'link', text: 'Launch templates', href: '#/launch-templates' },
  { type: 'link', text: 'Spot requests', href: '#/spot-requests' },
  { type: 'link', text: 'Saving plans', href: '#/saving-plans' },
  { type: 'link', text: 'Reserved instances', href: '#/reserved-instances' },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Notifications',
    info: <Badge color="red">23</Badge>,
    href: '#/notifications',
  },
  {
    type: 'link',
    text: 'Documentation',
    external: true,
    href: '#/documentation',
  },
];

export const TableNoMatchState = props => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can't find a match.
        </Box>
      </div>
      <Button onClick={props.onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

export const TableEmptyState = ({ resourceName }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No {resourceName.toLowerCase()}s</b>
        <Box variant="p" color="inherit">
          No {resourceName.toLowerCase()}s associated with this resource.
        </Box>
      </div>
      <Button>Create {resourceName.toLowerCase()}</Button>
    </SpaceBetween>
  </Box>
);

export const CustomAppLayout = forwardRef((props, ref) => {
  return <AppLayout ref={ref} {...props} headerSelector="#header" ariaLabels={appLayoutAriaLabels} />;
});

export const CounterLink = ({ children }) => {
  return (
    <Link variant="awsui-value-large" href="#">
      {children}
    </Link>
  );
};
