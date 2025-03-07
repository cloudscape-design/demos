// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import commonTableTests from './common/table/table-tests';
import TableFilteringPageObject from './page/table-filtering-page-object';
import commonFilteringTests from './common/table/table-filtering-tests';
import commonPreferencesTests from './common/table/table-preferences-tests';
import commonFlashTests from './common/flashbar-tests';

describe('Table - Server side', () => {
  const setupTest = (testFn: { (page: TableFilteringPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TableFilteringPageObject(browser);
      await browser.url('/server-side-table.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonTableTests(setupTest);
  commonFlashTests(setupTest);
  commonPreferencesTests(setupTest);
  commonFilteringTests(setupTest);

  test(
    'When no row is selected counter displays total number',
    setupTest(async page => {
      await expect(page.getTableItemsCounter()).resolves.toBe('(120+)');
    }),
  );
  test(
    'When one row is selected counter displays selected of total',
    setupTest(async page => {
      await page.selectTableRow(1);
      await expect(page.getTableItemsCounter()).resolves.toBe('(1/120+)');
    }),
  );

  describe('Table - Filtering', () => {
    test(
      'no match displayed when filter has no match',
      setupTest(async page => {
        await page.searchText('00000');

        expect(await page.isTableEmptyButtonVisible()).toBe(true);
      }),
    );

    test(
      'clears search text when clear filter button is pressed',
      setupTest(async page => {
        await page.searchText('00000');
        await page.waitUntilLoaded();
        await page.clearFilterFromEmptySlot();

        await expect(page.getSearchText()).resolves.toBe('');
        await expect(page.countTableRows()).resolves.toBe(30);
      }),
    );
  });
});
