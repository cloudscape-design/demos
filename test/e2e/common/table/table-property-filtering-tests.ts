// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import TablePropertyFilteringPageObject from '../../page/table-property-filtering-page-object';

export default (
  setupTest: { (testFn: { (page: TablePropertyFilteringPageObject): Promise<void> }): any },
  initialAppliedFilterCount = 0,
  filtersTableRowCounts = [11, 7, 3, 30],
) => {
  describe('Property Filtering - Common', () => {
    test(
      'Shows the dropdown when focused',
      setupTest(async page => {
        await page.focusFilter();

        await expect(page.isDropdownVisible()).resolves.toBe(true);
      }),
    );

    test(
      'Keeps the dropdown open after selecting a property',
      setupTest(async page => {
        await page.focusFilter();
        await page.selectOption(1);

        await expect(page.isDropdownVisible()).resolves.toBe(true);
      }),
    );

    test(
      'Shows the list of operators after selecting a property',
      setupTest(async page => {
        await page.focusFilter();
        await page.selectOption(1);

        await page.waitUntilPropertyFilterLoaded();
        await expect(page.countDropdownItems()).resolves.toBe(6);
      }),
    );

    test(
      'Shows the list of values after typing a value',
      setupTest(async page => {
        await page.focusFilter();
        await page.search('abcdef01234567890.cloudfront.net');
        await expect(page.getOptionText(1)).resolves.toBe('Domain name = abcdef01234567890.cloudfront.net');
      }),
    );

    test(
      'Puts the property name in the filter field after selecting a property',
      setupTest(async page => {
        await page.focusFilter();
        await page.selectOption(1);

        await expect(page.getFilterText()).resolves.toBe('Domain name');
      }),
    );

    test(
      'Hides the dropdown after selecting a value',
      setupTest(async page => {
        await page.focusFilter();
        await page.selectOption(1); //select property

        await page.waitUntilPropertyFilterLoaded();
        await page.selectOption(1); //select operator

        await page.selectOption(1); //select value

        await page.waitUntilLoaded();
        await expect(page.isDropdownVisible()).resolves.toBe(false);
      }),
    );

    test(
      'Allows free-text filtering',
      setupTest(async page => {
        await page.focusFilter();
        await page.search('bbb');
        await page.keys(['Enter']);
        await expect(page.getFilterText()).resolves.toBe('');
        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 1);
      }),
    );

    test(
      'Clears the filter field after selecting a value',
      setupTest(async page => {
        await page.focusFilter();
        await page.selectOption(1); //select property

        await page.waitUntilPropertyFilterLoaded();
        await page.selectOption(1); //select operator

        await page.selectOption(1); //select value

        await expect(page.getFilterText()).resolves.toBe('');
      }),
    );

    test(
      'Adds a token after selecting a value',
      setupTest(async page => {
        await page.focusFilter();
        await page.search('abcdef01234567890.cloudfront.net');
        await page.selectOption(1);

        await expect(page.isTokensVisible()).resolves.toBe(true);

        const tokensText = await page.getElementsText(page.findPropertyFiltering().findTokens().toSelector());
        expect(tokensText[initialAppliedFilterCount]).toMatch(/Domain name = abcdef01234567890.cloudfront.net/);
        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 1);
      }),
    );

    test(
      'Can have multiple tokens',
      setupTest(async page => {
        await page.search('abcdef01234567890.cloudfront.net');
        await page.selectOption(1);

        await page.search('021345abcdef6789.cloudfront.net');
        await page.selectOption(1);

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 2);
      }),
    );

    test(
      'Filters the table after selecting a value',
      setupTest(async page => {
        await page.search('EXAMPLE-BUCKET-4.s3.amazon');
        await page.selectOption(1);

        await page.search('Default');
        await page.selectOption(1);

        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 2);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[0]);

        await page.focusFilter();
        await page.selectOption(1);
        await page.waitUntilPropertyFilterLoaded();
        await page.selectOption(6); // "Does not start with" operator
        await page.search('abc');
        await page.keys(['Enter']);

        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 3);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[1]);

        await page.focusFilter();
        await page.selectOption(1);
        await page.waitUntilPropertyFilterLoaded();
        await page.selectOption(5); // "Starts with" operator
        await page.search('123');
        await page.keys(['Enter']);

        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 4);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[2]);
      }),
    );

    test(
      'Refilters table after removing a token',
      setupTest(async page => {
        await page.search('EXAMPLE-BUCKET-4.s3.amazon');
        await page.selectOption(1);

        await page.search('Default');
        await page.selectOption(1);

        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 2);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[0]);

        await page.removeToken(1);
        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 1);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[3]);
      }),
    );

    test(
      'Resets the table after clicking the clear button',
      setupTest(async page => {
        await page.search('EXAMPLE-BUCKET-4.s3.amazon');
        await page.selectOption(1);

        await page.search('Default');
        await page.selectOption(1);

        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 2);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[0]);

        await page.removeAllTokens();
        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(0);
        await expect(page.countTableRows()).resolves.toBe(30);
      }),
    );

    test(
      'Persists applied filters after page reloading',
      setupTest(async page => {
        await page.search('EXAMPLE-BUCKET-4.s3.amazon');
        await page.selectOption(1);

        await page.search('Default');
        await page.selectOption(1);

        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 2);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[0]);

        // reload the page
        await page.reload();
        await page.waitUntilLoaded();

        await expect(page.countTokens()).resolves.toBe(initialAppliedFilterCount + 2);
        await expect(page.countTableRows()).resolves.toBe(filtersTableRowCounts[0]);
      }),
    );
  });
};
