// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { findMatchRanges, matchesEveryTerm, splitMatches } from '../utils/result-search';

describe('findMatchRanges', () => {
  it('matches case-insensitively', () => {
    expect(findMatchRanges('Checkout-API', ['checkout'])).toEqual([[0, 8]]);
  });

  it('returns every occurrence of a term', () => {
    expect(findMatchRanges('abcabc', ['bc'])).toEqual([
      [1, 3],
      [4, 6],
    ]);
  });

  it('merges overlapping and adjacent matches', () => {
    expect(findMatchRanges('checkout', ['check', 'kout'])).toEqual([[0, 8]]);
    expect(findMatchRanges('abcd', ['ab', 'cd'])).toEqual([[0, 4]]);
  });

  it('ignores empty terms and treats regex characters literally', () => {
    expect(findMatchRanges('a.b', ['', '.'])).toEqual([[1, 2]]);
    expect(findMatchRanges('a+b', ['+'])).toEqual([[1, 2]]);
  });

  it('returns no ranges without a match', () => {
    expect(findMatchRanges('payments', ['zzz'])).toEqual([]);
    expect(findMatchRanges('payments', [])).toEqual([]);
  });
});

describe('matchesEveryTerm', () => {
  it('needs every term to match some cell', () => {
    const cells = ['2026-01-10 11:00', 'checkout-api', 'checkout-api:prod', '42'];
    expect(matchesEveryTerm(cells, ['checkout', 'prod'])).toBe(true);
    expect(matchesEveryTerm(cells, ['checkout', 'staging'])).toBe(false);
  });

  it('keeps every row when there are no terms', () => {
    expect(matchesEveryTerm(['a'], [])).toBe(true);
  });

  it('matches case-insensitively', () => {
    expect(matchesEveryTerm(['Checkout-API'], ['checkout-api'])).toBe(true);
  });

  it('treats an empty term as no condition', () => {
    expect(matchesEveryTerm(['checkout-api'], ['', 'checkout'])).toBe(true);
  });
});

describe('splitMatches', () => {
  it('wraps the matched parts and keeps the rest as text', () => {
    expect(splitMatches('checkout-api:prod', ['checkout', 'prod'])).toEqual([
      { text: 'checkout', matched: true },
      { text: '-api:', matched: false },
      { text: 'prod', matched: true },
    ]);
  });

  it('keeps the casing of the cell text', () => {
    expect(splitMatches('Payments', ['PAY'])).toEqual([
      { text: 'Pay', matched: true },
      { text: 'ments', matched: false },
    ]);
  });

  it('returns the whole text unmatched without a match or terms', () => {
    expect(splitMatches('payments', ['zzz'])).toEqual([{ text: 'payments', matched: false }]);
    expect(splitMatches('payments', [])).toEqual([{ text: 'payments', matched: false }]);
  });

  it('merges overlapping matches into one mark', () => {
    expect(splitMatches('checkout', ['check', 'kout'])).toEqual([{ text: 'checkout', matched: true }]);
  });
});
