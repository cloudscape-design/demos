// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { dayMs, formatPeriod, hourMs, isValidRange, minuteMs, resolveRelativeTimeRange } from '../utils/time-range';

describe('resolveRelativeTimeRange', () => {
  beforeEach(() => jest.useFakeTimers().setSystemTime(new Date('2026-01-10T12:00:00Z')));
  afterEach(() => jest.useRealTimers());

  it('resolves relative ranges from now', () => {
    expect(resolveRelativeTimeRange({ type: 'relative', amount: 3, unit: 'hour' })).toEqual({
      start: new Date('2026-01-10T09:00:00Z'),
      end: new Date('2026-01-10T12:00:00Z'),
    });
  });
});

describe('isValidRange', () => {
  it('validates ranges', () => {
    expect(isValidRange(null).valid).toBe(false);
    expect(isValidRange({ type: 'relative', amount: 0, unit: 'hour' }).valid).toBe(false);
    expect(isValidRange({ type: 'relative', amount: 1, unit: 'hour' }).valid).toBe(true);
    expect(isValidRange({ type: 'absolute', startDate: '2026-01-02', endDate: '2026-01-01' }).valid).toBe(false);
    expect(isValidRange({ type: 'absolute', startDate: '', endDate: '2026-01-01' }).valid).toBe(false);
    expect(isValidRange({ type: 'absolute', startDate: '2026-01-01', endDate: '2026-01-02' }).valid).toBe(true);
  });
});

describe('formatPeriod', () => {
  it('formats periods in the largest unit they are a whole number of', () => {
    expect(formatPeriod(minuteMs)).toBe('1min');
    expect(formatPeriod(90 * minuteMs)).toBe('90min');
    expect(formatPeriod(3 * hourMs)).toBe('3h');
    expect(formatPeriod(dayMs)).toBe('1d');
    expect(formatPeriod(48 * hourMs)).toBe('2d');
  });
});
