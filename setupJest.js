// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/*eslint-env jest*/
const { configure } = require('@cloudscape-design/browser-test-tools/use-browser');

jest.setTimeout(90 * 1000);
configure({
  browserName: 'ChromeHeadlessIntegration',
  browserCreatorOptions: {
    seleniumUrl: `http://localhost:9515`,
  },
  webdriverOptions: {
    baseUrl: `http://localhost:9615`,
    implicitTimeout: 200,
  },
});
