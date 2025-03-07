// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import wrapper from '@cloudscape-design/components/test-utils/selectors';
import TablePageObject from './table-page-object';

const propertyFiltering = wrapper('body').findPropertyFilter();

const getOption = (optionPosition: number) =>
  propertyFiltering.findDropdown({ expandToViewport: true }).findOption(optionPosition).toSelector();

const filterInput = propertyFiltering.findNativeInput().toSelector();

const getTokenOperationWrapper = (tokenPosition: number) =>
  propertyFiltering.findTokens().get(tokenPosition).findTokenOperation();

export enum TOKEN_OPERATIONS {
  and = 1,
  or = 2,
}
export default class TablePropertyFilteringPageObject extends TablePageObject {
  async focusFilter() {
    await this.click(filterInput);
  }
  isDropdownVisible() {
    return this.isDisplayed(
      this.findPropertyFiltering().findDropdown({ expandToViewport: true }).findOpenDropdown().toSelector(),
    );
  }
  async selectOption(optionPosition: number) {
    await this.click(getOption(optionPosition));
    await this.waitUntilLoaded();
  }

  async search(text: string) {
    await this.setValue(filterInput, text);
    await this.waitUntilPropertyFilterLoaded();
  }

  getOptionText(optionPosition: number) {
    return this.getText(getOption(optionPosition));
  }

  getFilterText() {
    return this.getValue(filterInput);
  }

  findPropertyFiltering() {
    return propertyFiltering;
  }

  countDropdownItems() {
    return this.getElementsCount(
      this.findPropertyFiltering().findDropdown({ expandToViewport: true }).findOptions().toSelector(),
    );
  }

  isTokensVisible() {
    return this.isDisplayed(this.findPropertyFiltering().findTokens().toSelector());
  }

  getTokenText() {
    return this.getText(this.findPropertyFiltering().findTokens().toSelector());
  }

  countTokens() {
    return this.getElementsCount(this.findPropertyFiltering().findTokens().toSelector());
  }

  async removeToken(tokenPosition: number) {
    await this.click(this.findPropertyFiltering().findTokens().get(tokenPosition).findRemoveButton().toSelector());
  }

  async removeAllTokens() {
    const removeAllButton = this.findPropertyFiltering().findRemoveAllButton().toSelector();
    if (await this.isExisting(removeAllButton)) {
      await this.click(removeAllButton);
    } else {
      // For saved filter sets, use the custom filter actions for clearing
      await this.click(wrapper().findButtonDropdown('[data-testid="filter-actions"]').findMainAction().toSelector());
    }
  }

  async openTokenOperationsList(tokenPosition: number) {
    await this.click(getTokenOperationWrapper(tokenPosition).findTrigger().toSelector());
  }

  async selectTokenOperation(tokenPosition: number, operation: TOKEN_OPERATIONS) {
    await this.click(getTokenOperationWrapper(tokenPosition).findDropdown().findOption(operation).toSelector());
  }

  async waitUntilPropertyFilterLoaded() {
    await this.waitForExist(
      this.findPropertyFiltering().findDropdown().findFooterRegion().findSpinner().toSelector(),
      false,
    );
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
