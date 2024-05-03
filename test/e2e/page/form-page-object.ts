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
  private customHeaderRows = this.originsPanelWrapper.findAttributeEditor();
  private customHeaderInputSelector = (row: number, column: number) =>
    this.customHeaderRows.findRow(row).findField(column).findControl().findAutosuggest().findNativeInput().toSelector();
  private tagEditorWrapper = createWrapper('#tags-panel');
  private tagEditor = this.tagEditorWrapper.findTagEditor();
  private addButtonSelector = this.tagEditor.findAddButton().toSelector();
  private rowDeleteButtonSelector = (row: number) => this.tagEditor.findRow(row).findRemoveButton().toSelector();
  private tagEditorRows = this.tagEditor.findRows().toSelector();
  private headerSelector = createWrapper(this.pageWrapper.findForm().findHeader().toSelector())
    .findHeader()
    .find('h1')
    .toSelector();
  async waitForPageLoaded() {
    await this.waitForVisible(this.pageWrapper.findForm().toSelector());
  }
  getHeader() {
    return this.getText(this.headerSelector);
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
  getOriginSettingsWarningMessages() {
    return this.getElementsText(this.originsPanelWrapper.findFormField().findWarning().toSelector());
  }
  getFormErrorMessages() {
    return this.getElementsText(this.pageWrapper.findForm().findError().toSelector());
  }
  async filterDistributionsOptions(text: string) {
    await this.setValue(this.distributionsSelect.findFilteringInput()!.findNativeInput().toSelector(), text);
    await this.pause(DEBOUNCE_FILTERING_DELAY);
    await this.waitForVisible(this.distributionOptionsSelector);
  }

  async setCustomHeaderFieldText(row: number, column: number, text: string) {
    const input = this.customHeaderInputSelector(row, column);
    await this.click(input);
    await this.setValue(input, text);
    // blur to validate
    await this.click(this.originsPanelWrapper.findHeader().toSelector());
  }

  async waitUntilOriginsLoaded() {
    await this.browser.waitUntil(
      async () => {
        return (await this.getText(this.originsMultiselect.findDropdown().findFooterRegion().toSelector())).includes(
          'End of all results'
        );
      },
      { timeoutMsg: 'Origins footer text not found: End of all results' }
    );
  }

  async selectOrigin(value: string) {
    const triggerSelector = this.originsMultiselect.findTrigger().toSelector();
    const optionSelector = this.originsMultiselect.findDropdown().findOptionByValue(value)!.toSelector();
    await this.click(triggerSelector);
    await this.waitForVisible(optionSelector);
    await this.waitUntilOriginsLoaded();
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
  async addTag(closeDropdown = false) {
    await this.click(this.addButtonSelector);

    if (closeDropdown) {
      // When a new tag gets added the dropdown opens automatically and
      // it blocks "Add new tag" button so by clicking to header we close it
      const header = this.tagEditorWrapper.findHeader().toSelector();
      await this.click(header);
    }
  }
  async removeTag(index: number) {
    const selector = this.rowDeleteButtonSelector(index);
    await this.click(selector);
  }
}
