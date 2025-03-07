// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TableSavedFiltersPageObject from './page/table-saved-filters-page-object';
import commonTableTests from './common/table/table-tests';
import commonPropertyFilteringTests from './common/table/table-property-filtering-tests';
import commonPreferencesTests from './common/table/table-preferences-tests';
import createWrapper from '@cloudscape-design/board-components/test-utils/selectors';

describe('Table - Saved Filters', () => {
  const setupTest = (testFn: { (page: TableSavedFiltersPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TableSavedFiltersPageObject(browser);
      await browser.url('/table-saved-filters.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonTableTests(setupTest);
  commonPreferencesTests(setupTest);
  commonPropertyFilteringTests(setupTest);

  test(
    'Has three default saved filter sets',
    setupTest(async page => {
      await expect(page.countSavedFilterSets()).resolves.toBe(3);
    }),
  );

  test(
    'Can apply a saved filter set',
    setupTest(async page => {
      // Pick a saved filter set
      await page.selectSavedFilterSet(1);

      await expect(page.isTokensVisible()).resolves.toBe(true);
      await expect(page.countTokens()).resolves.toBe(2);

      const tokensText = await page.getElementsText(page.findPropertyFiltering().findTokens().toSelector());
      expect(tokensText[0]).toMatch(/Delivery method = Web/);
      expect(tokensText[1]).toMatch(/State = Activated/);
    }),
  );

  test(
    'Switches to unsaved mode when modifying filters',
    setupTest(async page => {
      // Pick a saved filter set
      await page.selectSavedFilterSet(1);

      // Add a new free text filter
      await page.focusFilter();
      await page.search('bbb');
      await page.keys(['Enter']);

      await expect(page.countTokens()).resolves.toBe(3);
      await expect(page.getSelectedFilterSet()).resolves.toBe('Active web distributions (unsaved)');
    }),
  );

  test(
    'Can reset filters by selecting the original filter set from the dropdown',
    setupTest(async page => {
      // Pick a saved filter set
      await page.selectSavedFilterSet(2);
      await expect(page.countTokens()).resolves.toBe(1);

      // Add a new free text filter
      await page.focusFilter();
      await page.search('bbb');
      await page.keys(['Enter']);

      await expect(page.countTokens()).resolves.toBe(2);
      await expect(page.getSelectedFilterSet()).resolves.toBe('Distributions with buckets (unsaved)');

      // Select the original filter set (which has now moved down by one)
      await page.selectSavedFilterSet(3);

      await expect(page.countTokens()).resolves.toBe(1);
      await expect(page.getSelectedFilterSet()).resolves.toBe('Distributions with buckets');
    }),
  );

  test(
    'Can add a new filter set',
    setupTest(async page => {
      // Pick a saved filter set
      await page.selectSavedFilterSet(2);
      await expect(page.countTokens()).resolves.toBe(1);

      // Add a new free text filter
      await page.focusFilter();
      await page.search('bbb');
      await page.keys(['Enter']);

      // Save as new filter
      await page.openSaveFilterModal();
      await page.setValue(page.findActionModal().findContent().findInput().findNativeInput().toSelector(), 'my-filter');
      await page.submitModal();

      await expect(page.getSelectedFilterSet()).resolves.toBe('my-filter');
    }),
  );

  test(
    'Can update an existing filter set',
    setupTest(async page => {
      // Pick a saved filter set
      await page.selectSavedFilterSet(1);
      await expect(page.countTokens()).resolves.toBe(2);
      await expect(page.getSelectedFilterSet()).resolves.toBe('Active web distributions');

      // Add a new free text filter
      await page.focusFilter();
      await page.search('bbb');
      await page.keys(['Enter']);

      await expect(page.getSelectedFilterSet()).resolves.toBe('Active web distributions (unsaved)');

      // Update filter set
      await page.openUpdateFilterModal();
      await page.submitModal();

      await expect(page.getSelectedFilterSet()).resolves.toBe('Active web distributions');
    }),
  );

  test(
    'Can delete an existing filter set',
    setupTest(async page => {
      // Pick a saved filter set
      await page.selectSavedFilterSet(1);
      await expect(page.countTokens()).resolves.toBe(2);
      await expect(page.getSelectedFilterSet()).resolves.toBe('Active web distributions');

      // Delete filter set
      await page.openDeleteFilterModal();
      await page.submitModal();

      await expect(page.getSelectedFilterSet()).resolves.toBe('Choose a filter set');
    }),
  );

  test(
    'Parses filter set with groups correctly',
    setupTest(async page => {
      await page.selectSavedFilterSet(3);
      await expect(page.countTokens()).resolves.toBe(2);
      await expect(page.getSelectedFilterSet()).resolves.toBe('Best performance in buckets 1,2');

      await page.openSaveFilterModal();
      await expect(page.getText(createWrapper().findModal().toSelector())).resolves.toContain(
        '(Origin = EXAMPLE-BUCKET-1.s3.amazon, or Origin = EXAMPLE-BUCKET-2.s3.amazon), and Price class = Use all edge locations (best performance)',
      );
    }),
  );
});
