// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePropertyFilteringPageObject from '../../page/table-property-filtering-page-object';
import TablePageObject from '../../page/table-page-object';

export default function commonPreferencesTests(setupTest: {
  (testFn: { (page: TablePageObject | TablePropertyFilteringPageObject): Promise<void> }): any;
}) {
  describe('Preferences', () => {
    test(
      'has 10 rows when setting page size to 10',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferencesPageSize(1);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableRows()).toBe(10);
      })
    );

    test(
      'has 50 rows when setting page size to 50',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferencesPageSize(3);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableRows()).toBe(50);
      })
    );

    test(
      'discards changes when cancel is clicked',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferencesPageSize(1);
        await page.cancelTablePreferenceChanges();
        expect(await page.countTableRows()).toBe(30);
      })
    );

    test(
      'has only 2 columns when changing all editable columns to invisible',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferenceTableColumns(2);
        await page.setTablePreferenceTableColumns(3);
        await page.setTablePreferenceTableColumns(5);
        await page.setTablePreferenceTableColumns(7);
        await page.setTablePreferenceTableColumns(8);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableColumns()).toBe(2);
      })
    );

    test(
      'has 10 column when changing all editable columns to visible',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferenceTableColumns(4);
        await page.setTablePreferenceTableColumns(6);
        await page.setTablePreferenceTableColumns(9);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableColumns()).toBe(10);
      })
    );
  });
}
