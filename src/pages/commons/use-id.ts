// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useMemo } from 'react';
import { v4 as uuid4 } from 'uuid';

export const useId = () => useMemo(() => uuid4(), []);
