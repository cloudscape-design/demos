// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useRef, useState } from 'react';

import { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import { PropertyFilterProps } from '@cloudscape-design/components/property-filter';

import {
  FetchDistributionFilteringOptionsParams,
  FetchDistributionFilteringOptionsResponse,
} from '../../fake-server/types';

interface RequestRef {
  filteringText: string;
  filteringProperty?: PropertyFilterProps.FilteringProperty;
}

const asyncFetchFilteringOptions = (
  params: FetchDistributionFilteringOptionsParams,
): Promise<FetchDistributionFilteringOptionsResponse> => {
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

export function useDistributionsPropertyFiltering(defaultFilteringProperties: PropertyFilterProperty[]) {
  const request = useRef<RequestRef>({ filteringText: '' });
  const [filteringOptions, setFilteringOptions] = useState<PropertyFilterProps.FilteringOption[]>([]);
  const [filteringProperties, setFilteringProperties] =
    useState<PropertyFilterProps.FilteringProperty[]>(defaultFilteringProperties);
  const [status, setStatus] = useState<PropertyFilterProps['filteringStatusType']>('pending');
  const fetchData = async (filteringText: string, filteringProperty?: PropertyFilterProps.FilteringProperty) => {
    try {
      const { filteringOptions, filteringProperties } = await asyncFetchFilteringOptions({
        filteringText,
        filteringPropertyKey: filteringProperty ? filteringProperty.key : undefined,
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

  const handleLoadItems: PropertyFilterProps['onLoadItems'] = ({
    detail: { filteringProperty, filteringText, firstPage },
  }) => {
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
