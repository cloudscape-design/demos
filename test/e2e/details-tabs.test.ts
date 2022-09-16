// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
import legalDisclaimerTest from './common/legal-disclaimer';

const setupTest = (testFn: (page: TagsTab) => Promise<void>) => {
  return useBrowser(async browser => {
    await browser.url('/details-tabs.html');
    const tagsTab = new TagsTab(browser);
    await tagsTab.switchToTab('tags');
    await testFn(tagsTab);
  });
};

legalDisclaimerTest(setupTest);

describe('Tags Table', () => {
  test(
    'loads tags from server',
    setupTest(async page => {
      const tags = await page.getTableRows();
      expect(tags).toHaveLength(4);
      tags.forEach(tag => {
        expect(tag.key).toEqual(expect.any(String));
        expect(tag.value).toEqual(expect.any(String));
      });
    })
  );
});

const wrapper = createWrapper('body');
const tagsTableWrapper = wrapper.findTable('#tags-panel');
const tagsTableRowSelector = tagsTableWrapper.findRows().toSelector();

class TagsTab extends BasePageObject {
  async switchToTab(id: string) {
    await this.click(wrapper.findTabs().findTabLinkById(id).toSelector());
    await this.waitForTableToLoad();
  }
  private async waitForTableToLoad() {
    await this.waitForVisible(tagsTableWrapper.findLoadingText().toSelector(), false);
  }

  private async getTableRow(rowIndex: number) {
    return {
      key: await this.getText(tagsTableWrapper.findBodyCell(rowIndex, 1).toSelector()),
      value: await this.getText(tagsTableWrapper.findBodyCell(rowIndex, 2).toSelector()),
    };
  }

  async getTableRows() {
    const elements = await this.browser.$$(tagsTableRowSelector);
    return Promise.all(elements.map((el, index) => this.getTableRow(index + 1)));
  }
}
