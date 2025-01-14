// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/*eslint-env jest*/
const { configure } = require('@cloudscape-design/browser-test-tools/use-browser');
const { devServerPort } = require('./scripts/config');

jest.setTimeout(90 * 1000);
configure({
  browserName: 'ChromeHeadlessIntegration',
  browserCreatorOptions: {
    seleniumUrl: `http://localhost:9515`,
  },
  webdriverOptions: {
    baseUrl: `http://localhost:${devServerPort}`,
    implicitTimeout: 200,
  },
});
