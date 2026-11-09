// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TableSavedFiltersPageObject from './page/table-saved-filters-page-object';
import commonPropertyFilteringTests from './common/table/table-property-filtering-tests';

describe('Table - Saved Filters', () => {
  const setupTest = (testFn: { (page: TableSavedFiltersPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TableSavedFiltersPageObject(browser);
      await browser.url('/table-saved-filters.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonPropertyFilteringTests(setupTest, 2, [1, 1, 0, 4]); // Expected token are increased and rows are reduced with a default filter set

  describe('Default filter sets', () => {
    test(
      'Is applied on page load',
      setupTest(async page => {
        await expect(page.isTokensVisible()).resolves.toBe(true);
        await expect(page.countTokens()).resolves.toBe(2);

        const tokensText = await page.getElementsText(page.findPropertyFiltering().findTokens().toSelector());
        expect(tokensText[0]).toMatch(/Delivery method = Web/);
        expect(tokensText[1]).toMatch(/State = Activated/);
      }),
    );

    test(
      'Can unset the default',
      setupTest(async page => {
        await page.click(page.findSavedFilterSets().findTrigger().toSelector());
        await expect(
          page.getText(page.findSavedFilterSets().findDropdown().findOption(1).findLabelTag().toSelector()),
        ).resolves.toBe('Default');

        await page.click(page.findFilterActions().findNativeButton().toSelector());
        await page.click(page.findFilterActions().findItemById('default')!.toSelector());

        await page.click(page.findSavedFilterSets().findTrigger().toSelector());

        // Check that all the filter sets are not set as default
        await expect(
          page.isExisting(page.findSavedFilterSets().findDropdown().findOption(1).findLabelTag().toSelector()),
        ).resolves.toBeFalsy();
        await expect(
          page.isExisting(page.findSavedFilterSets().findDropdown().findOption(2).findLabelTag().toSelector()),
        ).resolves.toBeFalsy();
        await expect(
          page.isExisting(page.findSavedFilterSets().findDropdown().findOption(3).findLabelTag().toSelector()),
        ).resolves.toBeFalsy();
      }),
    );

    test(
      'Can change the default',
      setupTest(async page => {
        await page.selectSavedFilterSet(2);

        const tokensText = await page.getElementsText(page.findPropertyFiltering().findTokens().toSelector());
        expect(tokensText[0]).toMatch(/Origin : BUCKET/);

        await page.click(page.findSavedFilterSets().findTrigger().toSelector());
        await expect(
          page.isExisting(page.findSavedFilterSets().findDropdown().findOption(2).findLabelTag().toSelector()),
        ).resolves.toBeFalsy();

        await page.click(page.findFilterActions().findNativeButton().toSelector());
        await page.click(page.findFilterActions().findItemById('default')!.toSelector());

        await page.click(page.findSavedFilterSets().findTrigger().toSelector());
        await expect(
          page.getText(page.findSavedFilterSets().findDropdown().findOption(2).findLabelTag().toSelector()),
        ).resolves.toBe('Default');
      }),
    );

    test(
      'Updates the default when creating a new filter set',
      setupTest(async page => {
        await page.removeAllTokens();

        // Add a new free text filter
        await page.focusFilter();
        await page.search('bbb');
        await page.keys(['Enter']);

        // Save as new filter
        await page.openSaveFilterModal();
        await page.setValue(
          page.findActionModal().findContent().findInput().findNativeInput().toSelector(),
          'my-filter',
        );
        await page.click(page.findActionModal().findContent().findCheckbox().findNativeInput().toSelector());
        await page.submitModal();

        await expect(page.getSelectedFilterSet()).resolves.toBe('my-filter');

        await page.click(page.findSavedFilterSets().findTrigger().toSelector());
        await expect(
          page.getText(page.findSavedFilterSets().findDropdown().findOption(4).findLabelTag().toSelector()),
        ).resolves.toBe('Default');
      }),
    );

    test(
      'Is disabled when no filter set is selected',
      setupTest(async page => {
        await page.removeAllTokens();
        await page.focusFilter();
        await page.search('bbb');
        await page.keys(['Enter']);

        await page.click(page.findFilterActions().findNativeButton().toSelector());
        await expect(
          page.getElementAttribute(
            page.findFilterActions().findItemById('default')!.find('[role="menuitemcheckbox"]').toSelector(),
            'aria-disabled',
          ),
        ).resolves.toBe('true');
      }),
    );

    test(
      'Is disabled when current filter set has unsaved changes',
      setupTest(async page => {
        await page.focusFilter();
        await page.search('bbb');
        await page.keys(['Enter']);

        await expect(page.getSelectedFilterSet()).resolves.toBe('Active web distributions (unsaved)');

        await page.click(page.findFilterActions().findNativeButton().toSelector());
        await expect(
          page.getElementAttribute(
            page.findFilterActions().findItemById('default')!.find('[role="menuitemcheckbox"]').toSelector(),
            'aria-disabled',
          ),
        ).resolves.toBe('true');
      }),
    );
  });
});
