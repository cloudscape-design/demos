// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState } from 'react';

import { PropertyFilterQuery } from '@cloudscape-design/collection-hooks';

import { Distribution, FetchDistributionsParams, FetchDistributionsResponse } from '../../fake-server/types';

export interface UseDistributionsParams {
  pagination?: {
    currentPageIndex?: number;
    pageSize?: number;
  };
  sorting?: {
    sortingColumn?: {
      sortingField?: string;
    };
    sortingDescending?: boolean;
  };
  filtering?: {
    filteringText?: string;
    filteringTokens?: PropertyFilterQuery['tokens'] | PropertyFilterQuery['tokenGroups'];
    filteringOperation?: PropertyFilterQuery['operation'];
  };
}

const DEFAULT_PAGE_SIZE = 10;

export function useDistributions(params: UseDistributionsParams = {}) {
  const { pageSize = DEFAULT_PAGE_SIZE, currentPageIndex: clientPageIndex } = params.pagination || {};
  const { sortingDescending, sortingColumn } = params.sorting || {};
  const { filteringText, filteringTokens, filteringOperation } = params.filtering || {};
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Distribution[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(clientPageIndex);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setCurrentPageIndex(clientPageIndex);
  }, [clientPageIndex]);

  useEffect(() => {
    setLoading(true);
    const params: FetchDistributionsParams = {
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
    const callback = ({ items, pagesCount, currentPageIndex }: FetchDistributionsResponse) => {
      setLoading(false);
      setItems(items);
      setPagesCount(pagesCount);
      setCurrentPageIndex(currentPageIndex);
      setTotalCount(totalCount => {
        if (totalCount === 0) {
          return pagesCount > 1 ? pageSize * (pagesCount - 1) : items.length;
        } else {
          return totalCount;
        }
      });
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
