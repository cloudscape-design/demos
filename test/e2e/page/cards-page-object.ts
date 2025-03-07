// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

const cardsWrapper = createWrapper().findCards();
const filterInputSelector = cardsWrapper.findTextFilter().findInput().findNativeInput().toSelector();

export default class CardsFilteringPageObject extends AppLayoutPage {
  countSelectedCards() {
    return this.getElementsCount(cardsWrapper.findSelectedItems().toSelector());
  }
  countCardSections() {
    return this.getElementsCount(cardsWrapper.findItems().get(1).findSections().toSelector());
  }
  countPaginationPages() {
    return this.getElementsCount(cardsWrapper.findPagination().findPageNumbers().toSelector());
  }
  private async isCardsHeaderButtonEnabled(index: number) {
    const el = await this.browser.$(
      cardsWrapper.findHeaderRegion().findSpaceBetween().findAll('div').get(index).find('button').toSelector(),
    );
    return el.isEnabled();
  }
  async selectCard(index: number) {
    await this.click(cardsWrapper.findItems().get(index).findSelectionArea().toSelector());
  }
  async searchText(text: string) {
    await this.setValue(filterInputSelector, text);
  }

  getSearchText() {
    return this.getValue(filterInputSelector);
  }

  isViewDetailsButtonEnabled() {
    return this.isCardsHeaderButtonEnabled(1);
  }

  isEditDetailsButtonEnabled() {
    return this.isCardsHeaderButtonEnabled(2);
  }

  isDeleteDetailsButtonEnabled() {
    return this.isCardsHeaderButtonEnabled(3);
  }

  isNoMatchButtonVisible() {
    return this.isDisplayed(cardsWrapper.findEmptySlot().findButton().toSelector());
  }

  getItemsCounterText() {
    return this.getText(cardsWrapper.findHeader().findHeader().findCounter().toSelector());
  }

  countItems() {
    return this.getElementsCount(cardsWrapper.findItems().toSelector());
  }

  async waitUntilLoaded() {
    await this.waitForExist(cardsWrapper.findLoadingText().toSelector(), false);
    await this.waitForVisible(cardsWrapper.findItems().toSelector());
  }

  async clearFilterFromNoMatchRegion() {
    await this.click(cardsWrapper.findEmptySlot().findButton().toSelector());
    await this.waitUntilLoaded();
  }

  async confirmCardsPreferencesChanges() {
    const confirmButton = await this.browser.$(
      cardsWrapper.findCollectionPreferences().findModal().findConfirmButton().toSelector(),
    );

    await confirmButton.click();

    await this.waitUntilLoaded();
  }

  async cancelCardsPreferencesChanges() {
    const cancelButton = await this.browser.$(
      cardsWrapper.findCollectionPreferences().findModal().findCancelButton().toSelector(),
    );

    await cancelButton.click();

    await this.waitUntilLoaded();
  }

  async openCardsPreferences() {
    await this.click(cardsWrapper.findCollectionPreferences().findTriggerButton().toSelector());
  }

  async setCardsPreferencesPageSize(index: number) {
    await this.click(
      cardsWrapper
        .findCollectionPreferences()
        .findModal()
        .findPageSizePreference()
        .findOptions()
        .get(index)
        .findNativeInput()
        .toSelector(),
    );
  }

  async setItemsCountCardsPreferences(index: number) {
    const el = await this.browser.$(
      cardsWrapper
        .findCollectionPreferences()
        .findModal()
        .findVisibleContentPreference()
        .findToggleByIndex(1, index)
        .findNativeInput()
        .toSelector(),
    );
    await el.click();
  }

  async isScrolledToTop() {
    const windowScroll = await this.getWindowScroll();
    // Breadcrumbs are not visible by design
    return windowScroll.top < 60;
  }

  async clickNextPage() {
    const btn = await this.browser.$(cardsWrapper.findPagination().findNextPageButton().toSelector());
    await btn.click();
  }

  isCardsHeaderVisible() {
    return this.isDisplayed(cardsWrapper.findHeader().toSelector());
  }
}
