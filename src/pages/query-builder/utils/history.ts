// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { History } from '../types/history';

const maxEntries = 50;

export const emptyHistory: History<never> = { past: [], future: [] };

// Call before applying a change, with the value it replaces. `merge` folds the change into the latest entry.
export function record<T>(history: History<T>, current: T, merge: boolean): History<T> {
  const past = merge ? history.past : [...history.past, current].slice(-maxEntries);
  return { past, future: [] };
}

export function undo<T>(history: History<T>, current: T): { history: History<T>; value: T } | null {
  if (history.past.length === 0) {
    return null;
  }
  const value = history.past[history.past.length - 1];
  return { history: { past: history.past.slice(0, -1), future: [current, ...history.future] }, value };
}

export function redo<T>(history: History<T>, current: T): { history: History<T>; value: T } | null {
  if (history.future.length === 0) {
    return null;
  }
  const [value, ...future] = history.future;
  return { history: { past: [...history.past, current], future }, value };
}
