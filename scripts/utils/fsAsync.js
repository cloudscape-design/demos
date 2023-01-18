// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const fs = require('node:fs/promises');
const path = require('node:path');

const writeFileAsync = async (...args) => {
  await fs.mkdir(path.dirname(args[0]), { recursive: true });
  return fs.writeFile(...args);
};

module.exports = {
  writeFileAsync,
};
