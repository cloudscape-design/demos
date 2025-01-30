// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

import { Navigation as CommonNavigation } from '../../commons';
import { DensityPreferencesDialog } from './density-preferences';

const navItems: SideNavigationProps['items'] = [
  {
    type: 'link',
    text: 'Home',
    href: '#/',
  },
  { type: 'divider' },
  {
    title: 'Knowledge',
    type: 'section-group',

    items: [
      {
        type: 'link',
        text: 'Learning center',
        href: '#/instances',
      },
      {
        type: 'link',
        text: 'Content library',
        href: '#/instances',
      },
      {
        type: 'link',
        text: 'Events',
        href: '#/instances',
      },
    ],
  },
  { type: 'divider' },
  {
    title: 'Socialize',
    type: 'section-group',

    items: [
      { type: 'link', text: 'Connections', href: '#/instances' },
      { type: 'link', text: 'Groups', href: '#/instances' },
      { type: 'link', text: 'Forums', href: '#/instances' },
      { type: 'link', text: 'Community programs', href: '#/instances' },
    ],
  },
  { type: 'divider' },
  {
    title: 'Elastic block store',
    type: 'section-group',

    items: [
      {
        type: 'link',
        text: 'Wishlist',
        href: '#/launch_templates',
      },
      { type: 'link', text: 'Code sharing', href: '#/snapshots' },
    ],
  },
  { type: 'divider' },
  { type: 'link', text: 'Notifications', href: '#/security_groups' },
  { type: 'link', text: 'Chat', href: '#/security_groups' },
  { type: 'link', text: 'Resources', href: '#/security_groups' },
  { type: 'divider' },
  {
    title: 'Popular communities',
    type: 'section-group',

    items: [
      { type: 'link', text: 'Cloud computing', href: '#/load_balancers' },
      { type: 'link', text: 'AI', href: '#/target_groups' },
      { type: 'link', text: 'Serverless', href: '#/target_groups' },
      { type: 'link', text: 'BigData', href: '#/target_groups' },
      { type: 'link', text: 'QuantumComputing', href: '#/target_groups' },
    ],
  },
  { type: 'divider' },
  { type: 'link', text: 'Discover communities', href: '#/target_groups' },
];

export function DashboardSideNavigation() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const onFollowHandler: SideNavigationProps['onFollow'] = event => {
    event.preventDefault();
    if (event.detail.href === '#/density_settings') {
      setDialogVisible(true);
    }
  };

  return (
    <>
      <CommonNavigation items={navItems} activeHref="#/" onFollowHandler={onFollowHandler} />
      {dialogVisible && <DensityPreferencesDialog onDismiss={() => setDialogVisible(false)} />}
    </>
  );
}
