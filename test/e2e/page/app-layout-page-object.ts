// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
const page = createWrapper();
const toolsPanelWrapper = page.findAppLayout().findTools();

export default class Page extends BasePageObject {
  async hasActiveLink() {
    const activeLinksCount = await this.getElementsCount(page.findSideNavigation().findActiveLink().toSelector());
    return activeLinksCount === 1;
  }
  async toggleNavigationExpandableSection(index: number) {
    await this.click(page.findSideNavigation().findItemByIndex(index).findSection().findHeader().toSelector());
  }

  isNavigationExpandableSectionVisible(index: number) {
    return this.isDisplayed(page.findSideNavigation().findItemByIndex(index).findItems().toSelector());
  }

  countExpandableSections(index: number) {
    return this.getElementsCount(page.findSideNavigation().findItemByIndex(index).findItems().toSelector());
  }

  infoLinkSelector() {
    return page.findLink('[aria-label*=Information]').toSelector();
  }

  disableMotion() {
    return this.browser.execute('disableMotionForTests()');
  }

  // Flash
  findLastFlash() {
    return createWrapper().findFlashbar().findItems().get(2); //disclaimer banner is item 1
  }

  async dismissFlash() {
    await this.click(this.findLastFlash().findDismissButton().toSelector());
  }

  isFlashVisible() {
    return this.isDisplayed(this.findLastFlash().toSelector());
  }
  async openTools() {
    await this.click(page.findAppLayout().findToolsToggle().toSelector());
  }
  getToolsContent() {
    return this.getText(toolsPanelWrapper.toSelector());
  }
  getToolsTitle() {
    return this.getText(toolsPanelWrapper.find('h2').toSelector());
  }
  isToolsOpen() {
    return this.isDisplayed(page.findAppLayout().findToolsClose().toSelector());
  }
  isToolsCloseFocused() {
    return this.isFocused(page.findAppLayout().findToolsClose().toSelector());
  }
  async openSideNavigation() {
    await this.click(page.findAppLayout().findNavigationToggle().toSelector());
  }
  async closeSideNavigation() {
    await this.click(page.findAppLayout().findNavigationClose().toSelector());
  }
  isNavigationOpen() {
    return this.isDisplayed(page.findSideNavigation().toSelector());
  }
  getActiveNavigationLinkText() {
    return this.getText(page.findSideNavigation().findActiveLink().toSelector());
  }
  countBreadcrumbs() {
    return this.getElementsCount(page.findBreadcrumbGroup().findBreadcrumbLinks().toSelector());
  }
  async waitForPageLoaded() {
    await this.waitForVisible('main');
  }
}
