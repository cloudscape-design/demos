// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// ============================================================================
// Theme for One Theme
// ============================================================================

/* eslint-disable @typescript-eslint/no-unused-vars */
export function generateThemeConfigOneTheme() {
  // New grey primitive color palette
  const grey50 = '#fcfcfc';
  const grey100 = '#f9f9f9';
  const grey150 = '#f8f8f8';
  const grey200 = '#f5f5f5';
  const grey250 = '#ededed';
  const grey300 = '#e1e1e1';
  const grey350 = '#c9c9c9';
  const grey400 = '#b7b7b7';
  const grey450 = '#a9a9a9';
  const grey500 = '#909090';
  const grey600 = '#6B6B6B';
  const grey650 = '#494949';
  const grey700 = '#3B3B3B';
  const grey750 = '#2D2D2D';
  const grey800 = '#242424';
  const grey850 = '#1E1E1E';
  const grey900 = '#1A1A1A';
  const grey950 = '#151515';
  const grey1000 = '#080808';

  // Indigo primitive color palette
  const indigo50 = '#F5F7FF';
  const indigo100 = '#DBE4FF';
  const indigo200 = '#C2D1FF';
  const indigo300 = '#94AFFF';
  const indigo400 = '#7598FF';
  const indigo500 = '#5C7FFF';
  const indigo600 = '#295EFF';
  const indigo700 = '#003EFA';
  const indigo800 = '#0033CC';
  const indigo900 = '#001A99';
  const indigo950 = '#001475';

  // Primary accent colors
  const colorAccentPrimary = { light: indigo400, dark: indigo500 };
  const colorSelectedAccent = { light: grey800, dark: grey100 };
  const colorSelectedAccentSubtleHover = { light: grey250, dark: grey900 };

  // Secondary accent colors (darker/more saturated variant)
  const colorSelectedAccentSecondary = { light: grey800, dark: '#F9F9FB' };

  // Neutral colors
  const colorNeutralDefault = { light: grey800, dark: grey200 };
  const colorNeutralInverse = { light: '#ffffff', dark: grey900 };
  //const colorNeutralBackground = { light: '#F6F6F9', dark: '#333843' };

  // Toned down text color
  const colorTextBodyDefault = { light: grey950, dark: grey350 };
  //const colorTextBodyDefault = { light: '#1B232D', dark: '#c6c6cd' };
  //const colorTextBodySecondary = { light: '#656871', dark: '#B4B4BB' };

  // Status colors
  const colorSuccess = { light: '#008559', dark: '#008559' };

  return {
    tokens: {
      fontFamilyBase: "'Ember Modern', 'Amazon Ember', Roboto, Arial, sans-serif",
      colorTextBodyDefault: colorTextBodyDefault,

      colorBackgroundLayoutMain: { light: grey50, dark: grey1000 },
      colorBackgroundLayoutToolbar: { light: '#ffffff', dark: '#080808' },

      // Container
      colorBackgroundContainerHeader: { light: '#ffffff', dark: grey950 },
      colorBackgroundContainerContent: { light: '#ffffff', dark: grey950 },

      // ========================================================================
      // BUTTONS - Normal
      // ========================================================================
      colorBorderButtonNormalDefault: { light: '#424650', dark: '#656871' },
      colorBorderButtonNormalHover: { light: '#424650', dark: '#656871' },
      colorBorderButtonNormalActive: { light: '#424650', dark: '#656871' },

      colorBackgroundButtonNormalDefault: { light: '#FFFFFF', dark: '#333843' },
      colorBackgroundButtonNormalHover: { light: '#F6F6F9', dark: '#424650' },
      colorBackgroundButtonNormalActive: { light: '#EBEBF0', dark: '#333843' },

      colorTextButtonNormalDefault: { light: '#333843', dark: '#DEDEE3' },
      colorTextButtonNormalHover: { light: '#333843', dark: '#DEDEE3' },
      colorTextButtonNormalActive: { light: '#333843', dark: '#DEDEE3' },

      colorBackgroundSegmentDefault: { light: 'transparent', dark: 'transparent' },

      // ========================================================================
      // BUTTONS - Primary
      // ========================================================================
      colorBackgroundButtonPrimaryDefault: colorAccentPrimary,
      colorBackgroundButtonPrimaryHover: { light: indigo500, dark: indigo400 },
      colorBackgroundButtonPrimaryActive: colorAccentPrimary,
      colorTextButtonPrimaryDefault: grey950,
      colorTextButtonPrimaryHover: grey950,
      colorTextButtonPrimaryActive: grey950,

      // ========================================================================
      // BUTTONS - Link
      // ========================================================================
      colorBackgroundButtonLinkDefault: { light: '#f6f6f9', dark: '#232b37' }, // Added
      colorBackgroundButtonLinkHover: { light: '#ebebf0', dark: '#424650' }, // Added
      colorBackgroundButtonLinkActive: colorSelectedAccentSubtleHover,
      colorTextLinkButtonNormalDefault: colorSelectedAccent,

      // ========================================================================
      // BUTTONS - Toggle
      // ========================================================================
      colorBackgroundToggleButtonNormalPressed: colorSelectedAccentSubtleHover,
      colorBorderToggleButtonNormalPressed: colorSelectedAccent,
      colorTextToggleButtonNormalPressed: colorSelectedAccent,

      // ========================================================================
      // CONTROLS - Checkboxes, Radio, Toggle
      // ========================================================================
      colorBackgroundControlChecked: colorSelectedAccent,
      //colorBackgroundToggleCheckedDisabled: colorSelectedAccentDisabled,

      // ========================================================================
      // LINKS & TEXT
      // ========================================================================
      colorTextLinkDefault: colorTextBodyDefault,
      colorTextLinkHover: { light: '#424650', dark: '#FFFFFF' },
      colorTextLinkSecondaryDefault: { light: '#295eff', dark: '#7598ff' }, // Added
      colorTextLinkSecondaryHover: { light: '#0033CC', dark: '#94AFFF' }, // Added
      colorTextLinkInfoDefault: { light: '#295eff', dark: '#7598ff' }, // Added
      colorTextLinkInfoHover: { light: '#0033CC', dark: '#94AFFF' }, // Added
      colorTextAccent: colorSelectedAccent,

      // ========================================================================
      // SELECTION & FOCUS
      // ========================================================================
      colorBorderItemFocused: colorSelectedAccent,
      colorBorderItemSelected: colorSelectedAccent,
      colorBackgroundItemSelected: { light: '#F6F6F9', dark: '#0F141A' },
      colorBackgroundLayoutToggleSelectedDefault: colorSelectedAccent,

      // ========================================================================
      // SEGMENTS & TABS
      // ========================================================================
      colorBackgroundSegmentActive: colorSelectedAccent,

      // ========================================================================
      // SLIDER
      // ========================================================================
      colorBackgroundSliderRangeDefault: colorSelectedAccent,
      colorBackgroundSliderHandleDefault: colorSelectedAccent,

      // ========================================================================
      // PROGRESS BAR
      // ========================================================================
      colorBackgroundProgressBarValueDefault: colorSelectedAccent,

      // ========================================================================
      // NOTIFICATIONS
      // ========================================================================
      colorBackgroundNotificationGreen: colorSuccess,
      colorBackgroundNotificationBlue: { light: '#0033CC', dark: '#0033CC' },
      colorTextNotificationDefault: { light: '#ffffff', dark: '#ffffff' },

      // ========================================================================
      // STATUS
      // ========================================================================
      colorTextStatusInfo: { light: '#0033CC', dark: '#7598FF' },
      colorTextStatusSuccess: { light: '#008559', dark: '#00BD6B' }, // Added
      colorTextDropdownItemFilterMatch: colorSelectedAccent,
      colorBackgroundDropdownItemFilterMatch: { light: '#F3F3F7', dark: '#06080A' },

      // ========================================================================
      // TYPOGRAPHY - Headings
      // ========================================================================
      colorTextBreadcrumbCurrent: { light: '#656871', dark: '#8c8c94' },

      // H1
      fontSizeHeadingXl: '24px',
      lineHeightHeadingXl: '30px',
      fontWeightHeadingXl: '500',

      // H2
      fontSizeHeadingL: '20px',
      lineHeightHeadingL: '24px',
      fontWeightHeadingL: '500',

      // H3
      fontSizeHeadingM: '18px',
      lineHeightHeadingM: '22px',
      fontWeightHeadingM: '500',

      // H4
      fontSizeHeadingS: '16px',
      lineHeightHeadingS: '20px',
      fontWeightHeadingS: '500',

      // H5
      fontSizeHeadingXs: '14px',
      lineHeightHeadingXs: '20px',
      fontWeightHeadingXs: '500',

      // ========================================================================
      // TYPOGRAPHY - Other
      // ========================================================================
      fontWeightButton: '500',
      fontWeightTabs: '500',
      fontSizeTabs: '16px',

      // ========================================================================
      // SPACE
      // ========================================================================
      spaceAlertVertical: '4px',
      spaceButtonHorizontal: '12px',
      spaceTabsVertical: '2px',
      spaceTokenVertical: '2px',
      spaceFieldVertical: { comfortable: '4px', compact: '2px' },
      sizeVerticalInput: { comfortable: '30px', compact: '26px' },

      // ========================================================================
      // BORDERS - Width
      // ========================================================================
      borderWidthButton: '1px',
      borderWidthToken: '1px',
      borderWidthAlert: '0px',
      borderItemWidth: '1px',
      borderWidthAlertInlineStart: '2px',
      borderWidthItemSelected: '1px',
      borderWidthCardSelected: '1px',

      // ========================================================================
      // BORDERS - Radius
      // ========================================================================
      borderRadiusAlert: '2px',
      borderRadiusBadge: '16px',
      borderRadiusButton: '2px',
      borderRadiusContainer: '4px',
      borderRadiusDropdown: '8px',
      borderRadiusDropzone: '8px',
      borderRadiusFlashbar: '4px',
      borderRadiusItem: '8px',
      borderRadiusInput: '2px',
      borderRadiusPopover: '4px',
      borderRadiusTabsFocusRing: '8px',
      borderRadiusToken: '2px',
      borderRadiusTutorialPanelItem: '4px',

      // ========================================================================
      // ICONS - Stroke Width
      // ========================================================================
      borderWidthIconSmall: '1.5px',
      borderWidthIconNormal: '1.5px',
      borderWidthIconMedium: '1.75px',
      borderWidthIconBig: '2px',
      borderWidthIconLarge: '2.5px',
    },

    referenceTokens: {
      color: {
        primary: {
          //seed: '#1b232d',
        },
      },
    },

    contexts: {
      'top-navigation': {
        tokens: {
          colorBackgroundContainerContent: { light: '#ffffff', dark: '#151515' },
          colorBorderDividerDefault: { light: '#c6c6cd', dark: '#424650' },
          colorTextTopNavigationTitle: colorNeutralDefault,
          colorTextInteractiveDefault: colorNeutralDefault,
          colorTextInteractiveHover: colorSelectedAccent,
          colorTextInteractiveActive: { light: '#06080A', dark: '#F6F6F9' },
          colorTextAccent: { light: '#06080A', dark: '#F6F6F9' },
          colorTextDropdownItemDefault: { light: '#06080A', dark: '#F6F6F9' },
          colorTextDropdownItemHighlighted: { light: '#06080A', dark: '#F6F6F9' },
          colorTextDropdown: { light: '#06080A', dark: '#F6F6F9' },
          colorTextGroupLabel: { light: '#424650', dark: '#c6c6cd' },
          colorBackgroundDropdownItemDefault: { light: '#FFFFFF', dark: '#1b232d' },
          colorBackgroundDropdownItemHover: { light: '#f3f3f7', dark: '#131920' },
          colorBorderDropdownContainer: { light: '#b4b4bb', dark: '#656871' },
          colorTextBodyDefault: { light: '#06080A', dark: '#F6F6F9' },
          colorBackgroundInputDefault: { light: '#ffffff', dark: '#1b232d' },
          colorBorderInputDefault: { light: '#b4b4bb', dark: '#656871' },
          colorTextInputDefault: { light: '#06080A', dark: '#F6F6F9' },
          colorTextInputPlaceholder: { light: '#656871', dark: '#8c8c94' },
          colorBorderDropdownItemDefault: { light: '#e8e8e8', dark: '#424650' },
          colorTextDropdownItemSecondary: { light: '#424650', dark: '#c6c6cd' },
          colorItemSelected: { light: '#06080A', dark: '#F6F6F9' },
          colorBackgroundDropdownItemSelected: { light: '#F6F6F9', dark: '#06080A' },
          colorBorderItemSelected: { light: '#06080A', dark: '#F6F6F9' },
          colorTextButtonInlineIconDefault: { light: '#1b232d', dark: '#F9F9FB' },
          colorTextButtonInlineIconHover: { light: '#1b232d', dark: '#F9F9FB' },
        },
      },
      header: {
        tokens: {
          // ========================================================================
          // BUTTONS - Normal
          // ========================================================================
          colorBorderButtonNormalDefault: '#f3f3f7',
          colorBorderButtonNormalHover: '#F9F9FB',
          colorBorderButtonNormalActive: '#F9F9FB',
          colorBackgroundButtonNormalHover: '#1B232D',
          colorBackgroundButtonNormalActive: '#131920',
          colorTextButtonNormalDefault: '#f3f3f7',
          colorTextButtonNormalHover: '#F9F9FB',
          colorTextButtonNormalActive: '#F9F9FB',
          // ========================================================================
          // BUTTONS - Primary
          // ========================================================================
          colorBackgroundButtonPrimaryDefault: '#F9F9FB',
          colorBackgroundButtonPrimaryHover: '#FFFFFF',
          colorBackgroundButtonPrimaryActive: '#F9F9FB',
          colorTextButtonPrimaryDefault: '#131920',
          colorTextButtonPrimaryHover: '#131920',
          colorTextButtonPrimaryActive: '#131920',
          colorTextLinkDefault: '#CCCCD1',
        },
      },
      flashbar: {
        tokens: {
          // Custom flashbar colors
          colorBackgroundNotificationGreen: colorSuccess,
          colorBackgroundNotificationBlue: { light: '#0033cc', dark: '#0033cc' },
          colorTextNotificationDefault: { light: '#ffffff', dark: '#ffffff' },
        },
      },
      alert: {
        tokens: {
          colorBackgroundStatusInfo: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusWarning: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusError: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusSuccess: { light: '#f6f6f9', dark: '#232b37' },
          colorTextStatusInfo: { light: '#0033CC', dark: '#7598FF' },
          colorBorderStatusInfo: { light: '#0033CC', dark: '#7598FF' },
          colorTextStatusSuccess: { light: '#008559', dark: '#00BD6B' }, // Added
          colorBorderStatusSuccess: { light: '#008559', dark: '#00BD6B' }, // Added
        },
      },
    },
  };
}

