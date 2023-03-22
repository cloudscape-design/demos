// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useState } from 'react';
import { load, save } from '../../common/localStorage';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(() => load(key) ?? defaultValue);

  function handleValueChange(newValue: T) {
    setValue(newValue);
    save(key, newValue);
  }

  return [value, handleValueChange] as const;
}
