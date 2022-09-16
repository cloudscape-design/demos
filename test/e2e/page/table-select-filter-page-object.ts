// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePageObject from './table-page-object';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const pageWrapper = createWrapper();
const tableNoMatchButton = pageWrapper.findTable().findEmptySlot().findButton().toSelector();

const filterInputSelector = pageWrapper.findInput('[data-testid="input-filter"]').findNativeInput().toSelector();
const classSelectWrapper = pageWrapper.findSelect('[data-testid="class-filter"]');
const engineSelectWrapper = pageWrapper.findSelect('[data-testid="engine-filter"]');

export default class Page extends TablePageObject {
  async typeFilterQuery(query: string) {
    await this.click(filterInputSelector);
    await this.keys(query);
  }
  getFilterQuery() {
    return this.getValue(filterInputSelector);
  }
  async selectClass(index: number) {
    await this.click(classSelectWrapper.findTrigger().toSelector());
    await this.click(classSelectWrapper.findDropdown({ expandToViewport: true }).findOption(index)!.toSelector());
  }
  getSelectedEngine() {
    return this.getText(engineSelectWrapper.findTrigger().toSelector());
  }
  async selectEngine(index: number) {
    await this.click(engineSelectWrapper.findTrigger().toSelector());
    await this.click(engineSelectWrapper.findDropdown({ expandToViewport: true }).findOption(index)!.toSelector());
  }
  getSelectedClass() {
    return this.getText(classSelectWrapper.findTrigger().toSelector());
  }
  async clearFilterFromNoMatchRegion() {
    await this.click(tableNoMatchButton);
    await this.waitUntilLoaded();
  }
  isTableNoMatchButtonVisible() {
    return this.isDisplayed(tableNoMatchButton);
  }
  isInstanceActionsButtonEnabled() {
    return this.isTableHeaderButtonEnabled(1);
  }
  isRestoreFromS3ButtonEnabled() {
    return this.isTableHeaderButtonEnabled(2);
  }
  isLaunchDBInstanceButtonEnabled() {
    return this.isTableHeaderButtonEnabled(3);
  }
}
