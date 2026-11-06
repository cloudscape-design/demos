// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import commonTableTests from './common/table/table-tests';
import TableFilteringPageObject from './page/table-filtering-page-object';
import commonFilteringTests from './common/table/table-filtering-tests';
import commonPreferencesTests from './common/table/table-preferences-tests';
import commonFlashTests from './common/flashbar-tests';

describe('Table - Client side', () => {
  const setupTest = (testFn: { (page: TableFilteringPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TableFilteringPageObject(browser);
      await browser.url('/table.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonTableTests(setupTest, {
    sorting: {
      multiColumn: true,
      initialAriaLabels: [
        { column: 2, label: 'Distribution ID, not sorted.' },
        { column: 3, label: 'State, sorted ascending, sort position 1.' },
        { column: 4, label: 'Domain name, sorted ascending, sort position 2.' },
      ],
    },
  });
  commonFlashTests(setupTest);
  commonPreferencesTests(setupTest);
  commonFilteringTests(setupTest);

  test(
    'When no row is selected counter displays total number',
    setupTest(async page => {
      await expect(page.getTableItemsCounter()).resolves.toBe('(40)');
    }),
  );
  test(
    'When one row is selected counter displays selected of total',
    setupTest(async page => {
      await page.selectTableRow(1);
      await expect(page.getTableItemsCounter()).resolves.toBe('(1/40)');
    }),
  );

  describe('Multi-column sort', () => {
    test(
      'toggles the primary sort column direction on a plain click',
      setupTest(async page => {
        await page.sortTableByColumn(3); // State (primary sort column)

        await expect(page.getColumnAriaLabel(3)).resolves.toBe('State, sorted descending, sort position 1.');
        await expect(page.getColumnAriaLabel(4)).resolves.toBe('Domain name, sorted ascending, sort position 2.');
        await expect(page.getTableCellText(1, 3)).resolves.toBe('Deactivated');
      }),
    );

    test(
      'replaces the multi-column sort with a single column when clicking an unsorted column',
      setupTest(async page => {
        await page.sortTableByColumn(2); // Distribution ID (not part of the default sort)

        await expect(page.getColumnAriaLabel(2)).resolves.toBe('Distribution ID, sorted ascending, sort position 1.');
        await expect(page.getColumnAriaLabel(3)).resolves.toBe('State, not sorted.');
        await expect(page.getColumnAriaLabel(4)).resolves.toBe('Domain name, not sorted.');
      }),
    );
  });

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
        await page.clearFilterFromEmptySlot();

        await expect(page.getSearchText()).resolves.toBe('');
        await expect(page.countTableRows()).resolves.toBe(30);
      }),
    );
  });
});
