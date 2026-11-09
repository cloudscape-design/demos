// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  setupFilesAfterEnv: ['./setupJest.js'],
  globalSetup: './start-chromedriver.js',
  globalTeardown: './stop-chromedriver.js',
  maxWorkers: process.env.E2E_MAX_WORKERS || '50%',
};
