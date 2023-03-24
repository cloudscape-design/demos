// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import examplesList from '../../../examples-list.json';

export const allTestPages = examplesList.map(example => ({
  pagePath: `/${example.path}.html`,
  discardLogs: false,
}));
