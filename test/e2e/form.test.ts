// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import legalDisclaimerTest from './common/legal-disclaimer';
import PageObject from './page/form-page-object';

const setupTest = (testFn: { (page: PageObject): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/form.html');
    const page = new PageObject(browser);
    await page.waitForPageLoaded();
    await testFn(page);
  });
};

legalDisclaimerTest(setupTest);

describe('Single page create', () => {
  describe('bucket for logs selector', () => {
    test(
      'loads options list from server',
      setupTest(async page => {
        await page.openDistributionSelector();
        await expect(page.countDistributionSelectorOptions()).resolves.toBeGreaterThanOrEqual(10);
      })
    );

    test(
      'loads filtered options from server',
      setupTest(async page => {
        await page.openDistributionSelector();
        await page.filterDisributionsOptions('26');
        await expect(page.countDistributionSelectorOptions()).resolves.toBe(1);
      })
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
      })
    );
  });

  describe('Tag Editor', () => {
    test(
      'renders default tag row by default',
      setupTest(async page => {
        await expect(page.countTags()).resolves.toBe(1);
      })
    );

    test(
      'can add and remove tags',
      setupTest(async page => {
        await page.addTag();
        await expect(page.countTags()).resolves.toBe(2);

        await page.removeTag(2);
        await expect(page.countTags()).resolves.toBe(1);

        await page.removeTag(1);
        await expect(page.countTags()).resolves.toBe(0);
      })
    );
  });
});
