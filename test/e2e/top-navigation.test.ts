// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import BaseExamplePage from './common/base-example-page';

const testPagePath = `/form.html`;
const wrapper = createWrapper();

class TopNavigationPage extends BaseExamplePage {
  async waitForPageLoaded() {
    await this.waitForVisible(this.findTopNavigation().toSelector());
  }

  findTopNavigation() {
    return wrapper.findTopNavigation();
  }

  findThemeButton() {
    return this.findTopNavigation().findUtility(2).findButtonLinkType();
  }

  findPreferencesMenu() {
    return this.findTopNavigation().findUtility(1).findMenuDropdownType();
  }

  findSourceCodeLink() {
    return this.findTopNavigation().findUtility(3).findButtonLinkType();
  }

  findDemoSelect() {
    return this.findTopNavigation().findSearch().findSelect();
  }

  async openPreferencesMenu() {
    await this.click(this.findPreferencesMenu().findNativeButton().toSelector());
    return this.waitForVisible(this.findPreferencesMenu().findOpenDropdown().toSelector());
  }
}

const setupTest = (testFn: (page: TopNavigationPage) => Promise<void>) => {
  return useBrowser(async browser => {
    await browser.url(testPagePath);
    const page = new TopNavigationPage(browser);
    await page.waitForPageLoaded();
    await testFn(page);
  });
};

describe('Top Navigation', () => {
  test(
    'displays all navigation elements',
    setupTest(async page => {
      expect(await page.isDisplayed(page.findTopNavigation().toSelector())).toBe(true);
      expect(await page.isDisplayed(page.findThemeButton().toSelector())).toBe(true);
      expect(await page.isDisplayed(page.findPreferencesMenu().toSelector())).toBe(true);
      expect(await page.isDisplayed(page.findSourceCodeLink().toSelector())).toBe(true);
      expect(await page.isDisplayed(page.findDemoSelect().toSelector())).toBe(true);
    }),
  );

  test(
    'theme button opens theming configurator',
    setupTest(async page => {
      await page.click(page.findThemeButton().toSelector());
      const configurator = wrapper.findAppLayout().findActiveDrawer();
      await page.waitForVisible(configurator.toSelector());
      const drawerText = await page.getText(configurator.toSelector());
      expect(drawerText.toLowerCase()).toContain('configurator');
    }),
  );

  test(
    'preferences menu opens and contains options',
    setupTest(async page => {
      await page.openPreferencesMenu();
      const dropdown = page.findPreferencesMenu().findOpenDropdown();
      expect(await page.isDisplayed(dropdown.toSelector())).toBe(true);
    }),
  );

  test(
    'source code link has correct href',
    setupTest(async page => {
      const link = page.findSourceCodeLink();
      const href = await page.getElementAttribute(link.toSelector(), 'href');
      expect(href).toContain('github.com');
    }),
  );

  test(
    'demo selector is present',
    setupTest(async page => {
      const select = page.findDemoSelect();
      expect(await page.isDisplayed(select.toSelector())).toBe(true);
    }),
  );
});
