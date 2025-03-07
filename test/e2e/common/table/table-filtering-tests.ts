// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TableFilteringPageObject from '../../page/table-filtering-page-object';

export default (setupTest: { (testFn: { (page: TableFilteringPageObject): Promise<void> }): any }) => {
  describe('Filtering - Common', () => {
    test(
      'only 1 item and 1 pagination page is displayed when the correct filter is applied',
      setupTest(async page => {
        await page.searchText('MHX');

        await expect(page.countPaginationPages()).resolves.toBe(1);
        await expect(page.countTableRows()).resolves.toBe(1);
      }),
    );
  });
};
