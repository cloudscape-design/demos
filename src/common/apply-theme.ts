// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme } from '@cloudscape-design/components/theming';

import { generateThemeConfig, generateThemeConfigConsole, themeCoreConfig } from './theme-cw';

// Store the reset function from the current theme
let currentThemeReset: (() => void) | null = null;

/**
 * Applies the custom theme to the application
 * @param customConfig - Optional custom theme configuration. Pass undefined to reset to defaults.
 */
export function applyCustomTheme(customConfig?: Partial<typeof themeCoreConfig>) {
  // Always reset previous theme first
  if (currentThemeReset) {
    currentThemeReset();
    currentThemeReset = null;
  }

  // If no config provided, apply empty theme to reset to Cloudscape defaults
  if (!customConfig) {
    const { reset: resetFn } = applyTheme({ theme: { tokens: {} } });
    currentThemeReset = resetFn;
    return;
  }

  // Apply the new theme and store its reset function
  const { reset: resetFn } = applyTheme({ theme: customConfig as any });
  currentThemeReset = resetFn;
}

/**
 * Resets to Cloudscape defaults (no custom theme)
 */
export function resetToDefaults() {
  if (currentThemeReset) {
    currentThemeReset();
    currentThemeReset = null;
  }
  // Apply empty theme to ensure complete reset
  const { reset: resetFn } = applyTheme({ theme: { tokens: {} } });
  currentThemeReset = resetFn;
}

// ============================================================================
// Theme Comparison API
// ============================================================================

/**
 * Hook-style API for comparing different theme design directions.
 * Ensures complete isolation between themes by resetting before each application.
 *
 * @example
 * ```tsx
 * function ThemeComparison() {
 *   const { applyDirectionA, applyDirectionB, resetToDefault } = useThemeComparison();
 *
 *   return (
 *     <SpaceBetween direction="horizontal" size="xs">
 *       <Button onClick={() => applyDirectionA()}>Direction A</Button>
 *       <Button onClick={() => applyDirectionB()}>Direction B</Button>
 *       <Button onClick={resetToDefault}>Reset</Button>
 *     </SpaceBetween>
 *   );
 * }
 * ```
 */
export function useThemeComparison() {
  const applyDirectionA = (customAccentColor?: { light: string; dark: string }) => {
    const themeA = generateThemeConfig(customAccentColor);
    applyCustomTheme(themeA);
  };

  const applyDirectionB = () => {
    const themeB = generateThemeConfigConsole();
    applyCustomTheme(themeB);
  };

  const resetToDefault = () => {
    resetToDefaults();
  };

  return {
    applyDirectionA,
    applyDirectionB,
    resetToDefault,
  };
}

// Apply default theme and custom CSS class on module load
applyCustomTheme();
document.body.classList.add('custom-css-enabled');
