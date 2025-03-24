// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
// importing this file has a side effect of installing new components onto the main wrapper
import '@cloudscape-design/board-components/test-utils/selectors';
import BaseExamplePage from './common/base-example-page';

const wrapper = createWrapper();
const boardWrapper = wrapper.findBoard();
const paletteWrapper = wrapper.findItemsPalette();

class ConfigurableDashboardPageObject extends BaseExamplePage {
  async getHeadersTexts() {
    const widgetHeadersSelector = boardWrapper.findAll('h2').toSelector();
    const texts = await this.getElementsText(widgetHeadersSelector);
    // skip all widgets below 2nd row, to make assertions more compact
    return texts.slice(0, 4);
  }

  async addNewWidget() {
    await this.click('button=Add widget');
    await this.dragElement(paletteWrapper.findItemById('operationalMetrics').findDragHandle().toSelector(), -900, 150);
  }

  async dragElement(selector: string, xOffset: number, yOffset: number) {
    const originEl = await this.browser.$(selector);
    await this.browser.performActions([
      {
        type: 'pointer',
        id: 'event',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerMove', duration: 0, origin: originEl, x: 1, y: 1 },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerMove', duration: 100, origin: 'pointer', x: xOffset, y: yOffset },
          { type: 'pointerUp', button: 0 },
          { type: 'pause', duration: 100 },
        ],
      },
    ]);
    await this.browser.releaseActions();
  }
}

describe('Configurable dashboard', () => {
  const defaultSize = { width: 1600, height: 1800 };
  const setupTest = (testFn: { (page: ConfigurableDashboardPageObject): Promise<void> }) => {
    return useBrowser(defaultSize, async browser => {
      const page = new ConfigurableDashboardPageObject(browser);
      await browser.url(`/configurable-dashboard.html`);
      await page.waitForVisible('[data-testid="instance-limits-table"]');
      await testFn(page);
    });
  };

  test(
    'Can open add widget panel',
    setupTest(async page => {
      const splitPanelSelector = wrapper.findAppLayout().findSplitPanel().findOpenPanelSide().toSelector();
      await expect(page.isDisplayed(splitPanelSelector)).resolves.toBe(false);
      await page.click('button=Add widget');
      await expect(page.isDisplayed(splitPanelSelector)).resolves.toBe(true);
    }),
  );

  test(
    'Adjusts default layout when screen resizes',
    setupTest(async page => {
      const { height: heightBefore } = await page.getBoundingBox(
        boardWrapper.findItemById('serviceOverview').toSelector(),
      );
      await page.setWindowSize({ ...defaultSize, width: 900 });
      const { height: heightAfter } = await page.getBoundingBox(
        boardWrapper.findItemById('serviceOverview').toSelector(),
      );
      expect(heightAfter).toBeGreaterThan(heightBefore);
    }),
  );

  test(
    'Preserves custom layout preference when screen resizes',
    setupTest(async page => {
      await page.dragElement(boardWrapper.findItemById('instanceHours').findResizeHandle().toSelector(), 200, 0);
      const { height: heightBefore } = await page.getBoundingBox(
        boardWrapper.findItemById('serviceOverview').toSelector(),
      );
      await page.setWindowSize({ ...defaultSize, width: 900 });
      const { height: heightAfter } = await page.getBoundingBox(
        boardWrapper.findItemById('serviceOverview').toSelector(),
      );
      expect(heightAfter).toEqual(heightBefore);
    }),
  );

  test(
    'Can reorder widgets',
    setupTest(async page => {
      await expect(page.getHeadersTexts()).resolves.toEqual([
        'Service overview - new',
        'Service health',
        'Instance hours',
        'Network traffic',
      ]);
      await page.dragElement(boardWrapper.findItemById('serviceOverview').findDragHandle().toSelector(), 220, 0);
      await expect(page.getHeadersTexts()).resolves.toEqual([
        'Service health',
        'Service overview - new',
        'Instance hours',
        'Network traffic',
      ]);
    }),
  );

  test(
    'Can add a new widget with drag and drop',
    setupTest(async page => {
      expect((await page.getHeadersTexts())[0]).toEqual('Service overview - new');
      await page.addNewWidget();
      expect((await page.getHeadersTexts())[0]).toEqual('Operational metrics');
    }),
  );

  test(
    'Can remove a widget',
    setupTest(async page => {
      const settingsDropdown = boardWrapper.findItemById('serviceOverview').findSettings().findButtonDropdown();
      await page.click(settingsDropdown.findNativeButton().toSelector());
      await page.click(settingsDropdown.findItemById('remove').toSelector());
      // wait for remove animation to complete
      await page.waitForAssertion(() =>
        expect(page.getHeadersTexts()).resolves.toEqual([
          'Instance hours',
          'Service health',
          'Network traffic',
          'Alarms (150)',
        ]),
      );
    }),
  );

  test(
    'Can reset to original layout',
    setupTest(async page => {
      expect((await page.getHeadersTexts())[0]).toEqual('Service overview - new');
      await page.addNewWidget();
      expect((await page.getHeadersTexts())[0]).toEqual('Operational metrics');
      await page.click('button=Reset to default layout');
      await page.click('button=Reset');
      expect((await page.getHeadersTexts())[0]).toEqual('Service overview - new');
    }),
  );

  test(
    'Can hide chart on operational metrics widgets',
    setupTest(async page => {
      await page.addNewWidget();
      const settingsDropdown = boardWrapper.findItemById('operationalMetrics').findSettings().findButtonDropdown();
      const widgetHeaders = boardWrapper.findItemById('operationalMetrics').findAll('h3').toSelector();
      await expect(page.getElementsText(widgetHeaders)).resolves.toEqual(['Overview', 'Breakdown']);
      await page.click(settingsDropdown.findNativeButton().toSelector());
      await page.click(settingsDropdown.findItemById('Preferences').toSelector());
      await page.click('label=Issues breakdown');
      await page.click('button=Confirm');
      await expect(page.getElementsText(widgetHeaders)).resolves.toEqual(['Overview']);
    }),
  );
});
