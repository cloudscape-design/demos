// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/table-select-filter-page-object';

describe('Table Select Filter', () => {
  const setupTest = (testFn: { (page: Page): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new Page(browser);
      await browser.url('/table-select-filter.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  test(
    'Initial layout is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(2);
      await expect(page.getActiveNavigationLinkText()).resolves.toBe('Instances');
      await expect(page.isNavigationOpen()).resolves.toBe(true);
      await expect(page.isToolsOpen()).resolves.toBe(false);
      await expect(page.countTableRows()).resolves.toBe(30);
      await expect(page.isInstanceActionsButtonEnabled()).resolves.toBe(false);
      await expect(page.isRestoreFromS3ButtonEnabled()).resolves.toBe(true);
      await expect(page.isLaunchDBInstanceButtonEnabled()).resolves.toBe(true);
      await expect(page.getTableItemsCounter()).resolves.toBe('(150)');
      await expect(page.getColumnAriaLabel(2)).resolves.toBe('DB instance, sorted ascending.');
    }),
  );

  test(
    'When filter has no match the no match state is displayed',
    setupTest(async page => {
      await page.typeFilterQuery('00000');

      await expect(page.isTableNoMatchButtonVisible()).resolves.toBe(true);
    }),
  );

  test(
    'When clear filter button is pressed filtering text is reset',
    setupTest(async page => {
      await page.typeFilterQuery('00000');
      await page.clearFilterFromNoMatchRegion();

      await expect(page.getFilterQuery()).resolves.toBe('');
      await expect(page.countTableRows()).resolves.toBe(30);
    }),
  );

  test(
    'When proper filter is applied only one item and one table rows is displayed',
    setupTest(async page => {
      await page.typeFilterQuery('144');

      await expect(page.countTableRows()).resolves.toBe(1);
      await expect(page.countPaginationPages()).resolves.toBe(1);
    }),
  );

  test(
    'When proper select filter is applied, only one item is displayed',
    setupTest(async page => {
      await page.selectEngine(3);
      await page.selectClass(9);

      await expect(page.countTableRows()).resolves.toBe(1);
    }),
  );

  test(
    'When proper select filter is applied, specific items are displayed',
    setupTest(async page => {
      await page.selectEngine(3);
      await page.selectClass(11);

      await expect(page.getTableCellText(1, 2)).resolves.toBe('test-auto-db-22');
      await expect(page.getTableCellText(2, 2)).resolves.toBe('test-auto-db-24');
    }),
  );

  test(
    'When text filter and proper select filter is applied, specific items are displayed',
    setupTest(async page => {
      await page.typeFilterQuery('14');
      await page.selectEngine(3);
      await page.selectClass(4);

      await expect(page.getTableCellText(1, 2)).resolves.toBe('test-auto-db-142');
    }),
  );

  test(
    'When clear filter button is pressed select-filter are reset to Any',
    setupTest(async page => {
      await page.typeFilterQuery('00000');
      await page.selectEngine(3);
      await page.selectClass(11);
      await page.clearFilterFromNoMatchRegion();

      await expect(page.getSelectedEngine()).resolves.toBe('Any Engine');
      await expect(page.getSelectedClass()).resolves.toBe('Any Class');
    }),
  );

  test(
    'sorts descending order when clicking on already sorted header',
    setupTest(async page => {
      await page.sortTableByColumn(2);

      await expect(page.getColumnAriaLabel(2)).resolves.toBe('DB instance, sorted descending.');
      await expect(page.getTableCellText(1, 2)).resolves.toBe('test-auto-db-150');
      await expect(page.getTableCellText(2, 2)).resolves.toBe('test-auto-db-149');
    }),
  );

  test(
    'restores back to ascending order when clicking on already sorted header twice',
    setupTest(async page => {
      await page.sortTableByColumn(2);
      await page.sortTableByColumn(2);

      await expect(page.getColumnAriaLabel(2)).resolves.toBe('DB instance, sorted ascending.');
      await expect(page.getTableCellText(1, 2)).resolves.toBe('test-auto-db-1');
      await expect(page.getTableCellText(2, 2)).resolves.toBe('test-auto-db-2');
    }),
  );

  test(
    'When one row is selected counter displays selected of total',
    setupTest(async page => {
      await page.selectTableRow(1);

      await expect(page.getTableItemsCounter()).resolves.toBe('(1/150)');
    }),
  );

  describe('Tools panel', () => {
    test(
      'opens properly and has correct default content',
      setupTest(async page => {
        await page.openTools();

        await expect(page.isToolsOpen()).resolves.toBe(true);
        await expect(page.getToolsTitle()).resolves.toBe('Instances');
        await expect(page.getToolsContent()).resolves.toContain('View your current DB instances');
      }),
    );

    test(
      'tools panel can be opened by info link',
      setupTest(async page => {
        await page.click(page.contextInfoLinkSelector());
        await expect(page.isToolsOpen()).resolves.toBe(true);
      }),
    );

    test(
      'tools panel is re-focused after clicking multiple info links',
      setupTest(async page => {
        await page.click(page.contextInfoLinkSelector());
        await page.click(page.contextInfoLinkSelector());
        await expect(page.isToolsCloseFocused()).resolves.toBe(true);
      }),
    );
  });

  describe('Header buttons', () => {
    test(
      'view details, edit and delete buttons are enabled when one row is selected',
      setupTest(async page => {
        await page.selectTableRow(1);

        await expect(page.isInstanceActionsButtonEnabled()).resolves.toBe(true);
        await expect(page.isRestoreFromS3ButtonEnabled()).resolves.toBe(true);
        await expect(page.isLaunchDBInstanceButtonEnabled()).resolves.toBe(true);
      }),
    );
  });
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

        expect(await page.countTableRows()).toBe(50);
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
      'has only 3 columns when changing all editable columns to invisible',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.toggleColumnVisibility(2);
        await page.toggleColumnVisibility(3);
        await page.toggleColumnVisibility(4);
        await page.toggleColumnVisibility(5);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableColumns()).toBe(3);
      }),
    );

    test(
      'has 10 columns when changing all editable columns to visible',
      setupTest(async page => {
        await page.openTablePreferences();
        await page.toggleColumnVisibility(6);
        await page.toggleColumnVisibility(8);
        await page.toggleColumnVisibility(9);
        await page.confirmTablePreferenceChanges();

        expect(await page.countTableColumns()).toBe(10);
      }),
    );
  });
});
