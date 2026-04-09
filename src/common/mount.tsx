// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/* eslint-disable @eslint-react/naming-convention/filename-extension */
import React from 'react';
import { createRoot, Root } from 'react-dom/client';

const rootMap = new WeakMap<HTMLElement, Root>();

export function mount(element: React.ReactElement, container: HTMLElement): void {
  let root = rootMap.get(container);

  if (!root) {
    root = createRoot(container);
    rootMap.set(container, root);
  }

  root.render(element);
}

export function unmount(container: HTMLElement): void {
  const root = rootMap.get(container);

  if (root) {
    root.unmount();
    rootMap.delete(container);
  }
}
