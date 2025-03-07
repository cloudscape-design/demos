// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import S3PageObject from './page/s3-page-object';

const s3ResourceSelector = createWrapper().findS3ResourceSelector();
const versionSelectPlaceholder = 'Choose a version';

class S3ReadPageObject extends S3PageObject {
  getVersionSelectValue() {
    return this.getText(s3ResourceSelector.findInContext().findVersionsSelect().findTrigger().toSelector());
  }

  getAlertText() {
    return this.getOptionalText(s3ResourceSelector.findAlertSlot().findAlert().findContent().toSelector());
  }

  async waitForSelectLoaded() {
    await this.waitForExist(createWrapper(s3ResourceSelector.toSelector()).findSpinner().toSelector(), false);
  }
}

describe('S3 Resource Selector - Read mode', () => {
  const setupTest = (testFn: { (page: S3ReadPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new S3ReadPageObject(browser);
      await browser.url('/read-from-s3.html');
      await page.waitForVisible(s3ResourceSelector.toSelector());
      await testFn(page);
    });
  };

  test(
    'Has header in form header slot',
    setupTest(async page => {
      await expect(page.getHeader()).resolves.toBe('Run simulation');
    }),
  );

  test(
    'does not allow selecting buckets and folders',
    setupTest(async page => {
      await page.openBrowseDialog();
      await expect(page.isRowSelectable(1)).resolves.toEqual(false);
      await page.drilldown(3);
      await expect(page.isRowSelectable(1)).resolves.toEqual(false); // this is a folder
      await expect(page.isRowSelectable(3)).resolves.toEqual(true); // this is a file
    }),
  );

  test(
    'selects an object',
    setupTest(async page => {
      await page.openBrowseDialog();
      await page.drilldown(2);
      await page.drilldown(1);
      await page.selectTableRow(1);
      await page.submitSelection();
      await page.waitForSelectLoaded();
      await expect(page.getUriInputValue()).resolves.toEqual('s3://bucket-ex/simulation-nano-2019/quarks-8ms.sim');
      await expect(page.getVersionSelectValue()).resolves.toEqual(versionSelectPlaceholder);
    }),
  );

  test(
    'selects a version',
    setupTest(async page => {
      await page.openBrowseDialog();
      await page.drilldown(1);
      await page.drilldown(1);
      await page.selectTableRow(1);
      await page.submitSelection();
      await page.waitForSelectLoaded();
      await expect(page.getUriInputValue()).resolves.toEqual('s3://bucket-enim/neutrino-8ms.sim');
      await expect(page.getVersionSelectValue()).resolves.toEqual('June 27, 2019, 08:35:46 (UTC+02:00)');
    }),
  );

  test(
    'shows alert about non-existing objects',
    setupTest(async page => {
      await page.setUriInputValue('s3://totally/fictional');
      // click somewhere to blur the input and trigger validation
      await page.click(createWrapper().findHeader().toSelector());
      await expect(page.getAlertText()).resolves.toEqual(
        'Resource "s3://totally/fictional" cannot be found: "totally" bucket doesn\'t exist',
      );

      await page.click(s3ResourceSelector.findAlertSlot().findAlert().findDismissButton().toSelector());
      await expect(page.getAlertText()).resolves.toEqual(null);
    }),
  );

  test(
    'shows alert about missing versions',
    setupTest(async page => {
      await page.setUriInputValue('s3://bucket-officia/particle-1ns.sim');
      // click somewhere to blur the input and trigger validation
      await page.click(createWrapper().findHeader().toSelector());
      await expect(page.getAlertText()).resolves.toContain(
        'You might not have permissions to retrieve object versions.',
      );
    }),
  );
});
