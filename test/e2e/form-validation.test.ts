// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import FormTemplatePage from './page/form-template-page-object';
import { SCREEN_SIZE_FOR_APP_LAYOUT_TOOLBAR } from './utils';

const setupTest = (testFn: { (page: FormTemplatePage): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/form-validation.html');
    const page = new FormTemplatePage(browser);

    await page.waitForPageLoaded();
    await page.setWindowSize(SCREEN_SIZE_FOR_APP_LAYOUT_TOOLBAR);

    // Dismiss the external website flashbar - the flashbars are sticky in the demo and it covers the interactive elements when scrollIntoViewAndClick is used
    if (await page.isFlashVisible(1)) {
      await page.dismissFlash(1);
    }
    await testFn(page);
  });
};

describe('Form validation example', () => {
  test(
    'The initial state is correct',
    setupTest(async formTemplatePage => {
      await expect(formTemplatePage.countBreadcrumbs()).resolves.toBe(3);
      await expect(formTemplatePage.isNavigationOpen()).resolves.toBe(false);
      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(false);
      await expect(formTemplatePage.isDistributionsContentVisible()).resolves.toBe(false);
      await expect(formTemplatePage.isExpandChangeBehaviorContentVisible()).resolves.toBe(false);
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
    setupTest(async formTemplatePage => {
      await formTemplatePage.openSideNavigation();

      await expect(formTemplatePage.isNavigationOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getActiveNavigationLinkText()).resolves.toBe('Distributions');

      await expect(formTemplatePage.isExpandableSectionVisible(1)).resolves.toBe(true);
      await expect(formTemplatePage.countExpandableSectionLinks(1)).resolves.toBe(7);

      await expect(formTemplatePage.isExpandableSectionVisible(2)).resolves.toBe(true);
      await expect(formTemplatePage.countExpandableSectionLinks(2)).resolves.toBe(2);
    }),
  );

  test(
    'Tools panel opens properly and has correct default content',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openTools();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Create distribution');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /When you create an Amazon CloudFront distribution/,
      );
    }),
  );

  test(
    'Tools panel opens and displays correct content after clicking header info anchor',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openMainInfo();
      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Create distribution');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /When you create an Amazon CloudFront distribution/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on root object info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openRootObjectInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Root object');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /You can configure CloudFront to return a specific object \(the default root object\)/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on cnames info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openCnamesInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Alternative domain names (CNAMEs)');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /If you want to use your own domain names in the URLs for your files instead of the CloudFront domain name/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on content origin info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openOriginInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Content origin');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /CloudFront gets your objects \(your files\) from an origin that you specify, such as an S3 bucket or a web/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on path info info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openPathInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Path to content');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /If you want CloudFront to request your content from a directory in your origin,/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on origin id info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openOriginIdInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Origin ID');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
        /The origin ID is a string that uniquely distinguishes the origin/,
      );
    }),
  );

  test(
    'Tools panel displays correct content after clicking on custom headers info link',
    setupTest(async formTemplatePage => {
      await formTemplatePage.openCustomHeadersInfo();

      await expect(formTemplatePage.isToolsOpen()).resolves.toBe(true);
      await expect(formTemplatePage.getToolsTitle()).resolves.toBe('Custom headers');
      await expect(formTemplatePage.getToolsContent()).resolves.toMatch(
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
    setupTest(async formTemplatePage => {
      await formTemplatePage.expandDistributionPanel();
      await formTemplatePage.expandChangeBehaviorPanel();
      await expect(formTemplatePage.isDistributionsContentVisible()).resolves.toBe(true);
      await expect(formTemplatePage.isExpandChangeBehaviorContentVisible()).resolves.toBe(true);
    }),
  );

  test(
    'Contains expected server side error messages',
    setupTest(async page => {
      await page.submitForm();
      await expect(page.getFormErrorMessages()).resolves.toEqual(
        expect.arrayContaining([
          'You have reached the maximum amount of distributions you can create. Learn more about distribution limits ',
        ]),
      );
    }),
  );

  test(
    'Contains expected error messages in distributions panel',
    setupTest(async page => {
      await page.submitForm();
      await expect(page.getDistributionPanelErrorMessages()).resolves.toEqual(
        expect.arrayContaining([
          'Root object is required.',
          'S3 bucket is required.',
          'Certificate expiry date is required.',
          'Certificate expiry time is required.',
        ]),
      );
    }),
  );

  test(
    'Contains expected error messages in origin panel',
    setupTest(async page => {
      await page.submitForm();
      await expect(page.getOriginSettingsErrorMessages()).resolves.toEqual(
        expect.arrayContaining([
          'Origin ID is required.',
          'Custom header name is required.',
          'Custom header value is required.',
        ]),
      );
    }),
  );

  test(
    'Contains expected warning messages in origin panel',
    setupTest(async page => {
      await page.setCustomHeaderFieldText(1, 1, 'value with empty character'); // custom header name
      await page.setCustomHeaderFieldText(1, 2, 'value with empty character'); // custom header value
      await expect(page.getOriginSettingsWarningMessages()).resolves.toEqual([
        'The name has empty (space) characters.',
        'The value has empty (space) characters.',
      ]);
    }),
  );

  test(
    'Top most error is focused',
    setupTest(async page => {
      await page.submitForm();
      await expect(page.isRootInputFocused()).resolves.toBe(true);
    }),
  );

  test(
    'Shows error message on blur',
    setupTest(async page => {
      // Blur when empty
      await page.enterAndBlurRootObject();
      await expect(page.getDistributionPanelErrorMessages()).resolves.toEqual(
        expect.arrayContaining(['Root object is required.']),
      );

      // Blur with invalid input
      await page.enterAndBlurRootObject('https://example');
      await expect(page.getDistributionPanelErrorMessages()).resolves.toEqual(
        expect.arrayContaining(['Enter a valid root object URL. Example: https://example.com']),
      );

      // Blur with valid input
      await page.enterAndBlurRootObject('.com');
      await expect(page.getDistributionPanelErrorMessages()).resolves.toEqual([]);
    }),
  );

  describe('Sub-resource creation', () => {
    test(
      'Contains expected error messages in cache behavior panel on submit',
      setupTest(async page => {
        await page.submitForm();
        await expect(page.getCacheBehaviorPanelErrorMessages()).resolves.toEqual(
          expect.arrayContaining(['Cache policy is required.']),
        );
      }),
    );

    describe('Embedded', () => {
      test(
        'New origin request policy - Contains expected error messages in cache behavior panel on submit',
        setupTest(async page => {
          await page.selectOriginRequestPolicyNewOrExisting('new');
          await page.submitForm();
          await expect(page.getCacheBehaviorPanelErrorMessages()).resolves.toEqual(
            expect.arrayContaining(['Name is required.', 'Cache policy is required.']),
          );
        }),
      );

      test(
        'New origin request policy - Shows error on blur and fixes',
        setupTest(async page => {
          await page.selectOriginRequestPolicyNewOrExisting('new');
          await page.clickAndBlurNewPolicyNameInput();

          await expect(page.getCacheBehaviorPanelErrorMessages()).resolves.toEqual(
            expect.arrayContaining(['Name is required.']),
          );

          await page.enterNewPolicyName('test');
          await expect(page.getCacheBehaviorPanelErrorMessages()).resolves.toEqual([]);
        }),
      );
    });

    describe('Split panel', () => {
      test(
        'Contains expected error messages in create cache policy form on submit',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();
          await page.submitCreateCachePolicy();

          await expect(page.getCreateCachePolicyErrorMessages()).resolves.toEqual(['Name is required.']);
        }),
      );

      test(
        'Shows error on blur and fixes',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();

          await page.blurCreateCachePolicyNameInput();
          await expect(page.getCreateCachePolicyErrorMessages()).resolves.toEqual(['Name is required.']);

          await page.createCachePolicyEnterName('test');
          await page.blurCreateCachePolicyNameInput();
          await expect(page.getCreateCachePolicyErrorMessages()).resolves.toEqual([]);
        }),
      );

      test(
        'Should close split panel and show flashbar when form submission is successful',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();

          await page.createCachePolicyEnterName('test');
          await page.submitCreateCachePolicy();
          await page.waitForCreateCachePolicySubmission();

          await expect(page.isSplitPanelOpen()).resolves.toBe(false);
          await expect(page.isFlashVisible(1)).resolves.toBe(true);
        }),
      );

      test(
        'Should show unsaved changes modal and cancel the modal',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();
          await page.createCachePolicyEnterName('test');
          await page.cancelCreateCachePolicySplitPanel();

          const modal = page.findModal();
          await page.waitForVisible(modal.findContent().toSelector());

          await page.cancelModal();
          await expect(page.isSplitPanelOpen()).resolves.toBe(true);
          await expect(page.getCreateCachePolicyName()).resolves.toBe('test');
        }),
      );

      test(
        'Should show unsaved changes modal, submit and re-open the modal',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();
          await page.createCachePolicyEnterName('test');
          await page.cancelCreateCachePolicySplitPanel();

          const modal = page.findModal();
          await page.waitForVisible(modal.findContent().toSelector());

          await page.submitModal();
          await expect(page.isSplitPanelOpen()).resolves.toBe(false);

          // The changes should be clear after re-opening
          await page.openSplitPanelSubResourceCreation();
          await expect(page.getCreateCachePolicyName()).resolves.toBe('');
        }),
      );

      test(
        "Should set the new resource as the selected option if there isn't a selected item",
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();
          await page.createCachePolicyEnterName('test');
          await page.submitCreateCachePolicy();
          await page.waitForCreateCachePolicySubmission();

          await expect(page.getSelectedCachePolicy()).resolves.toBe('test');
        }),
      );

      test(
        'Should not set the new resource as the selected option if there already is a selected item',
        setupTest(async page => {
          await page.selectCachePolicy('1');

          await page.openSplitPanelSubResourceCreation();
          await page.createCachePolicyEnterName('test');
          await page.submitCreateCachePolicy();
          await page.waitForCreateCachePolicySubmission();

          await expect(page.getSelectedCachePolicy()).resolves.toBe('Policy 2');
        }),
      );
    });
  });
});
