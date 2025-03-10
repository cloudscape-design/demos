// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import DeleteWithAdditionalConfirmationPageObject from './page/delete-with-additional-confirmation-page-object';
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';

describe('Delete with additional confirmation', () => {
  const setupTest = (testFn: { (page: DeleteWithAdditionalConfirmationPageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new DeleteWithAdditionalConfirmationPageObject(browser);
      await browser.url('/delete-with-additional-confirmation.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  test(
    'confirms and submits to delete all 3 selected instances with one retry',
    setupTest(async page => {
      await expect(page.getTableItemsCounter()).resolves.toBe('(3/50)');
      await page.typeAdditionalConfirmation();
      await page.submitDeletion();
      await page.waitForModalClosed();
      await expect(page.getTableItemsCounter()).resolves.toBe('(50)');
      expect(await page.getNotificationText()).toEqual('Deleting 3 instances.');
      await page.waitForNotificationText('Successfully deleted 2 instances.');
      await expect(page.getTableItemsCounter()).resolves.toBe('(48)');
      await page.waitForNotificationText('Failed to delete instance ');
      await page.retryFailedDeletion();
      await expect(page.getTableItemsCounter()).resolves.toBe('(48)');
      await page.waitForNotificationText('Deleting instance ');
      await page.waitForNotificationText('Successfully deleted instance ');
      await expect(page.getTableItemsCounter()).resolves.toBe('(47)');
    }),
  );
});
