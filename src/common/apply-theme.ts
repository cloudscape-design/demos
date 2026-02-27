// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from './theme-core';

/**
 * Applies the custom theme to the application
 */
export function applyCustomTheme(customConfig?: typeof themeCoreConfig) {
  const themeToApply = customConfig || themeCoreConfig;
  applyTheme({ theme: themeToApply });
}

// Apply default theme on module load
applyCustomTheme();
