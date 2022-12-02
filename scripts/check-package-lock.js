#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Pre commit hook to remove specific cloudscape-* related packages where we should always use the latest version.
 *
 * This hook isn't recommended for standard usage of Cloudscape components, but is part of how we keep
 * the demos package up-to-date.
 */
const fs = require('fs');
const filenames = process.argv.slice(2);

for (const filename of filenames) {
  const packageLock = require(filename);

  if (packageLock.lockfileVersion !== 2) {
    throw new Error('package-lock.json must have "lockfileVersion": 2');
  }

  Object.keys(packageLock.packages).forEach(dependencyName => {
    if (dependencyName.includes('@cloudscape-design/')) {
      delete packageLock.packages[dependencyName];
    }
  });
  fs.writeFileSync(filename, JSON.stringify(packageLock, null, 2) + '\n');
}
