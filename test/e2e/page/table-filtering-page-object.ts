// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePageObject from './table-page-object';

export default class TableFilteringPageObject extends TablePageObject {
  private filterInputSelector = this.tableWrapper.findTextFilter().findInput().findNativeInput().toSelector();
  async searchText(text: string) {
    await this.setValue(this.filterInputSelector, text);
    await this.waitUntilLoaded();
  }

  getSearchText() {
    return this.getText(this.filterInputSelector);
  }

  isViewDetailsButtonEnabled() {
    return this.isTableHeaderButtonEnabled(1);
  }

  isEditDetailsButtonEnabled() {
    return this.isTableHeaderButtonEnabled(2);
  }

  isDeleteDetailsButtonEnabled() {
    return this.isTableHeaderButtonEnabled(3);
  }
}
