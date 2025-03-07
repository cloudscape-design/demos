// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/cards-page-object';
import commonFlashTests from './common/flashbar-tests';

describe('React Cards - Client side', () => {
  const setupTest = (testFn: { (page: Page): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new Page(browser);
      await browser.url('/cards.html');
      await page.waitUntilLoaded();
      await testFn(page);
    });
  };

  commonFlashTests(setupTest);

  test(
    'Initial state is correct',
    setupTest(async page => {
      await expect(page.countBreadcrumbs()).resolves.toBe(2);
      await expect(page.getActiveNavigationLinkText()).resolves.toBe('Distributions');
      await expect(page.isNavigationOpen()).resolves.toBe(true);
      await expect(page.isNavigationExpandableSectionVisible(1)).resolves.toBe(true);
      await expect(page.isNavigationExpandableSectionVisible(2)).resolves.toBe(true);
      await expect(page.countExpandableSections(1)).resolves.toBe(7);
      await expect(page.countExpandableSections(2)).resolves.toBe(2);
      await expect(page.isToolsOpen()).resolves.toBe(false);
      await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(false);
      await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(false);
      await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(false);
      await expect(page.countItems()).resolves.toBe(30);
      await expect(page.getItemsCounterText()).resolves.toBe('(150)');
    }),
  );

  test(
    'Navigation panel closes properly',
    setupTest(async page => {
      await page.closeSideNavigation();
      await expect(page.isNavigationOpen()).resolves.toBe(false);
    }),
  );

  test(
    "Navigation panel's expandable sections close properly",
    setupTest(async page => {
      await page.toggleNavigationExpandableSection(1);
      await page.toggleNavigationExpandableSection(2);

      await expect(page.isNavigationExpandableSectionVisible(1)).resolves.toBe(false);
      await expect(page.isNavigationExpandableSectionVisible(2)).resolves.toBe(false);
    }),
  );

  test(
    'Tools panel opens properly and has correct default content',
    setupTest(async page => {
      await page.openTools();

      await expect(page.isToolsOpen()).resolves.toBe(true);
      await expect(page.getToolsTitle()).resolves.toBe('Distributions');
      await expect(page.getToolsContent()).resolves.toContain('View your current distributions');
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

  test(
    'Cards view details, edit and delete buttons are enabled when one card is selected',
    setupTest(async page => {
      await page.selectCard(1);

      await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(true);
      await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(true);
      await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(true);
    }),
  );

  test(
    'Cards view details and edit buttons is disabled when many cards are selected, and Cards Delete button is enabled',
    setupTest(async page => {
      await page.selectCard(1);
      await page.selectCard(2);

      await expect(page.isViewDetailsButtonEnabled()).resolves.toBe(false);
      await expect(page.isEditDetailsButtonEnabled()).resolves.toBe(false);
      await expect(page.isDeleteDetailsButtonEnabled()).resolves.toBe(true);
    }),
  );

  test(
    'When filter has no match the no match state is displayed',
    setupTest(async page => {
      await page.searchText('00000');

      await expect(page.isNoMatchButtonVisible()).resolves.toBe(true);
    }),
  );

  test(
    'Can select a card when filtering text is set',
    setupTest(async page => {
      await page.searchText('00');
      await page.selectCard(1);

      await expect(page.countSelectedCards()).resolves.toBe(1);
    }),
  );

  test(
    'When clear filter button is pressed filtering text is reset and distributions are reset to show 30 cards',
    setupTest(async page => {
      await page.searchText('00000');
      await page.clearFilterFromNoMatchRegion();

      await expect(page.getSearchText()).resolves.toBe('');
      await expect(page.countItems()).resolves.toBe(30);
    }),
  );

  test(
    'When proper filter is applied only one card is displayed and one pagination page is available',
    setupTest(async page => {
      await page.searchText('MHX');

      await expect(page.countItems()).resolves.toBe(1);
      await expect(page.countPaginationPages()).resolves.toBe(1);
    }),
  );

  test(
    'When setting page size to 10, 10 cards are shown',
    setupTest(async page => {
      await page.openCardsPreferences();
      await page.setCardsPreferencesPageSize(1);
      await page.confirmCardsPreferencesChanges();

      await expect(page.countItems()).resolves.toBe(10);
    }),
  );

  test(
    'When setting page size to 50, 50 cards are shown',
    setupTest(async page => {
      await page.openCardsPreferences();
      await page.setCardsPreferencesPageSize(3);
      await page.confirmCardsPreferencesChanges();

      await expect(page.countItems()).resolves.toBe(50);
    }),
  );

  test(
    'Changing settings followed by clicking cancel button has no effect',
    setupTest(async page => {
      await page.openCardsPreferences();
      await page.setCardsPreferencesPageSize(3);
      await page.cancelCardsPreferencesChanges();

      await expect(page.countItems()).resolves.toBe(30);
    }),
  );

  test(
    'Selection works after page size has been changed',
    setupTest(async page => {
      await page.openCardsPreferences();
      await page.setCardsPreferencesPageSize(1);
      await page.confirmCardsPreferencesChanges();
      await page.selectCard(1);

      await expect(page.countItems()).resolves.toBe(10);
    }),
  );

  test(
    'Setting all editable columns to invisible state results with cards having no sections',
    setupTest(async page => {
      await page.openCardsPreferences();
      await page.setItemsCountCardsPreferences(1);
      await page.setItemsCountCardsPreferences(2);
      await page.setItemsCountCardsPreferences(7);
      await page.confirmCardsPreferencesChanges();

      await expect(page.countCardSections()).resolves.toBe(0);
    }),
  );

  test(
    'Setting all editable columns to visible state results with cards having 8 sections',
    setupTest(async page => {
      await page.openCardsPreferences();
      await page.setItemsCountCardsPreferences(3);
      await page.setItemsCountCardsPreferences(4);
      await page.setItemsCountCardsPreferences(5);
      await page.setItemsCountCardsPreferences(6);
      await page.confirmCardsPreferencesChanges();

      await expect(page.countCardSections()).resolves.toBe(7);
    }),
  );

  test(
    'When one card is selected counter displays selected of total',
    setupTest(async page => {
      await page.selectCard(1);

      await expect(page.getItemsCounterText()).resolves.toBe('(1/150)');
    }),
  );

  test(
    'scrolls to top when filtering',
    setupTest(async page => {
      await page.windowScrollTo({ top: 800 });

      await page.searchText('N');

      await expect(page.isScrolledToTop()).resolves.toBe(true);
    }),
  );

  test(
    'scrolls to top when paginating',
    setupTest(async page => {
      await page.windowScrollTo({ top: 800 });

      await page.clickNextPage();

      await expect(page.isScrolledToTop()).resolves.toBe(true);
    }),
  );

  test(
    'header stay visible when scrolling',
    setupTest(async page => {
      await page.windowScrollTo({ top: 800 });

      await expect(page.isCardsHeaderVisible()).resolves.toBe(true);
    }),
  );
});
