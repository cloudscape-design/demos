// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import BaseExamplePage from './common/base-example-page';
import range from 'lodash/range';

const setupTagsTest = (testFn: (page: TagsTab) => Promise<void>) => {
  return useBrowser(async browser => {
    await browser.url('/details-tabs.html');
    const tagsTab = new TagsTab(browser);
    await tagsTab.switchToTab('tags');
    await testFn(tagsTab);
  });
};

describe('Tags Table', () => {
  test(
    'loads tags from server',
    setupTagsTest(async page => {
      const tags = await page.getTableRows();
      expect(tags).toHaveLength(4);
      tags.forEach(tag => {
        expect(tag.key).toEqual(expect.any(String));
        expect(tag.value).toEqual(expect.any(String));
      });
    }),
  );
});

const wrapper = createWrapper('body');
const tagsTableWrapper = wrapper.findTable('#tags-panel');
const tagsTableRowSelector = tagsTableWrapper.findRows().toSelector();

class TagsTab extends BaseExamplePage {
  async switchToTab(id: string) {
    await this.click(wrapper.findTabs().findTabLinkById(id).toSelector());
    await this.waitForTableToLoad();
  }
  private async waitForTableToLoad() {
    await this.waitForExist(tagsTableWrapper.findLoadingText().toSelector(), false);
  }

  private async getTableRow(rowIndex: number) {
    return {
      key: await this.getText(tagsTableWrapper.findBodyCell(rowIndex, 1).toSelector()),
      value: await this.getText(tagsTableWrapper.findBodyCell(rowIndex, 2).toSelector()),
    };
  }

  async getTableRows() {
    const totalTags = await this.getElementsCount(tagsTableRowSelector);
    return Promise.all(range(0, totalTags).map(index => this.getTableRow(index + 1)));
  }
}
