// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';

const DEBOUNCE_FILTERING_DELAY = 2 * 400;

export default class PageObject extends BaseExamplePage {
  private tagEditorWrapper = createWrapper().findTagEditor();

  private findRow = (row: number) => this.tagEditorWrapper.findRow(row);
  private findAutosuggest = (row: number, column: number) =>
    this.findRow(row).findField(column).findControl().findAutosuggest();
  private findKeyAutosuggest = (row: number) => this.findAutosuggest(row, 1);
  private findValueAutosuggest = (row: number) => this.findAutosuggest(row, 2);

  private addButtonSelector = this.tagEditorWrapper.findAddButton().toSelector();

  keys(keys: string) {
    return this.browser.keys(keys);
  }

  async addTag() {
    await this.click(this.tagEditorWrapper.findAddButton().toSelector());
  }

  async removeTag(row: number) {
    await this.click(this.findRow(row).findRemoveButton().toSelector());
  }

  async undoTagRemoval(row: number) {
    await this.click(this.findRow(row).findUndoButton().toSelector());
  }

  async searchKey(key: string, row: number) {
    await this.click(this.findKeyAutosuggest(row).findNativeInput().toSelector());
    await this.browser.keys(key);
    await this.browser.pause(DEBOUNCE_FILTERING_DELAY);
    await this.waitForExist(
      this.findKeyAutosuggest(row).findDropdown().findFooterRegion().findSpinner().toSelector(),
      false,
    );
  }

  async searchValue(key: string, row: number) {
    const el = await this.browser.$(this.findValueAutosuggest(row).findNativeInput().toSelector());
    await el.click();
    await this.browser.keys(key);
    await this.browser.pause(DEBOUNCE_FILTERING_DELAY);
    await this.waitForExist(
      this.findValueAutosuggest(row).findDropdown().findFooterRegion().findSpinner().toSelector(),
      false,
    );
  }

  async isMarkedForRemoval(row: number) {
    const itemsCount = await this.getElementsCount(this.findRow(row).findUndoButton().toSelector());
    return itemsCount > 0;
  }

  async getKeySuggestionsCount(row: number) {
    const items = await this.browser.$$(this.findKeyAutosuggest(row).findDropdown().findOptions().toSelector());
    return items.length;
  }

  async getValueSuggestionsCount(row: number) {
    const items = await this.browser.$$(this.findValueAutosuggest(row).findDropdown().findOptions().toSelector());
    return items.length;
  }

  getTagCount() {
    return this.getElementsCount(this.tagEditorWrapper.findRows().toSelector());
  }

  async getTag(row: number) {
    return {
      key: await this.getValue(this.findKeyAutosuggest(row).findNativeInput().toSelector()),
      markedForRemoval: await this.isMarkedForRemoval(row),
      value: await this.getValue(this.findValueAutosuggest(row).findNativeInput().toSelector()),
    };
  }

  async getTags() {
    const itemsCount = await this.getElementsCount(this.tagEditorWrapper.findRows().toSelector());
    const tags = [];
    for (let index = 1; index <= itemsCount; index++) {
      tags.push(await this.getTag(index));
    }
    return tags;
  }

  async waitUntilLoaded() {
    await this.waitForVisible(this.addButtonSelector);
  }
}
