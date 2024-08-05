// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useCallback, useState } from 'react';
import { load, remove, save } from '../../common/localStorage';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(() => load(key) ?? defaultValue);

  const handleValueChange = useCallback(
    (newValue: T) => {
      setValue(newValue);
      save(key, newValue);
    },
    [key]
  );

  const handleValueReset = useCallback(
    (newValue: T) => {
      setValue(newValue);
      remove(key);
    },
    [key]
  );

  return [value, handleValueChange, handleValueReset] as const;
}
