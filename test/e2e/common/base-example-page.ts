// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';

export default class BaseExamplePage extends BasePageObject {
  constructor(browser: WebdriverIO.Browser) {
    super(browser);
  }

  /**
   * Scrolls the element into view before clicking it. Use this method instead of `click` to
   * prevent the sticky footer (used on external version) from intercepting clicks.
   */
  public async scrollIntoViewAndClick(selector: string) {
    const element = await this.browser.$(selector);
    await element.scrollIntoView({ block: 'center' });
    await element.click();
  }
}
