// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';

const wrapper = createWrapper();
const s3ResourceSelector = wrapper.findS3ResourceSelector();

export default class S3PageObject extends BaseExamplePage {
  async getOptionalText(selector: string) {
    const elementIsDisplayed = await this.isDisplayed(selector);
    return elementIsDisplayed ? this.getText(selector) : null;
  }

  getHeader() {
    return this.getText(
      createWrapper(wrapper.findForm().findHeader().toSelector()).findHeader().find('h1').toSelector(),
    );
  }

  getErrorText() {
    return this.getOptionalText(wrapper.findFormField().findError().toSelector());
  }

  async setUriInputValue(value: string) {
    await this.setValue(s3ResourceSelector.findInContext().findUriInput().findNativeInput().toSelector(), value);
  }

  getUriInputValue() {
    return this.getValue(s3ResourceSelector.findInContext().findUriInput().findNativeInput().toSelector());
  }

  getViewHref() {
    return this.getElementAttribute(s3ResourceSelector.findInContext().findViewButton().toSelector(), 'href');
  }

  async waitForTableLoaded() {
    await this.browser.waitUntil(async () => {
      const count = await this.getElementsCount(s3ResourceSelector.findTable().findRows().toSelector());
      return count > 0;
    });
  }

  async openBrowseDialog() {
    await this.click(s3ResourceSelector.findInContext().findBrowseButton().toSelector());
    await this.waitForTableLoaded();
  }

  async drilldown(rowIndex: number) {
    await this.click(s3ResourceSelector.findTable().findBodyCell(rowIndex, 2).find('a').toSelector());
    await this.waitForTableLoaded();
  }

  async selectTableRow(rowIndex: number) {
    await this.click(s3ResourceSelector.findTable().findRowSelectionArea(rowIndex).toSelector());
  }

  async isRowSelectable(rowIndex: number) {
    const element = await this.browser.$(
      s3ResourceSelector.findTable().findRowSelectionArea(rowIndex).find('input').toSelector(),
    );
    return element.isEnabled();
  }

  async submitSelection() {
    await this.click(s3ResourceSelector.findModal().findSubmitButton().toSelector());
  }
}
