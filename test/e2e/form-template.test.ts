// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/form-template-page-object';

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/form.html');
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
      await expect(page.isNavigationOpen()).resolves.toBe(false);
      await expect(page.isToolsOpen()).resolves.toBe(false);
      await expect(page.isDistributionsContentVisible()).resolves.toBe(false);
      await expect(page.isExpandChangeBehaviorContentVisible()).resolves.toBe(false);
    }),
  );

  test(
    'Has header in form header slot',
    setupTest(async page => {
      await expect(page.getHeader()).resolves.toBe('Create distribution');
    }),
  );

  test(
    'Navigation panel opens properly and expandable sections are expanded',
    setupTest(async page => {
      await page.openSideNavigation();

      await expect(page.isNavigationOpen()).resolves.toBe(true);
      await expect(page.getActiveNavigationLinkText()).resolves.toBe('Distributions');

      await expect(page.isExpandableSectionVisible(1)).resolves.toBe(true);
      await expect(page.countExpandableSectionLinks(1)).resolves.toBe(7);

      await expect(page.isExpandableSectionVisible(2)).resolves.toBe(true);
      await expect(page.countExpandableSectionLinks(2)).resolves.toBe(2);
    }),
  );

  test(
    'Tools panel opens properly and has correct default content',
    setupTest(async page => {
      await page.openTools();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Create distribution');
      await expect(page.getToolsContent()).resolves.toMatch(/When you create an Amazon CloudFront distribution/);
    }),
  );

  test(
    'Tools panel opens and displays correct content after clicking header info anchor',
    setupTest(async page => {
      await page.openMainInfo();
      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Create distribution');
      await expect(page.getToolsContent()).resolves.toMatch(/When you create an Amazon CloudFront distribution/);
    }),
  );

  test(
    'Tools panel opens and displays correct content after clicking on delivery info link',
    setupTest(async page => {
      await page.openDeliveryMethodInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Delivery method');
      await expect(page.getToolsContent()).resolves.toMatch(
        /To create a distribution, you start by choosing the delivery method/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on root object info link',
    setupTest(async page => {
      await page.openRootObjectInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Root object');
      await expect(page.getToolsContent()).resolves.toMatch(
        /You can configure CloudFront to return a specific object \(the default root object\)/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on cnames info link',
    setupTest(async page => {
      await page.openCnamesInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Alternative domain names (CNAMEs)');
      await expect(page.getToolsContent()).resolves.toMatch(
        /If you want to use your own domain names in the URLs for your files instead of the CloudFront domain name/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on content origin info link',
    setupTest(async page => {
      await page.openOriginInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Content origin');
      await expect(page.getToolsContent()).resolves.toMatch(
        /CloudFront gets your objects \(your files\) from an origin that you specify, such as an S3 bucket or a web/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on path info info link',
    setupTest(async page => {
      await page.openPathInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Path to content');
      await expect(page.getToolsContent()).resolves.toMatch(
        /If you want CloudFront to request your content from a directory in your origin,/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on origin id info link',
    setupTest(async page => {
      await page.openOriginIdInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Origin ID');
      await expect(page.getToolsContent()).resolves.toMatch(
        /The origin ID is a string that uniquely distinguishes the origin/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on custom headers info link',
    setupTest(async page => {
      await page.openCustomHeadersInfo();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Custom headers');
      await expect(page.getToolsContent()).resolves.toMatch(
        /If you want CloudFront to include a custom header whenever it forwards a request to your origin/,
      );
    }),
  );

  test(
    'Tools panel updates focus as expected correctly while clicking multiple info anchors',
    setupTest(async page => {
      await page.openOriginIdInfo();
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
      await page.openCustomHeadersInfo();
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
    }),
  );

  test(
    'Expandable sections open properly',
    setupTest(async page => {
      await page.expandDistributionPanel();
      await page.expandChangeBehaviorPanel();
      await expect(page.isDistributionsContentVisible()).resolves.toBe(true);
      await expect(page.isExpandChangeBehaviorContentVisible()).resolves.toBe(true);
    }),
  );
});
