// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyDensity, disableMotion } from '@cloudscape-design/global-styles';
import '@cloudscape-design/global-styles/index.css';
import * as localStorage from './localStorage';
import { createPropertyStorage } from './createPropertyStorage';

window.disableMotionForTests = disableMotion;

export const densityLocalStorageKey = 'CS-Density-Preference';
export const densityStorage = createPropertyStorage(densityLocalStorageKey, localStorage);

function setDensityUI(density) {
  const [comfortable, compact] = document.getElementsByClassName('density');

  if (density === 'compact') {
    compact.classList.add('selected');
    comfortable.classList.remove('selected');
  } else {
    comfortable.classList.add('selected');
    compact.classList.remove('selected');
  }
  applyDensity(density);
}

export function updateDensity(density) {
  if (!density) {
    return;
  }
  setDensityUI(density);
  densityStorage.save(density);
}
