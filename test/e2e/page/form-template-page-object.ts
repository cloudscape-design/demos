// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import FormPage from './form-page-object';

const page = createWrapper('body');

const rootInput = page.findInput('[data-testid="root-input"]').findNativeInput().toSelector();

function expandableSectionItems(index: number) {
  return page.findSideNavigation().findItemByIndex(index).findItems().toSelector();
}

function formExpandableSectionHeader(id: string) {
  return page.findContainer(id).findFooter().findExpandableSection().findHeader().toSelector();
}
function formExpandableSection(id: string) {
  return page.findContainer(id).findFooter().findExpandableSection().findContent().toSelector();
}
export default class Page extends FormPage {
  async expandChangeBehaviorPanel() {
    await this.scrollIntoViewAndClick(formExpandableSectionHeader('#cache-behavior-panel'));
  }
  async expandDistributionPanel() {
    await this.scrollIntoViewAndClick(formExpandableSectionHeader('#distribution-panel'));
  }
  isExpandChangeBehaviorContentVisible() {
    return this.isDisplayed(formExpandableSection('#cache-behavior-panel'));
  }
  isDistributionsContentVisible() {
    return this.isDisplayed(formExpandableSection('#distribution-panel'));
  }
  async openPathInfo() {
    await this.scrollIntoViewAndClick('#path-info-link');
  }
  async openOriginIdInfo() {
    await this.scrollIntoViewAndClick('#origin-id-info-link');
  }
  async openCustomHeadersInfo() {
    await this.scrollIntoViewAndClick('#custom-headers-info-link');
  }
  async openOriginInfo() {
    await this.scrollIntoViewAndClick('#content-origin-info-link');
  }
  async openCnamesInfo() {
    await this.scrollIntoViewAndClick('#cnames-info-link');
  }
  async openRootObjectInfo() {
    await this.scrollIntoViewAndClick('#root-object-info-link');
  }
  async openDeliveryMethodInfo() {
    await this.scrollIntoViewAndClick('#delivery-method-info-link');
  }
  async openMainInfo() {
    await this.scrollIntoViewAndClick('#form-main-info-link');
  }
  async submitForm() {
    await this.scrollIntoViewAndClick('[data-testid="create"]');
  }
  isRootInputFocused() {
    return this.isFocused(rootInput);
  }
  countExpandableSectionLinks(index: number) {
    return this.getElementsCount(expandableSectionItems(index));
  }
  isExpandableSectionVisible(index: number) {
    return this.isDisplayed(expandableSectionItems(index));
  }
  async enterAndBlurRootObject(text?: string) {
    await this.waitForVisible(rootInput);
    if (text) {
      await this.setValue(rootInput, text);
    } else {
      await this.scrollIntoViewAndClick(rootInput);
    }
    // click somewhere to blur the input and trigger validation
    await this.scrollIntoViewAndClick(createWrapper().findHeader().toSelector());
  }
}
