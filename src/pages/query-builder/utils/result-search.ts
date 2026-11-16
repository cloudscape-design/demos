// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import escapeRegExp from 'lodash/escapeRegExp';

// Ranges [start, end) of the text that match any term, case-insensitively. Overlapping or adjacent ranges merge.
export function findMatchRanges(text: string, terms: string[]): [number, number][] {
  const ranges = terms
    .filter(Boolean)
    .flatMap(term => [...text.matchAll(new RegExp(escapeRegExp(term), 'gi'))])
    .map((match): [number, number] => [match.index, match.index + match[0].length])
    .sort((a, b) => a[0] - b[0]);
  return ranges.reduce<[number, number][]>((merged, [start, end]) => {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
    return merged;
  }, []);
}

// Filter: a row is kept only when every term matches one of its cells, case-insensitively.
export function matchesEveryTerm(cells: string[], terms: string[]): boolean {
  return terms.every(term => cells.some(cell => cell.toLowerCase().includes(term.toLowerCase())));
}

// Highlight: splits the text into parts, flagging the ones that match any term.
export function splitMatches(text: string, terms: string[]): { text: string; matched: boolean }[] {
  const parts: { text: string; matched: boolean }[] = [];
  let cursor = 0;
  for (const [start, end] of findMatchRanges(text, terms)) {
    if (start > cursor) {
      parts.push({ text: text.slice(cursor, start), matched: false });
    }
    parts.push({ text: text.slice(start, end), matched: true });
    cursor = end;
  }
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), matched: false });
  }
  return parts;
}
