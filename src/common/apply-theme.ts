// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme } from '@cloudscape-design/components/theming';

import { generateThemeConfigOneTheme, themeCoreConfig } from './theme-one-theme';

import './ember-modern-font.css';

// The dev-v3-onetheme build of @cloudscape-design/components scopes every
// visual-context token set (e.g. `app-layout-toolbar`, `top-navigation`) under
// the `.awsui-one-theme` secondary theme. Without this class on <body>, the
// theming-runtime emits rules like `.awsui-one-theme .awsui-context-app-layout-toolbar`
// which never match, and context overrides silently have no effect.
// Must run before React renders and before applyTheme below.
if (typeof document !== 'undefined') {
  document.body.classList.add('awsui-one-theme');
}

// Store the reset function from the current theme
let currentThemeReset: (() => void) | null = null;

// The dev-v3-onetheme preset is structured as:
//   primary   = { id: 'classic',        selector: 'body' }
//   secondary = [
//     { id: 'visual-refresh', selector: '.awsui-visual-refresh' },
//     { id: 'one-theme',      selector: '.awsui-one-theme' },
//   ]
// Contexts like `app-layout-toolbar`, `top-navigation`, `alert`, etc. only
// exist in the secondary themes. The theming runtime's `applyTheme` uses
// `preset.theme` (the primary) as the base unless `baseThemeId` is passed —
// so without it, our context overrides are silently dropped in mergeInPlace
// (because `theme.contexts[contextId]` is undefined on the classic theme).
const BASE_THEME_ID = 'one-theme';

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
    const { reset: resetFn } = applyTheme({ theme: { tokens: {} }, baseThemeId: BASE_THEME_ID });
    currentThemeReset = resetFn;
    return;
  }

  // Apply the new theme and store its reset function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { reset: resetFn } = applyTheme({ theme: customConfig as any, baseThemeId: BASE_THEME_ID });
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
  const { reset: resetFn } = applyTheme({ theme: { tokens: {} }, baseThemeId: BASE_THEME_ID });
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
