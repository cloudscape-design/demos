// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { TabsProps } from '@cloudscape-design/components/tabs';

import ChatSideNav from '../chat-common/chat-side-nav';
import { CUSTOM_COLORS, mode } from './custom-theme-styles';
import { useDarkMode } from './use-chat-theme';

// Style API overrides: bottom accent indicator with slightly larger text.
function getCustomTabsStyle(isDark: boolean): TabsProps.Style {
  return {
    tab: {
      borderRadius: '4px',
      paddingBlock: '8px',
      paddingInline: '12px',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: {
        default: 'transparent',
        hover: mode(CUSTOM_COLORS.divider, isDark),
        active: 'transparent',
      },
      color: {
        default: mode(CUSTOM_COLORS.textSecondary, isDark),
        hover: mode(CUSTOM_COLORS.textPrimary, isDark),
        active: mode(CUSTOM_COLORS.accent, isDark),
      },
      activeIndicator: {
        color: mode(CUSTOM_COLORS.accent, isDark),
      },
    },
    tabSeparator: {
      color: 'transparent',
    },
  };
}

// Custom-chat side navigation panel.
export default function CustomNavigation({ onNewChat }: { onNewChat?: () => void }) {
  const isDark = useDarkMode();

  return <ChatSideNav title="Assistant" tabsStyle={getCustomTabsStyle(isDark)} onNewChat={onNewChat} />;
}
