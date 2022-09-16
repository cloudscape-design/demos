// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

export default class TablePageObject extends AppLayoutPage {
  protected pageWrapper = createWrapper();
  protected tableWrapper = this.pageWrapper.findTable();
  // Pagination
  countPaginationPages() {
    return this.getElementsCount(this.tableWrapper.findPagination().findPageNumbers().getElement());
  }

  // Table
  countTableRows() {
    return this.getElementsCount(this.tableWrapper.findRows().toSelector());
  }

  isTableEmptyButtonVisible() {
    return this.isDisplayed(this.tableWrapper.findEmptySlot().findButton().toSelector());
  }

  async clearFilterFromEmptySlot() {
    await this.click(this.tableWrapper.findEmptySlot().findButton().toSelector());
    await this.waitUntilLoaded();
  }

  countTableColumns() {
    return this.getElementsCount(this.tableWrapper.findColumnHeaders().toSelector());
  }

  // Table - Header Buttons
  protected async isTableHeaderButtonEnabled(index: number) {
    const el = await this.browser.$(
      this.tableWrapper.findHeaderSlot().findSpaceBetween().findAll('div').get(index).find('button').toSelector()
    );
    return el.isEnabled();
  }

  async selectTableRow(index: number) {
    await this.click(this.tableWrapper.findBodyCell(index, 1).toSelector());
  }

  async sortTableByColumn(index: number) {
    await this.click(this.tableWrapper.findColumnHeaders().get(index).toSelector());
    await this.waitUntilLoaded();
  }

  getColumnAriaLabel(index: number) {
    return this.getElementAttribute(
      this.tableWrapper.findColumnHeaders().get(index).find('[aria-label]').toSelector(),
      'aria-label'
    );
  }

  getTableCellText(row: number, col: number) {
    return this.getText(this.tableWrapper.findBodyCell(row, col).toSelector());
  }

  getTableItemsCounter() {
    return this.getText(this.tableWrapper.findHeaderSlot().findHeader().findCounter().toSelector());
  }

  async waitUntilLoaded() {
    // wait out onDelayedInput handler
    await this.pause(200);
    // wait for table content to be loaded
    await this.waitForVisible(this.tableWrapper.findLoadingText().toSelector(), false);
  }

  async confirmTablePreferenceChanges() {
    const confirmButton = await this.browser.$(
      this.tableWrapper.findCollectionPreferences().findModal().findConfirmButton().toSelector()
    );

    await confirmButton.click();

    await this.waitUntilLoaded();
  }

  async cancelTablePreferenceChanges() {
    const cancelButton = await this.browser.$(this.tableWrapper.findCollectionPreferences().findModal().toSelector());

    await cancelButton.click();

    await this.waitUntilLoaded();
  }

  async openTablePreferences() {
    await this.click(this.tableWrapper.findCollectionPreferences().findTriggerButton().toSelector());
  }

  async setTablePreferencesPageSize(index: number) {
    const el = await this.browser.$(
      this.tableWrapper
        .findCollectionPreferences()
        .findModal()
        .findPageSizePreference()
        .findOptions()
        .get(index)
        .findNativeInput()
        .toSelector()
    );
    await el.click();
  }

  async setTablePreferenceTableColumns(index: number) {
    const el = await this.browser.$(
      this.tableWrapper
        .findCollectionPreferences()
        .findModal()
        .findVisibleContentPreference()
        .findToggleByIndex(1, index)
        .findNativeInput()
        .toSelector()
    );
    await el.click();
  }
}
