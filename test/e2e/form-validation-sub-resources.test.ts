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
