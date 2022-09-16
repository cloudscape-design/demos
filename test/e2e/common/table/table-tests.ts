// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePropertyFilteringPageObject from '../../page/table-property-filtering-page-object';
import TableFilteringPageObject from '../../page/table-filtering-page-object';

export default (setupTest: {
  (testFn: { (page: TablePropertyFilteringPageObject | TableFilteringPageObject): Promise<void> }): any;
}) => {
  describe('Common Table Tests', () => {
    test(
      'Initial layout is correct',
      setupTest(async page => {
        await expect(page.isFlashVisible()).resolves.toBe(true);
        await expect(page.countBreadcrumbs()).resolves.toBe(2);
        await expect(page.getActiveNavigationLinkText()).resolves.toBe('Distributions');
        await expect(page.isNavigationOpen()).resolves.toBe(true);
        await expect(page.isNavigationExpandableSectionVisible(1)).resolves.toBe(true);
        await expect(page.isNavigationExpandableSectionVisible(2)).resolves.toBe(true);
        await expect(page.countExpandableSections(1)).resolves.toBe(7);
        await expect(page.countExpandableSections(2)).resolves.toBe(2);
        await expect(page.isToolsOpen()).resolves.toBe(false);
        await expect(page.countTableRows()).resolves.toBe(30);

        await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(false);
        await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(false);
        await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(false);
        await expect(page.getColumnAriaLabel(2)).resolves.toBe('Distribution ID, sorted ascending.');
      })
    );

    describe('Flash message', () => {
      test(
        'dismisses properly',
        setupTest(async page => {
          await page.disableMotion();
          await page.dismissFlash();
          await expect(page.isFlashVisible()).resolves.toBe(false);
        })
      );
    });

    describe('Navigation', () => {
      test(
        'expandable sections close properly',
        setupTest(async page => {
          await page.toggleNavigationExpandableSection(1);
          await page.toggleNavigationExpandableSection(2);

          await expect(page.isNavigationExpandableSectionVisible(1)).resolves.toBe(false);
          await expect(page.isNavigationExpandableSectionVisible(2)).resolves.toBe(false);
        })
      );

      test(
        'closes properly',
        setupTest(async page => {
          await page.closeSideNavigation();
          await expect(page.isNavigationOpen()).resolves.toBe(false);
        })
      );
    });

    describe('Tools panel', () => {
      test(
        'opens properly and has correct default content',
        setupTest(async page => {
          await page.openTools();
          await expect(page.isToolsOpen()).resolves.toBe(true);
          await expect(page.getToolsTitle()).resolves.toBe('Distributions');
          await expect(page.getToolsContent()).resolves.toContain('View your current distributions');
        })
      );
    });

    describe('Table', () => {
      test(
        'sorts descending when clicking on the same column',
        setupTest(async page => {
          await page.sortTableByColumn(2);

          await expect(page.getColumnAriaLabel(2)).resolves.toBe('Distribution ID, sorted descending.');
          await expect(page.getColumnAriaLabel(3)).resolves.toBe('State, not sorted.');
          await expect(page.getTableCellText(1, 2)).resolves.toBe('YBLIKXPJHLB130');
          await expect(page.getTableCellText(2, 2)).resolves.toBe('XTVHNKKMSTO144');
        })
      );

      test(
        'changes sorting column',
        setupTest(async page => {
          await expect(page.getTableCellText(1, 3)).resolves.toBe('Deactivated');
          await page.sortTableByColumn(3);

          await expect(page.getColumnAriaLabel(2)).resolves.toBe('Distribution ID, not sorted.');
          await expect(page.getColumnAriaLabel(3)).resolves.toBe('State, sorted ascending.');
          await expect(page.getTableCellText(1, 3)).resolves.toBe('Activated');
          await expect(page.getTableCellText(2, 3)).resolves.toBe('Activated');
        })
      );

      describe('Header buttons', () => {
        test(
          'view details, edit and delete buttons are enabled when one row is selected',
          setupTest(async page => {
            await page.selectTableRow(1);

            await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(true);
            await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(true);
            await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(true);
          })
        );

        test(
          'view details, edit buttons are disabled and delete button is enabled when many rows is selected',
          setupTest(async page => {
            await page.selectTableRow(1);
            await page.selectTableRow(2);
            await page.selectTableRow(3);

            await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(false);
            await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(false);
            await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(true);
          })
        );
      });
    });
  });
};
