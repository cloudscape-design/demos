// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePropertyFilteringPageObject from '../../page/table-property-filtering-page-object';
import TableFilteringPageObject from '../../page/table-filtering-page-object';

type PageObjectWithFiltering = TablePropertyFilteringPageObject | TableFilteringPageObject;

export type SetupTest<T> = (testFn: (page: T) => Promise<void>) => any;

export type TableTestProps = {
  sorting?: {
    descendingIds?: string[];
    changingColumn?: {
      preSort?: {
        columnNumber: number;
        columnName: string;
      };
      columnNumber: number;
      columnName: string;
      valueBefore: string;
      valueAfter: string;
    };
  };
};

const defaultProps: TableTestProps = {
  sorting: {
    descendingIds: ['YBLIKXPJHLB130', 'XTVHNKKMSTO144'],
    changingColumn: {
      columnNumber: 3,
      columnName: 'State',
      valueBefore: 'Deactivated',
      valueAfter: 'Activated',
    },
  },
};

export default function commonTests<T extends PageObjectWithFiltering>(
  setupTest: SetupTest<T>,
  props: TableTestProps = defaultProps,
) {
  describe('Common Table Tests', () => {
    test(
      'Initial layout is correct',
      setupTest(async page => {
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
      }),
    );

    describe('Navigation', () => {
      test(
        'expandable sections close properly',
        setupTest(async page => {
          await page.toggleNavigationExpandableSection(1);
          await page.toggleNavigationExpandableSection(2);

          await expect(page.isNavigationExpandableSectionVisible(1)).resolves.toBe(false);
          await expect(page.isNavigationExpandableSectionVisible(2)).resolves.toBe(false);
        }),
      );

      test(
        'closes properly',
        setupTest(async page => {
          await page.closeSideNavigation();
          await expect(page.isNavigationOpen()).resolves.toBe(false);
        }),
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
        }),
      );
    });

    describe('Table', () => {
      test(
        'sorts descending when clicking on the same column',
        setupTest(async page => {
          await page.sortTableByColumn(2);

          await expect(page.getColumnAriaLabel(2)).resolves.toBe('Distribution ID, sorted descending.');
          await expect(page.getColumnAriaLabel(3)).resolves.toBe('State, not sorted.');
          await expect(page.getTableCellText(1, 2)).resolves.toBe(props!.sorting!.descendingIds![0]);
          await expect(page.getTableCellText(2, 2)).resolves.toBe(props!.sorting!.descendingIds![1]);
        }),
      );

      test(
        'changes sorting column',
        setupTest(async page => {
          const columnProps = props!.sorting!.changingColumn!;

          // When defined sort by a specific column before starting the test to change the sorting column
          if (columnProps.preSort) {
            await page.sortTableByColumn(columnProps.preSort.columnNumber);
            await expect(page.getColumnAriaLabel(columnProps.preSort.columnNumber)).resolves.toBe(
              `${columnProps.preSort.columnName}, sorted descending.`,
            );
          }

          await expect(page.getTableCellText(1, columnProps.columnNumber)).resolves.toBe(columnProps.valueBefore);
          await page.sortTableByColumn(columnProps.columnNumber);

          await expect(page.getColumnAriaLabel(columnProps.preSort?.columnNumber ?? 2)).resolves.toBe(
            `${columnProps.preSort?.columnName ?? 'Distribution ID'}, not sorted.`,
          );
          await expect(page.getColumnAriaLabel(columnProps.columnNumber)).resolves.toBe(
            `${columnProps.columnName}, sorted ascending.`,
          );
          await expect(page.getTableCellText(1, columnProps.columnNumber)).resolves.toBe(columnProps.valueAfter);
          await expect(page.getTableCellText(2, columnProps.columnNumber)).resolves.toBe(columnProps.valueAfter);
        }),
      );

      describe('Header buttons', () => {
        test(
          'view details, edit and delete buttons are enabled when one row is selected',
          setupTest(async page => {
            await page.selectTableRow(1);

            await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(true);
            await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(true);
            await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(true);
          }),
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
          }),
        );
      });
    });
  });
}
