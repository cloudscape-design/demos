// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/details-hub-page-object';

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/details-hub.html');
    const page = new Page(browser);
    await page.waitForPageLoaded();
    await testFn(page);
  });
};

describe('Details hub', () => {
  test(
    'The initial state is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(3);
      await expect(page.isNavigationOpen()).resolves.toBe(true);
      await expect(page.getActiveNavigationLinkText()).resolves.toBe('Distributions');

      await expect(page.countOriginTableItems()).resolves.toBe(1);
      await expect(page.countOriginTableColumns()).resolves.toBe(5);
      await expect(page.getOriginsTableCounter()).resolves.toBe('(1)');

      await expect(page.countLogsTableItems()).resolves.toBe(5);
      await expect(page.countLogsTableColumns()).resolves.toBe(4);
      await expect(page.getLogsTableCounterText()).resolves.toBe('(24)');
      await expect(page.getLogsTableFooterText()).resolves.toBe('View all logs');
    }),
  );
  test(
    'When one row is selected counter displays selected of total number of items in first table',
    setupTest(async page => {
      await page.selectLogsTableItem();
      await expect(page.getLogsTableCounterText()).resolves.toBe('(1/24)');
    }),
  );

  test(
    'When one row is selected counter displays selected of total number of items in second table',
    setupTest(async page => {
      await page.selectOriginsTableItem();
      await expect(page.getOriginsTableCounter()).resolves.toBe('(1/1)');
    }),
  );
});
