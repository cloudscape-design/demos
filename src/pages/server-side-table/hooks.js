// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState } from 'react';

export function useDistributions(params = {}) {
  const { pageSize, currentPageIndex: clientPageIndex } = params.pagination || {};
  const { sortingDescending, sortingColumn } = params.sorting || {};
  const { filteringText, filteringTokens, filteringOperation } = params.filtering || {};
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(clientPageIndex);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setCurrentPageIndex(clientPageIndex);
  }, [clientPageIndex]);

  useEffect(() => {
    setLoading(true);
    const params = {
      filteringText,
      filteringTokens,
      filteringOperation,
      pageSize,
      currentPageIndex,
      sortingDescending,
      ...(sortingColumn
        ? {
            sortingColumn: sortingColumn.sortingField,
          }
        : {}),
    };
    const callback = ({ items, pagesCount, currentPageIndex }) => {
      setLoading(false);
      setItems(items);
      setPagesCount(pagesCount);
      setCurrentPageIndex(currentPageIndex);
      if (totalCount === 0) {
        setTotalCount(pagesCount > 1 ? pageSize * (pagesCount - 1) : items.length);
      }
    };
    window.FakeServer.fetchDistributions(params, callback);
  }, [
    pageSize,
    sortingDescending,
    sortingColumn,
    currentPageIndex,
    filteringText,
    filteringTokens,
    filteringOperation,
  ]);

  return {
    items,
    loading,
    totalCount,
    pagesCount,
    currentPageIndex,
  };
}
