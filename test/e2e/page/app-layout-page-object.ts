// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';
const page = createWrapper();
const toolsPanelWrapper = page.findAppLayout().findTools();
const splitPanelWrapper = page.findAppLayout().findSplitPanel();

export default class Page extends BaseExamplePage {
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

  // should be used for info links with aria-label specified
  infoLinkSelector() {
    return page.findLink('[aria-label*=Information]').toSelector();
  }

  // should be used for info links with aria-label delivered from context
  // (inside header / form field)
  contextInfoLinkSelector() {
    return page.findLink('[aria-labelledby*=link-info]').toSelector();
  }

  // Flash
  findFlash(index: number) {
    return createWrapper().findFlashbar().findItems().get(index);
  }
  isFlashVisible(index: number) {
    return this.isDisplayed(this.findFlash(index).toSelector());
  }
  async dismissFlash(index: number) {
    await this.click(this.findFlash(index).findDismissButton().toSelector());
  }

  findLastFlash() {
    return this.findFlash(2);
  }
  isLastFlashVisible() {
    return this.isFlashVisible(2);
  }
  async dismissLastFlash() {
    await this.dismissFlash(2);
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
  isSplitPanelOpen() {
    return this.isDisplayed(splitPanelWrapper.findCloseButton().toSelector());
  }
  getSplitPanelWrapper() {
    return splitPanelWrapper;
  }
  isSplitPanelSliderFocused() {
    return this.isFocused(splitPanelWrapper.findSlider().toSelector());
  }
}
