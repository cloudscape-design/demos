// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/details-tabs-page-object';

describe('Details Tabs', () => {
  const setupTest = (testFn: { (page: Page): Promise<void> }) => {
    return useBrowser(async browser => {
      await browser.url('/details-tabs.html');
      const page = new Page(browser);
      await page.waitForPageLoaded();

      // Increase window height to ensure sticky-scrollbar doesn't overlap
      // clickable table elements in the standard viewport size
      await page.setWindowSize({ width: 1200, height: 800 });

      await testFn(page);
    });
  };

  test(
    'Initial state is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(3);
      await expect(page.getActiveTabLabel()).resolves.toBe('Details');
      await expect(page.getTabsHeaderText()).resolves.toMatch(/Details/);
    }),
  );

  test(
    'Logs tab works and displays proper content',
    setupTest(async page => {
      await page.switchTab('logs');
      await page.waitForTableContentLoaded();

      await expect(page.getActiveTabLabel()).resolves.toBe('Logs');
      await expect(page.getTabsHeaderText()).resolves.toMatch(/Logs/);

      await expect(page.countTableRows()).resolves.toBe(10);
      await expect(page.countTableColumns()).resolves.toBe(4);
      await expect(page.getTableCounterText()).resolves.toBe('(24)');

      await page.selectFirstTableItem();
      await expect(page.getTableCounterText()).resolves.toBe('(1/24)');
    }),
  );

  test(
    'Origins tab works and displays proper content',
    setupTest(async page => {
      await page.switchTab('origins');
      await page.waitForTableContentLoaded();

      await expect(page.getActiveTabLabel()).resolves.toBe('Origins');
      await expect(page.getTabsHeaderText()).resolves.toMatch(/Origins/);

      await expect(page.countTableRows()).resolves.toBe(1);
      await expect(page.countTableColumns()).resolves.toBe(5);
      await expect(page.getTableCounterText()).resolves.toBe('(1)');

      await page.selectFirstTableItem();
      await expect(page.getTableCounterText()).resolves.toBe('(1/1)');
    }),
  );

  test(
    'Behaviors tab works and displays proper content',
    setupTest(async page => {
      await page.switchTab('behaviors');
      await page.waitForTableContentLoaded();

      await expect(page.getActiveTabLabel()).resolves.toBe('Behaviors');
      await expect(page.getTabsHeaderText()).resolves.toMatch(/Cache behavior settings/);

      await expect(page.countTableRows()).resolves.toBe(1);
      await expect(page.countTableColumns()).resolves.toBe(6);
      await expect(page.getTableCounterText()).resolves.toBe('(1)');

      await page.selectFirstTableItem();
      await expect(page.getTableCounterText()).resolves.toBe('(1/1)');
    }),
  );

  test(
    'Invalidations tab works and displays proper content',
    setupTest(async page => {
      await page.switchTab('invalidations');

      await expect(page.getActiveTabLabel()).resolves.toBe('Invalidations');
      await expect(page.getTabsHeaderText()).resolves.toMatch(/Invalidations/);

      await expect(page.countTableColumns()).resolves.toBe(3);
      await expect(page.isTableCounterVisible()).resolves.toBe(false);

      await expect(page.isEmptyRegionVisible()).resolves.toBe(true);
      await expect(page.isTableNoDataButtonVisible()).resolves.toBe(true);
    }),
  );

  test(
    'Tags tab works and displays proper content',
    setupTest(async page => {
      await page.switchTab('tags');
      await page.waitForTableContentLoaded();

      await expect(page.getActiveTabLabel()).resolves.toBe('Tags');
      await expect(page.getTabsHeaderText()).resolves.toMatch(/Tags/);

      await expect(page.countTableColumns()).resolves.toBe(2);
      await expect(page.isTableCounterVisible()).resolves.toBe(true);
    }),
  );
});
