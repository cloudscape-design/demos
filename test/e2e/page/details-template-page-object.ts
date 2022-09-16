// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

const page = createWrapper('body');

function expandableSectionHeader(index: number) {
  return page.findSideNavigation().findItemByIndex(index).findSection().findHeader().toSelector();
}

function expandableSectionItems(index: number) {
  return page.findSideNavigation().findItemByIndex(index).findItems().toSelector();
}

export default class Page extends AppLayoutPage {
  countCacheTableColumns() {
    return this.getElementsCount(page.findTable('.cache-table').findColumnHeaders().toSelector());
  }
  countCacheItems() {
    return this.getElementsCount(page.findTable('.cache-table').findRows().toSelector());
  }
  countOriginTableColumns() {
    return this.getElementsCount(page.findTable('.origins-table').findColumnHeaders().toSelector());
  }
  countOriginItems() {
    return this.getElementsCount(page.findTable('.origins-table').findRows().toSelector());
  }
  isReportsAndAnalyticsSectionExpanded() {
    return this.isDisplayed(expandableSectionItems(1));
  }
  isPrivateContentExpanded() {
    return this.isDisplayed(expandableSectionItems(2));
  }
  countReportsAndAnalyticsLinks() {
    return this.getElementsCount(expandableSectionItems(1));
  }
  countPrivateContentLinks() {
    return this.getElementsCount(expandableSectionItems(2));
  }
  async toggleReportsAndAnalyticsSection() {
    await this.click(expandableSectionHeader(1));
  }
  async togglePrivateContentSection() {
    await this.click(expandableSectionHeader(2));
  }
}
