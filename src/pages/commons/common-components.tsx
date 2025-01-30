// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { forwardRef } from 'react';

import {
  AppLayout,
  AppLayoutProps,
  Badge,
  Box,
  Button,
  ColumnLayout,
  SpaceBetween,
  TopNavigation,
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';

import awsLogo from '../commons/aws-logo.svg';

import '../../styles/base.scss';

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
] as const;

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

CustomAppLayout.displayName = 'CustomAppLayout';

export function TopNav() {
  return (
    <TopNavigation
      className="custom-top-nav"
      identity={{
        href: '#',
        logo: {
          src: awsLogo,
          alt: 'Service',
        },
      }}
      utilities={[
        {
          type: 'button',
          text: 'AWS',
          href: 'https://aws.amazon.com',
          external: true,
          externalIconAriaLabel: ' (opens in a new tab)',
        },
        {
          type: 'button',
          iconName: 'notification',
          title: 'Notifications',
          ariaLabel: 'Notifications (unread)',
          badge: true,
          disableUtilityCollapse: false,
        },

        {
          type: 'menu-dropdown',
          text: 'Customer Name',
          description: 'email@example.com',
          iconName: 'user-profile',
          items: [
            { id: 'profile', text: 'Profile' },
            { id: 'preferences', text: 'Preferences' },
            { id: 'security', text: 'Security' },
            {
              id: 'support-group',
              text: 'Support',
              items: [
                {
                  id: 'documentation',
                  text: 'Documentation',
                  href: '#',
                  external: true,
                  externalIconAriaLabel: ' (opens in new tab)',
                },
                { id: 'support', text: 'Support' },
                {
                  id: 'feedback',
                  text: 'Feedback',
                  href: '#',
                  external: true,
                  externalIconAriaLabel: ' (opens in new tab)',
                },
              ],
            },
            { id: 'signout', text: 'Sign out' },
          ],
        },
      ]}
    />
  );
}

export function SideContent() {
  return (
    <SpaceBetween size="m">
      <SpaceBetween size="m">
        <Box variant="h4">Recents</Box>
        <SpaceBetween size="s">
          <SpaceBetween size="xxs">
            <Box color="text-status-inactive" fontSize="body-s">
              6h ago
            </Box>
            <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box color="text-status-inactive" fontSize="body-s">
              6h ago
            </Box>
            <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box color="text-status-inactive" fontSize="body-s">
              6h ago
            </Box>
            <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
          </SpaceBetween>
        </SpaceBetween>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export function SideContentHome() {
  return (
    <SpaceBetween size="xl">
      <ColumnLayout borders="horizontal">
        <SpaceBetween size="m">
          <Box variant="h4">Recents</Box>
          <SpaceBetween size="s">
            <SpaceBetween size="xxs">
              <Box color="text-status-inactive" fontSize="body-s">
                6h ago
              </Box>
              <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
            </SpaceBetween>
            <SpaceBetween size="xxs">
              <Box color="text-status-inactive" fontSize="body-s">
                6h ago
              </Box>
              <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
            </SpaceBetween>
            <SpaceBetween size="xxs">
              <Box color="text-status-inactive" fontSize="body-s">
                6h ago
              </Box>
              <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
            </SpaceBetween>
          </SpaceBetween>
          <Box margin={{ bottom: 'm' }}></Box>
        </SpaceBetween>
        <Box></Box>
      </ColumnLayout>

      <ColumnLayout borders="horizontal">
        <SpaceBetween size="m">
          <Box variant="h4">Announcements</Box>
          <SpaceBetween size="s">
            <SpaceBetween size="xxs">
              <Box color="text-status-inactive" fontSize="body-s">
                6h ago
              </Box>
              <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
            </SpaceBetween>
            <SpaceBetween size="xxs">
              <Box color="text-status-inactive" fontSize="body-s">
                6h ago
              </Box>
              <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
            </SpaceBetween>
            <SpaceBetween size="xxs">
              <Box color="text-status-inactive" fontSize="body-s">
                6h ago
              </Box>
              <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
            </SpaceBetween>
          </SpaceBetween>
          <Box margin={{ bottom: 'm' }}></Box>
        </SpaceBetween>
        <Box></Box>
      </ColumnLayout>

      <SpaceBetween size="m">
        <Box variant="h4">Help others</Box>
        <SpaceBetween size="s">
          <SpaceBetween size="xxs">
            <Box color="text-status-inactive" fontSize="body-s">
              6h ago
            </Box>
            <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box color="text-status-inactive" fontSize="body-s">
              6h ago
            </Box>
            <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box color="text-status-inactive" fontSize="body-s">
              6h ago
            </Box>
            <Box variant="p">AWS Secrets manager announces open source release of secrets manager agent</Box>
          </SpaceBetween>
        </SpaceBetween>
      </SpaceBetween>
    </SpaceBetween>
  );
}
