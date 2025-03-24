// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/wizard-page-object';
import { SCREEN_SIZE_FOR_APP_LAYOUT_TOOLBAR } from './utils';

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/wizard.html');
    const page = new Page(browser);
    await page.waitForPageLoaded();
    await page.setWindowSize(SCREEN_SIZE_FOR_APP_LAYOUT_TOOLBAR);
    await testFn(page);
  });
};

describe('Wizard', () => {
  test(
    'The initial state is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(3);
      await expect(page.isNavigationOpen()).resolves.toBe(false);
      await expect(page.isToolsOpen()).resolves.toBe(false);
      await expect(page.countSteps()).resolves.toBe(4);
      await expect(page.isPrevButtonVisible()).resolves.toBe(false);
      await expect(page.isStepActive(1)).resolves.toBe(true);
      await expect(page.isStepDisabled(2)).resolves.toBe(true);
      await expect(page.isStepDisabled(4)).resolves.toBe(true);
    }),
  );

  test(
    'Active navigation item is correct',
    setupTest(async page => {
      await page.openSideNavigation();
      await expect(page.getActiveNavigationLinkText()).resolves.toBe('Instances');
    }),
  );

  test(
    'Navigation panel opens properly',
    setupTest(async page => {
      await page.openSideNavigation();
      await expect(page.isNavigationOpen()).resolves.toBe(true);
    }),
  );

  test(
    'Tools panel opens properly and has correct default content',
    setupTest(async page => {
      await page.openTools();
      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Select engine type');
      await expect(page.getToolsContent()).resolves.toMatch(
        /With Amazon RDS, you can create a DB instance, an isolated database environment in the AWS Cloud/,
      );
    }),
  );

  test(
    'tools panel can be opened by info link',
    setupTest(async page => {
      await page.click(page.contextInfoLinkSelector());
      await expect(page.isToolsOpen()).resolves.toBe(true);
    }),
  );

  test(
    'tools panel is re-focused after clicking multiple info links',
    setupTest(async page => {
      await page.click(page.contextInfoLinkSelector());
      await page.click(page.contextInfoLinkSelector());
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
    }),
  );

  test(
    'Clicking next navigates to the next page and has proper step treatments.',
    setupTest(async page => {
      await page.gotoNextStep();
      await expect(page.getStepTitle()).resolves.toMatch(/Specify instance details/);
      await expect(page.isStepDisabled(1)).resolves.toBe(false);
      await expect(page.isStepActive(2)).resolves.toBe(true);
    }),
  );

  test(
    'Clicking previous navigates to the next page and has proper step treatments.',
    setupTest(async page => {
      await page.gotoNextStep();
      await page.gotoPrevStep();
      await expect(page.getStepTitle()).resolves.toMatch(/Select engine type/);

      await expect(page.isStepActive(1)).resolves.toBe(true);
      await expect(page.isStepDisabled(2)).resolves.toBe(false);
      await expect(page.isStepDisabled(3)).resolves.toBe(true);
    }),
  );

  test(
    'Edit buttons on the review page direct to the appropriate step.',
    setupTest(async page => {
      await page.gotoNextStep();
      await page.gotoNextStep();
      await page.gotoNextStep();
      await expect(page.getStepTitle()).resolves.toMatch(/Review and create/);

      await page.gotoStep1FromEditBtnOnReview();
      await expect(page.isStepActive(1)).resolves.toBe(true);
      await expect(page.isStepDisabled(4)).resolves.toBe(false);
      await expect(page.getStepTitle()).resolves.toMatch(/Select engine type/);
    }),
  );
});
