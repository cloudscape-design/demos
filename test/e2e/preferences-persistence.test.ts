// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TablePageObject from './page/table-page-object';

describe('Table preferences persistence', () => {
  async function testPages({
    browser,
    pages,
    columns,
  }: {
    browser: WebdriverIO.Browser;
    pages: string[];
    columns: number;
  }) {
    const page = new TablePageObject(browser);

    for (const pageId of pages) {
      await browser.url(`/${pageId}.html`);
      await page.waitUntilLoaded();
      page.countTableColumns();
      // Assert that the modified preferences of the previously visited page
      // (if any) did not affect the current page.
      expect(await page.countTableColumns()).toBe(columns);

      await page.openTablePreferences();
      await page.toggleColumnVisibility(2);
      await page.confirmTablePreferenceChanges();
      expect(await page.countTableColumns()).toBe(columns - 1);
    }

    // Visit each page once more to make sure that the reason why they didn't
    // affect each other is not that their preferences were not persisted at all.
    for (const pageId of pages) {
      await browser.url(`/${pageId}.html`);
      await page.waitUntilLoaded();
      page.countTableColumns();
      expect(await page.countTableColumns()).toBe(columns - 1);
    }
  }

  test(
    'Views that use the common Distributions table do not share the table preferences',
    useBrowser(browser =>
      testPages({
        browser,
        pages: [
          'table',
          'table-editable',
          'table-property-filter',
          'server-side-table',
          'server-side-table-property-filter',
        ],
        columns: 6,
      })
    )
  );

  test(
    'Views that use the common Instances table do not share the table preferences',
    useBrowser(browser =>
      testPages({
        browser,
        pages: ['split-panel-comparison', 'split-panel-multiple'],
        columns: 6,
      })
    )
  );
});
