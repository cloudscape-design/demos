// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from './theme-core';

/**
 * Applies the custom theme to the application
 */
export function applyCustomTheme() {
  applyTheme({ theme: themeCoreConfig });
}
