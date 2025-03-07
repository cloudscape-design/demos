// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import fs from 'fs';
import * as Axe from 'axe-core';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import { allTestPages } from './common/all-test-pages';

declare const axe: typeof Axe;

const tableRowSelector = createWrapper().findTable().findRows().get(2).toSelector();

function filterIgnored(results: Axe.Result[]) {
  return results.filter(result => {
    const impactful = result.impact === 'serious' || result.impact === 'critical';
    if (impactful) {
      // we make use of tabbable elements, that are hidden from the screen readers in table sticky header
      if (result.id === 'aria-hidden-focus') {
        return false;
      }

      // axe-core does not support some of the ARIA role semantics that we use in charts
      if (result.id === 'aria-roledescription') {
        return false;
      }
      if (result.id === 'aria-roles') {
        const chartIssue = result.nodes.every(node => node.html.indexOf('role="graphics-') !== -1);
        return !chartIssue;
      }

      return true;
    }
    return false;
  });
}

function findUndefinedNodes() {
  const result = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent && node.textContent.indexOf('undefined') > -1) {
      result.push(node.parentElement!.innerHTML);
    }
  }
  return result;
}

describe('Checking examples accessibility', function () {
  allTestPages.forEach(({ pagePath, discardLogs }) => {
    test(
      `Visit ${pagePath}`,
      useBrowser(async browser => {
        await browser.url(pagePath);
        const page = new BasePageObject(browser);
        if (pagePath.includes('server-side-table')) {
          // server-side-table needs extra time to load items before we can make assertions
          await page.waitForVisible(tableRowSelector, true, 30000);
        } else if (pagePath.match(/form.html$/)) {
          // ace is loaded asynchronously
          await page.waitForVisible(createWrapper().findCodeEditor().findEditor().toSelector(), true);
        } else {
          await page.waitForVisible('main', true);
        }

        // report if there are any occurrences of string "undefined" in HTML
        const undefinedContent = await browser.execute(findUndefinedNodes);
        expect(undefinedContent).toEqual([]);

        expect(await page.getElementsCount('[aria-label*=undefined]')).toEqual(0);

        // HACK: Ace makes test to fail
        await browser.execute(() => {
          document.querySelector('.ace_text-layer')?.setAttribute('style', 'display: none');
        });

        await browser.execute(fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8'));
        type AxeResult = { result: Axe.AxeResults } | { error: Error };
        const runAxe = (done: (result: AxeResult) => void) =>
          axe
            .run({
              // exclude cloudWatch dashboard iframes
              // exclude focus-lock guards, as it implements intended keyboard traps
              // exclude Ace editor related elements, as the library does not implement a11y
              exclude: [['iframe'], ['[data-focus-guard=true]'], ['[class^=ace_]']],
            })
            .then(
              result => done({ result }),
              error => done(error),
            );
        // executeAsync has incorrect typings: https://github.com/webdriverio/webdriverio/issues/6206
        const response = (await browser.executeAsync(runAxe as any)) as AxeResult;

        if ('error' in response) {
          throw response.error;
        }

        const violations = filterIgnored(response.result.violations);
        expect(violations).toEqual([]);
        if (discardLogs) {
          await browser.getLogs('browser');
        }
      }),
    );
  });
});
