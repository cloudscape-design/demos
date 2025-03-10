// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import TablePageObject from './page/table-page-object';
import { SetupTest } from './common/table/table-tests';

const tableWrapper = createWrapper().findTable();

describe('Table - Expandable', () => {
  const setupTest: SetupTest<TablePageObject> = testFn => {
    return useBrowser(async browser => {
      const page = new TablePageObject(browser);
      await browser.url('/table-expandable.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  test(
    'Saves state dropdown change',
    setupTest(async page => {
      // Expect 10 data rows and 1 loader row
      const rows1 = await page.getElementsCount(tableWrapper.findRows().toSelector());
      expect(rows1).toBe(10 + 1);

      // Expand cluster-33387b6c
      await page.click(tableWrapper.findExpandToggle(1).toSelector());

      // Expect 10 root data row, 1 root loader, 3 nested data rows, and 1 nested loader
      const rows2 = await page.getElementsCount(tableWrapper.findRows().toSelector());
      expect(rows2).toBe(10 + 1 + 3 + 1);

      // Navigate to cluster-33387b6c "Show more" button
      await page.keys(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown']);

      // Load more items for cluster-33387b6c
      await page.keys(['Enter']);

      // Expect 10 root data row, 1 root loader, and 5 nested data rows
      const rows3 = await page.getElementsCount(tableWrapper.findRows().toSelector());
      expect(rows3).toBe(10 + 1 + 5);
    }),
  );
});
