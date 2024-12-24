// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import Page from './page/chat-page-object';

const initialMessageCount = 7;

const setupTest = (testFn: { (page: Page): Promise<void> }) => {
  return useBrowser(async browser => {
    await browser.url('/chat.html');
    const page = new Page(browser);
    await page.setWindowSize({ width: 1600, height: 1200 });
    await expect(page.countChatBubbles()).resolves.toBe(initialMessageCount);

    const html = await browser.execute(() => {
      return document.body.outerHTML;
    });
    console.log(html);

    await expect(page.isPromptInputExisting()).resolves.toBeTruthy();
    await expect(page.isPromptInputDisplayedInViewport()).resolves.toBeTruthy();

    await testFn(page);
  });
};

describe('Chat behavior', () => {
  test(
    'Unknown prompt gets the correct response',
    setupTest(async page => {
      const prompt = 'unknown prompt';

      await expect(page.isPromptInputExisting()).resolves.toBeTruthy();
      await expect(page.isPromptInputDisplayedInViewport()).resolves.toBeTruthy();
      await page.sendPrompt(prompt);
      await expect(page.getChatBubbleText(initialMessageCount)).resolves.toBe(prompt);

      // After a prompt is sent, Gen-AI should response so initialMessageCount + 2 is the new count of bubbles
      // Gen-AI response is sent with a delay
      await page.waitForAssertion(() => expect(page.countChatBubbles()).resolves.toBe(initialMessageCount + 2));
      await page.waitForAssertion(() =>
        expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain('Generating a response')
      );
      // Loading state is shown for 1.5 seconds
      await page.waitForJsTimers(1500);
      await expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain(
        'The interactions and functionality of this demo are limited.'
      );
    })
  );

  test(
    'Loading prompt shows loading state',
    setupTest(async page => {
      const prompt = 'Show a loading state example';

      await page.sendPrompt(prompt);
      await expect(page.getChatBubbleText(initialMessageCount)).resolves.toBe(prompt);

      await page.waitForAssertion(() => expect(page.countChatBubbles()).resolves.toBe(initialMessageCount + 2));
      await page.waitForAssertion(() =>
        expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain('Generating a response')
      );
      // Loading state is shown for 4 seconds for loading prompt
      await page.waitForJsTimers(4000);
      await expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain(
        'That was the loading state. To see the loading state again, ask "Show a loading state example".'
      );
    })
  );

  test(
    'Error prompt shows error state',
    setupTest(async page => {
      const prompt = 'Show an error state example';

      await page.sendPrompt(prompt);
      await expect(page.getChatBubbleText(initialMessageCount)).resolves.toBe(prompt);
      await page.waitForAssertion(() =>
        expect(page.getChatBubbleText(initialMessageCount + 1)).resolves.toContain('Generating a response')
      );
      // Loading state is shown for 1.5 seconds
      await page.waitForJsTimers(1500);
      await expect(page.getAlertHeaderText(initialMessageCount + 1)).resolves.toBe('Access denied');
    })
  );
});
