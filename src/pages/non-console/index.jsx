// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';

import logo from './logo.svg';
import { Notifications } from './notifications';
import { CustomAppLayout } from '../commons/common-components';

const navItems = [
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
  { type: 'button', id: 'profile', text: 'Profile' },
  { type: 'button', id: 'preferences', text: 'Preferences' },
  { type: 'button', id: 'security', text: 'Security' },
  {
    type: 'menu-dropdown',
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
  { type: 'button', id: 'signout', text: 'Sign out' },
];

const columnDefinitions = [
  {
    id: 'name',
    cell: item => item.name,
    header: 'Name',
    minWidth: 160,
    isRowHeader: true,
  },
  {
    id: 'type',
    header: 'Type',
    cell: item => item.type,
    minWidth: 100,
  },
  {
    id: 'size',
    header: 'Size',
    cell: item => item.size,
    minWidth: 100,
  },
  {
    id: 'description',
    header: 'Description',
    cell: item => item.description,
    minWidth: 100,
  },
];

const Content = () => {
  return (
    <Table
      items={[]}
      columnDefinitions={columnDefinitions}
      variant="full-page"
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
    />
  );
};

/**
 * This Portal is for demo purposes only due to the additional
 * header used on the Demo page.
 */
const DemoHeaderPortal = ({ children }) => {
  const domNode = document.querySelector('#h');
  return createPortal(children, domNode);
};

function App() {
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
        contentType="table"
        content={<Content />}
        notifications={<Notifications />}
      />
    </>
  );
}

createRoot(document.getElementById('app')).render(<App />);
