// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/chat-page-object';

// The chat demo opens on a landing page with no chat bubbles until the user
// sends the first prompt.
const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/chat.html');
    const page = new Page(browser);
    await page.usePendingCallbacks();
    await expect(page.countChatBubbles()).resolves.toBe(0);
    await testFn(page);
  });
};

// Sends a greeting prompt via the prompt input and resolves the response,
// which is a prose bubble carrying feedback actions.
// After this runs the conversation is [0: user, 1: gen-ai response].
const setupWithResponse = (testFn: { (page: Page): Promise<void> }) => {
  return setupTest(async page => {
    await page.sendPrompt('hello');
    await page.flushOne();
    await page.flushOne();
    await testFn(page);
  });
};

describe('Chat behavior', () => {
  test(
    'Sending a prompt shows a generated response',
    setupTest(async page => {
      await page.sendPrompt('hello');
      await expect(page.countChatBubbles()).resolves.toBe(1);

      await page.flushOne();
      await expect(page.countChatBubbles()).resolves.toBe(2);
      await expect(page.getChatBubbleText(1)).resolves.toContain('Generating a response');

      await page.flushOne();
      await expect(page.getChatBubbleText(1)).resolves.toContain('AWS assistant');
    }),
  );

  test(
    'Sending a code snippet prompt returns a code block',
    setupTest(async page => {
      await page.sendPrompt('code snippet');
      await expect(page.countChatBubbles()).resolves.toBe(1);

      await page.flushOne();
      await page.flushOne();
      await expect(page.getChatBubbleText(1)).resolves.toContain('TypeScript');
    }),
  );

  describe('Feedback', () => {
    test(
      'Submit `helpful` feedback',
      setupWithResponse(async page => {
        await page.submitFeedbackHelpful();
        await page.flushOne();

        // Dismiss popover feedback by clicking outside
        await page.click('body');

        await expect(page.getHelpfulButtonDisabledReason()).resolves.toBe('"Helpful" feedback has been submitted.');
        await expect(page.getNotHelpfulButtonDisabledReason()).resolves.toBe(
          '"Not helpful" option is unavailable after "Helpful" feedback submitted.',
        );
      }),
    );

    test(
      'Submit `not-helpful` feedback and feedback dialog should open',
      setupWithResponse(async page => {
        await page.submitFeedbackNotHelpful();
        await page.flushOne();

        await expect(page.getNotHelpfulButtonDisabledReason()).resolves.toBe(
          '"Not helpful" feedback has been submitted.',
        );
        await expect(page.getHelpfulButtonDisabledReason()).resolves.toBe(
          '"Helpful" option is unavailable after "Not helpful" feedback submitted.',
        );

        const feedbackDialogSelector = page.getFeedbackDialog().toSelector();
        await expect(page.isExisting(feedbackDialogSelector)).resolves.toBe(true);
      }),
    );

    test(
      'Submit button should be disabled upon feedback dialog load and get enabled after an input is given',
      setupWithResponse(async page => {
        await page.submitFeedbackNotHelpful();
        await page.flushOne();

        await expect(page.isSubmitButtonEnabled()).resolves.toBe(false);
        await page.chooseFeedbackInDialog();
        await expect(page.isSubmitButtonEnabled()).resolves.toBe(true);

        // Deselect the checkbox to disable the button
        await page.chooseFeedbackInDialog();
        await expect(page.isSubmitButtonEnabled()).resolves.toBe(false);
        await page.enterAdditionalFeedback('Some additional feedback');
        await expect(page.isSubmitButtonEnabled()).resolves.toBe(true);
      }),
    );

    test(
      'Submit feedback dialog',
      setupWithResponse(async page => {
        await page.submitFeedbackNotHelpful();
        await page.flushOne();

        const feedbackDialogSelector = page.getFeedbackDialog().toSelector();
        await expect(page.isFocused(feedbackDialogSelector)).resolves.toBe(true);

        await page.chooseFeedbackInDialog();
        await page.submitFeedbackDialog();

        await expect(page.isExisting(feedbackDialogSelector)).resolves.toBe(false);
        await expect(page.isFocused(page.getNotHelpfulButton().toSelector())).resolves.toBe(true);
        await expect(page.getChatBubbleText(2)).resolves.toBe(
          'Your feedback has been submitted. Thank you for your additional feedback.',
        );
      }),
    );

    test(
      'Close feedback dialog',
      setupWithResponse(async page => {
        await page.submitFeedbackNotHelpful();
        await page.flushOne();

        const feedbackDialogSelector = page.getFeedbackDialog().toSelector();

        await page.closeFeedbackDialog();
        await expect(page.isExisting(feedbackDialogSelector)).resolves.toBe(false);
        await expect(page.isFocused(page.getNotHelpfulButton().toSelector())).resolves.toBe(true);
      }),
    );

    test(
      'Dismiss feedback dialog',
      setupWithResponse(async page => {
        await page.submitFeedbackNotHelpful();
        await page.flushOne();

        const feedbackDialogSelector = page.getFeedbackDialog().toSelector();

        await page.dismissFeedbackDialog();
        await expect(page.isExisting(feedbackDialogSelector)).resolves.toBe(false);
        await expect(page.isFocused(page.getNotHelpfulButton().toSelector())).resolves.toBe(true);
      }),
    );
  });
});
