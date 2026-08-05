// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme, Theme } from '@cloudscape-design/components/theming';

export const colors = {
  grey0: '#FFFFFF',
  grey100: '#F9F9FB',
  grey250: '#EBEBF0',
  grey300: '#DEDEE3',
  grey350: '#CCCCD1',
  grey400: '#B4B4BB',
  grey500: '#8C8C94',
  grey650: '#545b64',
  grey850: '#161D26',
  grey1000: '#06080A',
  yellow500: '#F2B705',
  yellow600: '#F2B100',
  yellow700: '#db9200',
  yellow800: '#9E6900',
  yellow900: '#855900',
  yellow950: '#573A00',
  yellow1000: '#502E13',
  yellow1100: '#2E2005',
  yellow1200: '#191100',
};

const theme: Theme = {
  tokens: {
    fontFamilyBase: `"Ember Modern Text", sans-serif`,
    fontSizeBodyM: '16px',
    fontSizeHeadingXs: '18px',
    fontSizeHeadingL: '24px',
    fontSizeHeadingXl: '42px',
    fontWeightHeadingXs: 'Normal',
    fontWeightHeadingXl: 'Normal',
    lineHeightHeadingXs: '24px',
    lineHeightHeadingL: '28px',
    lineHeightHeadingXl: '44px',
    // BreadcrumbGroup Tokens
    colorTextBreadcrumbCurrent: colors.grey1000,
    colorTextLinkDefault: { light: colors.grey650, dark: colors.grey350 },
    colorTextLinkHover: { light: colors.grey850, dark: colors.grey250 },
    // Button Tokens
    colorBackgroundButtonPrimaryActive: colors.yellow950,
    colorBackgroundButtonPrimaryDefault: { light: colors.grey1000, dark: colors.yellow700 },
    colorBackgroundButtonPrimaryHover: { light: colors.yellow950, dark: colors.yellow600 },
    colorTextButtonPrimaryActive: colors.grey0,
    colorTextButtonPrimaryDefault: { light: colors.grey0, dark: colors.grey1000 },
    colorTextButtonPrimaryHover: { light: colors.grey0, dark: colors.grey1000 },
    // Input Tokens
    borderRadiusDropdown: '10px',
    borderRadiusInput: '60px',
    colorBackgroundDropdownItemDefault: colors.grey0,
    colorBackgroundDropdownItemHover: colors.grey250,
    colorBackgroundItemSelected: colors.grey250,
    colorBackgroundInputDefault: { light: colors.grey0, dark: colors.yellow1200 },
    colorBorderItemFocused: colors.grey650,
    colorBorderItemSelected: colors.grey850,
    colorBorderInputDefault: { light: colors.grey650, dark: colors.grey500 },
    colorBorderInputFocused: colors.grey650,
    colorItemSelected: colors.yellow800,
    colorTextFormDefault: colors.grey850,
    colorTextGroupLabel: colors.grey850,
    colorTextBodyDefault: colors.grey850,
    colorTextDropdownItemDefault: colors.grey850,
    colorTextDropdownItemHighlighted: colors.grey850,
    // Tabs Tokens
    colorTextAccent: { light: colors.yellow950, dark: colors.yellow700 },
    colorTextInteractiveDefault: colors.grey650,
  },
};

applyTheme({ theme });
