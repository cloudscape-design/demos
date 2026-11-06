// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import contentOriginsData from '../resources/content-origins.json';
import { ContentOriginsResource } from '../resources/types';
import fakeDelay from './utils/fake-delay';
import paginate from './utils/paginate';

export async function fetchContentOrigins({
  filteringText,
  currentPageIndex,
}: {
  filteringText: string;
  currentPageIndex: number;
}) {
  await fakeDelay();
  const items: ContentOriginsResource[] = contentOriginsData;
  const filteredItems = filteringText ? items.filter(item => item.label.indexOf(filteringText) > -1) : items;
  const { paginatedItems, hasNextPage } = paginate(filteredItems, currentPageIndex);
  return { origins: paginatedItems, hasNextPage };
}
