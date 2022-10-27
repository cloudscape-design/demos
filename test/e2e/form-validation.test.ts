// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import legalDisclaimerTest from './common/legal-disclaimer';
import FormTemplatePage from './page/form-template-page-object';

const setupTest = (testFn: { (page: FormTemplatePage): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/form-validation.html');
    const page = new FormTemplatePage(browser);

    await page.waitForPageLoaded();
    await testFn(page);
  });
};

legalDisclaimerTest(setupTest);

describe('Form validation example', () => {
  test(
    'The initial state is correct',
    setupTest(async formTemplatePage => {
      await expect(formTemplatePage.countBreadcrumbs()).resolves.toBe(3);
      await expect(formTemplatePage.isNavigationOpen()).resolves.toBe(false);
      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(false);
      await expect(formTemplatePage.isDistributionsContentVisible()).resolves.toBe(false);
      await expect(formTemplatePage.isExpandChangeBehaviorContentVisible()).resolves.toBe(false);
    })
  );

  test(
    'Navigation panel opens properly and expandable sections are expanded',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openSideNavigation();

      await expect(formTemplatePage.isNavigationOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getActiveNavigationLinkText()).resolves.toBe('Distributions');

      await expect(formTemplatePage.isExpandableSectionVisible(1)).resolves.toBe(true);
      await expect(formTemplatePage.countExpandableSectionLinks(1)).resolves.toBe(7);

      await expect(formTemplatePage.isExpandableSectionVisible(2)).resolves.toBe(true);
      await expect(formTemplatePage.countExpandableSectionLinks(2)).resolves.toBe(2);
    })
  );

  test(
    'Tools panel opens properly and has correct default content',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openTools();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Create distribution');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /When you create an Amazon CloudFront distribution/
      );
    })
  );

  test(
    'Tools panel opens and displays correct content after clicking header info anchor',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openMainInfo();
      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Create distribution');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /When you create an Amazon CloudFront distribution/
      );
    })
  );

  test(
    'Tools panel opens and displays correct content after clicking on certificat',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openCertificateInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('SSL/TLS certificate');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /When CloudFront receives a request for content, it finds the domain name in the request/
      );
    })
  );

  test(
    'Tools panel displays correct content after clicking on root object info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openRootObjectInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Root object');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /You can configure CloudFront to return a specific object \(the default root object\)/
      );
    })
  );

  test(
    'Tools panel displays correct content after clicking on cnames info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openCnamesInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Alternative domain names (CNAMEs)');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /If you want to use your own domain names in the URLs for your files instead of the CloudFront domain name/
      );
    })
  );

  test(
    'Tools panel displays correct content after clicking on content origin info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openOriginInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Content origin');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /CloudFront gets your objects \(your files\) from an origin that you specify, such as an S3 bucket or a web/
      );
    })
  );

  test(
    'Tools panel displays correct content after clicking on path info info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openPathInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Path to content');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /If you want CloudFront to request your content from a directory in your origin,/
      );
    })
  );

  test(
    'Tools panel displays correct content after clicking on origin id info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openOriginIdInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Origin ID');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /The origin ID is a string that uniquely distinguishes the origin/
      );
    })
  );

  test(
    'Tools panel displays correct content after clicking on custom headers info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openCustomHeadersInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Custom headers');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /If you want CloudFront to include a custom header whenever it forwards a request to your origin/
      );
    })
  );

  test(
    'Tools panel updates focus as expected correctly while clicking multiple info anchors',
    setupTest(async page => {
      await page.openOriginIdInfo();
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
      await page.openCustomHeadersInfo();
      await expect(page.isToolsCloseFocused()).resolves.toBe(true);
    })
  );

  test(
    'Expandable sections open properly',
    setupTest(async formTemplatePage => {
      await formTemplatePage.expandDistributionPanel();
      await formTemplatePage.expandChangeBehaviorPanel();
      await expect(formTemplatePage.isDistributionsContentVisible()).resolves.toBe(true);
      await expect(formTemplatePage.isExpandChangeBehaviorContentVisible()).resolves.toBe(true);
    })
  );

  test(
    'Contains expected server side error messages',
    setupTest(async page => {
      await expect(page.getFormErrorMessages()).resolves.toEqual(
        expect.arrayContaining([
          'CloudFront can’t create the new distribution because of a permissions problem with your IAM role.',
        ])
      );
    })
  );

  test(
    'Contains expected error messages',
    setupTest(async page => {
      await expect(page.getDistributionPanelErrorMessages()).resolves.toEqual(
        expect.arrayContaining([
          'You must specify a root object.',
          'You must specify at least one alternative domain name.',
          'You must specify a S3 bucket.',
          'Invalid date format.',
          'Invalid time format.',
        ])
      );
    })
  );

  test(
    'Contains expected error messages',
    setupTest(async page => {
      await expect(page.getOriginSettingsErrorMessages()).resolves.toEqual(
        expect.arrayContaining([
          'You must specify a content origin.',
          'You must specify a path to content.',
          'You must specify a origin ID.',
        ])
      );
    })
  );
});
