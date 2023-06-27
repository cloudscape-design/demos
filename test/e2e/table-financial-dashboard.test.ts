// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TableFinancialDashboardPageObject from './page/table-financial-dashboard-page-object';

describe('Table - Financial Dashboard', () => {
  const setupTest = (testFn: { (page: TableFinancialDashboardPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new TableFinancialDashboardPageObject(browser);
      await browser.url('/table-financial-dashboard.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  test(
    'Initial layout is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(3);
      await expect(page.isNavigationOpen()).resolves.toBe(false);
      await expect(page.isToolsOpen()).resolves.toBe(false);
      await expect(page.countTableRows()).resolves.toBe(13);
      await expect(page.getColumnAriaLabel(1)).resolves.toBe('Line item, sorted ascending.');
    })
  );

  test('reorders columns', () => {
    setupTest(async page => {
      await page.openTablePreferences();
      await page.reorderColumn(0, 1);
      await page.confirmTablePreferenceChanges();

      expect(await page.getColumnHeaderTexts()).toBe([
        `Olga's Bakery`,
        'Line item',
        `Francesco's Garden Tools`,
        `Wes's Comics`,
        `Lidia's Books`,
        `The Car Mechanics`,
        `Jeff's Spaceships`,
        `Design Tools`,
        `Keyboard Kings`,
        `Monitor Mogals`,
        'Total',
      ]);
    });
  });
});
