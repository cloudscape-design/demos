// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

export default class DeleteWithConfirmationPageObject extends AppLayoutPage {
  protected pageWrapper = createWrapper();
  protected modalWrapper = this.pageWrapper.findModal();
  protected tableWrapper = this.pageWrapper.findTable();
  protected flashbarWrapper = this.pageWrapper.findFlashbar();

  getNotificationText() {
    const notification = this.getVisibleNotification().toSelector();
    return notification ? this.getText(notification) : '';
  }

  getTableItemsCounter() {
    return this.getText(this.tableWrapper.findHeaderSlot().findHeader().findCounter().toSelector());
  }

  getVisibleNotification() {
    return this.flashbarWrapper.findItems().get(1);
  }

  async waitUntilLoaded() {
    await this.waitForExist(this.tableWrapper.findLoadingText().toSelector(), false);
    await this.waitForVisible(this.modalWrapper.toSelector());
  }

  async waitForNotificationText(text: string) {
    await this.browser.waitUntil(
      async () => {
        return (await this.getNotificationText()).includes(text);
      },
      { timeoutMsg: `Notification text not found: ${text}` },
    );
  }

  waitForModalClosed() {
    return this.waitForVisible(this.modalWrapper.toSelector(), false);
  }

  retryFailedDeletion() {
    return this.click(this.getVisibleNotification().findAction().findButton().toSelector());
  }

  submitDeletion() {
    const submitButton = this.modalWrapper.find('[data-testid="submit"]');
    return this.click(submitButton.toSelector());
  }
}
