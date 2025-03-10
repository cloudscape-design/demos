// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

const DEBOUNCE_FILTERING_DELAY = 400;

export default class PageObject extends AppLayoutPage {
  private pageWrapper = createWrapper('body');
  private distributionPanelWrapper = createWrapper('#distribution-panel');
  private distributionsSelect = this.distributionPanelWrapper.findSelect('[data-testid="s3-selector"]');
  private distributionOptionsSelector = this.distributionsSelect.findDropdown().findOptions().toSelector();
  private originsPanelWrapper = createWrapper('#origin-panel');
  private originsMultiselect = this.originsPanelWrapper.findMultiselect();
  private tagEditorWrapper = createWrapper('#tags-panel');
  private tagEditor = this.tagEditorWrapper.findTagEditor();
  private addButtonSelector = this.tagEditor.findAddButton().toSelector();
  private rowDeleteButtonSelector = (row: number) => this.tagEditor.findRow(row).findRemoveButton().toSelector();
  private tagEditorRows = this.tagEditor.findRows().toSelector();
  private customHeaderRows = this.originsPanelWrapper.findAttributeEditor();
  private customHeaderInputSelector = (row: number, column: number) =>
    this.customHeaderRows.findRow(row).findField(column).findControl().findAutosuggest().findNativeInput().toSelector();
  private headerSelector = createWrapper(this.pageWrapper.findForm().findHeader().toSelector())
    .findHeader()
    .find('h1')
    .toSelector();
  // Sub-resource creation
  private cacheBehaviorPanelWrapper = createWrapper('#cache-behavior-panel');
  private splitPanelWrapper = this.getSplitPanelWrapper().findOpenPanelSide();
  private createCachePolicyNameInput = this.splitPanelWrapper.findInput().findNativeInput();
  private cachePolicySelect = this.cacheBehaviorPanelWrapper.findSelect('[data-testid="cache-policy-select"]');

