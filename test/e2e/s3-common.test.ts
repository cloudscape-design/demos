// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import S3PageObject from './page/s3-page-object';

['read-from-s3', 'write-to-s3'].forEach(pageName =>
  describe(`S3 Resource Selector - ${pageName}`, () => {
    const setupTest = (testFn: { (page: S3PageObject): Promise<void> }) => {
      return useBrowser(async browser => {
        const page = new S3PageObject(browser);
        await browser.url(`/${pageName}.html`);
        await page.waitForVisible(createWrapper().findS3ResourceSelector().toSelector());
        await testFn(page);
      });
    };

    test(
      'shows validation errors when invalid and enables view link when valid',
      setupTest(async page => {
        await expect(page.getErrorText()).resolves.toEqual(null);
        await expect(page.getViewHref()).resolves.toEqual(null);

        await page.setUriInputValue('not-a-uri');
        // click somewhere to blur the input and trigger validation
        await page.click(createWrapper().findHeader().toSelector());
        await expect(page.getErrorText()).resolves.toContain('The path must begin with s3://');
        await expect(page.getViewHref()).resolves.toEqual(null);

        // clear the input first
        await page.setUriInputValue('');
        await page.keys(['Escape']);
        await page.setUriInputValue('s3://bucket-enim/neutrino-8ms.sim');
        // click somewhere to blur the input and trigger validation
        await page.click(createWrapper().findHeader().toSelector());
        await expect(page.getErrorText()).resolves.toEqual(null);
        await expect(page.getViewHref()).resolves.toEqual('https://amazons3.demo.s3-resource-selector/test/1');
      }),
    );
  }),
);
