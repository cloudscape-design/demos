// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyDensity, applyMode, Density, disableMotion, Mode } from '@cloudscape-design/global-styles';

import * as localStorage from './local-storage';

import '@cloudscape-design/global-styles/index.css';

(window as any).disableMotionForTests = disableMotion;

// always `true` in this design
export const isVisualRefresh = true;

export let currentDensity: Density = localStorage.load('Awsui-Density-Preference') ?? Density.Comfortable;
applyDensity(currentDensity);

export function updateDensity(density: string) {
  applyDensity(density as Density);
  localStorage.save('Awsui-Density-Preference', density);
  currentDensity = density as Density;
}

export let currentMode: Mode = localStorage.load('Awsui-Color-Scheme') ?? Mode.Light;
applyMode(currentMode);

export function updateMode(mode: Mode) {
  applyMode(mode);
  // Write directly so the preference persists in local dev (consent wrapper may be absent)
  window.localStorage.setItem('Awsui-Color-Scheme', JSON.stringify(mode));
  currentMode = mode;
  const toggle = document.getElementById('color-scheme-toggle') as HTMLButtonElement | null;
  if (toggle) {
    toggle.setAttribute('data-mode', mode);
  }
}

// Expose globally so the inline header script can call it before React mounts
(window as any).updateMode = updateMode;
(window as any).Mode = Mode;
