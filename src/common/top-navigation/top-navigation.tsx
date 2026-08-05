// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import { useEffect, useState } from 'react';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import examplesList from '../../../examples-list.json';
import { getInitialState, updateDensity, updateDirection, updateMode } from '../apply-mode';
import * as localStorage from '../local-storage';
import { buildNavigationUrl, currentDemoName } from '../routing';
import { isThemingAvailable, THEME_CONFIG } from '../theming/constants';
import {
  closeThemeDrawer,
  openThemeDrawer,
  registerThemeDrawer,
  setThemeStateListener,
} from '../theming/drawer-registration';
import { filteredDemos } from './filter-demos';
import { UTILITY_ICONS } from './utility-icons';

const allDemosList: SelectProps.Option[] = examplesList.map(example => ({
  label: example.title,
  value: example.path,
}));

const filteredDemosList: SelectProps.Option[] = filteredDemos()
  .map(example => ({
    label: example.title,
    value: example.path,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

// Generate source code link based on current demo and external site setting
function getSourceLink(pagePath: string): string {
  const baseUrl = 'https://github.com/cloudscape-design/demos/tree/main/';
  return `${baseUrl}src/pages/${pagePath}`;
}

export default function DemosTopNav() {
  // Get current demo as select option
  const getCurrentDemo = (): SelectProps.Option | null => {
    const path = currentDemoName || '';
    const foundDemo = filteredDemosList.find(demo => demo.value === path);
    return foundDemo || allDemosList.find(demo => demo.value === path) || null;
  };

  // Demo state
  const [selectedDemo, setsSelectedDemo] = useState(getCurrentDemo);
  // Modes state
  const [currentMode, setCurrentMode] = useState('light');
  const [currentDensity, setCurrentDensity] = useState('comfortable');
  const [currentDirection, setCurrentDirection] = useState('ltr');
  // Theme state
  const [hasCustomTheme, setHasCustomTheme] = useState<boolean>(
    Boolean(isThemingAvailable && localStorage.load(THEME_CONFIG.LOCAL_STORAGE_KEY)),
  );
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState<boolean>(() => {
    const saved = localStorage.load<boolean>('theme-drawer-open');
    return typeof saved === 'boolean' ? saved : hasCustomTheme;
  });

  useEffect(() => {
    setThemeStateListener(setHasCustomTheme);
  }, []);

  // Synchronize drawer state with AppLayout plugin
  useEffect(() => {
    if (isThemeDrawerOpen) {
      openThemeDrawer();
    } else {
      closeThemeDrawer();
    }
  }, [isThemeDrawerOpen]);

  // Initialize state from URL parameters
  useEffect(() => {
    const initialState = getInitialState();
    setCurrentMode(initialState.mode);
    setCurrentDensity(initialState.density);
    setCurrentDirection(initialState.direction);

    registerThemeDrawer({
      selectedDemo: selectedDemo?.value,
      hasCustomTheme,
      onToggle: setIsThemeDrawerOpen,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode);
    updateMode(mode);
  };

  const handleDensityChange = (density: string) => {
    setCurrentDensity(density);
    updateDensity(density);
  };

  const handleDirectionChange = (direction: string) => {
    setCurrentDirection(direction);
    updateDirection(direction);
  };

  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <TopNavigation
        identity={{
          href: '/demos/overview',
          title: `Cloudscape ${''} Demos`,
        }}
        utilities={[
          {
            iconName: 'settings',
            text: 'Preferences',
            type: 'menu-dropdown',
            disableUtilityCollapse: true,
            onItemClick: ({ detail }) => {
              const { id } = detail;
              if (id === 'light' || id === 'dark') {
                handleModeChange(id);
              } else if (id === 'ltr' || id === 'rtl') {
                handleDirectionChange(id);
              } else if (id === 'comfortable' || id === 'compact') {
                handleDensityChange(id);
              }
            },
            items: [
              {
                text: 'Appearance',
                items: [
                  {
                    id: 'light',
                    text: 'Light',
                    itemType: 'checkbox',
                    checked: currentMode === 'light',
                    iconSvg: UTILITY_ICONS.light,
                  },
                  {
                    id: 'dark',
                    text: 'Dark',
                    itemType: 'checkbox',
                    checked: currentMode === 'dark',
                    iconSvg: UTILITY_ICONS.dark,
                  },
                ],
              },
              {
                text: 'Directionality',
                items: [
                  {
                    id: 'ltr',
                    text: 'Left-to-right',
                    itemType: 'checkbox',
                    checked: currentDirection === 'ltr',
                    iconSvg: UTILITY_ICONS.ltr,
                  },
                  {
                    id: 'rtl',
                    text: 'Right-to-left',
                    itemType: 'checkbox',
                    checked: currentDirection === 'rtl',
                    iconSvg: UTILITY_ICONS.rtl,
                  },
                ],
              },
              {
                text: 'Density',
                items: [
                  {
                    id: 'comfortable',
                    text: 'Comfortable',
                    itemType: 'checkbox',
                    checked: currentDensity === 'comfortable',
                    iconSvg: UTILITY_ICONS.comfortable,
                  },
                  {
                    id: 'compact',
                    text: 'Compact',
                    itemType: 'checkbox',
                    checked: currentDensity === 'compact',
                    iconSvg: UTILITY_ICONS.compact,
                  },
                ],
              },
            ],
          },
          {
            text: 'Theme',
            type: 'button',
            disableUtilityCollapse: true,
            onClick: () => setIsThemeDrawerOpen(prev => !prev),
            iconSvg: UTILITY_ICONS.theme,
            badge: !!hasCustomTheme,
          },
          {
            href: selectedDemo?.value ? getSourceLink(selectedDemo.value) : '#',
            external: true,
            externalIconAriaLabel: 'Opens in a new tab',
            text: 'Source code',
            type: 'button',
            ariaLabel: `Source code for ${selectedDemo?.label || 'current demo'}`,
          },
        ]}
        search={
          <Select
            filteringType="auto"
            selectedOption={selectedDemo}
            onChange={({ detail }) => {
              setsSelectedDemo(detail.selectedOption);
              if (detail.selectedOption?.value) {
                window.location.href = buildNavigationUrl(detail.selectedOption.value);
              }
            }}
            options={filteredDemosList}
          />
        }
      />
    </I18nProvider>
  );
}
