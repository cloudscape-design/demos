// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import PageObject from './page/form-page-object';
import { SCREEN_SIZE_FOR_APP_LAYOUT_TOOLBAR } from './utils';

const setupTest = (testFn: { (page: PageObject): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/form.html');
    const page = new PageObject(browser);
    await page.waitForPageLoaded();
    await page.setWindowSize(SCREEN_SIZE_FOR_APP_LAYOUT_TOOLBAR);
    await testFn(page);
  });
};

describe('Single page create', () => {
  describe('bucket for logs selector', () => {
    test(
      'loads options list from server',
      setupTest(async page => {
        await page.openDistributionSelector();
        await expect(page.countDistributionSelectorOptions()).resolves.toBeGreaterThanOrEqual(10);
      }),
    );

    test(
      'loads filtered options from server',
      setupTest(async page => {
        await page.openDistributionSelector();
        await page.filterDistributionsOptions('16');
        await expect(page.countDistributionSelectorOptions()).resolves.toBe(1);
      }),
    );
  });

  describe('content origin selector', () => {
    test(
      'selects and deselects options properly',
      setupTest(async page => {
        await expect(page.getSelectedOrigins()).resolves.toEqual([]);
        // we select by id, but then check the display label
        await page.selectOrigin('bucket05');
        await expect(page.getSelectedOrigins()).resolves.toEqual(['EXAMPLE-BUCKET5.s3.amazon.com']);
        await page.deselectOrigin();
        await expect(page.getSelectedOrigins()).resolves.toEqual([]);
      }),
    );
  });

  describe('Tag Editor', () => {
    test(
      'can add and remove tags',
      setupTest(async page => {
        await page.addTag(true);
        await expect(page.countTags()).resolves.toBe(1);

        await page.addTag(true);
        await expect(page.countTags()).resolves.toBe(2);

        await page.removeTag(2);
        await expect(page.countTags()).resolves.toBe(1);

        await page.removeTag(1);
        await expect(page.countTags()).resolves.toBe(0);
      }),
    );
  });

  describe('Sub-resource creation', () => {
    describe('Embedded', () => {
      test(
        'Shows input progressively and inputs work',
        setupTest(async page => {
          // By default existing policy option should be selected
          await expect(page.countCacheBehaviorSelects()).resolves.toBe(2);
          await page.selectOptionExistingOriginPolicy('1');

          await page.selectOriginRequestPolicyNewOrExisting('new');
          await expect(page.countCacheBehaviorSelects()).resolves.toBe(4);
          await page.enterNewPolicyName('test');
        }),
      );
    });

    describe('Split panel', () => {
      test(
        'Create cache policy button opens split panel',
        setupTest(async page => {
          await expect(page.isSplitPanelOpen()).resolves.toBe(false);

          await page.openSplitPanelSubResourceCreation();
          await expect(page.isSplitPanelOpen()).resolves.toBe(true);
          await expect(page.isSplitPanelSliderFocused()).resolves.toBe(true);
        }),
      );

      test(
        'Nothing happens on submit',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();
          await expect(page.isSplitPanelOpen()).resolves.toBe(true);

          await page.submitCreateCachePolicy();
          await expect(page.getCreateCachePolicyErrorMessages()).resolves.toEqual([]);
          await expect(page.isSplitPanelOpen()).resolves.toBe(true);
        }),
      );

      test(
        'Cancel button closes split panel',
        setupTest(async page => {
          await page.openSplitPanelSubResourceCreation();

          await page.cancelCreateCachePolicySplitPanel();
          await expect(page.isSplitPanelOpen()).resolves.toBe(false);
        }),
      );
    });
  });
});
