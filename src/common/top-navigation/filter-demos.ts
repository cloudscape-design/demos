// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import examplesList from '../../../examples-list.json';

export interface DemoEntry {
  path: string;
  title: string;
  visibleOn: string[];
  excludeDemoAssetOnExternal?: boolean;
  discardLogs?: boolean;
}

export function filteredDemos(): DemoEntry[] {
  if (process.env.NODE_ENV === 'development') {
    return examplesList;
  }
  return examplesList.filter(example => example.visibleOn.includes(getSystem()));
}
