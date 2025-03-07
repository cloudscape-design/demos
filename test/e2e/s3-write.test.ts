// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import S3PageObject from './page/s3-page-object';

const s3ResourceSelector = createWrapper().findS3ResourceSelector();

class S3WritePageObject extends S3PageObject {
  isDrilldownAllowed(rowIndex: number) {
    return this.isExisting(s3ResourceSelector.findTable().findBodyCell(rowIndex, 2).find('a').toSelector());
  }
}

describe('S3 Resource Selector - Write mode', () => {
  const setupTest = (testFn: { (page: S3WritePageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new S3WritePageObject(browser);
      await browser.url('/write-to-s3.html');
      await page.waitForVisible(s3ResourceSelector.toSelector());
      await testFn(page);
    });
  };

  test(
    'Has header in form header slot',
    setupTest(async page => {
      await expect(page.getHeader()).resolves.toBe('Create simulation');
    }),
  );

  test(
    'does not allow selecting versions',
    setupTest(async page => {
      await expect(
        page.isExisting(s3ResourceSelector.findInContext().findVersionsSelect().toSelector()),
      ).resolves.toEqual(false);
    }),
  );

  test(
    'does not allow selecting files',
    setupTest(async page => {
      await page.openBrowseDialog();
      await expect(page.isRowSelectable(1)).resolves.toEqual(true);
      await page.drilldown(3);
      // this is a folder
      await expect(page.isRowSelectable(1)).resolves.toEqual(true);
      await expect(page.isDrilldownAllowed(1)).resolves.toEqual(true);
      // this is a file
      await expect(page.isRowSelectable(3)).resolves.toEqual(false);
      await expect(page.isDrilldownAllowed(3)).resolves.toEqual(false);
    }),
  );

  test(
    'selects a bucket',
    setupTest(async page => {
      await page.openBrowseDialog();
      await page.selectTableRow(1);
      await page.submitSelection();
      await expect(page.getUriInputValue()).resolves.toEqual('s3://bucket-enim');
    }),
  );

  test(
    'selects a folder',
    setupTest(async page => {
      await page.openBrowseDialog();
      await page.drilldown(2);
      await page.selectTableRow(1);
      await page.submitSelection();
      await expect(page.getUriInputValue()).resolves.toEqual('s3://bucket-ex/simulation-nano-2019');
    }),
  );
});
