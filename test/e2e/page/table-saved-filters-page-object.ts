// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePropertyFilteringPageObject from './table-property-filtering-page-object';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const pageWrapper = createWrapper();

const savedFilterSetsSelectWrapper = pageWrapper.findSelect('[data-testid="saved-filters"]');
const filterActionsButtonWrapper = pageWrapper.findButtonDropdown('[data-testid="filter-actions"]');
const modalWrapper = pageWrapper.findModal();

export default class Page extends TablePropertyFilteringPageObject {
  findSavedFilterSets() {
    return savedFilterSetsSelectWrapper;
  }

  findFilterActions() {
    return filterActionsButtonWrapper;
  }

  findActionModal() {
    return modalWrapper;
  }

  findTokens() {
    return this.findPropertyFiltering().findTokens().toSelector();
  }

  async countSavedFilterSets() {
    // Click trigger to open the dropdown
    await this.click(this.findSavedFilterSets().findTrigger().toSelector());
    const itemCount = this.getElementsCount(this.findSavedFilterSets().findDropdown().findOptions().toSelector());
    // Click again to close
    await this.click(this.findSavedFilterSets().findTrigger().toSelector());

    return itemCount;
  }

  getSelectedFilterSet() {
    return this.getText(this.findSavedFilterSets().findTrigger().toSelector());
  }

  async selectSavedFilterSet(index: number) {
    await this.click(this.findSavedFilterSets().findTrigger().toSelector());
    await this.click(this.findSavedFilterSets().findDropdown().findOption(index).toSelector());
  }

  private async openFilterActionModal(actionIndex: number) {
    await this.click(this.findFilterActions().findNativeButton().toSelector());
    await this.click(this.findFilterActions().findItems().get(actionIndex).toSelector());

    return this.waitForVisible(modalWrapper.findContent().toSelector());
  }

  openSaveFilterModal() {
    return this.openFilterActionModal(1);
  }

  openUpdateFilterModal() {
    return this.openFilterActionModal(2);
  }

  openDeleteFilterModal() {
    return this.openFilterActionModal(3);
  }

  submitModal() {
    return this.click(this.findActionModal().findFooter().findButton('[data-testid="submit"]').toSelector());
  }
}
