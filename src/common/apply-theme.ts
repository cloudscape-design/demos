// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme } from '@cloudscape-design/components/theming';

import { generateThemeConfigOneTheme, themeCoreConfig } from './theme-one-theme';

import './ember-modern-font.css';

// Store the reset function from the current theme
let currentThemeReset: (() => void) | null = null;

/**
 * Applies the custom theme to the application
 * @param customConfig - Optional custom theme configuration. Pass undefined to reset to defaults.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyCustomTheme(customConfig?: Record<string, any>) {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 * Hook-style API for applying the One Theme.
 */
export function useThemeComparison() {
  const applyDirectionA = () => {
    const themeA = generateThemeConfigOneTheme();
    applyCustomTheme(themeA);
  };

  const resetToDefault = () => {
    resetToDefaults();
  };

  return {
    applyDirectionA,
    resetToDefault,
  };
}

// Apply default CW theme and custom CSS class on module load
// eslint-disable-next-line @typescript-eslint/no-explicit-any
applyCustomTheme(themeCoreConfig as any);
document.body.classList.add('custom-css-enabled');
