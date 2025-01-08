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

  isPromptInputExisting() {
    return this.isExisting(promptInputWrapper.findNativeTextarea().toSelector());
  }

  async isPromptInputDisplayedInViewport() {
    console.log('window height: ', await this.browser.execute(() => window.innerHeight));
    console.log('window width: ', await this.browser.execute(() => window.innerWidth));
    console.log(
      'textarea position: ',
      await this.browser.execute(() => document.querySelector('textarea')?.getBoundingClientRect())
    );
    console.log(
      'chat container position: ',
      await this.browser.execute(() => document.querySelector('.chat-container')?.getBoundingClientRect())
    );

    console.log(
      'window scroll height: ',
      await this.browser.execute(() => window.document.documentElement.scrollHeight)
    );
    console.log('window scroll top: ', await this.browser.execute(() => window.document.documentElement.scrollTop));
    console.log(
      'window viewport height: ',
      await this.browser.execute(() => window.document.documentElement.clientHeight)
    );

    return this.isDisplayedInViewport(promptInputWrapper.findNativeTextarea().toSelector());
  }

  isPromptInputClickable() {
    return this.isClickable(promptInputWrapper.findNativeTextarea().toSelector());
  }

  async sendPrompt(prompt: string) {
    const textareaSelector = promptInputWrapper.findNativeTextarea().toSelector();
    await this.click(textareaSelector);
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
