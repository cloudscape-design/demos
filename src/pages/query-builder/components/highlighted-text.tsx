// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { splitMatches } from '../utils/result-search';

import styles from '../styles.module.scss';

interface HighlightedTextProps {
  text: string;
  // Case-insensitive; empty terms are ignored.
  terms: string[];
}

// Marks the parts of the text that match any term.
export function HighlightedText({ text, terms }: HighlightedTextProps) {
  return (
    <>
      {splitMatches(text, terms).map((part, index) =>
        part.matched ? (
          <mark key={index} className={styles['filter-match']}>
            {part.text}
          </mark>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        ),
      )}
    </>
  );
}
