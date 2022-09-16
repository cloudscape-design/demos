// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SideNavigation from '@cloudscape-design/components/side-navigation';

export const Breadcrumbs = () => (
  <BreadcrumbGroup
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
    items={[
      { text: 'Service', href: '#/rds' },
      { text: 'Launch DB instance', href: '#/launch' },
    ]}
    onFollow={onFollowHandler.bind(this)}
  />
);

const onFollowHandler = ev => {
  ev.preventDefault();
};

const navigationItems = [
  { type: 'link', text: 'Dashboard', href: '#/dashboard' },
  { type: 'link', text: 'Instances', href: '#/instances' },
  { type: 'link', text: 'Clusters', href: '#/clusters' },
  { type: 'link', text: 'Performance insights', href: '#/performance' },
  { type: 'link', text: 'Snapshots', href: '#/snapshots' },
  { type: 'link', text: 'Reserved instances', href: '#/reserved' },
  { type: 'link', text: 'Events', href: '#/events' },
  { type: 'link', text: 'Event subscriptions', href: '#/subscriptions' },
  {
    type: 'section',
    text: 'Groups',
    items: [
      { type: 'link', text: 'Security groups', href: '#/security' },
      { type: 'link', text: 'Subnet groups', href: '#/subnet' },
      { type: 'link', text: 'Parameter groups', href: '#/parameter' },
      { type: 'link', text: 'Option groups', href: '#/options' },
    ],
  },
];

export const Navigation = () => (
  <SideNavigation
    header={{ text: 'Service', href: '#/home' }}
    items={navigationItems}
    activeHref="#/dashboard"
    onFollow={onFollowHandler.bind(this)}
  />
);
