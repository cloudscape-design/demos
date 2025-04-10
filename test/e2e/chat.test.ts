// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/chat-page-object';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const initialMessageCount = 7;

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/chat.html');
    const page = new Page(browser);
    await expect(page.countChatBubbles()).resolves.toBe(initialMessageCount);
    await testFn(page);
  });
};

describe('Chat behavior', () => {
  test(
    'Unknown prompt gets the correct response',
    setupTest(async page => {
      const prompt = 'unknown prompt';

      await page.sendPrompt(prompt);
      await expect(page.getChatBubbleText(initialMessageCount)).resolves.toBe(prompt);

      // After a prompt is sent, Gen-AI should response so initialMessageCount + 2 is the new count of bubbles
      // Gen-AI response is sent with a delay
      await page.waitForAssertion(() => expect(page.countChatBubbles()).resolves.toBe(initialMessageCount + 2));
      await page.waitForAssertion(() =>
        expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain('Generating a response'),
      );
      // Loading state is shown for 1.5 seconds
      await page.waitForJsTimers(1500);
      await expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain(
        'The interactions and functionality of this demo are limited.',
      );
    }),
  );

  test(
    'Loading prompt shows loading state',
    setupTest(async page => {
      const prompt = 'Show a loading state example';

      await page.sendPrompt(prompt);
      await expect(page.getChatBubbleText(initialMessageCount)).resolves.toBe(prompt);

      await page.waitForAssertion(() => expect(page.countChatBubbles()).resolves.toBe(initialMessageCount + 2));
      await page.waitForAssertion(() =>
        expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain('Generating a response'),
      );
      // Loading state is shown for 4 seconds for loading prompt
      await page.waitForJsTimers(4000);
      await expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain(
        'That was the loading state. To see the loading state again, ask "Show a loading state example".',
      );
    }),
  );

  test(
    'Error prompt shows error state',
    setupTest(async page => {
      const prompt = 'Show an error state example';

      await page.sendPrompt(prompt);
      await expect(page.getChatBubbleText(initialMessageCount)).resolves.toBe(prompt);
      await page.waitForAssertion(() =>
        expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain('Generating a response'),
      );
      // Loading state is shown for 1.5 seconds
      await page.waitForJsTimers(1500);
      await expect(page.getAlertHeaderText(initialMessageCount + 1)).resolves.toBe('Access denied');
    }),
  );

  describe('Feedback', () => {
    test(
      'Submit `helpful` feedback',
      setupTest(async page => {
        await page.submitFeedbackHelpful();
        // Loading is shown for 2 seconds
        await page.waitForJsTimers(2000);
        // Dismiss popover feedback
        await page.click(createWrapper().findHeader().toSelector());

        await expect(page.getHelpfulButtonDisabledReason()).resolves.toBe('"Helpful" feedback has been submitted.');
        await expect(page.getNotHelpfulButtonDisabledReason()).resolves.toBe(
          '"Not helpful" option is unavailable after "Helpful" feedback submitted.',
        );
      }),
    );

    test(
      'Submit `not-helpful` feedback and feedback dialog should open',
      setupTest(async page => {
        await page.submitFeedbackNotHelpful();
        // Loading is shown for 2 seconds
        await page.waitForJsTimers(2000);

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
      setupTest(async page => {
        await page.submitFeedbackNotHelpful();
        // Loading is shown for 2 seconds
        await page.waitForJsTimers(2000);

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
      setupTest(async page => {
        await page.submitFeedbackNotHelpful();
        // Loading is shown for 2 seconds
        await page.waitForJsTimers(2000);

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
      setupTest(async page => {
        await page.submitFeedbackNotHelpful();
        // Loading is shown for 2 seconds
        await page.waitForJsTimers(2000);

        const feedbackDialogSelector = page.getFeedbackDialog().toSelector();

        await page.closeFeedbackDialog();
        await expect(page.isExisting(feedbackDialogSelector)).resolves.toBe(false);
        await expect(page.isFocused(page.getNotHelpfulButton().toSelector())).resolves.toBe(true);
      }),
    );

    test(
      'Dismiss feedback dialog',
      setupTest(async page => {
        await page.submitFeedbackNotHelpful();
        // Loading is shown for 2 seconds
        await page.waitForJsTimers(2000);

        const feedbackDialogSelector = page.getFeedbackDialog().toSelector();

        await page.dismissFeedbackDialog();
        await expect(page.isExisting(feedbackDialogSelector)).resolves.toBe(false);
        await expect(page.isFocused(page.getNotHelpfulButton().toSelector())).resolves.toBe(true);
      }),
    );
  });
});
