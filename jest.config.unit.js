// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.ts'],
  collectCoverage: true,
  // For cloudscape-design/demos, where all unit tests are excluded
  passWithNoTests: true,
};
