// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TablePropertyFilteringPageObject from './page/table-property-filtering-page-object';
import commonTableTests from './common/table/table-tests';
import commonPropertyFilteringTests from './common/table/table-property-filtering-tests';
import commonPreferencesTests from './common/table/table-preferences-tests';
import commonFlashTests from './common/flashbar-tests';

describe('Server Side Table - Property Filtering', () => {
  const setupTest = (testFn: { (page: TablePropertyFilteringPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TablePropertyFilteringPageObject(browser);
      await browser.url('/server-side-table-property-filter.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonTableTests(setupTest);
  commonFlashTests(setupTest);
  commonPreferencesTests(setupTest);
  commonPropertyFilteringTests(setupTest);

  test(
    'Resets the table after clicking the clear button from the noMatches region',
    setupTest(async page => {
      await page.search('EXAMPLE-BUCKET-4.s3.amazon');
      await page.selectOption(1);

      await page.search('EXAMPLE-BUCKET-3.s3.amazon');
      await page.selectOption(1);

      await expect(page.countTokens()).resolves.toBe(2);
      await expect(page.isTableEmptyButtonVisible()).resolves.toBe(true);
    }),
  );

  test(
    'Displays list of properties',
    setupTest(async page => {
      await page.focusFilter();

      await expect(page.countDropdownItems()).resolves.toBe(10);
    }),
  );
});
