// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import fetchJson from './utils/fetch-json';
import paginate from './utils/paginate';
import fakeDelay from './utils/fake-delay';

export async function fetchContentOrigins({ filteringText, currentPageIndex }) {
  const [items] = await Promise.all([fetchJson('../resources/content-origins.json'), fakeDelay()]);
  const filteredItems = filteringText ? items.filter(item => item.label.indexOf(filteringText) > -1) : items;
  const { paginatedItems, hasNextPage } = paginate(filteredItems, currentPageIndex);
  return { origins: paginatedItems, hasNextPage };
}
