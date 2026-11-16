// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { format } from 'date-fns/format';

export function formatAbsoluteTimestamp(date: Date): string {
  return format(date, "MMMM d, yyyy, HH:mm ('UTC'xxx)");
}

// Timestamp for the labels of a chart time axis, with the date and the time on separate lines.
export const dateTimeFormatter = (date: number | null) =>
  date ? `${format(date, 'MMM d')}\n${format(date, 'HH:mm')}` : '';
