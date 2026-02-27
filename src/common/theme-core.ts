// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export const themeCoreConfig = {
  tokens: {
    fontFamilyBase: 'Amazon Ember Display',
    // Normal Buttons
    colorBorderButtonNormalDefault: { light: '#1b232d', dark: '#f3f3f7' },
    colorBorderButtonNormalHover: { light: '#295eff', dark: '#7598ff' },
    colorBorderButtonNormalActive: { light: '#1b232d', dark: '#7598ff' },

    colorBackgroundToggleButtonNormalPressed: { light: '#F5F7FF', dark: '#000833' },

    colorBorderToggleButtonNormalPressed: { light: '#295eff', dark: '#7598ff' },

    colorBackgroundButtonNormalHover: { light: '#fff', dark: '#000833' },
    colorBackgroundButtonNormalActive: { light: '#dbe4ff', dark: '#000833' },

    colorBackgroundButtonLinkHover: { light: '#F5F7FF', dark: '#000833' },
    colorBackgroundButtonLinkActive: { light: '#dbe4ff', dark: '#000833' },

    colorTextButtonNormalDefault: { light: '#1b232d', dark: '#f3f3f7' },
    colorTextButtonNormalHover: { light: '#295eff', dark: '#7598ff' },
    colorTextButtonNormalActive: { light: '#1b232d', dark: '#7598ff' },

    colorTextLinkButtonNormalDefault: { light: '#295eff', dark: '#7598ff' },
    colorBackgroundSegmentActive: { light: '#295eff', dark: '#7598ff' },

    // Slider
    colorBackgroundSliderRangeDefault: { light: '#295eff', dark: '#7598ff' },
    colorBackgroundSliderHandleDefault: { light: '#295eff', dark: '#7598ff' },
    colorBackgroundSliderRangeActive: { light: '#0033CC', dark: '#94AFFF' },
    colorBackgroundSliderHandleActive: { light: '#0033CC', dark: '#94AFFF' },

    colorBackgroundButtonPrimaryDefault: { light: '#1b232d', dark: '#f9f9fb' }, // Try out gradient
    colorBackgroundButtonPrimaryHover: { light: '#295eff', dark: '#c2d1ff' },
    colorBackgroundButtonPrimaryActive: { light: '#1b232d', dark: '#f9f9fb' },

    colorTextButtonPrimaryDefault: { light: '#ffffff', dark: '#131920' },
    colorTextButtonPrimaryHover: { light: '#ffffff', dark: '#131920' },
    colorTextButtonPrimaryActive: { light: '#ffffff', dark: '#131920' },

    // Specific text colors
    colorTextLinkDefault: { light: '#295eff', dark: '#7598ff' },
    colorTextLinkHover: { light: '#0033cc', dark: '#94afff' },
    colorTextAccent: { light: '#295eff', dark: '#7598ff' },

    colorTextToggleButtonNormalPressed: { light: '#0033CC', dark: '#94AFFF' },

    colorBackgroundLayoutToggleSelectedDefault: { light: '#295eff', dark: '#7598ff' },
    colorBorderItemFocused: { light: '#295eff', dark: '#7598ff' },
    colorBorderItemSelected: { light: '#295eff', dark: '#7598ff' },

    colorBackgroundItemSelected: { light: '#F5F7FF', dark: '#000833' },
    colorBackgroundControlChecked: { light: '#295eff', dark: '#7598ff' },
    colorBackgroundProgressBarValueDefault: { light: '#295eff', dark: '#7598ff' },

    colorBackgroundToggleCheckedDisabled: { light: '#C2D1FF', dark: '#001A99' },

    colorBackgroundNotificationGreen: { light: '#008559', dark: '#008559' },
    colorBackgroundNotificationBlue: { light: '#295eff', dark: '#7598ff' },

    colorTextStatusInfo: { light: '#295eff', dark: '#7598ff' },
    // colorTextStatusWarning: { light: '#855900', dark: '#ffe347' },
    // colorTextStatusError: { light: '#DB0000', dark: '#ff7a7a' },

    // Font related themes
    // H1
    fontSizeHeadingXl: '26px',
    lineHeightHeadingXl: '32px',
    // H2
    fontSizeHeadingL: '22px',
    lineHeightHeadingL: '26px',
    // H3
    fontSizeHeadingM: '20px',
    lineHeightHeadingM: '24px',
    // H4
    fontSizeHeadingS: '18px',
    lineHeightHeadingS: '22px',
    // H5
    fontSizeHeadingXs: '16px',
    lineHeightHeadingXs: '20px',

    fontWeightButton: '500',
    fontWeightHeadingXl: '500',
    fontWeightHeadingL: '500',
    fontWeightHeadingM: '500',
    fontWeightHeadingS: '500',
    fontWeightHeadingXs: '500',

    // Border width
    borderWidthButton: '2px',
    borderWidthToken: '1px',
    borderWidthAlert: '0px',

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

    // Icon stroke width
    borderWidthIconSmall: '1.5px',
    borderWidthIconNormal: '2px',
    borderWidthIconMedium: '2px',
    borderWidthIconBig: '2px',
    borderWidthIconLarge: '2.5px',
  },

  // referenceTokens: {
  //   color: {
  //     primary: {
  //       seed: '#E5006F',
  //     },
  //   },
  // },

  contexts: {
    'top-navigation': {
      tokens: {
        colorBackgroundContainerContent: { light: '#ffffff', dark: '#161d26' },
        colorBorderDividerDefault: { light: '#c6c6cd', dark: '#232b37' },
        colorTextTopNavigationTitle: { light: '#1b232d', dark: '#f3f3f7' },

        // Normal Buttons
        colorTextInteractiveDefault: { light: '#1b232d', dark: '#f3f3f7' },
        colorTextInteractiveHover: { light: '#295eff', dark: '#7598ff' },
        colorTextInteractiveActive: { light: '#1b232d', dark: '#7598ff' },
        //colorTextAccent: { light: '#295eff', dark: '#7598ff' },
        colorTextAccent: { light: '#1b232d', dark: '#f3f3f7' },
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
        // Custom flashbar color
        colorBackgroundNotificationGreen: { light: '#008559', dark: '#008559' },
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
