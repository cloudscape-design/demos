// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { History } from '../types/history';
import { emptyHistory, record, redo, undo } from '../utils/history';

describe('history', () => {
  it('records the replaced value and clears the redo stack', () => {
    const history = record<string>({ past: ['a'], future: ['c'] }, 'b', false);
    expect(history).toEqual({ past: ['a', 'b'], future: [] });
  });

  it('merges a change into the latest entry', () => {
    const history = record<string>({ past: ['a'], future: ['c'] }, 'b', true);
    expect(history).toEqual({ past: ['a'], future: [] });
  });

  it('keeps the latest 50 entries', () => {
    let history: History<number> = emptyHistory;
    for (let value = 0; value < 60; value++) {
      history = record(history, value, false);
    }
    expect(history.past).toHaveLength(50);
    expect(history.past[0]).toBe(10);
    expect(history.past[49]).toBe(59);
  });

  it('undoes and redoes', () => {
    const history = record(record<string>(emptyHistory, 'a', false), 'b', false);
    const undone = undo(history, 'c')!;
    expect(undone).toEqual({ value: 'b', history: { past: ['a'], future: ['c'] } });
    const redone = redo(undone.history, undone.value)!;
    expect(redone).toEqual({ value: 'c', history: { past: ['a', 'b'], future: [] } });
  });

  it('clears the redo stack on a new change after an undo', () => {
    const undone = undo(record<string>(emptyHistory, 'a', false), 'b')!;
    expect(record(undone.history, undone.value, false)).toEqual({ past: ['a'], future: [] });
  });

  it('returns null with nothing to undo or redo', () => {
    expect(undo(emptyHistory, 'a')).toBeNull();
    expect(redo(emptyHistory, 'a')).toBeNull();
  });
});
