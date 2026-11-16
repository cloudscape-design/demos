// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useState } from 'react';

import { load, remove, save } from '../../common/local-storage';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T | undefined>(() => load<T>(key) ?? defaultValue);

  const handleValueChange = (newValue: T | undefined) => {
    if (newValue === undefined) {
      remove(key);
      return;
    }

    setValue(newValue);
    save(key, newValue);
  };

  const handleValueReset = (newValue: T) => {
    setValue(newValue);
    remove(key);
  };

  return [value, handleValueChange, handleValueReset] as const;
}
