// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';

const wrapper = createWrapper();
const activeDrawer = wrapper.findAppLayout().findActiveDrawer();
const isThemingAvailable = !!(process.env.THEME === 'core');

export default class ThemingPageObject extends BaseExamplePage {
  private themingTriggerSelector = wrapper.findTopNavigation().findUtility(2)!.findButtonLinkType()!.toSelector();
  private themingContentSelector = activeDrawer.find(`[data-testid="theme-configurator-content"]`).toSelector();
  private themingUnavailableSelector = activeDrawer
    .find(`[data-testid="theme-drawer-unavailable-content"]`)
    .toSelector();

  waitForThemingLoaded() {
    return this.waitForVisible(this.themingTriggerSelector);
  }

  isDrawerOpen() {
    return this.isDisplayed(activeDrawer.toSelector());
  }

  async openThemeConfigurator() {
    const drawerAlreadyOpen = await this.isDrawerOpen();
    if (!drawerAlreadyOpen) {
      await this.click(this.themingTriggerSelector);
    }
    if (isThemingAvailable) {
      await this.waitForVisible(this.themingContentSelector);
    } else {
      await this.waitForVisible(this.themingUnavailableSelector);
    }

    return this.waitForVisible(activeDrawer.toSelector());
  }

  async closeThemeConfigurator() {
    if (await this.isDrawerOpen()) {
      await this.click(this.themingTriggerSelector);
    }
  }

  async switchTab(tab: 'colors' | 'typography' | 'border-radius' | 'theme-json') {
    await this.click(activeDrawer.findTabs().findTabLinkById(tab).toSelector());
    await this.pause(300);
  }

  async toggleModesCheckbox(checked: boolean) {
    const checkboxSelector = activeDrawer.findCheckbox('[data-testid="modes-checkbox"]').findNativeInput().toSelector();
    await this.waitForVisible(checkboxSelector);

    const checkboxElement = await this.browser.$(checkboxSelector);
    const isChecked = await checkboxElement.isSelected();

    if (isChecked !== checked) {
      await this.click(checkboxSelector);
    }
  }

  getSeedTriggerSelector(category: string) {
    return activeDrawer.find(`[data-testid="${category}-seed-trigger"]`).toSelector();
  }

  async clickSeedColorButton(category: string) {
    const buttonTrigger = this.getSeedTriggerSelector(category);
    await this.click(buttonTrigger);
    const colorInputSelector = activeDrawer
      .findPopover()
      .findContent()
      .findInput('[data-testid="color-text-input"]')
      .toSelector();
    await this.waitForVisible(colorInputSelector);
  }

  async setSeedColorViaInput(hexColor: string) {
    const colorInputSelector = activeDrawer
      .findPopover()
      .findContent()
      .findInput('[data-testid="color-text-input"]')
      .toSelector();
    const applyButtonSelector = activeDrawer
      .findPopover()
      .findContent()
      .findButton('[data-testid="color-popover-apply-button"]')
      .toSelector();

    await this.click(colorInputSelector);
    await this.keys(['Control', 'a']);
    await this.keys(hexColor);
    await this.click(applyButtonSelector);
    await this.pause(300);
  }

  async resetPalette(category: string) {
    await this.click(wrapper.findButton(`[data-testid="reset-${category}-palette-button"]`).toSelector());
  }

  isPaletteCustomized(category: string) {
    return this.isExisting(wrapper.findButton(`[data-testid="reset-${category}-palette-button"]`).toSelector());
  }

  clickFooterButton(operation: 'import' | 'export' | 'reset') {
    return this.click(activeDrawer.findButton(`[data-testid="${operation}-button"]`).toSelector());
  }

  async getLocalStorageValue() {
    const localStorageStringValue = await this.browser.execute(() => {
      return window.localStorage.getItem('custom-theme');
    });
    return localStorageStringValue ? JSON.parse(localStorageStringValue) : {};
  }

  async clearLocalStorage() {
    await this.browser.execute(() => {
      window.localStorage.removeItem('custom-theme');
    });
  }

  async refreshPage() {
    await this.browser.refresh();
  }

  async hasThemeInLocalStorage() {
    const theme = await this.getLocalStorageValue();
    return Object.keys(theme).length > 0;
  }

  async getButtonStyleProperty(property: string) {
    const value = await this.browser.execute((prop: string) => {
      const button = document.querySelector('[data-testid="create"]');
      if (!button) {
        return null;
      }
      return window.getComputedStyle(button).getPropertyValue(prop);
    }, property);
    return value;
  }

  async getInfoLinkColor() {
    const color = await this.browser.execute(() => {
      const link = document.querySelector('#delivery-method-info-link');
      if (!link) {
        return null;
      }
      return window.getComputedStyle(link).getPropertyValue('color');
    });
    return color;
  }

  async setFontFamily(value: string) {
    const inputSelector = activeDrawer
      .findAutosuggest('[data-testid="font-family-input"]')
      .findNativeInput()
      .toSelector();
    await this.waitForVisible(inputSelector);
    await this.click(inputSelector);
    await this.keys(['Control', 'a']);
    await this.keys(value);
    await this.keys('Enter');
    await this.pause(300);
  }

  async setBorderRadiusScale(value: number) {
    const inputSelector = activeDrawer
      .findSlider('[data-testid="border-radius-slider"]')
      .findNativeInput()
      .toSelector();
    await this.waitForVisible(inputSelector);
    await this.setValue(inputSelector, value);
    await this.pause(300);
  }

  async getBodyFontFamily() {
    const fontFamily = await this.browser.execute(() => {
      return window.getComputedStyle(document.body).getPropertyValue('font-family');
    });
    return fontFamily;
  }

  async getPalettePreviewColors(category: string) {
    const colors = await this.browser.execute((cat: string) => {
      const container = document.querySelector(`[data-testid="${cat}-palette-preview"]`);
      if (!container) {
        return [];
      }
      const colorBoxes = container.querySelectorAll('[style*="background-color"]');
      return Array.from(colorBoxes).map(box => window.getComputedStyle(box).backgroundColor);
    }, category);
    return colors;
  }

  async switchMode() {
    const modeToggle = wrapper.findTopNavigation().findUtility(1)!.findMenuDropdownType();
    await this.click(modeToggle!.findNativeButton().toSelector());
    await this.pause(200);
    const modeOption = modeToggle!.findItemById('mode');
    await this.click(modeOption!.toSelector());
    await this.pause(300);
  }

  async hasUnavailableAlert(type: 'internal' | 'external') {
    const testId = type === 'internal' ? 'theming-unavailable-internal' : 'theming-unavailable-external';
    const alertSelector = await activeDrawer.find(`[data-testid="${testId}"]`).toSelector();
    return this.isExisting(alertSelector);
  }

  async hasThemingTabs() {
    const tabsSelector = await activeDrawer.findTabs().toSelector();
    return this.isExisting(tabsSelector);
  }
}