  async waitForPageLoaded() {
    await this.waitForVisible(this.pageWrapper.findForm().toSelector());
  }
  getHeader() {
    return this.getText(this.headerSelector);
  }
  async openDistributionSelector() {
    await this.scrollIntoViewAndClick(this.distributionsSelect.findTrigger().toSelector());

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
  getCacheBehaviorPanelErrorMessages() {
    return this.getElementsText(this.cacheBehaviorPanelWrapper.findFormField().findError().toSelector());
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
    await this.scrollIntoViewAndClick(input);
    await this.setValue(input, text);
    // blur to validate
    await this.scrollIntoViewAndClick(this.originsPanelWrapper.findHeader().toSelector());
  }

  async waitUntilOriginsLoaded() {
    await this.browser.waitUntil(
      async () => {
        return (await this.getText(this.originsMultiselect.findDropdown().findFooterRegion().toSelector())).includes(
          'End of all results',
        );
      },
      { timeoutMsg: 'Origins footer text not found: End of all results' },
    );
  }

  async selectOrigin(value: string) {
    const triggerSelector = this.originsMultiselect.findTrigger().toSelector();
    const optionSelector = this.originsMultiselect.findDropdown().findOptionByValue(value)!.toSelector();
    await this.scrollIntoViewAndClick(triggerSelector);
    await this.waitForVisible(optionSelector);
    await this.waitUntilOriginsLoaded();
    await this.scrollIntoViewAndClick(optionSelector);
    // close the dropdown, because multiselect keeps it open by default
    await this.scrollIntoViewAndClick(triggerSelector);
  }

  async deselectOrigin() {
    await this.scrollIntoViewAndClick(this.originsMultiselect.findToken(1).findDismiss().toSelector());
  }

  getSelectedOrigins() {
    return this.getElementsText(this.originsMultiselect.findTokens().toSelector());
  }

  countTags() {
    return this.getElementsCount(this.tagEditorRows);
  }
  async addTag(closeDropdown = false) {
    await this.scrollIntoViewAndClick(this.addButtonSelector);

    if (closeDropdown) {
      // When a new tag gets added the dropdown opens automatically and
      // it blocks "Add new tag" button so by clicking to header we close it
      const header = this.tagEditorWrapper.findHeader().toSelector();
      await this.scrollIntoViewAndClick(header);
    }
  }
  async removeTag(index: number) {
    const selector = this.rowDeleteButtonSelector(index);
    await this.scrollIntoViewAndClick(selector);
  }

  // Embedded sub-resource creation
  async selectOriginRequestPolicyNewOrExisting(value: 'existing' | 'new') {
    const radioButtonSelector = this.cacheBehaviorPanelWrapper.findRadioGroup().findInputByValue(value).toSelector();
    await this.scrollIntoViewAndClick(radioButtonSelector);
  }

  async selectOptionExistingOriginPolicy(value: string) {
    const select = this.cacheBehaviorPanelWrapper.findSelect();
    await this.scrollIntoViewAndClick(select.findTrigger().toSelector());
    await this.scrollIntoViewAndClick(select.findDropdown().findOptionByValue(value)!.toSelector());
  }

  async enterNewPolicyName(value: string) {
    const inputSelector = this.cacheBehaviorPanelWrapper.findInput().findNativeInput().toSelector();
    await this.scrollIntoViewAndClick(inputSelector);
    await this.setValue(inputSelector, value);
  }

  async clickAndBlurNewPolicyNameInput() {
    const inputSelector = this.cacheBehaviorPanelWrapper.findInput().findNativeInput().toSelector();
    await this.scrollIntoViewAndClick(inputSelector);
    // Blur
    await this.scrollIntoViewAndClick(this.originsPanelWrapper.findHeader().toSelector());
  }

  countCacheBehaviorSelects() {
    return this.getElementsCount(this.cacheBehaviorPanelWrapper.findSelect().toSelector());
  }

  // Split panel sub-resource creation
  async openSplitPanelSubResourceCreation() {
    const buttonSelector = this.cacheBehaviorPanelWrapper
      .findButton('[data-testid="create-cache-policy-button"]')
      .toSelector();
    await this.scrollIntoViewAndClick(buttonSelector);
  }

  async createCachePolicyEnterName(value: string) {
    const inputSelector = this.createCachePolicyNameInput.toSelector();
    await this.scrollIntoViewAndClick(inputSelector);
    await this.setValue(inputSelector, value);
  }

  async blurCreateCachePolicyNameInput() {
    const inputSelector = this.createCachePolicyNameInput.toSelector();
    await this.scrollIntoViewAndClick(inputSelector);
    // Blur
    await this.scrollIntoViewAndClick(this.originsPanelWrapper.findHeader().toSelector());
  }

  getCreateCachePolicyName() {
    return this.getValue(this.createCachePolicyNameInput.toSelector());
  }

  getCreateCachePolicyErrorMessages() {
    return this.getElementsText(this.splitPanelWrapper.findFormField().findError().toSelector());
  }

  async submitCreateCachePolicy() {
    const buttonSelector = this.splitPanelWrapper
      .findButton('[data-testid="create-cache-policy-submit-button"]')
      .toSelector();

    await this.scrollIntoViewAndClick(buttonSelector);
  }

  async cancelCreateCachePolicySplitPanel() {
    const buttonSelector = this.splitPanelWrapper
      .findButton('[data-testid="create-cache-policy-cancel-button"]')
      .toSelector();

    await this.scrollIntoViewAndClick(buttonSelector);
  }

  async waitForCreateCachePolicySubmission() {
    // Submit request takes 2 seconds
    await this.waitForJsTimers(2000);
  }

  async selectCachePolicy(value: string) {
    await this.scrollIntoViewAndClick(this.cachePolicySelect.findTrigger().toSelector());
    await this.scrollIntoViewAndClick(this.cachePolicySelect.findDropdown().findOptionByValue(value)!.toSelector());
  }

  getSelectedCachePolicy() {
    return this.getText(this.cachePolicySelect.findTrigger().toSelector());
  }

  findModal() {
    return this.pageWrapper.findModal();
  }

  cancelModal() {
    return this.click(
      this.findModal().findFooter().findButton('[data-testid="unsaved-changes-modal-cancel"]').toSelector(),
    );
  }

  submitModal() {
    return this.click(
      this.findModal().findFooter().findButton('[data-testid="unsaved-changes-modal-submit"]').toSelector(),
    );
  }
}