// ============================================================================
// Theme for new Core default
// ============================================================================

export function generateThemeConfigCoreDefault() {
  // Primary accent colors
  const colorSelectedAccent = { light: '#1b232d', dark: '#F9F9FB' };
  const colorSelectedAccentSubtleHover = { light: '#EBEBF0', dark: '#131920' };

  // Secondary accent colors (darker/more saturated variant)
  const colorSelectedAccentSecondary = { light: '#1b232d', dark: '#F9F9FB' };

  // Neutral colors
  const colorNeutralDefault = { light: '#1b232d', dark: '#f3f3f7' };
  const colorNeutralInverse = { light: '#ffffff', dark: '#131920' };
  //const colorNeutralBackground = { light: '#F6F6F9', dark: '#333843' };

  // Toned down text color
  const colorTextBodyDefault = { light: '#0f141a', dark: '#CCCCD1' };
  //const colorTextBodyDefault = { light: '#1B232D', dark: '#c6c6cd' };
  //const colorTextBodySecondary = { light: '#656871', dark: '#B4B4BB' };

  // Status colors
  const colorSuccess = { light: '#008559', dark: '#008559' };

  return {
    tokens: {
      fontFamilyBase: "'Noto Sans', 'Helvetica Neue', Roboto, Arial, sans-serif",
      colorTextBodyDefault: colorTextBodyDefault,

      // ========================================================================
      // BUTTONS - Normal
      // ========================================================================
      colorBorderButtonNormalDefault: colorNeutralDefault,
      colorBorderButtonNormalHover: colorSelectedAccent,
      colorBorderButtonNormalActive: colorSelectedAccentSecondary,
      colorBackgroundButtonNormalDefault: { light: '#FFFFFF', dark: '#161d26' },
      colorBackgroundButtonNormalHover: { light: '#F6F6F9', dark: '#424650' },
      colorBackgroundButtonNormalActive: colorSelectedAccentSubtleHover,
      colorTextButtonNormalDefault: colorNeutralDefault,
      colorTextButtonNormalHover: colorSelectedAccent,
      colorTextButtonNormalActive: colorSelectedAccentSecondary,

      // ========================================================================
      // BUTTONS - Primary
      // ========================================================================
      colorBackgroundButtonPrimaryDefault: colorSelectedAccentSecondary,
      colorBackgroundButtonPrimaryHover: { light: '#06080A', dark: '#FFFFFF' },
      colorBackgroundButtonPrimaryActive: colorSelectedAccentSecondary,
      colorTextButtonPrimaryDefault: colorNeutralInverse,
      colorTextButtonPrimaryHover: colorNeutralInverse,
      colorTextButtonPrimaryActive: colorNeutralInverse,

      // ========================================================================
      // BUTTONS - Link
      // ========================================================================
      colorBackgroundButtonLinkDefault: { light: '#f6f6f9', dark: '#232b37' }, // Added
      colorBackgroundButtonLinkHover: { light: '#ebebf0', dark: '#424650' }, // Added
      colorBackgroundButtonLinkActive: colorSelectedAccentSubtleHover,
      colorTextLinkButtonNormalDefault: colorSelectedAccent,

      // ========================================================================
      // BUTTONS - Toggle
      // ========================================================================
      colorBackgroundToggleButtonNormalPressed: colorSelectedAccentSubtleHover,
      colorBorderToggleButtonNormalPressed: colorSelectedAccent,
      colorTextToggleButtonNormalPressed: colorSelectedAccent,

      // ========================================================================
      // CONTROLS - Checkboxes, Radio, Toggle
      // ========================================================================
      colorBackgroundControlChecked: colorSelectedAccent,
      //colorBackgroundToggleCheckedDisabled: colorSelectedAccentDisabled,

      // ========================================================================
      // LINKS & TEXT
      // ========================================================================
      colorTextLinkDefault: colorTextBodyDefault,
      colorTextLinkHover: { light: '#424650', dark: '#FFFFFF' },
      colorTextLinkSecondaryDefault: { light: '#295eff', dark: '#7598ff' }, // Added
      colorTextLinkSecondaryHover: { light: '#0033CC', dark: '#94AFFF' }, // Added
      colorTextLinkInfoDefault: { light: '#295eff', dark: '#7598ff' }, // Added
      colorTextLinkInfoHover: { light: '#0033CC', dark: '#94AFFF' }, // Added
      colorTextAccent: colorSelectedAccent,

      // ========================================================================
      // SELECTION & FOCUS
      // ========================================================================
      colorBorderItemFocused: colorSelectedAccent,
      colorBorderItemSelected: colorSelectedAccent,
      colorBackgroundItemSelected: { light: '#F6F6F9', dark: '#0F141A' },
      colorBackgroundLayoutToggleSelectedDefault: colorSelectedAccent,

      // ========================================================================
      // SEGMENTS & TABS
      // ========================================================================
      colorBackgroundSegmentActive: colorSelectedAccent,

      // ========================================================================
      // SLIDER
      // ========================================================================
      colorBackgroundSliderRangeDefault: colorSelectedAccent,
      colorBackgroundSliderHandleDefault: colorSelectedAccent,

      // ========================================================================
      // PROGRESS BAR
      // ========================================================================
      colorBackgroundProgressBarValueDefault: colorSelectedAccent,

      // ========================================================================
      // NOTIFICATIONS
      // ========================================================================
      colorBackgroundNotificationGreen: colorSuccess,
      colorBackgroundNotificationBlue: { light: '#0033CC', dark: '#0033CC' },
      colorTextNotificationDefault: { light: '#ffffff', dark: '#ffffff' },

      // ========================================================================
      // STATUS
      // ========================================================================
      colorTextStatusInfo: { light: '#0033CC', dark: '#7598FF' },
      colorTextStatusSuccess: { light: '#008559', dark: '#00BD6B' }, // Added
      colorTextDropdownItemFilterMatch: colorSelectedAccent,
      colorBackgroundDropdownItemFilterMatch: { light: '#F3F3F7', dark: '#06080A' },

      // ========================================================================
      // TYPOGRAPHY - Headings
      // ========================================================================
      colorTextBreadcrumbCurrent: { light: '#656871', dark: '#8c8c94' },

      // H1
      fontSizeHeadingXl: '24px',
      lineHeightHeadingXl: '30px',
      fontWeightHeadingXl: '600',

      // H2
      fontSizeHeadingL: '20px',
      lineHeightHeadingL: '24px',
      fontWeightHeadingL: '600',

      // H3
      fontSizeHeadingM: '18px',
      lineHeightHeadingM: '22px',
      fontWeightHeadingM: '600',

      // H4
      fontSizeHeadingS: '16px',
      lineHeightHeadingS: '20px',
      fontWeightHeadingS: '600',

      // H5
      fontSizeHeadingXs: '14px',
      lineHeightHeadingXs: '20px',
      fontWeightHeadingXs: '600',

      // ========================================================================
      // TYPOGRAPHY - Other
      // ========================================================================
      fontWeightButton: '600',
      fontWeightTabs: '600',
      fontSizeTabs: '16px',

      // ========================================================================
      // SPACE
      // ========================================================================
      spaceAlertVertical: '4px',
      spaceButtonHorizontal: '12px',
      spaceTabsVertical: '2px',
      spaceTokenVertical: '2px',
      spaceFieldVertical: { comfortable: '4px', compact: '2px' },
      sizeVerticalInput: { comfortable: '30px', compact: '26px' },

      // ========================================================================
      // BORDERS - Width
      // ========================================================================
      borderWidthButton: '1px',
      borderWidthToken: '1px',
      borderWidthAlert: '0px',
      borderItemWidth: '1px',
      borderWidthAlertInlineStart: '2px',
      borderWidthItemSelected: '1px',
      borderWidthCardSelected: '1px',

      // ========================================================================
      // BORDERS - Radius
      // ========================================================================
      borderRadiusAlert: '2px',
      borderRadiusBadge: '16px',
      borderRadiusButton: '8px',
      borderRadiusContainer: '12px',
      borderRadiusDropdown: '8px',
      borderRadiusDropzone: '8px',
      borderRadiusFlashbar: '4px',
      borderRadiusItem: '8px',
      borderRadiusInput: '8px',
      borderRadiusPopover: '8px',
      borderRadiusTabsFocusRing: '10px',
      borderRadiusToken: '8px',
      borderRadiusTutorialPanelItem: '4px',

      // ========================================================================
      // ICONS - Stroke Width
      // ========================================================================
      borderWidthIconSmall: '1.5px',
      borderWidthIconNormal: '1.5px',
      borderWidthIconMedium: '1.75px',
      borderWidthIconBig: '2px',
      borderWidthIconLarge: '2.5px',
    },

    referenceTokens: {
      color: {
        primary: {
          seed: '#1b232d',
        },
      },
    },

    contexts: {
      'top-navigation': {
        tokens: {
          colorBackgroundContainerContent: { light: '#ffffff', dark: '#161d26' },
          colorBorderDividerDefault: { light: '#c6c6cd', dark: '#424650' },
          colorTextTopNavigationTitle: colorNeutralDefault,
          // Interactive elements
          colorTextInteractiveDefault: colorNeutralDefault,
          colorTextInteractiveHover: colorSelectedAccent,
          colorTextInteractiveActive: { light: '#06080A', dark: '#F6F6F9' },
          colorTextAccent: { light: '#06080A', dark: '#F6F6F9' },
          colorTextDropdownItemDefault: { light: '#06080A', dark: '#F6F6F9' },
          colorTextDropdownItemHighlighted: { light: '#06080A', dark: '#F6F6F9' },
          colorTextDropdown: { light: '#06080A', dark: '#F6F6F9' },
          colorTextGroupLabel: { light: '#424650', dark: '#c6c6cd' },
          colorBackgroundDropdownItemDefault: { light: '#FFFFFF', dark: '#1b232d' },
          colorBackgroundDropdownItemHover: { light: '#f3f3f7', dark: '#131920' },
          colorBorderDropdownContainer: { light: '#b4b4bb', dark: '#656871' },
          // Select component tokens
          colorTextBodyDefault: { light: '#06080A', dark: '#F6F6F9' },
          colorBackgroundInputDefault: { light: '#ffffff', dark: '#1b232d' },
          colorBorderInputDefault: { light: '#b4b4bb', dark: '#656871' },
          colorTextInputDefault: { light: '#06080A', dark: '#F6F6F9' },
          colorTextInputPlaceholder: { light: '#656871', dark: '#8c8c94' },
          colorBorderDropdownItemDefault: { light: '#e8e8e8', dark: '#424650' },
          colorTextDropdownItemSecondary: { light: '#424650', dark: '#c6c6cd' },
          colorItemSelected: { light: '#06080A', dark: '#F6F6F9' },
          colorBackgroundDropdownItemSelected: { light: '#F6F6F9', dark: '#06080A' },
          colorBorderItemSelected: { light: '#06080A', dark: '#F6F6F9' },
          colorTextButtonInlineIconDefault: { light: '#1b232d', dark: '#F9F9FB' },
          colorTextButtonInlineIconHover: { light: '#1b232d', dark: '#F9F9FB' },
        },
      },
      header: {
        tokens: {
          // ========================================================================
          // BUTTONS - Normal
          // ========================================================================
          colorBorderButtonNormalDefault: '#f3f3f7',
          colorBorderButtonNormalHover: '#F9F9FB',
          colorBorderButtonNormalActive: '#F9F9FB',
          colorBackgroundButtonNormalHover: '#1B232D',
          colorBackgroundButtonNormalActive: '#131920',
          colorTextButtonNormalDefault: '#f3f3f7',
          colorTextButtonNormalHover: '#F9F9FB',
          colorTextButtonNormalActive: '#F9F9FB',
          // ========================================================================
          // BUTTONS - Primary
          // ========================================================================
          colorBackgroundButtonPrimaryDefault: '#F9F9FB',
          colorBackgroundButtonPrimaryHover: '#FFFFFF',
          colorBackgroundButtonPrimaryActive: '#F9F9FB',
          colorTextButtonPrimaryDefault: '#131920',
          colorTextButtonPrimaryHover: '#131920',
          colorTextButtonPrimaryActive: '#131920',
          colorTextLinkDefault: '#CCCCD1',
        },
      },
      flashbar: {
        tokens: {
          // Custom flashbar colors
          colorBackgroundNotificationGreen: colorSuccess,
          colorBackgroundNotificationBlue: { light: '#0033cc', dark: '#0033cc' },
          colorTextNotificationDefault: { light: '#ffffff', dark: '#ffffff' },
        },
      },
      alert: {
        tokens: {
          colorBackgroundStatusInfo: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusWarning: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusError: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusSuccess: { light: '#f6f6f9', dark: '#232b37' },
          colorTextStatusInfo: { light: '#0033CC', dark: '#7598FF' },
          colorBorderStatusInfo: { light: '#0033CC', dark: '#7598FF' },
          colorTextStatusSuccess: { light: '#008559', dark: '#00BD6B' }, // Added
          colorBorderStatusSuccess: { light: '#008559', dark: '#00BD6B' }, // Added
        },
      },
    },
  };
}

