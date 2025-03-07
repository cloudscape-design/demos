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

  async getColumnHeaderTexts() {
    const headers = await this.browser.$$(this.tableWrapper.findColumnHeaders().toSelector());
    return headers.map(header => header.getText());
  }

  // Selector for the manual refresh button
  refreshButton() {
    return this.pageWrapper.find('[data-testid="manual-refresh"]').findButton().toSelector();
  }

  // Selector of the ARIA live region that contains the "Last updated" information for manual refresh
  lastRefresh() {
    return this.pageWrapper.find('[data-testid="manual-refresh"]').findLiveRegion().toSelector();
  }

  // Table - Header Buttons
  protected async isTableHeaderButtonEnabled(index: number) {
    const el = await this.browser.$(
      this.tableWrapper.findHeaderSlot().findSpaceBetween().findAll('div').get(index).find('button').toSelector(),
    );
    return el.isEnabled();
  }

  protected async isTableHeaderButtonWithTestIdEnabled(testId: string) {
    const el = await this.browser.$(this.pageWrapper.findButton(`[data-testid="${testId}"]`).toSelector());
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
      'aria-label',
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
    await this.pause(300);
    await this.waitForExist(this.tableWrapper.findLoadingText().toSelector(), false);
  }

  async reload() {
    await this.browser.refresh();
  }

  async confirmTablePreferenceChanges() {
    const confirmButton = await this.browser.$(
      this.tableWrapper.findCollectionPreferences().findModal().findConfirmButton().toSelector(),
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
        .toSelector(),
    );
    await el.click();
  }

  async toggleColumnVisibility(index: number) {
    const el = await this.browser.$(
      this.tableWrapper
        .findCollectionPreferences()
        .findModal()
        .findContentDisplayPreference()
        .findOptionByIndex(index)
        .findVisibilityToggle()
        .findNativeInput()
        .toSelector(),
    );
    await el.click();
  }

  async reorderColumn(index: number, positionDelta: number) {
    const options = this.tableWrapper
      .findCollectionPreferences()
      .findModal()
      .findContentDisplayPreference()
      .findOptions();
    const activeColumn = options.get(index);
    const activeColumnSelector = options.get(index).toSelector();
    const activeColumnElement = await this.browser.$(activeColumnSelector);
    const targetColumnElement = await this.browser.$(options.get(index + positionDelta).toSelector());
    const activeColumnCenter =
      (await activeColumnElement.getLocation('y')) + (await activeColumnElement.getSize('height')) / 2;
    const targetColumnCenter =
      (await targetColumnElement.getLocation('y')) + (await targetColumnElement.getSize('height')) / 2;
    const offset = targetColumnCenter - activeColumnCenter;
    this.dragAndDrop(activeColumn.findDragHandle().toSelector(), 0, offset);
  }
}
