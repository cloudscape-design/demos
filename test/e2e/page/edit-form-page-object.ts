// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

const page = createWrapper('body');

export default class Page extends AppLayoutPage {
  isAdditionSettingVisible() {
    return this.isDisplayed(page.findContainer().findFooter().findExpandableSection().findContent().toSelector());
  }
  getHeader() {
    return this.getText(createWrapper(page.findForm().findHeader().toSelector()).findHeader().find('h1').toSelector());
  }
  async openAdditionalTools() {
    await this.scrollIntoViewAndClick(
      page.findContainer().findFooter().findExpandableSection().findHeader().toSelector(),
    );
  }
  async openMainInfoLink() {
    await this.click('#main-info-link');
  }

  async openCnameInfoLink() {
    await this.click('#cname-info-link');
  }

  async openSslInfoLink() {
    await this.click('#ssl-info-link');
  }

  async openRootObjectInfoLink() {
    await this.scrollIntoViewAndClick('#root-info-link');
  }
}
