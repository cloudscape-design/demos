#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Rebuild Cloudscape sibling packages against the freshly-built design-tokens
// that install-peer-dependency.js just dropped into demos' node_modules.
//
// This is required for theming to flow through. These packages compile their
// SCSS against design-tokens, and the resulting CSS custom property names carry
// a hash of that token source. A registry build therefore emits names like
// `--color-background-container-content-0odjoo` while our One Theme components
// build defines `--color-background-container-content-mjfil9`. Nothing
// resolves, so the package silently falls back to its compiled-in light
// defaults and ignores both One Theme and dark mode. The visible symptom was
// the code view in the chat demo keeping a light background in dark mode.
//
// Usage:
//   node ./scripts/install-themed-peer-packages.js <package>[:<branch>] ...
// Branch defaults to main. Example:
//   node ./scripts/install-themed-peer-packages.js chat-components code-view:main

import { execSync } from 'child_process';
import fs from 'node:fs';
import process from 'node:process';
import os from 'os';
import path from 'path';

// Where each package leaves its built component output, relative to its repo root.
const BUILD_OUTPUT = {
  'chat-components': path.join('lib', 'components'),
  'code-view': path.join('lib', 'components'),
  'board-components': path.join('lib', 'components'),
  'chart-components': path.join('lib', 'components'),
};

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('Usage: install-themed-peer-packages.js <package>[:<branch>] ...');
  process.exit(1);
}

const demosNodeModules = path.join(process.cwd(), 'node_modules', '@cloudscape-design');
const freshDesignTokens = path.join(demosNodeModules, 'design-tokens');

if (!fs.existsSync(freshDesignTokens)) {
  console.error(
    `Expected ${freshDesignTokens} to exist. Run install-peer-dependency.js for @cloudscape-design/components first.`,
  );
  process.exit(1);
}

for (const target of targets) {
  const [packageName, branch = 'main'] = target.split(':');
  const buildOutput = BUILD_OUTPUT[packageName];
  if (!buildOutput) {
    console.error(`Unknown package "${packageName}". Add its build output path to BUILD_OUTPUT in this script first.`);
    process.exit(1);
  }
  rebuild(packageName, branch, buildOutput);
}

function rebuild(packageName, branch, buildOutput) {
  const repoUrl = `https://github.com/cloudscape-design/${packageName}.git`;
  const tempDir = path.join(os.tmpdir(), `temp-${packageName}`);

  // Clean slate
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`\n=== ${packageName}:${branch} ===`);
  console.log(`Cloning ${packageName}:${branch}...`);
  run(`git clone --depth 1 --branch ${branch} ${repoUrl} ${tempDir}`);

  console.log(`Installing ${packageName} dev dependencies...`);
  // No postinstall loops -- these packages' own postinstall just runs
  // `prepare-package-lock`, which is fine.
  run('npm install', { cwd: tempDir });

  // Replace the package's design-tokens with the freshly-built one. SCSS `@use`
  // resolves design-tokens from this path, so the hashed CSS var names compile
  // to match components' base CSS.
  const targetDesignTokens = path.join(tempDir, 'node_modules', '@cloudscape-design', 'design-tokens');
  console.log(`Overriding ${packageName}'s design-tokens with ${freshDesignTokens}`);
  fs.rmSync(targetDesignTokens, { recursive: true, force: true });
  fs.mkdirSync(targetDesignTokens, { recursive: true });
  run(`cp -R ${freshDesignTokens}/. ${targetDesignTokens}/`);

  console.log(`Building ${packageName}...`);
  // Some packages run release gates in `postbuild` (size-limit), which the
  // extra One Theme token values can push past their configured budget. The
  // gate runs after the artifacts are already emitted, so treat a build failure
  // as fatal only when the output is missing.
  const builtDir = path.join(tempDir, buildOutput);
  try {
    run('npm run build', { cwd: tempDir });
  } catch (error) {
    if (!fs.existsSync(builtDir)) {
      throw error;
    }
    console.warn(`  ${packageName}: build command failed but ${buildOutput} exists -- continuing.`);
  }

  const destDir = path.join(demosNodeModules, packageName);
  console.log(`Replacing ${destDir} with freshly-built ${packageName}`);
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true });
  run(`cp -R ${builtDir}/. ${destDir}/`);

  console.log('Cleaning up...');
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`${packageName} (${branch}) has been rebuilt against the freshly-built design-tokens and installed.`);
}

function run(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    throw error;
  }
}
