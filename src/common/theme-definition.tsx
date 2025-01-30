// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Theme } from '@cloudscape-design/components/theming';

const customTheme: Theme = {
  tokens: {
    colorBorderButtonPrimaryActive: '{colorGrey800}',
    colorBackgroundButtonPrimaryActive: '{colorGrey800}',
    colorBorderButtonPrimaryDefault: '{colorGrey800}',
    colorBackgroundButtonPrimaryDefault: '{colorGrey800}',
    colorBorderButtonPrimaryHover: '{colorGrey800}',
    colorBackgroundButtonPrimaryHover: '{colorGrey700}',

    colorBackgroundButtonNormalActive: '{colorGrey100}',
    colorBackgroundButtonNormalHover: '{colorGrey100}',

    colorBorderButtonNormalDefault: { light: '{colorGrey900}', dark: '{colorGrey600}' },
    colorBorderButtonNormalHover: { light: '{colorGrey900}', dark: '{colorGrey600}' },
    colorBorderButtonNormalActive: { light: '{colorGrey900}', dark: '{colorGrey600}' },

    colorTextButtonPrimaryActive: '{colorGrey100}',
    colorTextButtonPrimaryDefault: '{colorGrey100}',
    colorTextButtonPrimaryHover: '{colorGrey100}',

    colorTextButtonNormalActive: '{colorGrey800}',
    colorTextButtonNormalDefault: '{colorGrey800}',
    colorTextButtonNormalHover: '{colorGrey800}',

    colorTextLinkDefault: { light: '{colorGrey900}', dark: '{colorGrey100}' },
    colorTextLinkHover: { light: '{colorGrey700}', dark: '{colorWhite}' },
    colorTextAccent: { light: '{colorBlue600}', dark: '{colorGrey100}' },

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
