// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';

export default class ProductPagePageObject extends BasePageObject {
  protected page = createWrapper();

  heroHeader() {
    return this.page.find('[data-testid="hero-header"]');
  }

  onThisPageNavigation() {
    return this.page.find('[data-testid="on-this-page"]').findAnchorNavigation();
  }

  userFeedback() {
    return this.page.find('[data-testid="user-feedback"]');
  }

  getUserFeedbackResult() {
    return this.getText(this.page.find('[data-testid="user-feedback-result"]').toSelector());
  }

  async submitUserFeedback(helpful: 'yes' | 'no') {
    const feedbackButton = this.userFeedback().findButton(`[data-testid="user-feedback-${helpful}"]`);
    await this.click(feedbackButton.toSelector());
  }
}
