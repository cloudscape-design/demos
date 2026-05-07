// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyDensity, Density, disableMotion } from '@cloudscape-design/global-styles';

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

// --- One Theme ---
// Activated by placing `awsui-one-theme` on <body> before React renders.
// `useOneTheme` caches its state on first render (same contract as VR),
// so any change here is followed by a full-page reload elsewhere.

const ONE_THEME_KEY = 'Awsui-One-Theme-Enabled';
const ONE_THEME_CLASS = 'awsui-one-theme';

function readOneThemePreference(): boolean {
  // URL query wins over localStorage — lets you force a state via a link.
  const queryMatch = typeof window !== 'undefined' && /[?&]oneTheme=(true|false)/.exec(window.location.search);
  if (queryMatch) {
    return queryMatch[1] === 'true';
  }
  return localStorage.load(ONE_THEME_KEY) === true;
}

export let isOneThemeEnabled = readOneThemePreference();

if (typeof document !== 'undefined') {
  document.body.classList.toggle(ONE_THEME_CLASS, isOneThemeEnabled);

  // Wire up the checkbox rendered in the navbar by generate-html-files.js.
  // Script runs at end-of-body, so the element already exists in the DOM.
  const toggle = document.getElementById('one-theme-toggle') as HTMLInputElement | null;
  if (toggle) {
    toggle.checked = isOneThemeEnabled;
    toggle.addEventListener('change', () => updateOneTheme(toggle.checked));
  }
}

export function updateOneTheme(enabled: boolean): void {
  localStorage.save(ONE_THEME_KEY, enabled);
  isOneThemeEnabled = enabled;
  document.body.classList.toggle(ONE_THEME_CLASS, enabled);

  // Mirror the preference into the URL so the choice survives reloads even
  // when localStorage is gated by a consent cookie (as is the case in dev).
  const url = new URL(window.location.href);
  if (enabled) {
    url.searchParams.set('oneTheme', 'true');
  } else {
    url.searchParams.delete('oneTheme');
  }
  window.history.replaceState({}, '', url.toString());

  // useOneTheme() in @cloudscape-design/components caches on first render, so
  // a full reload is the only safe way to propagate the change to portals.
  window.location.reload();
}
