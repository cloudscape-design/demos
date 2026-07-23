// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme as applyComponentTheme } from '@cloudscape-design/components/theming';
import {
  applyDensity,
  applyMode,
  applyTheme as applyGlobalStylesTheme,
  Density,
  disableMotion,
  Mode,
  Theme,
} from '@cloudscape-design/global-styles';

import * as localStorage from './local-storage';

import '@cloudscape-design/global-styles/index.css';
import './ember-modern-font.css';

(window as any).disableMotionForTests = disableMotion;

// always `true` in this design
export const isVisualRefresh = true;

// Default every page to the One Theme. Using global-styles' applyTheme (rather
// than manually adding the class) treats the theme classes as mutually
// exclusive: it adds `awsui-one-theme` and removes `awsui-visual-refresh`, so
// the visual-refresh secondary theme no longer applies on top of One Theme.
// This module is the first entry in every page bundle, so it runs before React
// renders.
if (typeof document !== 'undefined') {
  applyGlobalStylesTheme(Theme.OneTheme);
}

export const BaseFont = {
  Regular: 'base-font-regular',
  NightMode: 'base-font-night-mode',
} as const;

export type BaseFont = (typeof BaseFont)[keyof typeof BaseFont];

const baseFontFamilies: Record<BaseFont, string> = {
  [BaseFont.Regular]: "'Ember Modern Text UI Regular', 'Amazon Ember', Roboto, Arial, sans-serif",
  [BaseFont.NightMode]: "'Ember Modern Text UI Night Mode', 'Amazon Ember', Roboto, Arial, sans-serif",
};

const isBaseFont = (value: unknown): value is BaseFont => value === BaseFont.Regular || value === BaseFont.NightMode;

let resetBaseFontTheme: (() => void) | undefined;

const applyBaseFont = (baseFont: BaseFont) => {
  const previousReset = resetBaseFontTheme;
  resetBaseFontTheme = applyComponentTheme({
    theme: { tokens: { fontFamilyBase: baseFontFamilies[baseFont] } },
  }).reset;
  previousReset?.();
};

const storedBaseFont = localStorage.load('Awsui-Base-Font-Preference');
export let currentBaseFont: BaseFont = isBaseFont(storedBaseFont) ? storedBaseFont : BaseFont.Regular;
applyBaseFont(currentBaseFont);

export function updateBaseFont(baseFont: BaseFont) {
  applyBaseFont(baseFont);
  localStorage.save('Awsui-Base-Font-Preference', baseFont);
  currentBaseFont = baseFont;
}

// Initialize density
export let currentDensity: Density = localStorage.load('Awsui-Density-Preference') ?? Density.Comfortable;
applyDensity(currentDensity);

export function updateDensity(density: string) {
  applyDensity(density as Density);
  localStorage.save('Awsui-Density-Preference', density);
  currentDensity = density as Density;
}

// Initialize mode
export let currentMode: Mode = localStorage.load('Awsui-Mode-Preference') ?? Mode.Dark;
applyMode(currentMode);

export function updateMode(mode: string) {
  applyMode(mode as Mode);
  localStorage.save('Awsui-Mode-Preference', mode);
  currentMode = mode as Mode;
}

// Initialize direction
export let currentDirection: string = localStorage.load('Awsui-Direction-Preference') ?? 'ltr';
document.documentElement.dir = currentDirection;

export function updateDirection(direction: string) {
  document.documentElement.dir = direction;
  localStorage.save('Awsui-Direction-Preference', direction);
  currentDirection = direction;
}
