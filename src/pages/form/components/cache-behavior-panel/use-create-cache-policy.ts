// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useState } from 'react';

import {
  ORIGIN_REQUEST_COOKIE_OPTIONS,
  ORIGIN_REQUEST_HEADER_OPTIONS,
  ORIGIN_REQUEST_QUERY_STRING_OPTIONS,
} from '../../form-config';
import { CreateCachePolicyAttributesErrors, CreateCachePolicyAttributesValues } from '../../types';

const defaultCachePolicyData = {
  name: '',
  description: '',
  minimumTtl: 1,
  maximumTtl: 31536000,
  defaultTtl: 86400,
  header: ORIGIN_REQUEST_HEADER_OPTIONS[0],
  queryStrings: ORIGIN_REQUEST_QUERY_STRING_OPTIONS[0],
  cookies: ORIGIN_REQUEST_COOKIE_OPTIONS[0],
  isSubmitting: false,
};

const defaultCachePolicyErrors = {
  nameError: '',
};

export default function useCreateCachePolicy(): [
  CreateCachePolicyAttributesValues,
  (updateObj: Partial<CreateCachePolicyAttributesValues>) => void,
  CreateCachePolicyAttributesErrors,
  (updateObj: CreateCachePolicyAttributesErrors) => void,
  boolean,
  () => void,
] {
  const [data, _setData] = useState<CreateCachePolicyAttributesValues>(defaultCachePolicyData);
  const [errors, _setErrors] = useState<CreateCachePolicyAttributesErrors>(defaultCachePolicyErrors);
  const setData = (updateObj: Partial<CreateCachePolicyAttributesValues> = {}) => {
    _setData(prevData => ({ ...prevData, ...updateObj }));
  };
  const setErrors = (updateObj: CreateCachePolicyAttributesErrors) => {
    _setErrors(prevErrors => ({ ...prevErrors, ...updateObj }));
  };

  const resetData = () => {
    setData(defaultCachePolicyData);
    setErrors(defaultCachePolicyErrors);
  };

  const isDataChanged = JSON.stringify(defaultCachePolicyData) !== JSON.stringify(data);

  return [data, setData, errors, setErrors, isDataChanged, resetData];
}
