// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

export default (setupTest: { (testFn: { (page: any): Promise<void> }): any }) => {
  describe('Legal disclaimer', () => {
    if (process.env.EXTERNAL_SITE) {
      test(
        'Should show legal disclaimer on external demos',
        setupTest(async page => {
          const flashbarContent = await page.getText(
            createWrapper().findFlashbar().findItems().get(1).findContent().toSelector()
          );

          expect(flashbarContent).toEqual(
            'This demo is an example of Cloudscape Design System patterns and components, and may not reflect the current patterns and components of AWS services.'
          );
        })
      );
    }
  });
};
