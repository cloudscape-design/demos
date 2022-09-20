// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

const DEBOUNCE_FILTERING_DELAY = 400;

export default class PageObject extends AppLayoutPage {
  private pageWrapper = createWrapper('body');
  private distributionPanelWrapper = createWrapper('#distribution-panel');
  private distributionsSelect = this.distributionPanelWrapper.findSelect();
  private distributionOptionsSelector = this.distributionsSelect.findDropdown().findOptions().toSelector();
  private originsPanelWrapper = createWrapper('#origin-panel');
  private originsMultiselect = this.originsPanelWrapper.findMultiselect();
  private tagEditorWrapper = createWrapper('#tags-panel').findTagEditor();
  private addButtonSelector = this.tagEditorWrapper.findAddButton().toSelector();
  private rowDeleteButtonSelector = (row: number) => this.tagEditorWrapper.findRow(row).findRemoveButton().toSelector();
  private tagEditorRows = this.tagEditorWrapper.findRows().toSelector();
  async waitForPageLoaded() {
    await this.waitForVisible(this.pageWrapper.findForm().toSelector());
  }
  async openDistributionSelector() {
    await this.click(this.distributionsSelect.findTrigger().toSelector());

    await this.waitForVisible(this.distributionOptionsSelector);
  }
  countDistributionSelectorOptions() {
    return this.getElementsCount(this.distributionOptionsSelector);
  }
  getDistributionPanelErrorMessages() {
    return this.getElementsText(this.distributionPanelWrapper.findFormField().findError().toSelector());
  }
  getOriginSettingsErrorMessages() {
    return this.getElementsText(this.originsPanelWrapper.findFormField().findError().toSelector());
  }
  getFormErrorMessages() {
    return this.getElementsText(this.pageWrapper.findForm().findError().toSelector());
  }
  async filterDisributionsOptions(text: string) {
    await this.setValue(this.distributionsSelect.findFilteringInput()!.findNativeInput().toSelector(), text);
    await this.pause(DEBOUNCE_FILTERING_DELAY);
    await this.waitForVisible(this.distributionOptionsSelector);
  }

  async selectOrigin(value: string) {
    const triggerSelector = this.originsMultiselect.findTrigger().toSelector();
    const optionSelector = this.originsMultiselect.findDropdown().findOptionByValue(value)!.toSelector();
    await this.click(triggerSelector);
    await this.waitForVisible(optionSelector);
    await this.click(optionSelector);
    // close the dropdown, because multiselect keeps it open by default
    await this.click(triggerSelector);
  }

  async deselectOrigin() {
    await this.click(this.originsMultiselect.findToken(1).findDismiss().toSelector());
  }

  getSelectedOrigins() {
    return this.getElementsText(this.originsMultiselect.findTokens().toSelector());
  }

  countTags() {
    return this.getElementsCount(this.tagEditorRows);
  }
  async addTag() {
    await this.click(this.addButtonSelector);
  }
  async removeTag(index: number) {
    const selector = this.rowDeleteButtonSelector(index);
    await this.click(selector);
  }
}
