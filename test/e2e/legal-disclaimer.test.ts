// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
import { allTestPages } from './common/all-test-pages';

describe('Legal disclaimer', () => {
  allTestPages.forEach(({ pagePath }) => {
    test(
      `Visit ${pagePath}`,
      useBrowser(async browser => {
        await browser.url(pagePath);
        const page = new BasePageObject(browser);
        const contentSelector = createWrapper().findFlashbar().findItems().get(1).findContent().toSelector();
        const flashbarContent = await page.getText(contentSelector);
        expect(flashbarContent).toEqual(
          'This demo is an example of Cloudscape Design System patterns and components, and may not reflect the current patterns and components of AWS services.',
        );
      }),
    );
  });
});
