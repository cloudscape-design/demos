// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const { startWebdriver } = require('@cloudscape-design/browser-test-tools/chrome-launcher');

module.exports = async () => {
  await startWebdriver();
};
