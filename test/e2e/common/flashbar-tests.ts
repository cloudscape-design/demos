// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import Page from '../page/app-layout-page-object';
import TableFilteringPageObject from '../page/table-filtering-page-object';
import TablePropertyFilteringPageObject from '../page/table-property-filtering-page-object';
import { SetupTest } from './table/table-tests';

type PageWithFlash = TablePropertyFilteringPageObject | TableFilteringPageObject | Page;

export default function commonFlashTests<T extends PageWithFlash>(setupTest: SetupTest<T>) {
  describe('Common Flash Test', () => {
    test(
      'Initial layout shows flash message and dismisses properly',
      setupTest(async page => {
        await expect(page.isLastFlashVisible()).resolves.toBe(true);
        await page.dismissLastFlash();
        await expect(page.isLastFlashVisible()).resolves.toBe(false);
      }),
    );
  });
}
