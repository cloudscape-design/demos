// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/edit-form-page-object';

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/edit.html');
    const page = new Page(browser);
    await page.waitForPageLoaded();
    await testFn(page);
  });
};

describe('Edit', () => {
  test(
    'The initial state is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(4);
      await expect(page.isNavigationOpen()).resolves.toBe(false);
      await expect(page.isToolsOpen()).resolves.toBe(false);
      await expect(page.isAdditionSettingVisible()).resolves.toBe(false);
    }),
  );

  test(
    'Has header in form header slot',
    setupTest(async page => {
      await expect(page.getHeader()).resolves.toBe('Edit SLCCSMWOHOFUY0');
    }),
  );

  test(
    'Tools panel opens properly and has correct default content',
    setupTest(async page => {
      await page.openTools();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toMatch('Edit distribution');
      await expect(page.getToolsContent()).resolves.toMatch(
        /You can update your CloudFront distribution by editing its settings and saving your changes\./,
      );
    }),
  );

  test(
    'Tools panel opens and displays correct content after clicking header info anchor',
    setupTest(async page => {
      await page.openMainInfoLink();
      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toMatch('Edit distribution');
      await expect(page.getToolsContent()).resolves.toMatch(
        /You can update your CloudFront distribution by editing its settings and saving your changes\./,
      );
    }),
  );

  test(
    'Tools panel opens and displays correct content after clicking first form info anchor',
    setupTest(async page => {
      await page.openCnameInfoLink();
      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Alternate domain names (CNAMEs)');
      await expect(page.getToolsContent()).resolves.toMatch(
        /If you want to use your own domain names in the URLs for your files/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking second form info anchor',
    setupTest(async page => {
      await page.openSslInfoLink();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toMatch('SSL/TLS certificate');
      await expect(page.getToolsContent()).resolves.toMatch(
        /When CloudFront receives a request for content, it finds the domain name/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking third info anchor in the footer',
    setupTest(async page => {
      await page.openAdditionalTools();
      await page.openRootObjectInfoLink();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toMatch('Root object');
      await expect(page.getToolsContent()).resolves.toMatch(
        /You can configure CloudFront to return a specific object \(the default root object\)/,
      );
    }),
  );

  test(
    'Tools panel updates focus as expected correctly while clicking multiple info anchors',
    setupTest(async page => {
      await page.openMainInfoLink();
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
      await page.openCnameInfoLink();
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
    }),
  );
});
