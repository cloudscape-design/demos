// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Theme } from '@cloudscape-design/components-core/theming';

import { ColorPair, CUSTOM_COLORS } from './custom-theme-styles';

// Custom global theme token map handed to `applyTheme`; lives here so only the custom-chat bundle pulls it in. Colors come from the shared CUSTOM_COLORS palette.
const TRANSPARENT: ColorPair = { light: 'transparent', dark: 'transparent' };

export const customTheme: Theme = {
  // Override reference tokens so the AppLayoutToolbar canvas uses the custom color; targeting these keeps the blast radius to a single consumer.
  referenceTokens: {
    color: {
      neutral: {
        50: { light: CUSTOM_COLORS.canvas.light },
        900: { dark: CUSTOM_COLORS.canvas.dark },
      },
    },
  },
  tokens: {
    // Backgrounds — cards/containers use `surface` so embedded artifact cards stay visible against the canvas.
    colorBackgroundLayoutMain: CUSTOM_COLORS.canvas,
    colorBackgroundContainerContent: CUSTOM_COLORS.surface,
    colorBackgroundContainerHeader: CUSTOM_COLORS.surface,
    colorBackgroundInputDefault: CUSTOM_COLORS.surface,
    colorBackgroundLayoutToolbar: CUSTOM_COLORS.canvas,
    colorBackgroundHomeHeader: CUSTOM_COLORS.canvas,

    // Chat bubbles — incoming transparent, outgoing subtle gray
    colorBackgroundChatBubbleIncoming: TRANSPARENT,
    colorBackgroundChatBubbleOutgoing: CUSTOM_COLORS.bubbleOutgoing,
    colorTextChatBubbleIncoming: CUSTOM_COLORS.textPrimary,
    colorTextChatBubbleOutgoing: CUSTOM_COLORS.textPrimary,

    // Primary / accent
    colorTextAccent: CUSTOM_COLORS.link,
    colorBackgroundButtonPrimaryDefault: CUSTOM_COLORS.accent,
    colorBackgroundButtonPrimaryHover: CUSTOM_COLORS.accentHover,
    colorBackgroundButtonPrimaryActive: CUSTOM_COLORS.accentActive,
    colorBorderButtonPrimaryDefault: CUSTOM_COLORS.accent,
    colorBorderButtonPrimaryHover: CUSTOM_COLORS.accentHover,
    colorBorderButtonPrimaryActive: CUSTOM_COLORS.accentActive,
    colorTextButtonPrimaryDefault: CUSTOM_COLORS.onAccent,
    colorTextButtonPrimaryHover: CUSTOM_COLORS.onAccent,
    colorTextButtonPrimaryActive: CUSTOM_COLORS.onAccent,

    // Links
    colorTextLinkDefault: CUSTOM_COLORS.link,
    colorTextLinkHover: CUSTOM_COLORS.linkHover,

    // Interactive
    colorTextInteractiveDefault: CUSTOM_COLORS.iconMuted,
    colorTextInteractiveHover: CUSTOM_COLORS.accent,
    colorTextInteractiveActive: CUSTOM_COLORS.accentActive,
    colorBackgroundControlChecked: CUSTOM_COLORS.accent,
    colorBorderItemFocused: CUSTOM_COLORS.accent,
    colorBorderInputFocused: { light: '#DADCE0', dark: '#444746' },

    // Text
    colorTextBodyDefault: CUSTOM_COLORS.textPrimary,
    colorTextBodySecondary: CUSTOM_COLORS.textSecondary,
    colorTextHeadingDefault: CUSTOM_COLORS.textPrimary,
    colorTextHeadingSecondary: CUSTOM_COLORS.textSecondary,

    // Border radius — rounded pill shapes
    borderRadiusContainer: '24px',
    borderRadiusButton: '9999px',
    borderRadiusInput: '28px',
    borderRadiusDropdown: '16px',
    borderRadiusItem: '12px',
    borderRadiusToken: '12px',
    borderRadiusAlert: '16px',
    borderRadiusPopover: '16px',

    // Inline tokens (PromptInput pinned /mode and @reference tokens)
    colorBackgroundItemSelected: CUSTOM_COLORS.bubbleOutgoing,
    colorBorderItemSelected: TRANSPARENT,
    colorItemSelected: CUSTOM_COLORS.textPrimary,

    // Borders — minimal
    colorBorderDividerDefault: CUSTOM_COLORS.divider,
    colorBorderDividerSecondary: { light: '#F0F0F0', dark: '#2A2B2E' },
    colorBorderContainerTop: TRANSPARENT,
    colorBorderInputDefault: { light: '#DADCE0', dark: '#3C4043' },

    // Cards / containers — no visible border, no shadow
    colorBorderCard: TRANSPARENT,
    borderWidthCard: '0',
    shadowCard: { light: 'none', dark: 'none' },

    // Notifications
    colorBackgroundNotificationBlue: { light: '#E8F0FE', dark: '#1E2A3A' },
    colorBackgroundNotificationGreen: { light: '#E6F4EA', dark: '#1E3A2A' },
    colorBackgroundNotificationRed: { light: '#FCE8E6', dark: '#3A1E1E' },
    colorBackgroundNotificationYellow: { light: '#FEF7E0', dark: '#3A351E' },
    colorBackgroundNotificationGrey: CUSTOM_COLORS.surfaceMuted,
    colorTextNotificationDefault: CUSTOM_COLORS.textPrimary,
    borderRadiusFlashbar: '16px',

    // Popover / dropdown
    colorBackgroundPopover: CUSTOM_COLORS.surfaceMuted,
    colorBorderPopover: CUSTOM_COLORS.divider,
    colorBorderDropdownContainer: CUSTOM_COLORS.divider,
    colorBackgroundDropdownItemDefault: CUSTOM_COLORS.surface,
    colorBackgroundDropdownItemHover: { light: '#F0F4F9', dark: '#2A2B2E' },
    colorTextDropdownItemDefault: CUSTOM_COLORS.textPrimary,
    colorTextDropdownItemHighlighted: CUSTOM_COLORS.textPrimary,

    // Dialog
    colorBackgroundDialog: CUSTOM_COLORS.surface,

    // Normal buttons — filled white pill chips (also support prompts + landing chips)
    colorBackgroundButtonNormalDefault: CUSTOM_COLORS.chipBg,
    colorBackgroundButtonNormalHover: CUSTOM_COLORS.divider,
    colorBackgroundButtonNormalActive: CUSTOM_COLORS.chipActiveBg,
    colorBorderButtonNormalDefault: CUSTOM_COLORS.chipBorder,
    colorBorderButtonNormalHover: CUSTOM_COLORS.chipBorder,
    colorBorderButtonNormalActive: CUSTOM_COLORS.chipActiveBorder,
    colorTextButtonNormalDefault: CUSTOM_COLORS.chipText,
    colorTextButtonNormalHover: CUSTOM_COLORS.textPrimary,
    colorTextButtonNormalActive: CUSTOM_COLORS.textPrimary,
    borderWidthButton: '0',
    fontWeightButton: '400',

    // Layout toggle buttons (sidebar open/close)
    colorBackgroundLayoutToggleDefault: CUSTOM_COLORS.surfaceMuted,
    colorBackgroundLayoutToggleHover: { light: '#E8EAED', dark: '#2A2B2E' },
    colorBackgroundLayoutToggleActive: { light: '#DADCE0', dark: '#3C4043' },
    colorTextLayoutToggle: CUSTOM_COLORS.textSecondary,
    colorTextLayoutToggleHover: CUSTOM_COLORS.textPrimary,
    colorTextLayoutToggleActive: CUSTOM_COLORS.textPrimary,
    colorTextLayoutToggleSelected: CUSTOM_COLORS.accent,
    colorBackgroundLayoutToggleSelectedDefault: { light: '#E8F0FE', dark: '#1E1F20' },
    colorBackgroundLayoutToggleSelectedHover: { light: '#D2E3FC', dark: '#2A2B2E' },
    colorBackgroundLayoutToggleSelectedActive: { light: '#AECBFA', dark: '#3C4043' },

    // Input placeholder
    colorTextInputPlaceholder: { light: '#80868B', dark: '#9AA0A6' },

    // Form text
    colorTextFormDefault: CUSTOM_COLORS.textPrimary,
    colorTextFormSecondary: CUSTOM_COLORS.textSecondary,
    colorTextLabel: CUSTOM_COLORS.textSecondary,
  },
  contexts: {
    flashbar: {
      tokens: {
        colorBackgroundNotificationBlue: CUSTOM_COLORS.surface,
        colorBackgroundNotificationGreen: CUSTOM_COLORS.surface,
        colorBackgroundNotificationRed: CUSTOM_COLORS.surface,
        colorBackgroundNotificationYellow: CUSTOM_COLORS.surface,
        colorTextNotificationDefault: CUSTOM_COLORS.textPrimary,
        colorTextBodyDefault: CUSTOM_COLORS.textPrimary,
        colorTextBodySecondary: CUSTOM_COLORS.textSecondary,
        colorTextHeadingDefault: CUSTOM_COLORS.textPrimary,
        colorTextInteractiveDefault: CUSTOM_COLORS.iconMuted,
        colorTextInteractiveHover: CUSTOM_COLORS.accent,
        colorTextInteractiveActive: CUSTOM_COLORS.accentActive,
        colorTextInteractiveInvertedDefault: CUSTOM_COLORS.textPrimary,
        colorTextInteractiveInvertedHover: CUSTOM_COLORS.accent,
        // Give flashbar normal-buttons a filled accent surface so their text stays legible on the light flashbar.
        colorBackgroundButtonNormalDefault: CUSTOM_COLORS.accent,
        colorBackgroundButtonNormalHover: CUSTOM_COLORS.accentHover,
        colorBackgroundButtonNormalActive: CUSTOM_COLORS.accentActive,
        colorTextButtonNormalDefault: CUSTOM_COLORS.onAccent,
        colorTextButtonNormalHover: CUSTOM_COLORS.onAccent,
        colorTextButtonNormalActive: CUSTOM_COLORS.onAccent,
        colorBorderButtonNormalDefault: CUSTOM_COLORS.accent,
        colorBorderButtonNormalHover: CUSTOM_COLORS.accentHover,
        colorBorderButtonNormalActive: CUSTOM_COLORS.accentActive,
        colorTextLinkDefault: CUSTOM_COLORS.link,
        colorTextLinkHover: CUSTOM_COLORS.linkHover,
        colorBorderDividerDefault: { light: '#E0E0E0', dark: '#3C4043' },
      },
    },
  },
};
