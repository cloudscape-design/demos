// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export const themeCoreConfig = {
  tokens: {
    fontFamilyBase: 'Amazon Ember Display',
    // Normal Buttons
    colorBorderButtonNormalDefault: { light: '#1b232d', dark: '#f3f3f7' },
    colorBorderButtonNormalHover: { light: '#295eff', dark: '#7598ff' },
    colorBorderButtonNormalActive: { light: '#1b232d', dark: '#7598ff' },

    colorBackgroundButtonNormalHover: { light: '#ffffff', dark: '#1b232d' },
    colorBackgroundButtonNormalActive: { light: '#dbe4ff', dark: '#000833' },

    colorTextButtonNormalDefault: { light: '#1b232d', dark: '#f3f3f7' },
    colorTextButtonNormalHover: { light: '#295eff', dark: '#7598ff' },
    colorTextButtonNormalActive: { light: '#1b232d', dark: '#7598ff' },

    colorTextLinkButtonNormalDefault: { light: '#295eff', dark: '#7598ff' },

    // Primary Buttons
    colorBackgroundButtonPrimaryDefault: { light: '#1b232d', dark: '#f9f9fb' },
    colorBackgroundButtonPrimaryHover: { light: '#295eff', dark: '#c2d1ff' },
    colorBackgroundButtonPrimaryActive: { light: '#1b232d', dark: '#f9f9fb' },

    colorTextButtonPrimaryDefault: { light: '#ffffff', dark: '#131920' },
    colorTextButtonPrimaryHover: { light: '#ffffff', dark: '#131920' },
    colorTextButtonPrimaryActive: { light: '#ffffff', dark: '#131920' },

    borderRadiusButton: '8px',
    borderRadiusFlashbar: '8px',

    // Segmented control
    //colorBackgroundSegmentActive: { light: '#1b232d', dark: '#f9f9fb' },

    colorTextStatusInfo: { light: '#0033cc', dark: '#5c7fff' },
    colorTextStatusWarning: { light: '#855900', dark: '#ffe347' },
    colorTextStatusError: { light: '#DB0000', dark: '#ff7a7a' },

    // Font related themes
    // fontSizeBodyM: '14px',
    // fontSizeBodyS: '12px',
    // lineHeightBodyM: '20px',

    // fontSizeHeadingXl: '32px',
    // fontSizeHeadingL: '24px',
    // fontSizeHeadingM: '20px',
    // fontSizeHeadingS: '18px',
    // fontSizeHeadingXs: '16px',
    // fontSizeDisplayL: '42px',

    // lineHeightHeadingXl: '40px',
    // lineHeightHeadingL: '30px',
    // lineHeightHeadingM: '24px',
    // lineHeightHeadingS: '22px',
    // lineHeightHeadingXs: '20px',
    // lineHeightDisplayL: '48px',
  },

  referenceTokens: {
    color: {
      primary: {
        seed: '#295eff',
      },
    },
  },

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
        colorTextAccent: { light: '#295eff', dark: '#7598ff' },
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
        colorBackgroundLayoutMain: { light: '#ffffff', dark: '#161d26' },
      },
    },
    flashbar: {
      tokens: {
        // Custom flashbar color
        colorBackgroundNotificationGreen: { light: '#008559', dark: '#008559' },
        colorBackgroundNotificationBlue: { light: '#0033cc', dark: '#0033cc' },
      },
    },
  },
};
