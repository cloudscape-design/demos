// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import { Distribution } from '../../fake-server/types';
import DataProvider from '../commons/data-provider';
import { App } from './root';

export default function Demo() {
  const [distributions, setDistributions] = useState<Distribution[] | null>(null);

  useEffect(() => {
    new DataProvider().getDataWithDates<Distribution>('distributions').then(setDistributions);
  }, []);

  return distributions && <App distributions={distributions} />;
}
