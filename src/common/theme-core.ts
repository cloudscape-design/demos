// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// ============================================================================
// SEMANTIC COLOR TOKENS
// Higher-level tokens that define the theme's color palette
// ============================================================================

export function generateThemeConfig(customAccentColor?: { light: string; dark: string }) {
  // Primary accent colors
  //const colorSelectedAccent = { light: '#295eff', dark: '#7598ff' };
  const colorSelectedAccent = customAccentColor || { light: '#1b232d', dark: '#f3f3f7' };

  const colorSelectedAccentHover = { light: '#0033CC', dark: '#94AFFF' };

  //const colorSelectedAccentSubtle = { light: '#F5F7FF', dark: '#000833' };
  const colorSelectedAccentSubtle = { light: '#F6F6F9', dark: '#06080A' };

  const colorSelectedAccentSubtleHover = { light: '#dbe4ff', dark: '#000833' };
  //const colorSelectedAccentDisabled = { light: '#C2D1FF', dark: '#001A99' };

  // Secondary accent colors (darker/more saturated variant)
  const colorSelectedAccentSecondary = { light: '#1b232d', dark: '#7598ff' };
  const colorSelectedAccentSecondaryHover = { light: '#295eff', dark: '#c2d1ff' };

  // Neutral colors
  const colorNeutralDefault = { light: '#1b232d', dark: '#f3f3f7' };
  const colorNeutralInverse = { light: '#ffffff', dark: '#131920' };
  const colorNeutralBackground = { light: '#F6F6F9', dark: '#000833' };

  // Status colors
  const colorSuccess = { light: '#008559', dark: '#008559' };

  return {
    tokens: {
      fontFamilyBase: 'Amazon Ember Display',

      // ========================================================================
      // BUTTONS - Normal
      // ========================================================================
      colorBorderButtonNormalDefault: colorNeutralDefault,
      colorBorderButtonNormalHover: colorSelectedAccent,
      colorBorderButtonNormalActive: colorSelectedAccentSecondary,

      colorBackgroundButtonNormalHover: colorNeutralBackground,
      colorBackgroundButtonNormalActive: colorSelectedAccentSubtleHover,

      colorTextButtonNormalDefault: colorNeutralDefault,
      colorTextButtonNormalHover: colorSelectedAccent,
      colorTextButtonNormalActive: colorSelectedAccentSecondary,

      // ========================================================================
      // BUTTONS - Primary
      // ========================================================================
      colorBackgroundButtonPrimaryDefault: colorSelectedAccentSecondary,
      colorBackgroundButtonPrimaryHover: colorSelectedAccentSecondaryHover,
      colorBackgroundButtonPrimaryActive: colorSelectedAccentSecondary,

      colorTextButtonPrimaryDefault: colorNeutralInverse,
      colorTextButtonPrimaryHover: colorNeutralInverse,
      colorTextButtonPrimaryActive: colorNeutralInverse,

      // ========================================================================
      // BUTTONS - Link
      // ========================================================================
      colorBackgroundButtonLinkHover: colorSelectedAccentSubtle,
      colorBackgroundButtonLinkActive: colorSelectedAccentSubtleHover,

      colorTextLinkButtonNormalDefault: colorSelectedAccent,

      // ========================================================================
      // BUTTONS - Toggle
      // ========================================================================
      // colorBackgroundToggleButtonNormalPressed: colorSelectedAccentSubtle,
      // colorBorderToggleButtonNormalPressed: colorSelectedAccent,
      // colorTextToggleButtonNormalPressed: colorSelectedAccentHover,

      // ========================================================================
      // CONTROLS - Checkboxes, Radio, Toggle
      // ========================================================================
      colorBackgroundControlChecked: colorSelectedAccent,
      //colorBackgroundToggleCheckedDisabled: colorSelectedAccentDisabled,

      // ========================================================================
      // LINKS & TEXT
      // ========================================================================
      colorTextLinkDefault: colorSelectedAccent,
      colorTextLinkHover: colorSelectedAccentHover,
      colorTextAccent: colorSelectedAccent,

      // ========================================================================
      // SELECTION & FOCUS
      // ========================================================================
      colorBorderItemFocused: colorSelectedAccent,
      colorBorderItemSelected: colorSelectedAccent,
      colorBackgroundItemSelected: colorSelectedAccentSubtle,
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
      colorBackgroundSliderRangeActive: colorSelectedAccentHover,
      colorBackgroundSliderHandleActive: colorSelectedAccentHover,

      // ========================================================================
      // PROGRESS BAR
      // ========================================================================
      colorBackgroundProgressBarValueDefault: colorSelectedAccent,

      // ========================================================================
      // NOTIFICATIONS
      // ========================================================================
      colorBackgroundNotificationGreen: colorSuccess,
      colorBackgroundNotificationBlue: colorSelectedAccent,

      // ========================================================================
      // STATUS
      // ========================================================================
      colorTextStatusInfo: colorSelectedAccent,
      // colorTextStatusWarning: { light: '#855900', dark: '#ffe347' },
      // colorTextStatusError: { light: '#DB0000', dark: '#ff7a7a' },

      // ========================================================================
      // TYPOGRAPHY - Headings
      // ========================================================================
      // Display Large
      // fontSizeDisplayL: '26px',
      // lineHeightDisplayL: '32px',
      // fontWeightDisplay: '500',

      // H1
      fontSizeHeadingXl: '28px',
      lineHeightHeadingXl: '32px',
      fontWeightHeadingXl: '500',

      // H2
      fontSizeHeadingL: '22px',
      lineHeightHeadingL: '26px',
      fontWeightHeadingL: '500',

      // H3
      fontSizeHeadingM: '20px',
      lineHeightHeadingM: '24px',
      fontWeightHeadingM: '500',

      // H4
      fontSizeHeadingS: '18px',
      lineHeightHeadingS: '22px',
      fontWeightHeadingS: '500',

      // H5
      fontSizeHeadingXs: '16px',
      lineHeightHeadingXs: '20px',
      fontWeightHeadingXs: '500',

      // ========================================================================
      // TYPOGRAPHY - Other
      // ========================================================================
      fontWeightButton: '500',

      // ========================================================================
      // BORDERS - Width
      // ========================================================================
      borderWidthButton: '1px',
      borderWidthToken: '1px',
      borderWidthAlert: '0px',
      borderItemWidth: '1px',

      // ========================================================================
      // BORDERS - Radius
      // ========================================================================
      borderRadiusAlert: '2px',
      borderRadiusBadge: '4px',
      borderRadiusButton: '8px',
      borderRadiusContainer: '12px',
      borderRadiusDropdown: '8px',
      borderRadiusDropzone: '8px',
      borderRadiusFlashbar: '8px',
      borderRadiusItem: '8px',
      borderRadiusInput: '8px',
      borderRadiusPopover: '8px',
      borderRadiusTabsFocusRing: '10px',
      borderRadiusToken: '8px',
      borderRadiusTutorialPanelItem: '4px',

      // ========================================================================
      // ICONS - Stroke Width
      // ========================================================================
      borderWidthIconSmall: '1px',
      borderWidthIconNormal: '1.5px',
      borderWidthIconMedium: '2px',
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
          colorBorderDividerDefault: { light: '#c6c6cd', dark: '#232b37' },
          colorTextTopNavigationTitle: colorNeutralDefault,

          // Interactive elements
          colorTextInteractiveDefault: colorNeutralDefault,
          colorTextInteractiveHover: colorSelectedAccent,
          colorTextInteractiveActive: { light: '#1b232d', dark: '#7598ff' },
          colorTextAccent: colorNeutralDefault,
        },
      },
      header: {
        tokens: {
          // Normal button
          colorBorderButtonNormalDefault: '#f3f3f7',
          colorBorderButtonNormalHover: '#7598ff',
          colorBorderButtonNormalActive: '#7598ff',

          colorBackgroundButtonNormalHover: '#1b232d',
          colorBackgroundButtonNormalActive: '#000833',

          colorTextButtonNormalDefault: '#f3f3f7',
          colorTextButtonNormalHover: '#7598ff',
          colorTextButtonNormalActive: '#7598ff',

          // Primary button
          colorBackgroundButtonPrimaryDefault: '#f9f9fb',
          colorBackgroundButtonPrimaryHover: '#c2d1ff',
          colorBackgroundButtonPrimaryActive: '#f9f9fb',

          colorTextButtonPrimaryDefault: '#131920',
          colorTextButtonPrimaryHover: '#131920',
          colorTextButtonPrimaryActive: '#131920',
        },
      },
      'app-layout-toolbar': {
        tokens: {
          //colorBackgroundLayoutMain: { light: '#ffffff', dark: '#161d26' },
        },
      },
      flashbar: {
        tokens: {
          // Custom flashbar colors
          colorBackgroundNotificationGreen: colorSuccess,
          colorBackgroundNotificationBlue: { light: '#0033cc', dark: '#0033cc' },
        },
      },
      alert: {
        tokens: {
          colorBackgroundStatusInfo: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusWarning: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusError: { light: '#f6f6f9', dark: '#232b37' },
          colorBackgroundStatusSuccess: { light: '#f6f6f9', dark: '#232b37' },
        },
      },
    },
  };
}

export const themeCoreConfig = generateThemeConfig();
