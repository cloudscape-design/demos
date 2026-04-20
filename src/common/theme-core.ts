// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// ============================================================================
// Theme for new Core default
// ============================================================================

export function generateThemeConfig(customAccentColor?: { light: string; dark: string }, fontFamily?: string) {
  const isEmberModern = fontFamily?.includes('Ember Modern Text') ?? false;
  const isNotoSans = fontFamily?.includes('Noto Sans') ?? false;
  const headingFontWeight = isEmberModern ? '700' : isNotoSans ? '600' : '500';
  // Primary accent colors

  const colorSelectedAccent = customAccentColor || { light: '#1b232d', dark: '#F9F9FB' };

  const colorSelectedAccentSubtle = { light: '#F6F6F9', dark: '#06080A' };

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
      //colorTextBodySecondary: colorTextBodySecondary,

      // ========================================================================
      // BUTTONS - Normal
      // ========================================================================
      colorBorderButtonNormalDefault: colorNeutralDefault,
      colorBorderButtonNormalHover: colorSelectedAccent,
      colorBorderButtonNormalActive: colorSelectedAccentSecondary,

      colorBackgroundButtonNormalHover: { light: '#F6F6F9', dark: '#1B232D' },
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
      colorTextBreadcrumbCurrent: colorSelectedAccent,

      // Body text
      // fontSizeBodyM: '13px',
      // lineHeightBodyM: '18px',

      // H1
      fontSizeHeadingXl: '24px',
      lineHeightHeadingXl: '30px',
      fontWeightHeadingXl: headingFontWeight,

      // H2
      fontSizeHeadingL: '20px',
      lineHeightHeadingL: '24px',
      fontWeightHeadingL: headingFontWeight,
      //letterSpacingHeadingL: '20px',

      // H3
      fontSizeHeadingM: '18px',
      lineHeightHeadingM: '22px',
      fontWeightHeadingM: headingFontWeight,

      // H4
      fontSizeHeadingS: '16px',
      lineHeightHeadingS: '20px',
      fontWeightHeadingS: headingFontWeight,

      // H5
      fontSizeHeadingXs: '14px',
      lineHeightHeadingXs: '20px',
      fontWeightHeadingXs: headingFontWeight,

      //fontFamilyHeading: 'Ember Modern Display',

      // ========================================================================
      // TYPOGRAPHY - Other
      // ========================================================================
      fontWeightButton: headingFontWeight,
      fontWeightTabs: headingFontWeight,
      fontSizeTabs: '16px',

      // ========================================================================
      // SPACE
      // ========================================================================
      spaceAlertVertical: '4px',
      spaceButtonHorizontal: '12px',
      spaceTabsVertical: '2px',

      // ========================================================================
      // BORDERS - Width
      // ========================================================================
      borderWidthButton: '1px',
      borderWidthToken: '1px',
      borderWidthAlert: '0px',
      borderItemWidth: '1px',
      borderWidthAlertInlineStart: '2px',

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
// Theme for Console
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
      colorBackgroundButtonLinkDefault: { light: 'transparent', dark: 'transparent' }, // Added
      colorBackgroundButtonLinkHover: { light: '#f0fbff', dark: '#1b232d' }, // Added
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
      colorTextLinkSecondaryDefault: { light: '#006CE0', dark: '#42B4FF' }, // Added
      colorTextLinkSecondaryHover: { light: '#002A66', dark: '#75CFFF' }, // Added
      colorTextLinkInfoDefault: { light: '#006CE0', dark: '#42B4FF' }, // Added
      colorTextLinkInfoHover: { light: '#002A66', dark: '#75CFFF' }, // Added
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
      colorTextStatusSuccess: { light: '#00802F', dark: '#2BB534' }, // Added

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

      spaceButtonHorizontal: '20px',

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
          colorBorderStatusInfo: { light: '#006CE0', dark: '#42B4FF' },
          colorTextStatusSuccess: { light: '#00802F', dark: '#2BB534' }, // Added
          colorBorderStatusSuccess: { light: '#00802F', dark: '#2BB534' }, // Added
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
      const themeB = generateThemeConfigConsole();
      // applyCustomTheme handles reset automatically
      return themeB;
    },

    /**
     * Get theme config without applying (for inspection/comparison)
     */
    getThemeConfig: (direction: 'A' | 'B', customAccentColor?: { light: string; dark: string }) => {
      return direction === 'A' ? generateThemeConfig(customAccentColor) : generateThemeConfigConsole();
    },
  };
}
