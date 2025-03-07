// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/details-template-page-object';

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/details.html');
    const page = new Page(browser);

    await page.waitForPageLoaded();
    await testFn(page);
  });
};

describe('Form', () => {
  test(
    'The initial state is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(3);
      await expect(page.getActiveNavigationLinkText()).resolves.toBe('Distributions');
      await expect(page.isNavigationOpen()).resolves.toBe(true);
      await expect(page.countOriginItems()).resolves.toBe(1);
      await expect(page.countOriginTableColumns()).resolves.toBe(5);
      await expect(page.countCacheItems()).resolves.toBe(1);
      await expect(page.countCacheTableColumns()).resolves.toBe(6);
      await expect(page.isReportsAndAnalyticsSectionExpanded()).resolves.toBe(true);
      await expect(page.isPrivateContentExpanded()).resolves.toBe(true);
      await expect(page.countReportsAndAnalyticsLinks()).resolves.toBe(7);
      await expect(page.countPrivateContentLinks()).resolves.toBe(2);
    }),
  );

  test(
    'Navigation panel closes properly',
    setupTest(async page => {
      await page.closeSideNavigation();
      await expect(page.isNavigationOpen()).resolves.toBe(false);
    }),
  );

  test(
    "Navigation panel's expandable sections close properly",
    setupTest(async page => {
      await page.toggleReportsAndAnalyticsSection();
      await page.togglePrivateContentSection();

      await expect(page.isReportsAndAnalyticsSectionExpanded()).resolves.toBe(false);
      await expect(page.isPrivateContentExpanded()).resolves.toBe(false);
    }),
  );
});
