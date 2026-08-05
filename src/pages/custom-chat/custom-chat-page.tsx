// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Flashbar from '@cloudscape-design/components/flashbar';
import {
  applyTheme as applyConsoleTheme,
  ApplyThemeResult as ConsoleApplyThemeResult,
  Theme as ConsoleTheme,
} from '@cloudscape-design/components/theming';
import { applyTheme, ApplyThemeResult } from '@cloudscape-design/components/theming';

import { SuggestionButtonStyleContext } from '../chat-common/suggestion-prompts';
import { useDisclaimerFlashbarItem } from '../commons/disclaimer-flashbar-item';
import CustomChat from './custom-chat';
import { customTheme } from './custom-theme';
import { getCustomSuggestionButtonStyle } from './custom-theme-styles';
import { CustomThemeContext, useDarkMode } from './use-chat-theme';

// Inner provider that resolves the dark-mode-aware suggestion button style for all nested SuggestionPrompts.
function SuggestionButtonStyleProvider({ children }: { children: React.ReactNode }) {
  const isDark = useDarkMode();
  const buttonStyle = getCustomSuggestionButtonStyle(isDark);

  return <SuggestionButtonStyleContext.Provider value={buttonStyle}>{children}</SuggestionButtonStyleContext.Provider>;
}

// The Core-only custom-themed chat demo; owns the theming lifecycle and provides CustomThemeContext.
export default function CustomChatPage() {
  // Apply the theme through both core and console `applyTheme` so token overrides reach both namespaces.
  const themeResetRef = useRef<ApplyThemeResult | null>(null);
  const consoleThemeResetRef = useRef<ConsoleApplyThemeResult | null>(null);

  useEffect(() => {
    themeResetRef.current = applyTheme({ theme: customTheme });
    consoleThemeResetRef.current = applyConsoleTheme({ theme: customTheme as unknown as ConsoleTheme });
    return () => {
      themeResetRef.current?.reset();
      consoleThemeResetRef.current?.reset();
    };
  }, []);

  // Disclaimer flashbar renders only on external systems; wired here for parity with the default demo.
  const [dismissedMessages, setDismissedMessages] = useState<Set<string>>(new Set());
  const disclaimerItem = useDisclaimerFlashbarItem(id => setDismissedMessages(prev => new Set(prev).add(id)));
  const notifications = (
    <Flashbar items={disclaimerItem && !dismissedMessages.has(disclaimerItem.id!) ? [disclaimerItem] : []} />
  );

  return (
    <CustomThemeContext.Provider value={true}>
      <SuggestionButtonStyleProvider>
        <CustomChat notifications={notifications} />
      </SuggestionButtonStyleProvider>
    </CustomThemeContext.Provider>
  );
}
