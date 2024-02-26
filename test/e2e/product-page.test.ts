// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import ProductPagePageObject from './page/product-page-page-object';

const setupTest = (testFn: { (page: ProductPagePageObject): Promise<void> }) => {
  return useBrowser(async browser => {
    const page = new ProductPagePageObject(browser);
    await browser.url('/product-detail-page.html');
    await testFn(page);
  });
};

test(
  'Content is correct',
  setupTest(async page => {
    await expect(page.isDisplayed(page.heroHeader().toSelector())).resolves.toBe(true);
    await expect(page.isDisplayed(page.userFeedback().toSelector())).resolves.toBe(true);
    await expect(page.isDisplayed(page.onThisPageNavigation().toSelector())).resolves.toBe(true);
  })
);

test(
  'Can submit user feedback',
  setupTest(async page => {
    await page.submitUserFeedback('yes');

    await expect(page.getUserFeedbackResult()).resolves.toContain('Thanks, your feedback has been recorded.');
  })
);
