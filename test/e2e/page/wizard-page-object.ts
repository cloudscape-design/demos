// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import AppLayoutPage from './app-layout-page-object';

const wizardWrapper = createWrapper().findWizard();

export default class Page extends AppLayoutPage {
  async gotoStep1FromEditBtnOnReview() {
    await this.scrollIntoViewAndClick(
      wizardWrapper.findContent().find('.step-1-review').findButton('.edit-step-btn').toSelector(),
    );
  }
  async gotoPrevStep() {
    await this.scrollIntoViewAndClick(wizardWrapper.findPreviousButton().toSelector());
  }
  async gotoNextStep() {
    await this.scrollIntoViewAndClick(wizardWrapper.findPrimaryButton().toSelector());
  }
  isStepDisabled(index: number) {
    return this.isExisting(wizardWrapper.findMenuNavigationLink(index, 'disabled').toSelector());
  }
  isStepActive(index: number) {
    return this.isExisting(wizardWrapper.findMenuNavigationLink(index, 'active').toSelector());
  }
  countSteps() {
    return this.getElementsCount(wizardWrapper.findMenuNavigationLinks().toSelector());
  }
  getStepTitle() {
    return this.getText(wizardWrapper.findHeader().toSelector());
  }
  isPrevButtonVisible() {
    return this.isExisting(wizardWrapper.findPreviousButton().toSelector());
  }
}
