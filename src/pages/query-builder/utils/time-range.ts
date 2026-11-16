// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { DateRangePickerProps } from '@cloudscape-design/components/date-range-picker';

import { getLocale } from '../../../common/locale';
import { TimeWindow } from '../types/time-range';

export const minuteMs = 60 * 1000;
export const hourMs = 60 * minuteMs;
export const dayMs = 24 * hourMs;

// Month and year are approximated, which is enough for the mock data.
const unitMs: Record<DateRangePickerProps.TimeUnit, number> = {
  second: 1000,
  minute: minuteMs,
  hour: hourMs,
  day: dayMs,
  week: 7 * dayMs,
  month: 30 * dayMs,
  year: 365 * dayMs,
};

export const relativeOptions: DateRangePickerProps.RelativeOption[] = [
  { key: 'previous-1-hour', amount: 1, unit: 'hour', type: 'relative' },
  { key: 'previous-3-hours', amount: 3, unit: 'hour', type: 'relative' },
  { key: 'previous-12-hours', amount: 12, unit: 'hour', type: 'relative' },
  { key: 'previous-1-day', amount: 1, unit: 'day', type: 'relative' },
  { key: 'previous-1-week', amount: 1, unit: 'week', type: 'relative' },
];

export const defaultTimeRange: DateRangePickerProps.Value = relativeOptions[0];

export const isValidRange: DateRangePickerProps.ValidationFunction = value => {
  if (!value) {
    return { valid: false, errorMessage: 'Select a time range.' };
  }
  if (value.type === 'absolute') {
    if (!value.startDate || !value.endDate) {
      return { valid: false, errorMessage: 'Select a start and an end date.' };
    }
    if (new Date(value.startDate) >= new Date(value.endDate)) {
      return { valid: false, errorMessage: 'The start date must be before the end date.' };
    }
    return { valid: true };
  }
  if (!value.amount || value.amount <= 0) {
    return { valid: false, errorMessage: 'Enter a duration greater than 0.' };
  }
  return { valid: true };
};

export function resolveRelativeTimeRange(value: DateRangePickerProps.RelativeValue): TimeWindow {
  const now = new Date();
  return { start: new Date(now.getTime() - value.amount * unitMs[value.unit]), end: now };
}

// Period of the datapoints in the largest unit it is a whole number of, for example "90min", "3h" or "2d".
export function formatPeriod(periodMs: number): string {
  if (periodMs % dayMs === 0) {
    return `${periodMs / dayMs}d`;
  }
  if (periodMs % hourMs === 0) {
    return `${periodMs / hourMs}h`;
  }
  return `${Math.round(periodMs / minuteMs)}min`;
}

// Short timestamp for dense places such as table cells: the time, with the date only when the time window spans
// more than a day. Use formatAbsoluteTimestamp for full timestamps.
export function formatShortTimestamp(date: Date, durationMs: number): string {
  return new Intl.DateTimeFormat(getLocale(), {
    ...(durationMs > dayMs && { month: 'short', day: 'numeric' }),
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}
