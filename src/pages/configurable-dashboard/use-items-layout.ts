// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useRef, useState } from 'react';
import { useContainerQuery } from '@cloudscape-design/component-toolkit';
import { load, remove, save } from '../../common/localStorage';
import { getDefaultLayout } from './widgets';
import { StoredWidgetPlacement } from './interfaces';

const storageKey = 'ConfigurableDashboards-widgets-layout';

export function useItemsLayout() {
  const [width, ref] = useContainerQuery(entry => entry.contentBoxWidth);
  const [layout, setLayout] = useState<ReadonlyArray<StoredWidgetPlacement> | null>(() => load(storageKey) ?? null);
  const itemsChanged = useRef(layout !== null);

  useEffect(() => {
    if (itemsChanged.current || !width) {
      return;
    }
    setLayout(getDefaultLayout(width));
  }, [width]);

  function handleLayoutChange(layout: ReadonlyArray<StoredWidgetPlacement>) {
    itemsChanged.current = true;
    save(storageKey, layout);
    setLayout(layout);
  }

  function resetLayout() {
    itemsChanged.current = false;
    remove(storageKey);
    setLayout(getDefaultLayout(width!));
  }

  return [ref, layout ?? [], handleLayoutChange, resetLayout] as const;
}
