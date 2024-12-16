// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { isVisualRefresh } from '../../common/apply-mode';
import { CustomAppLayout } from '../commons/common-components';
import logo from './logo.svg';
import { Notifications } from './notifications';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';

const navItems: SideNavigationProps.Item[] = [
  {
    type: 'section',
    text: 'Manage',
    items: [
      { type: 'link', text: 'Pages', href: '#/pages' },
      { type: 'link', text: 'Users', href: '#/users' },
    ],
  },
  {
    type: 'section',
    text: 'Set up',
    items: [
      { type: 'link', text: 'Database', href: '#/database' },
      { type: 'link', text: 'Authentication', href: '#/authentication' },
      { type: 'link', text: 'Analytics', href: '#/analytics' },
      { type: 'link', text: 'Predictions', href: '#/predictions' },
      { type: 'link', text: 'Interactions', href: '#/interactions' },
      { type: 'link', text: 'Notifications', href: '#/notifications' },
    ],
  },
];

const breadcrumbs = [
  {
    text: 'Service name',
    href: '#',
  },
  {
    text: 'Pages',
    href: '#',
  },
];

const i18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const profileActions = [
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
      { id: 'feedback', text: 'Feedback', href: '#', external: true, externalIconAriaLabel: ' (opens in new tab)' },
      { id: 'support', text: 'Customer support' },
    ],
  },
  { id: 'signout', text: 'Sign out' },
];

interface Item {
  name: string;
  type: string;
  size: string;
  description: string;
}

const columnDefinitions: TableProps.ColumnDefinition<Item>[] = [
  {
    id: 'name',
    cell: item => item.name,
    header: 'Name',
    minWidth: 100,
    isRowHeader: true,
  },
  {
    id: 'type',
    header: 'Type',
    cell: item => item.type,
    minWidth: 80,
  },
  {
    id: 'size',
    header: 'Size',
    cell: item => item.size,
    minWidth: 80,
  },
  {
    id: 'description',
    header: 'Description',
    cell: item => item.description,
    minWidth: 120,
  },
];

const Content = () => {
  return (
    <Box padding={{ top: isVisualRefresh ? 's' : 'n' }}>
      <Table
        items={[]}
        columnDefinitions={columnDefinitions}
        header={
          <Header
            variant="awsui-h1-sticky"
            counter="(0)"
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button disabled>View details</Button>
                <Button disabled>Edit</Button>
                <Button disabled>Delete</Button>
                <Button variant="primary">Create page</Button>
              </SpaceBetween>
            }
          >
            Pages
          </Header>
        }
        stickyHeader={true}
        empty={
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="xxs">
              <div>
                <b>No pages</b>
                <Box variant="p" color="inherit">
                  You don't have any pages.
                </Box>
              </div>
              <Button>Create page</Button>
            </SpaceBetween>
          </Box>
        }
        enableKeyboardNavigation={true}
      />
    </Box>
  );
};

/**
 * This Portal is for demo purposes only due to the additional
 * header used on the Demo page.
 */
interface DemoHeaderPortalProps {
  children: ReactNode;
}

const DemoHeaderPortal = ({ children }: DemoHeaderPortalProps) => {
  const domNode = document.querySelector('#h')!;
  return createPortal(children, domNode);
};

export function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <DemoHeaderPortal>
        <TopNavigation
          i18nStrings={i18nStrings}
          identity={{
            href: '#',
            title: 'Service name',
            logo: { src: logo, alt: 'Service name logo' },
          }}
          search={
            <Input
              ariaLabel="Input field"
              clearAriaLabel="Clear"
              value={searchValue}
              type="search"
              placeholder="Search"
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
          }
          utilities={[
            {
              type: 'button',
              iconName: 'notification',
              ariaLabel: 'Notifications',
              badge: true,
              disableUtilityCollapse: true,
            },
            { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
            {
              type: 'menu-dropdown',
              text: 'Customer name',
              description: 'customer@example.com',
              iconName: 'user-profile',
              items: profileActions,
            },
          ]}
        />
      </DemoHeaderPortal>
      <CustomAppLayout
        stickyNotifications
        toolsHide
        navigation={<SideNavigation activeHref="#/pages" items={navItems} />}
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
        content={<Content />}
        notifications={<Notifications />}
      />
    </>
  );
}
