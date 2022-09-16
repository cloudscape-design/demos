// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
import legalDisclaimerTest from './common/legal-disclaimer';

const tableWrapper = createWrapper().findTable('#tags-panel');
class PageObject extends BasePageObject {
  async waitForTableLoaded() {
    // wait for table to be loaded
    await this.waitForVisible(tableWrapper.findRows().toSelector());
    // wait for table content to be loaded
    await this.waitForVisible(tableWrapper.findLoadingText().toSelector(), false);
  }
  countTableRows() {
    return this.getElementsCount(tableWrapper.findRows().toSelector());
  }
}

const setupTest = (testFn: { (page: PageObject): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/details.html');
    const page = new PageObject(browser);
    await page.waitForTableLoaded();
    await testFn(page);
  });
};

legalDisclaimerTest(setupTest);

describe('Tags Table (react)', () => {
  test(
    'loads tags from server',
    setupTest(async page => {
      await expect(page.countTableRows()).resolves.toBe(4);
    })
  );
});
