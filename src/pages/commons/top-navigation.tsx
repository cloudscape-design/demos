// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { Mode } from '@cloudscape-design/global-styles';

import { updateDensity, updateDirection, updateMode } from '../../common/apply-mode';
import logo from '../../common/logo.svg';

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

export function DemoTopNavigation() {
  const handlePreferenceChange = (event: CustomEvent<ButtonDropdownProps.ItemClickDetails>) => {
    const itemId = event.detail.id;

    // Handle mode changes
    if (itemId === Mode.Light || itemId === Mode.Dark) {
      updateMode(itemId);
    }
    // Handle density changes
    else if (itemId === 'comfortable' || itemId === 'compact') {
      updateDensity(itemId);
    }
    // Handle direction changes
    else if (itemId === 'ltr' || itemId === 'rtl') {
      updateDirection(itemId);
    }
  };

  const utilities: TopNavigationProps.Utility[] = [
    {
      type: 'menu-dropdown',
      text: 'Preferences',
      items: [
        {
          text: 'Appearance',
          items: [
            { text: 'Light', id: Mode.Light },
            { text: 'Dark', id: Mode.Dark },
          ],
        },
        {
          text: 'Directionality',
          items: [
            { text: 'Left-to-right', id: 'ltr' },
            { text: 'Right-to-left', id: 'rtl' },
          ],
        },
        {
          text: 'Density',
          items: [
            { text: 'Comfortable', id: 'comfortable' },
            { text: 'Compact', id: 'compact' },
          ],
        },
      ],
      onItemClick: handlePreferenceChange,
    },
  ];

  return (
    <DemoHeaderPortal>
      <TopNavigation
        identity={{
          href: '/',
          title: 'Service name',
          logo: {
            src: logo,
            alt: 'Service name logo',
          },
        }}
        utilities={utilities}
      />
    </DemoHeaderPortal>
  );
}
