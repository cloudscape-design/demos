// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { promisify } = require('util');

const writeFileAsync = async (...args) => {
  await mkdirp(path.dirname(args[0]));
  return promisify(fs.writeFile)(...args);
};

module.exports = {
  writeFileAsync,
};
