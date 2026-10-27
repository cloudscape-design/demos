// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import {
  applyDensity,
  applyMode,
  Density,
  disableMotion,
  Mode,
  setThemeClass,
  Theme,
} from '@cloudscape-design/global-styles';

import * as localStorage from './local-storage';

import '@cloudscape-design/global-styles/index.css';

(window as any).disableMotionForTests = disableMotion;

// always `true` in this design
export const isVisualRefresh = true;

// Default every demo to One Theme. `setThemeClass` treats the theme classes as
// mutually exclusive: it adds `awsui-one-theme` and removes
// `awsui-visual-refresh`, so the visual-refresh secondary theme no longer
// applies on top of One Theme. This module is the first entry in every page
// bundle (see webpack.config.mjs), so it runs before React renders.
if (typeof document !== 'undefined') {
  setThemeClass(Theme.OneTheme);
}

export let currentDensity: Density = localStorage.load('Awsui-Density-Preference') ?? Density.Comfortable;
applyDensity(currentDensity);

export function updateDensity(density: string) {
  applyDensity(density as Density);
  localStorage.save('Awsui-Density-Preference', density);
  currentDensity = density as Density;
}

export let currentMode: Mode = localStorage.load('Awsui-Mode-Preference') ?? Mode.Light;
applyMode(currentMode);

export function updateMode(mode: string) {
  applyMode(mode as Mode);
  localStorage.save('Awsui-Mode-Preference', mode);
  currentMode = mode as Mode;
}

export let currentDirection: string = localStorage.load('Awsui-Direction-Preference') ?? 'ltr';
if (typeof document !== 'undefined') {
  document.documentElement.dir = currentDirection;
}

export function updateDirection(direction: string) {
  document.documentElement.dir = direction;
  localStorage.save('Awsui-Direction-Preference', direction);
  currentDirection = direction;
}
