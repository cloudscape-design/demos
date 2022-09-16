// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useState, useMemo, useRef } from 'react';

export default function useContentOrigins() {
  const requestParams = useRef({});
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState('finished');

  async function doRequest({ filteringText, currentPageIndex }) {
    setStatus('loading');
    try {
      const { origins, hasNextPage } = await window.FakeServer.fetchContentOrigins({
        filteringText,
        currentPageIndex,
      });
      if (filteringText !== requestParams.current.filteringText) {
        return;
      }
      if (currentPageIndex === 1) {
        setOptions(origins);
      } else {
        setOptions(oldOptions => [...oldOptions, ...origins]);
      }
      setStatus(hasNextPage ? 'pending' : 'finished');
    } catch (error) {
      setStatus('error');
    }
  }

  const handlers = useMemo(() => {
    return {
      onLoadItems({ detail: { filteringText, firstPage, samePage } }) {
        if (firstPage) {
          requestParams.current = {
            filteringText,
            currentPageIndex: 1,
          };
          setOptions([]);
        } else if (!samePage) {
          requestParams.current = {
            ...requestParams.current,
            currentPageIndex: requestParams.current.currentPageIndex + 1,
          };
        }
        doRequest(requestParams.current);
      },
    };
  }, [requestParams]);
  return [{ options, filteringText: requestParams.current.filteringText, status }, handlers];
}
