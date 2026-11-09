// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const { configure } = require('@cloudscape-design/browser-test-tools/use-browser');

const webdriverPort = process.env.WEBDRIVER_PORT || '9515';
const devServerPort = process.env.DEV_SERVER_PORT || '9615';

jest.setTimeout(90 * 1000);
configure({
  browserName: 'ChromeHeadlessIntegration',
  browserCreatorOptions: {
    seleniumUrl: `http://localhost:${webdriverPort}`,
  },
  webdriverOptions: {
    baseUrl: `http://localhost:${devServerPort}`,
    implicitTimeout: 200,
  },
});
