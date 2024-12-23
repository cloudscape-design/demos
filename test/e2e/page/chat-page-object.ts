// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import createChatWrapper from '@cloudscape-design/chat-components/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';

const chatBubblesWrapper = createChatWrapper().findChatBubble();

const wrapper = createWrapper();
const promptInputWrapper = wrapper.findPromptInput();

export default class ChatPageObject extends BaseExamplePage {
  countChatBubbles() {
    return this.getElementsCount(chatBubblesWrapper.toSelector());
  }

  async waitForChat() {
    await this.click(wrapper.findAlert().findDismissButton().toSelector());
    await this.pause(100);
  }

  async sendPrompt(prompt: string) {
    const textareaSelector = promptInputWrapper.findNativeTextarea().toSelector();
    await this.setValue(textareaSelector, prompt);

    const sendButton = this.browser.$(promptInputWrapper.findActionButton().toSelector());
    await sendButton.click();
  }

  getChatBubbleText(index: number) {
    const chatBubbles = this.browser.$$(chatBubblesWrapper.findContentSlot().toSelector());

    return chatBubbles[index]!.getText();
  }

  getAlertHeaderText(index: number) {
    const alert = this.browser.$(wrapper.findAlert(`[data-testid="error-alert${index}"]`).findHeader().toSelector());

    return alert.getText();
  }
}
