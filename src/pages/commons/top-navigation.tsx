// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import { applyTheme } from '@cloudscape-design/components/theming';
import TopNavigation, { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { Mode, Theme } from '@cloudscape-design/global-styles';

import { updateDensity, updateDirection, updateMode } from '../../common/apply-mode';
import logo from '../../common/logo.svg';
import { topNavigationLightThemeTokens } from '../../common/top-navigation-light-theme';

// The injected top navigation needs this to neutralise the demo header's own
// border. Imported here so it travels with the component to every page.
import '../../styles/top-navigation.scss';
// Light-mode resets for the internal (non-themeable) values the top-navigation
// context flips dark -- the dropdown's drop shadow among them.
import '../../styles/top-navigation-light-context.scss';

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

// Render the header in the light palette. TopNavigation puts itself inside the
// dark `awsui-context-top-navigation` context, so we re-point that context at
// the global token values. Applied at module scope rather than in an effect so
// the tokens are in place before the header first paints.
if (typeof document !== 'undefined') {
  applyTheme({
    theme: {
      // No global token changes; only the top-navigation context is re-pointed.
      tokens: {},
      contexts: { 'top-navigation': { tokens: topNavigationLightThemeTokens } },
    },
    // Required: `applyTheme` derives the stylesheet it injects from this base,
    // and defaults to the primary (visual refresh) theme. Leaving it unset
    // emits visual-refresh values for every token and silently overrides One
    // Theme across the whole page, not just the header.
    baseThemeId: Theme.OneTheme,
  });
}

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
