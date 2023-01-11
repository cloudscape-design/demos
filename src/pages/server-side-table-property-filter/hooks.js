// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState, useRef } from 'react';

const asyncFetchFilteringOptions = params => {
  return new Promise((resolve, reject) => {
    try {
      window.FakeServer.fetchDistributionFilteringOptions(params, ({ filteringOptions, filteringProperties }) => {
        resolve({ filteringOptions, filteringProperties });
      });
    } catch (e) {
      reject(e);
    }
  });
};

export function useDistributionsPropertyFiltering(defaultFilteringProperties) {
  const request = useRef({ filteringText: '' });
  const [filteringOptions, setFilteringOptions] = useState([]);
  const [filteringProperties, setFilteringProperties] = useState(defaultFilteringProperties);
  const [status, setStatus] = useState('pending');
  const fetchData = async (filteringText, filteringProperty) => {
    try {
      const { filteringOptions, filteringProperties } = await asyncFetchFilteringOptions({
        filteringText,
        filteringPropertyKey: filteringProperty ? filteringProperty.propertyKey : undefined,
      });
      if (
        !request.current ||
        request.current.filteringText !== filteringText ||
        request.current.filteringProperty !== filteringProperty
      ) {
        // there is another request in progress, discard the result of this one
        return;
      }
      setFilteringOptions(filteringOptions);
      setFilteringProperties(filteringProperties);
      setStatus('finished');
    } catch (error) {
      setStatus('error');
    }
  };

  const handleLoadItems = ({ detail: { filteringProperty, filteringText, firstPage } }) => {
    setStatus('loading');
    if (firstPage) {
      setFilteringOptions([]);
    }
    request.current = {
      filteringProperty,
      filteringText,
    };
    fetchData(filteringText, filteringProperty);
  };

  useEffect(() => {
    fetchData('');
  }, []);

  return {
    status,
    filteringOptions,
    filteringProperties,
    handleLoadItems,
  };
}
