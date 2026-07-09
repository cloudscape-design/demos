#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Can be used in postinstall script like so:
// "postinstall": "node ./scripts/install-peer-dependency.js collection-hooks:property-filter-token-groups"
// where "collection-hooks" is the package to fetch and "property-filter-token-groups" is the branch name in GitHub.

import { execSync } from 'child_process';
import process from 'node:process';
import os from 'os';
import path from 'path';

const getModules = packageName => {
  switch (packageName) {
    case 'components':
      return ['components', 'design-tokens'];
    case 'theming-core':
      return ['theming-build', 'theming-runtime'];
    case 'test-utils':
      return ['test-utils-core', 'test-utils-converter'];
    default:
      return [packageName];
  }
};

const getArtifactPath = moduleName => {
  switch (moduleName) {
    case 'components':
      return '/lib/components/*';
    case 'design-tokens':
      return '/lib/design-tokens/*';
    case 'board-components':
      return '/lib/components/*';
    case 'theming-build':
      return '/lib/node/*';
    case 'theming-runtime':
      return '/lib/browser/*';
    case 'test-utils-core':
      return '/lib/core/*';
    case 'test-utils-converter':
      return '/lib/converter/*';
    default:
      return '/lib/*';
  }
};

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: install-peer-dependency.js <package-name>:<target-branch>');
  process.exit(1);
}
const [packageName, targetBranch] = args[0].split(':');
const targetRepository = `https://github.com/cloudscape-design/${packageName}.git`;
const nodeModulesPath = path.join(process.cwd(), 'node_modules', '@cloudscape-design');
const tempDir = path.join(os.tmpdir(), `temp-${packageName}`);

// Clone the repository and checkout the branch. Remove any leftover temp dir
// from a previous (possibly failed) run first so the clone is idempotent.
console.log(`Cloning ${packageName}:${targetBranch}...`);
execCommand(`rm -rf ${tempDir}`);
execCommand(`git clone ${targetRepository} ${tempDir}`);
process.chdir(tempDir);
execCommand(`git checkout ${targetBranch}`);

// Install dependencies and build
console.log(`Installing dependencies and building ${packageName}...`);
execCommand('npm install');

// The components one-theme build only emits the One Theme token values when
// INCLUDE_ONE_THEME is set. This flag is what tells the components build to pass
// the One Theme theme id to buildThemedComponents, so the resulting artifacts
// carry the `.awsui-one-theme`-scoped token values we activate at runtime.
//
// For components we use `quick-build` rather than the full `build`: the full
// build runs release gates (size-limit, docs, tests), and the extra One Theme
// token values push widget-exports past the configured size-limit, aborting the
// build. `quick-build` produces the same `lib/` artifacts without those gates.
const isComponents = packageName === 'components';
const buildEnv = isComponents ? { INCLUDE_ONE_THEME: 'true' } : {};
const buildCommand = isComponents ? 'npm run quick-build' : 'npm run build';
execCommand(buildCommand, { env: { ...process.env, ...buildEnv } });

// Remove existing peer dependency in node_modules
for (const moduleName of getModules(packageName)) {
  const modulePath = path.join(nodeModulesPath, moduleName);
  const artifactPath = getArtifactPath(moduleName);

  console.log(`Removing existing ${moduleName} from node_modules...`, modulePath);
  execCommand(`rm -rf ${modulePath}`);

  // Copy built peer dependency to node_modules
  console.log(`Copying built ${moduleName} to node_modules...`, modulePath, `${tempDir}${artifactPath}`);
  execCommand(`mkdir -p ${modulePath}`);
  execCommand(`cp -R ${tempDir}${artifactPath} ${modulePath}`);
}

// Clean up
console.log('Cleaning up...');
execCommand(`rm -rf ${tempDir}`);

console.log(`${packageName} has been successfully installed from branch ${targetBranch}!`);

function execCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Stdout: ${error.stdout && error.stdout.toString()}`);
    console.error(`Stderr: ${error.stderr && error.stderr.toString()}`);
    throw error;
  }
}
