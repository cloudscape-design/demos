// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import BasePage from './app-layout-page-object';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const page = createWrapper();
const logsTableWrapper = page.findTable('.logs-table');
const originsTableWrapper = page.findTable('.origins-table');

export default class Page extends BasePage {
  countOriginTableColumns() {
    return this.getElementsCount(originsTableWrapper.findColumnHeaders().toSelector());
  }
  countOriginTableItems() {
    return this.getElementsCount(originsTableWrapper.findRows().toSelector());
  }
  countLogsTableColumns() {
    return this.getElementsCount(logsTableWrapper.findColumnHeaders().toSelector());
  }
  countLogsTableItems() {
    return this.getElementsCount(logsTableWrapper.findRows().toSelector());
  }
  async waitForPageLoaded() {
    await this.waitForVisible(logsTableWrapper.findBodyCell(1, 2).toSelector());
    await this.waitForVisible(originsTableWrapper.findBodyCell(1, 2).toSelector());
  }
  async selectLogsTableItem() {
    await this.click(logsTableWrapper.findBodyCell(1, 1).toSelector());
  }
  async selectOriginsTableItem() {
    await this.scrollIntoViewAndClick(originsTableWrapper.findBodyCell(1, 1).toSelector());
  }
  getLogsTableCounterText() {
    return this.getText(logsTableWrapper.findHeaderSlot().findHeader().findCounter().toSelector());
  }
  getOriginsTableCounter() {
    return this.getText(originsTableWrapper.findHeaderSlot().findHeader().findCounter().toSelector());
  }
  getLogsTableFooterText() {
    return this.getText(logsTableWrapper.findFooterSlot().toSelector());
  }
}
