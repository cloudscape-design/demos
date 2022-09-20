// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import FormPage from './form-page-object';

const page = createWrapper('body');

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
    await this.click(formExpandableSectionHeader('#cache-behavior-panel'));
  }
  async expandDistributionPanel() {
    await this.click(formExpandableSectionHeader('#distribution-panel'));
  }
  isExpandChangeBehaviorContentVisible() {
    return this.isDisplayed(formExpandableSection('#cache-behavior-panel'));
  }
  isDistributionsContentVisible() {
    return this.isDisplayed(formExpandableSection('#distribution-panel'));
  }
  async openPathInfo() {
    await this.click('#path-info-link');
  }
  async openOriginIdInfo() {
    await this.click('#origin-id-info-link');
  }
  async openCustomHeadersInfo() {
    await this.click('#custom-headers-info-link');
  }
  async openOriginInfo() {
    await this.click('#content-origin-info-link');
  }
  async openCnamesInfo() {
    await this.click('#cnames-info-link');
  }
  async openRootObjectInfo() {
    await this.click('#root-object-info-link');
  }
  async openCertificateInfo() {
    await this.click('#certificate-method-info-link');
  }
  async openDeliveryMethodInfo() {
    await this.click('#delivery-method-info-link');
  }
  async openMainInfo() {
    await this.click('#form-main-info-link');
  }
  countExpandableSectionLinks(index: number) {
    return this.getElementsCount(expandableSectionItems(index));
  }
  isExpandableSectionVisible(index: number) {
    return this.isDisplayed(expandableSectionItems(index));
  }
}
