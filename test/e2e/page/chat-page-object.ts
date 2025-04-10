// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import createChatWrapper from '@cloudscape-design/chat-components/test-utils/selectors';
import BaseExamplePage from '../common/base-example-page';

const chatBubblesWrapper = createChatWrapper().findChatBubble();

const wrapper = createWrapper();
const promptInputWrapper = wrapper.findPromptInput();

const helpfulButton = wrapper.findButtonGroup().findButtonById('helpful');
const notHelpfulButton = wrapper.findButtonGroup().findButtonById('not-helpful');

const feedbackDialog = wrapper.find('[role=dialog]');
const feedbackDialogSubmitButton = wrapper.findButton('[data-testid="feedback-submit-button"]');

export default class ChatPageObject extends BaseExamplePage {
  countChatBubbles() {
    return this.getElementsCount(chatBubblesWrapper.toSelector());
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
