// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AvatarProps } from '@cloudscape-design/chat-components/avatar';
import { ChatBubbleProps } from '@cloudscape-design/chat-components/chat-bubble';
import { ButtonProps } from '@cloudscape-design/components/button';
import { PromptInputProps } from '@cloudscape-design/components/prompt-input';

// Custom-theme light/dark color pairs, shared by the design-token map and the Style API helpers below. Invoked only by the custom demo.
export type ColorPair = { light: string; dark: string };

export const CUSTOM_COLORS = {
  canvas: { light: '#F0F4F8', dark: '#131314' }, // page / container / toolbar background
  surface: { light: '#FFFFFF', dark: '#1E1F20' }, // inputs, dropdown items, dialog
  surfaceMuted: { light: '#F0F4F9', dark: '#1E1F20' }, // popover, layout toggle, notification grey
  textPrimary: { light: '#1F1F1F', dark: '#E3E3E3' },
  textSecondary: { light: '#5F6368', dark: '#9AA0A6' },
  iconMuted: { light: '#5F6368', dark: '#C4C7C5' }, // default interactive icon color
  accent: { light: '#1A73E8', dark: '#8AB4F8' },
  accentHover: { light: '#1765CC', dark: '#AECBFA' },
  accentActive: { light: '#1558B0', dark: '#669DF6' },
  onAccent: { light: '#FFFFFF', dark: '#0F0F11' }, // text/icon on a filled accent surface
  link: { light: '#0B57D0', dark: '#8AB4F8' }, // link + text-accent (darker blue in light for WCAG)
  linkHover: { light: '#0842A0', dark: '#AECBFA' },
  bubbleOutgoing: { light: '#E8EBF0', dark: '#282A2C' }, // outgoing bubble + pinned input tokens
  divider: { light: '#E8EAED', dark: '#3C4043' }, // dividers + neutral chip hover surface
  chipBg: { light: '#FFFFFF', dark: 'transparent' }, // normal-button / suggestion chip resting fill
  chipActiveBg: { light: '#DADCE0', dark: '#5F6368' },
  chipBorder: { light: 'transparent', dark: '#444746' },
  chipActiveBorder: { light: '#BDC1C6', dark: '#5F6368' },
  chipText: { light: '#444746', dark: '#E3E3E3' }, // resting normal-button / chip label
} satisfies Record<string, ColorPair>;

/** Picks the mode-appropriate value from a palette pair. */
export const mode = (pair: ColorPair, isDark: boolean): string => (isDark ? pair.dark : pair.light);

export function getCustomAvatarStyleGenAi(isDark: boolean): AvatarProps.Style {
  return {
    root: {
      background: 'transparent',
      borderColor: 'transparent',
      borderRadius: '0',
      color: mode(CUSTOM_COLORS.accent, isDark),
    },
  };
}

export function getCustomAvatarStyleUser(isDark: boolean): AvatarProps.Style {
  return {
    root: {
      background: 'transparent',
      borderColor: 'transparent',
      borderRadius: '50%',
      color: mode(CUSTOM_COLORS.textSecondary, isDark),
    },
  };
}

export function getCustomChatBubbleStyleIncoming(isDark: boolean): ChatBubbleProps.Style {
  return {
    // Transparent bubble (no container) matching the default demo; paddingBlock 8px matches the avatar's intrinsic padding so the icon aligns with the first text line.
    bubble: {
      background: 'transparent',
      borderColor: 'transparent',
      borderWidth: '0',
      color: mode(CUSTOM_COLORS.textPrimary, isDark),
      paddingBlock: '8px',
    },
  };
}

export function getCustomChatBubbleStyleOutgoing(isDark: boolean): ChatBubbleProps.Style {
  return {
    bubble: {
      background: mode(CUSTOM_COLORS.bubbleOutgoing, isDark),
      borderRadius: '24px',
      borderColor: 'transparent',
      borderWidth: '0',
      color: mode(CUSTOM_COLORS.textPrimary, isDark),
      paddingBlock: '12px',
      paddingInline: '16px',
    },
  };
}

// Core tokens don't flip under the classic dark-mode class, so these helpers drive text/icon colors from `isDark` directly.

export function getCustomControlTextColor(isDark: boolean): string {
  return mode(CUSTOM_COLORS.textPrimary, isDark);
}

export function getCustomControlSecondaryTextColor(isDark: boolean): string {
  return mode(CUSTOM_COLORS.textSecondary, isDark);
}

export function getCustomControlIconColor(isDark: boolean): string {
  return mode(CUSTOM_COLORS.iconMuted, isDark);
}

// Suggestion-chip buttons: normal-button tokens don't flip for dark mode, so colors are driven from `isDark`.
export function getCustomSuggestionButtonStyle(isDark: boolean): ButtonProps.Style {
  return {
    root: {
      background: {
        default: mode(CUSTOM_COLORS.chipBg, isDark),
        hover: mode(CUSTOM_COLORS.divider, isDark),
        active: mode(CUSTOM_COLORS.chipActiveBg, isDark),
      },
      borderColor: {
        default: mode(CUSTOM_COLORS.chipBorder, isDark),
        hover: mode(CUSTOM_COLORS.chipBorder, isDark),
        active: mode(CUSTOM_COLORS.chipActiveBorder, isDark),
      },
      borderRadius: '9999px',
      borderWidth: isDark ? '1px' : '0',
      color: {
        default: mode(CUSTOM_COLORS.chipText, isDark),
        hover: mode(CUSTOM_COLORS.textPrimary, isDark),
        active: mode(CUSTOM_COLORS.textPrimary, isDark),
      },
    },
  };
}

export function getCustomPromptInputStyle(isDark: boolean): PromptInputProps.Style {
  const surface = mode(CUSTOM_COLORS.surface, isDark);
  const border = isDark ? '#444746' : '#E1E3E1';
  return {
    root: {
      backgroundColor: {
        default: surface,
        focus: surface,
        hover: surface,
        disabled: surface,
      },
      borderColor: {
        default: border,
        focus: border,
        hover: border,
      },
      borderRadius: '32px',
      borderWidth: '1px',
      boxShadow: {
        default: isDark ? 'none' : 'rgba(0, 0, 0, 0.08) 0px 2px 8px 0px',
        focus: isDark ? 'none' : 'rgba(0, 0, 0, 0.12) 0px 4px 12px 0px',
        hover: isDark ? 'none' : 'rgba(0, 0, 0, 0.10) 0px 3px 10px 0px',
      },
      color: {
        default: mode(CUSTOM_COLORS.textPrimary, isDark),
      },
      paddingBlock: '14px',
      paddingInline: '24px',
    },
    placeholder: {
      color: mode(CUSTOM_COLORS.textSecondary, isDark),
      fontSize: '16px',
      fontStyle: 'normal',
    },
  };
}