// ============================================================================
// Theme for current Console
// ============================================================================

export function generateThemeConfigConsole() {
  return {
    tokens: {
      fontFamilyBase: "var(--font-amazon-ember, 'Amazon Ember', sans-serif)",

      // ========================================================================
      // BUTTONS - Normal
      // ========================================================================
      colorBorderButtonNormalDefault: { light: '#006CE0', dark: '#42B4FF' },
      colorBorderButtonNormalHover: { light: '#002A66', dark: '#75CFFF' },
      colorBorderButtonNormalActive: { light: '#002A66', dark: '#75CFFF' },

      colorBackgroundButtonNormalDefault: { light: '#FFFFFF', dark: '#161d26' },
      colorBackgroundButtonNormalHover: { light: '#F0FBFF', dark: '#1B232D' },
      colorBackgroundButtonNormalActive: { light: '#D1F1FF', dark: '#333843' },

      colorTextButtonNormalDefault: { light: '#006CE0', dark: '#42B4FF' },
      colorTextButtonNormalHover: { light: '#002A66', dark: '#75CFFF' },
      colorTextButtonNormalActive: { light: '#002A66', dark: '#75CFFF' },

      colorBackgroundSegmentDefault: { light: 'transparent', dark: 'transparent' },

      // ========================================================================
      // BUTTONS - Primary
      // ========================================================================
      colorBackgroundButtonPrimaryDefault: { light: '#FF9900', dark: '#FFB347' },
      colorBackgroundButtonPrimaryHover: { light: '#FA6F00', dark: '#FFC870' },
      colorBackgroundButtonPrimaryActive: { light: '#FA6F00', dark: '#FFC870' },

      colorTextButtonPrimaryDefault: { light: '#0F141A', dark: '#0F141A' },
      colorTextButtonPrimaryHover: { light: '#0F141A', dark: '#0F141A' },
      colorTextButtonPrimaryActive: { light: '#0F141A', dark: '#0F141A' },

      // ========================================================================
      // BUTTONS - Link
      // ========================================================================
      colorBackgroundButtonLinkHover: { light: '#F0FBFF', dark: '#1B232D' },
      colorBackgroundButtonLinkActive: { light: '#D1F1FF', dark: '#333843' },

      colorTextLinkButtonNormalDefault: { light: '#006CE0', dark: '#42B4FF' },

      // ========================================================================
      // BUTTONS - Toggle
      // ========================================================================
      colorBackgroundToggleButtonNormalPressed: { light: '#D1F1FF', dark: '#333843' },
      colorBorderToggleButtonNormalPressed: { light: '#006CE0', dark: '#42B4FF' },
      colorTextToggleButtonNormalPressed: { light: '#002A66', dark: '#75CFFF' },

      // ========================================================================
      // CONTROLS - Checkboxes, Radio, Toggle
      // ========================================================================
      colorBackgroundControlChecked: { light: '#006CE0', dark: '#42B4FF' },
      //colorBackgroundToggleCheckedDisabled: { light: '#B8E7FF', dark: '#002A66' },

      // ========================================================================
      // LINKS & TEXT
      // ========================================================================
      colorTextLinkDefault: { light: '#006CE0', dark: '#42B4FF' },
      colorTextLinkHover: { light: '#002A66', dark: '#75CFFF' },
      colorTextAccent: { light: '#006CE0', dark: '#42B4FF' },

      // ========================================================================
      // SELECTION & FOCUS
      // ========================================================================
      colorBorderItemFocused: { light: '#006CE0', dark: '#42B4FF' },
      colorBorderItemSelected: { light: '#006CE0', dark: '#42B4FF' },
      colorBackgroundItemSelected: { light: '#F0FBFF', dark: '#001129' },
      colorBackgroundLayoutToggleSelectedDefault: { light: '#006CE0', dark: '#42B4FF' },

      // ========================================================================
      // SEGMENTS & TABS
      // ========================================================================
      colorBackgroundSegmentActive: { light: '#006CE0', dark: '#42B4FF' },

      // ========================================================================
      // SLIDER
      // ========================================================================
      colorBackgroundSliderRangeDefault: { light: '#006CE0', dark: '#42B4FF' },
      colorBackgroundSliderHandleDefault: { light: '#006CE0', dark: '#42B4FF' },
      //colorBackgroundSliderRangeActive: { light: '#004A9E', dark: '#75CFFF' },
      //colorBackgroundSliderHandleActive: { light: '#004A9E', dark: '#75CFFF' },

      // ========================================================================
      // PROGRESS BAR
      // ========================================================================
      colorBackgroundProgressBarValueDefault: { light: '#006CE0', dark: '#42B4FF' },

      // ========================================================================
      // NOTIFICATIONS
      // ========================================================================
      colorBackgroundNotificationGreen: { light: '#00802F', dark: '#2BB534' },
      colorBackgroundNotificationBlue: { light: '#006CE0', dark: '#42B4FF' },

      // ========================================================================
      // STATUS
      // ========================================================================
      colorTextStatusInfo: { light: '#006CE0', dark: '#42B4FF' },
      // colorTextStatusWarning: { light: '#855900', dark: '#FFE347' },
      // colorTextStatusError: { light: '#DB0000', dark: '#FF7A7A' },

      colorTextBreadcrumbCurrent: { light: '#656871', dark: '#8c8c94' },

      // ========================================================================
      // TYPOGRAPHY - Headings
      // ========================================================================
      // Display Large
      // fontSizeDisplayL: '42px',
      // lineHeightDisplayL: '48px',
      fontWeightDisplayL: '700',

      // H1
      fontSizeHeadingXl: '24px',
      lineHeightHeadingXl: '30px',
      fontWeightHeadingXl: '700',

      // H2
      fontSizeHeadingL: '20px',
      lineHeightHeadingL: '24px',
      fontWeightHeadingL: '700',
      //letterSpacingHeadingL: '-0.015em',

      // H3
      fontSizeHeadingM: '18px',
      lineHeightHeadingM: '22px',
      fontWeightHeadingM: '700',

      // H4
      fontSizeHeadingS: '16px',
      lineHeightHeadingS: '20px',
      fontWeightHeadingS: '700',

      // H5
      fontSizeHeadingXs: '14px',
      lineHeightHeadingXs: '18px',
      fontWeightHeadingXs: '700',

      // ========================================================================
      // TYPOGRAPHY - Other
      // ========================================================================
      fontWeightButton: '700',

      // ========================================================================
      // BORDERS - Width
      // ========================================================================
      borderWidthButton: '2px',
      borderWidthToken: '2px',
      borderWidthAlert: '2px',
      borderItemWidth: '2px',
      borderWidthItemSelected: '2px',
      borderWidthCardSelected: '2px',

      // ========================================================================
      // SPACE
      // ========================================================================
      spaceAlertVertical: '12px',
      spaceButtonHorizontal: '20px',
      spaceTabsVertical: '4px',
      spaceTokenVertical: { comfortable: '4px', compact: '2px' },
      spaceFieldVertical: { comfortable: '5px', compact: '3px' },

      // ========================================================================
      // BORDERS - Radius
      // ========================================================================
      borderRadiusAlert: '12px',
      borderRadiusBadge: '4px',
      borderRadiusButton: '20px',
      borderRadiusContainer: '16px',
      borderRadiusDropdown: '8px',
      borderRadiusDropzone: '12px',
      borderRadiusFlashbar: '12px',
      borderRadiusItem: '8px',
      borderRadiusInput: '8px',
      borderRadiusPopover: '8px',
      borderRadiusTabsFocusRing: '20px',
      borderRadiusToken: '8px',
      borderRadiusTutorialPanelItem: '8px',

      // ========================================================================
      // ICONS - Stroke Width
      // ========================================================================
      borderWidthIconSmall: '2px',
      borderWidthIconNormal: '2px',
      borderWidthIconMedium: '2px',
      borderWidthIconBig: '3px',
      borderWidthIconLarge: '4px',
    },

    contexts: {
      'top-navigation': {
        tokens: {
          //colorBackgroundContainerContent: { light: '#161D26', dark: '#161D26' },
        },
      },
      header: {
        tokens: {
          colorBorderButtonNormalDefault: '#42B4FF',
          colorBorderButtonNormalHover: '#75CFFF',
          colorBorderButtonNormalActive: '#75CFFF',

          colorBackgroundButtonNormalHover: '#1B232D',
          colorBackgroundButtonNormalActive: '#333843',

          colorTextButtonNormalDefault: '#42B4FF',
          colorTextButtonNormalHover: '#75CFFF',
          colorTextButtonNormalActive: '#75CFFF',

          // ========================================================================
          // BUTTONS - Primary
          // ========================================================================
          colorBackgroundButtonPrimaryDefault: '#FFB347',
          colorBackgroundButtonPrimaryHover: '#FFC870',
          colorBackgroundButtonPrimaryActive: '#FFC870',

          colorTextButtonPrimaryDefault: '#0F141A',
          colorTextButtonPrimaryHover: '#0F141A',
          colorTextButtonPrimaryActive: '#0F141A',
        },
      },
      flashbar: {
        tokens: {
          // Custom flashbar colors
          //colorBackgroundNotificationBlue: { light: '#0033cc', dark: '#0033cc' },
        },
      },
      alert: {
        tokens: {
          colorBackgroundStatusInfo: { light: '#F0FBFF', dark: '#001129' },
          colorBackgroundStatusWarning: { light: '#FFFEF0', dark: '#191100' },
          colorBackgroundStatusError: { light: '#FFF5F5', dark: '#1F0000' },
          colorBackgroundStatusSuccess: { light: '#EFFFF1', dark: '#001401' },
          colorTextStatusInfo: { light: '#006CE0', dark: '#42B4FF' },
          //colorBorderStatusInfo: { light: '#006CE0', dark: '#42B4FF' },
        },
      },
    },
  };
}

export const themeCoreConfig = generateThemeConfigCoreDefault();

export const colorTextLinkSecondOption = { light: '#295EFF', dark: '#7598FF' };

// ============================================================================
// Theme Comparison Utilities
// ============================================================================

/**
 * Utility for comparing different theme design directions.
 * Ensures complete theme isolation by resetting before each application.
 */
export function createThemeComparison() {
  return {
    /**
     * Apply Design Direction A with optional custom accent color
     */
    applyDirectionA: () => {
      const themeA = generateThemeConfigOneTheme();
      // applyCustomTheme handles reset automatically
      return themeA;
    },

    /**
     * Apply Design Direction B
     */
    applyDirectionB: () => {
      const themeB = generateThemeConfigConsole();
      // applyCustomTheme handles reset automatically
      return themeB;
    },

    /**
     * Get theme config without applying (for inspection/comparison)
     */
    getThemeConfig: (direction: 'A' | 'B') => {
      return direction === 'A' ? generateThemeConfigOneTheme() : generateThemeConfigConsole();
    },
  };
}
