// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import TableEditablePageObject from './page/table-editable-page-object';
import commonTableTests, { SetupTest } from './common/table/table-tests';

describe('Table - Inline Editing', () => {
  const setupTest: SetupTest<TableEditablePageObject> = testFn => {
    return useBrowser(async browser => {
      const page = new TableEditablePageObject(browser);
      await browser.url('/table-editable.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonTableTests(setupTest);

  test(
    'Saves state dropdown change',
    setupTest(async page => {
      const currentCellText = await page.getCellText(2, 3);
      const result = await page.performStateEdit(2, currentCellText);
      expect(result).not.toBe(currentCellText); // there's only 2 options, so it should be different
    }),
  );

  test(
    'Fails to save invalid domain name edit',
    setupTest(async page => {
      const errorMessage = await page.performBadDomainEdit(2);
      expect(errorMessage).toBe('Valid domain name ends with .com, .org, or .net.');
    }),
  );

  test(
    'Saves valid domain name edit',
    setupTest(async page => {
      const VALID_DOMAIN = 'aws.amazon.com';
      const afterEditText = await page.performGoodDomainEdit(4, VALID_DOMAIN);
      expect(afterEditText).toBe(VALID_DOMAIN);
    }),
  );

  test(
    'Saves SSL certificate edit',
    setupTest(async page => {
      await page.hideActionsColumn();
      const afterEditText = await page.performSSLEdit(5);
      expect(afterEditText).toBe('ACM');
    }),
  );

  test(
    'Can manually refresh table data',
    setupTest(async page => {
      await page.waitForVisible(page.lastRefresh());
      await expect(page.getText(page.lastRefresh())).resolves.toContain('Last updated');
      await page.click(page.refreshButton());
      await page.waitForVisible(page.lastRefresh());
      await expect(page.getText(page.lastRefresh())).resolves.toContain('Last updated');
    }),
  );
});
