// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setupJest.js'],
  globalSetup: './start-chromedriver.js',
  globalTeardown: './stop-chromedriver.js',
};
