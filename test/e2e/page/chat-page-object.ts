// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components-core/test-utils/selectors';
import createChatWrapper from '@cloudscape-design/chat-components-core/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';

const chatBubblesWrapper = createChatWrapper().findChatBubble();

const wrapper = createWrapper();

const helpfulButton = wrapper.findButtonGroup().findButtonById('helpful');
const notHelpfulButton = wrapper.findButtonGroup().findButtonById('not-helpful');

const feedbackDialog = wrapper.find('[data-testid="feedback-dialog"]');
const feedbackDialogSubmitButton = wrapper.findButton('[data-testid="feedback-submit-button"]');

interface ExtendedWindow extends Window {
  __usePendingCallbacks: boolean;
  __flushOne: () => void;
  __flushAll: () => void;
}
declare const window: ExtendedWindow;

export default class ChatPageObject extends BaseExamplePage {
  async usePendingCallbacks() {
    await this.browser.execute(() => (window.__usePendingCallbacks = true));
  }
  async flushOne() {
    await this.browser.execute(() => window.__flushOne());
  }
  async flushAll() {
    await this.browser.execute(() => window.__flushAll());
  }

  countChatBubbles() {
    return this.getElementsCount(chatBubblesWrapper.toSelector());
  }

  // Type text into the prompt input and submit it (simulates real user typing).
  async sendPrompt(text: string) {
    const promptInput = wrapper.findPromptInput();
    const contentEditable = promptInput.findContentEditableElement();
    await this.scrollIntoViewAndClick(contentEditable.toSelector());
    await this.keys(text);
    // Submit via the action button (send)
    const sendButton = promptInput.findActionButton();
    await this.scrollIntoViewAndClick(sendButton.toSelector());
  }

  getChatBubbleText(index: number) {
    const chatBubbles = this.browser.$$(chatBubblesWrapper.findContentSlot().toSelector());
    return chatBubbles[index]!.getText();
  }

  getNotHelpfulButton() {
    return notHelpfulButton;
  }

  async submitFeedbackHelpful() {
    await this.scrollIntoViewAndClick(helpfulButton.toSelector());
  }

  async submitFeedbackNotHelpful() {
    await this.scrollIntoViewAndClick(notHelpfulButton.toSelector());
  }

  async getHelpfulButtonDisabledReason() {
    await this.hoverElement(helpfulButton.toSelector());

    const disabledReason = this.browser.$(helpfulButton.findDisabledReason().toSelector());
    return disabledReason.getText();
  }

  async getNotHelpfulButtonDisabledReason() {
    await this.hoverElement(notHelpfulButton.toSelector());

    const disabledReason = this.browser.$(notHelpfulButton.findDisabledReason().toSelector());
    return disabledReason.getText();
  }

  // Feedback dialog
  getFeedbackDialog() {
    return feedbackDialog;
  }

  async chooseFeedbackInDialog() {
    const checkbox = wrapper.findCheckbox('[data-testid="feedback-checkbox-harmful"]');
    await this.scrollIntoViewAndClick(checkbox.toSelector());
  }

  async enterAdditionalFeedback(text: string) {
    const textarea = wrapper.findTextarea().findNativeTextarea();
    await this.setValue(textarea.toSelector(), text);
  }

  async submitFeedbackDialog() {
    await this.scrollIntoViewAndClick(feedbackDialogSubmitButton.toSelector());
  }

  async isSubmitButtonEnabled() {
    const el = await this.browser.$(feedbackDialogSubmitButton.toSelector());
    return el.isEnabled();
  }

  async closeFeedbackDialog() {
    const closeButton = wrapper.findButton('[data-testid="feedback-close-button"]');
    await this.scrollIntoViewAndClick(closeButton.toSelector());
  }

  async dismissFeedbackDialog() {
    const dismissButton = wrapper.findButton('[data-testid="dialog-dismiss-button"]');
    await this.scrollIntoViewAndClick(dismissButton.toSelector());
  }
}
