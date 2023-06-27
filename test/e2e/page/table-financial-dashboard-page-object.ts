// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePageObject from './table-page-object';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const pageWrapper = createWrapper();
const tableNoMatchButton = pageWrapper.findTable().findEmptySlot().findButton().toSelector();

export default class TableFinancialDashboardObject extends TablePageObject {
  private filterInputSelector = this.tableWrapper.findTextFilter().findInput().findNativeInput().toSelector();
  async searchText(text: string) {
    await this.setValue(this.filterInputSelector, text);
    await this.waitUntilLoaded();
  }

  getSearchText() {
    return this.getText(this.filterInputSelector);
  }

  isTableNoMatchButtonVisible() {
    return this.isDisplayed(tableNoMatchButton);
  }
}
