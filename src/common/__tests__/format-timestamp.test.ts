// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { dateTimeFormatter, formatAbsoluteTimestamp } from '../format-timestamp';

describe('formatAbsoluteTimestamp', () => {
  afterEach(() => jest.restoreAllMocks());

  const date = new Date('2010-01-31T09:05:00Z');

  it('formats the date and 24-hour time', () => {
    expect(formatAbsoluteTimestamp(date)).toBe('January 31, 2010, 09:05 (UTC+00:00)');
    expect(formatAbsoluteTimestamp(new Date('2012-10-03T14:32:00Z'))).toBe('October 3, 2012, 14:32 (UTC+00:00)');
  });

  it('formats positive and negative UTC offsets', () => {
    const offset = jest.spyOn(Date.prototype, 'getTimezoneOffset');
    offset.mockReturnValue(-330);
    expect(formatAbsoluteTimestamp(date)).toBe('January 31, 2010, 09:05 (UTC+05:30)');
    offset.mockReturnValue(300);
    expect(formatAbsoluteTimestamp(date)).toBe('January 31, 2010, 09:05 (UTC-05:00)');
  });
});

describe('dateTimeFormatter', () => {
  it('puts the date and the 24-hour time on separate lines', () => {
    expect(dateTimeFormatter(new Date('2010-01-31T09:05:00Z').getTime())).toBe('Jan 31\n09:05');
  });

  it('formats midnight as 00:00', () => {
    expect(dateTimeFormatter(new Date('2010-01-31T00:00:00Z').getTime())).toBe('Jan 31\n00:00');
  });

  it('formats no value as an empty text', () => {
    expect(dateTimeFormatter(null)).toBe('');
  });
});
