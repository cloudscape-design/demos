// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Theme } from '@cloudscape-design/components/theming';

const customTheme: Theme = {
  tokens: {
    colorBackgroundButtonPrimaryDefault: { light: '{colorGrey800}', dark: '{colorGrey200}' },
    colorBackgroundButtonPrimaryHover: { light: '{colorGrey650}', dark: '{colorGrey300}' },
    colorBackgroundButtonPrimaryActive: { light: '{colorGrey800}', dark: '{colorGrey200}' },

    colorBorderButtonPrimaryDefault: { light: '{colorGrey800}', dark: '{colorGrey200}' },
    colorBorderButtonPrimaryHover: { light: '{colorGrey650}', dark: '{colorGrey300}' },
    colorBorderButtonPrimaryActive: { light: '{colorGrey800}', dark: '{colorGrey200}' },

    colorTextButtonPrimaryActive: { light: '{colorWhite}', dark: '{colorGrey900}' },
    colorTextButtonPrimaryHover: { light: '{colorGrey100}', dark: '{colorGrey900}' },
    colorTextButtonPrimaryDefault: { light: '{colorWhite}', dark: '{colorGrey900}' },

    colorBackgroundButtonNormalDefault: { light: '{colorWhite}', dark: '{colorGrey800}' },
    colorBackgroundButtonNormalActive: { light: '{colorWhite}', dark: '{colorGrey800}' },
    colorBackgroundButtonNormalHover: { light: '{colorGrey100}', dark: '{colorGrey650}' },

    colorBorderButtonNormalDefault: { light: '{colorGrey900}', dark: '{colorGrey200}' },
    colorBorderButtonNormalHover: { light: '{colorGrey900}', dark: '{colorGrey100}' },
    colorBorderButtonNormalActive: { light: '{colorGrey900}', dark: '{colorGrey200}' },

    colorTextButtonNormalActive: { light: '{colorGrey800}', dark: '{colorWhite}' },
    colorTextButtonNormalHover: { light: '{colorGrey800}', dark: '{colorWhite}' },
    colorTextButtonNormalDefault: { light: '{colorGrey800}', dark: '{colorWhite}' },

    colorTextLinkDefault: { light: '{colorGrey900}', dark: '{colorGrey100}' },
    colorTextLinkHover: { light: '{colorGrey700}', dark: '{colorWhite}' },
    colorTextAccent: { light: '{colorBlue600}', dark: '{colorBlue500}' },

    colorBackgroundHomeHeader: { light: '{colorAwsSquidInk}', dark: '{colorBlack}' },
    fontFamilyBase: "'Amazon Ember Display', Amazon Ember, Arial, sans-serif",
    fontFamilyMonospace: "'Amazon Ember Mono', 'Monaco', 'Courier New', monospace",

    fontSizeBodyM: '16px',
    fontSizeBodyS: '14px',
    lineHeightBodyM: '24px',

    fontSizeHeadingXl: '36px',
    fontSizeHeadingL: '28px',
    fontSizeHeadingM: '24px',
    fontSizeHeadingS: '20px',
    fontSizeHeadingXs: '18px',
    fontSizeDisplayL: '48px',

    lineHeightHeadingXl: '44px',
    lineHeightHeadingL: '36px',
    lineHeightHeadingM: '32px',
    lineHeightHeadingS: '28px',
    lineHeightHeadingXs: '24px',
    lineHeightDisplayL: '56px',

    fontWeightButton: '700',
    fontWeightHeadingXl: '500',
    fontWeightHeadingL: '500',
    fontWeightHeadingM: '500',
    fontWeightHeadingS: '500',
    fontWeightHeadingXs: '500',

    borderRadiusButton: '24px',

    colorBackgroundNotificationSeverityNeutral: { light: '{colorGrey200}', dark: '{colorGrey900}' },
    colorBackgroundNotificationSeverityLow: { light: '#D9FFD6', dark: '{colorGrey900}' },
    colorBackgroundNotificationSeverityMedium: { light: '#FFFBBD', dark: '{colorGrey900}' },

    colorTextNotificationSeverityNeutral: { light: '{colorGrey700}', dark: '{colorGrey900}' },
  },
} as any;

export default customTheme;
