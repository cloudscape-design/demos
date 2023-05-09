// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import BasePage from './app-layout-page-object';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const pageWrapper = createWrapper();
const activeTabContentWrapper = pageWrapper.findTabs().findTabContent();
const currentTableWrapper = activeTabContentWrapper.findTable();

export default class Page extends BasePage {
  isEmptyRegionVisible() {
    return this.isDisplayed(currentTableWrapper.findEmptyRegion().toSelector());
  }
  isTableNoDataButtonVisible() {
    return this.isDisplayed(currentTableWrapper.findEmptyRegion().findButton().toSelector());
  }
  isTableCounterVisible() {
    return this.isDisplayed(activeTabContentWrapper.findHeader().findCounter().toSelector());
  }
  getTableCounterText() {
    return this.getText(currentTableWrapper.findHeaderSlot().findHeader().findCounter().toSelector());
  }
  countTableColumns() {
    return this.getElementsCount(activeTabContentWrapper.find('thead tr > *').toSelector());
  }
  async switchTab(id: string) {
    await this.click(pageWrapper.findTabs().findTabLinkById(id).toSelector());
  }
  countTableRows() {
    return this.getElementsCount(activeTabContentWrapper.findTable().findRows().toSelector());
  }
  getTabsHeaderText() {
    return this.getText(activeTabContentWrapper.find('h2').toSelector());
  }
  getActiveTabLabel() {
    return this.getText(pageWrapper.findTabs().findActiveTab().toSelector());
  }
  async waitForTableContentLoaded() {
    await this.waitForVisible(activeTabContentWrapper.findTable().findBodyCell(1, 2).toSelector());
  }

  async selectFirstTableItem() {
    await this.click(activeTabContentWrapper.findTable().findRowSelectionArea(1).toSelector());
  }
}
