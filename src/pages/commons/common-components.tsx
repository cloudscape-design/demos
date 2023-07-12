// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { forwardRef } from 'react';
import { AppLayout, AppLayoutProps, Badge, Box, Button, Link, SpaceBetween } from '@cloudscape-design/components';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';

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

export const TableNoMatchState = ({ onClearFilter }: { onClearFilter: () => void }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can't find a match.
        </Box>
      </div>
      <Button onClick={onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

export const TableEmptyState = ({ resourceName }: { resourceName: string }) => (
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

export const CustomAppLayout = forwardRef<AppLayoutProps.Ref, AppLayoutProps>((props, ref) => {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <AppLayout ref={ref} {...props} />
    </I18nProvider>
  );
});

export const CounterLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link variant="awsui-value-large" href="#">
      {children}
    </Link>
  );
};
