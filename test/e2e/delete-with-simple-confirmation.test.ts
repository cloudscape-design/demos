// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import DeleteWithConfirmationPageObject from './page/delete-with-confirmation-page-object';
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';

describe('Delete with simple confirmation', () => {
  const setupTest = (testFn: { (page: DeleteWithConfirmationPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new DeleteWithConfirmationPageObject(browser);
      await browser.url('/delete-with-simple-confirmation.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  test(
    'submits to delete all 5 selected distributions with one retry',
    setupTest(async page => {
      await expect(page.getTableItemsCounter()).resolves.toBe('(5/150)');
      await page.submitDeletion();
      await page.waitForModalClosed();
      await expect(page.getTableItemsCounter()).resolves.toBe('(150)');
      expect(await page.getNotificationText()).toEqual('Deleting 5 distributions.');
      await page.waitForNotificationText('Successfully deleted 4 distributions.');
      await expect(page.getTableItemsCounter()).resolves.toBe('(146)');
      await page.waitForNotificationText('Failed to delete distribution ');
      await page.retryFailedDeletion();
      await expect(page.getTableItemsCounter()).resolves.toBe('(146)');
      await page.waitForNotificationText('Deleting distribution ');
      await page.waitForNotificationText('Successfully deleted distribution ');
      await expect(page.getTableItemsCounter()).resolves.toBe('(145)');
    }),
  );
});
