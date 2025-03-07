// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import PageObject from './page/tags-page-object';

const setupTest = (testFn: { (page: PageObject): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/manage-tags.html');
    const page = new PageObject(browser);
    await page.waitUntilLoaded();
    await testFn(page);
  });
};

describe('Manage Tags', () => {
  test(
    'loads tags from server',
    setupTest(async page => {
      const expectedTags = [
        { key: 'owner', value: 'user@amazon.com', markedForRemoval: false },
        { key: 'project', value: 'mobile', markedForRemoval: false },
        { key: 'role', value: '', markedForRemoval: false },
      ];
      await expect(page.getTags()).resolves.toEqual(expectedTags);
    }),
  );

  test(
    'can add and remove tags',
    setupTest(async page => {
      await page.addTag();
      await expect(page.getTagCount()).resolves.toBe(4);

      await page.removeTag(4);
      await expect(page.getTagCount()).resolves.toBe(3);

      await page.removeTag(1);
      await expect(page.getTagCount()).resolves.toBe(3);
      await expect(page.isMarkedForRemoval(1)).resolves.toBe(true);

      await page.undoTagRemoval(1);
      await expect(page.getTagCount()).resolves.toBe(3);
      await expect(page.isMarkedForRemoval(1)).resolves.toBe(false);
    }),
  );

  test(
    'load tag keys and values from server',
    setupTest(async page => {
      await page.addTag();
      await page.searchKey('owner', 4);
      await expect(page.getKeySuggestionsCount(4)).resolves.toBe(1);

      await page.searchValue('user', 4);
      await expect(page.getValueSuggestionsCount(4)).resolves.toBe(5);
    }),
  );
});
