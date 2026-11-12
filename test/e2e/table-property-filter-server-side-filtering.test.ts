// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TablePropertyFilteringPageObject from './page/table-property-filtering-page-object';
import commonPropertyFilteringTests from './common/table/table-property-filtering-tests';

describe('Server Side Table - Property Filtering', () => {
  const setupTest = (testFn: { (page: TablePropertyFilteringPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TablePropertyFilteringPageObject(browser);
      await browser.url('/server-side-table-property-filter.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonPropertyFilteringTests(setupTest);
});
