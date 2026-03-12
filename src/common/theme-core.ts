// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// ============================================================================
// Theme for design option A
// ============================================================================

export function generateThemeConfig(customAccentColor?: { light: string; dark: string }) {
  // Primary accent colors

  const colorSelectedAccent = customAccentColor || { light: '#1b232d', dark: '#F9F9FB' };

  const colorSelectedAccentSubtle = { light: '#F6F6F9', dark: '#06080A' };

  const colorSelectedAccentSubtleHover = { light: '#EBEBF0', dark: '#131920' };

  // Secondary accent colors (darker/more saturated variant)
  const colorSelectedAccentSecondary = { light: '#1b232d', dark: '#F9F9FB' };

  // Neutral colors
  const colorNeutralDefault = { light: '#1b232d', dark: '#f3f3f7' };
  const colorNeutralInverse = { light: '#ffffff', dark: '#131920' };
  const colorNeutralBackground = { light: '#F6F6F9', dark: '#333843' };

  // Toned down text color
  const colorTextBodySecondary = { light: '#656871', dark: '#B4B4BB' };

  // Status colors
  const colorSuccess = { light: '#008559', dark: '#008559' };

  return {
    tokens: {
      fontFamilyBase: 'Amazon Ember Display',
      colorTextBodySecondary: colorTextBodySecondary,

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
      colorBackgroundButtonPrimaryHover: { light: '#06080A', dark: '#FFFFFF' },
      colorBackgroundButtonPrimaryActive: colorSelectedAccentSecondary,

      colorTextButtonPrimaryDefault: colorNeutralInverse,
      colorTextButtonPrimaryHover: colorNeutralInverse,
      colorTextButtonPrimaryActive: colorNeutralInverse,

      // ========================================================================
      // BUTTONS - Link
      // ========================================================================
      colorBackgroundButtonLinkHover: { light: '#F6F6F9', dark: '#333843' },
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
      colorTextLinkDefault: colorTextBodySecondary,
      colorTextLinkHover: { light: '#06080A', dark: '#FFFFFF' },
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

      // ========================================================================
      // PROGRESS BAR
      // ========================================================================
      colorBackgroundProgressBarValueDefault: colorSelectedAccent,

      // ========================================================================
      // NOTIFICATIONS
      // ========================================================================
      colorBackgroundNotificationGreen: colorSuccess,
      colorBackgroundNotificationBlue: { light: '#0033CC', dark: '#0033CC' },

      // ========================================================================
      // STATUS
      // ========================================================================
      colorTextStatusInfo: { light: '#0033CC', dark: '#7598FF' },
      // colorTextStatusWarning: { light: '#855900', dark: '#ffe347' },
      // colorTextStatusError: { light: '#DB0000', dark: '#ff7a7a' },

      // ========================================================================
      // TYPOGRAPHY - Headings
      // ========================================================================
      colorTextBreadcrumbCurrent: colorSelectedAccent,

      // H1
      fontSizeHeadingXl: '28px',
      lineHeightHeadingXl: '32px',
      fontWeightHeadingXl: '500',

      // H2
      fontSizeHeadingL: '22px',
      lineHeightHeadingL: '26px',
      fontWeightHeadingL: '500',
      //letterSpacingHeadingL: '20px',

      // H3
      fontSizeHeadingM: '18px',
      lineHeightHeadingM: '24px',
      fontWeightHeadingM: '500',

      // H4
      fontSizeHeadingS: '16px',
      lineHeightHeadingS: '20px',
      fontWeightHeadingS: '500',

      // H5
      fontSizeHeadingXs: '14px',
      lineHeightHeadingXs: '20px',
      fontWeightHeadingXs: '500',

      //fontFamilyHeading: 'Ember Modern Display',

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
          colorBorderDividerDefault: { light: '#c6c6cd', dark: '#424650' },
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
          // colorBorderButtonNormalHover: '#7598ff',
          // colorBorderButtonNormalActive: '#7598ff',

          colorBackgroundButtonNormalHover: '#1b232d',
          colorBackgroundButtonNormalActive: '#000833',

          colorTextButtonNormalDefault: '#f3f3f7',
          // colorTextButtonNormalHover: '#7598ff',
          // colorTextButtonNormalActive: '#7598ff',

          // Primary button
          colorBackgroundButtonPrimaryDefault: '#f9f9fb',
          // colorBackgroundButtonPrimaryHover: '#c2d1ff',
          // colorBackgroundButtonPrimaryActive: '#f9f9fb',

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
          colorTextStatusInfo: { light: '#0033CC', dark: '#7598FF' },
          colorBorderStatusInfo: { light: '#0033CC', dark: '#7598FF' },
        },
      },
    },
  };
}

// ============================================================================
// Theme for design option B
// ============================================================================

export function generateThemeConfigB() {
  return {
    tokens: {
      fontFamilyBase: 'Amazon Ember',

      // ========================================================================
      // BUTTONS - Normal
      // ========================================================================
      colorBorderButtonNormalDefault: { light: '#006CE0', dark: '#42B4FF' },
      colorBorderButtonNormalHover: { light: '#002A66', dark: '#75CFFF' },
      colorBorderButtonNormalActive: { light: '#002A66', dark: '#75CFFF' },

      colorBackgroundButtonNormalHover: { light: '#F0FBFF', dark: '#1B232D' },
      colorBackgroundButtonNormalActive: { light: '#D1F1FF', dark: '#333843' },

      colorTextButtonNormalDefault: { light: '#006CE0', dark: '#42B4FF' },
      colorTextButtonNormalHover: { light: '#002A66', dark: '#75CFFF' },
      colorTextButtonNormalActive: { light: '#002A66', dark: '#75CFFF' },

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

      //fontFamilyHeading: 'Ember Modern Display',

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
          // Normal button
          colorBorderButtonNormalDefault: '#f3f3f7',
          // colorBorderButtonNormalHover: '#7598ff',
          // colorBorderButtonNormalActive: '#7598ff',

          colorBackgroundButtonNormalHover: '#1b232d',
          colorBackgroundButtonNormalActive: '#000833',

          colorTextButtonNormalDefault: '#f3f3f7',
          // colorTextButtonNormalHover: '#7598ff',
          // colorTextButtonNormalActive: '#7598ff',

          // Primary button
          colorBackgroundButtonPrimaryDefault: '#f9f9fb',
          // colorBackgroundButtonPrimaryHover: '#c2d1ff',
          // colorBackgroundButtonPrimaryActive: '#f9f9fb',

          colorTextButtonPrimaryDefault: '#131920',
          colorTextButtonPrimaryHover: '#131920',
          colorTextButtonPrimaryActive: '#131920',
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
          colorBorderStatusInfo: { light: '#006CE0', dark: '#42B4FF' },
        },
      },
    },
  };
}

export const themeCoreConfig = generateThemeConfig();

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
    applyDirectionA: (customAccentColor?: { light: string; dark: string }) => {
      const themeA = generateThemeConfig(customAccentColor);
      // applyCustomTheme handles reset automatically
      return themeA;
    },

    /**
     * Apply Design Direction B
     */
    applyDirectionB: () => {
      const themeB = generateThemeConfigB();
      // applyCustomTheme handles reset automatically
      return themeB;
    },

    /**
     * Get theme config without applying (for inspection/comparison)
     */
    getThemeConfig: (direction: 'A' | 'B', customAccentColor?: { light: string; dark: string }) => {
      return direction === 'A' ? generateThemeConfig(customAccentColor) : generateThemeConfigB();
    },
  };
}
