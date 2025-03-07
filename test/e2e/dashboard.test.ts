// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const wrapper = createWrapper();

describe('Common dashboard behaviors', () => {
  describe.each(['dashboard', 'configurable-dashboard'])('%s', pageName => {
    const setupTest = (testFn: { (page: BasePageObject): Promise<void> }) => {
      return useBrowser(async browser => {
        const page = new BasePageObject(browser);
        await browser.url(`/${pageName}.html`);
        await page.waitForVisible('[data-testid="instance-limits-table"]');
        await testFn(page);
      });
    };

    test(
      'Info link in widget opens help panel',
      setupTest(async page => {
        await page.click(wrapper.findLink('[data-testid="service-health-info-link"]').toSelector());
        await expect(page.isDisplayed(createWrapper().findAppLayout().findTools().toSelector())).resolves.toBe(true);
      }),
    );

    test(
      'Selecting an item enables header button',
      setupTest(async page => {
        const limitsButtonSelector = wrapper.findButton('[data-testid="instance-limits-increase-button"]').toSelector();
        await expect(page.isClickable(limitsButtonSelector)).resolves.toBe(false);
        await page.click(
          wrapper.findTable('[data-testid="instance-limits-table"]').findRowSelectionArea(1).toSelector(),
        );
        await expect(page.isClickable(limitsButtonSelector)).resolves.toBe(true);
      }),
    );
  });
});
