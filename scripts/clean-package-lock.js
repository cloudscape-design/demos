#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const fs = require('fs');

/**
 * Remove specific @cloudscape-design/* packages that are installed by the local path and cannot
 * be resolved.
 */
const filename = require.resolve('../package-lock.json');
const packageLock = require(filename);

if (packageLock.lockfileVersion !== 2) {
  throw new Error('package-lock.json must have "lockfileVersion": 2');
}

function unlock(packages) {
  Object.keys(packages).forEach(dependencyName => {
    if (dependencyName.includes('@cloudscape-design/')) {
      delete packages[dependencyName];
    }
  });

  return packages;
}

packageLock.packages = unlock(packageLock.packages);
packageLock.dependencies = unlock(packageLock.dependencies);

fs.writeFileSync(filename, JSON.stringify(packageLock, null, 2) + '\n');
console.log('Removed @cloudscape-design/ dependencies from package-lock file');
