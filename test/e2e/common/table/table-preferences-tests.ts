// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePropertyFilteringPageObject from '../../page/table-property-filtering-page-object';
import TablePageObject from '../../page/table-page-object';

export default function commonPreferencesTests(
  setupTest: {
    (testFn: { (page: TablePageObject | TablePropertyFilteringPageObject): Promise<void> }): any;
  },
  totalItemCount: number = 150,
) {
  describe('Preferences', () => {
    test(
      'has 10 rows when setting page size to 10',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferencesPageSize(1);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableRows()).toBe(10);
      }),
    );

    test(
      'has 50 rows when setting page size to 50',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferencesPageSize(3);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableRows()).toBe(totalItemCount < 50 ? totalItemCount : 50);
      }),
    );

    test(
      'discards changes when cancel is clicked',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.setTablePreferencesPageSize(1);
        await page.cancelTablePreferenceChanges();
        expect(await page.countTableRows()).toBe(30);
      }),
    );

    test(
      'has only 2 columns when changing all editable columns to invisible',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.toggleColumnVisibility(2);
        await page.toggleColumnVisibility(3);
        await page.toggleColumnVisibility(4);
        await page.toggleColumnVisibility(5);
        await page.toggleColumnVisibility(9);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableColumns()).toBe(2);
      }),
    );

    test(
      'has 10 columns when changing all editable columns to visible',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.toggleColumnVisibility(6);
        await page.toggleColumnVisibility(7);
        await page.toggleColumnVisibility(8);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableColumns()).toBe(10);
      }),
    );

    test('reorders columns', () => {
      setupTest(async page => {
        await page.openTablePreferences();
        await page.reorderColumn(0, 1);
        await page.confirmTablePreferenceChanges();

        expect(await page.getColumnHeaderTexts()).toBe([
          'State',
          'Distribution ID',
          'Domain name',
          'Delivery method',
          'SSL certificate',
        ]);
      });
    });
  });
}
