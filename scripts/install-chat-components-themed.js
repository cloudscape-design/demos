#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Rebuild @cloudscape-design/chat-components against the freshly-built
// design-tokens that install-peer-dependency.js just dropped into
// demos' node_modules. This is required for theming to flow through:
// chat-components' CSS var names include hashes that are only stable
// when both chat-components and components are built against the same
// design-tokens source. Without this, chat-components falls back to
// its compiled-in defaults and ignores applyTheme overrides.
//
// Usage:
//   node ./scripts/install-chat-components-themed.js [<branch>]
// Default branch: main

import { execSync } from 'child_process';
import fs from 'node:fs';
import process from 'node:process';
import os from 'os';
import path from 'path';

const branch = process.argv[2] ?? 'main';
const repoUrl = 'https://github.com/cloudscape-design/chat-components.git';
const demosNodeModules = path.join(process.cwd(), 'node_modules', '@cloudscape-design');
const freshDesignTokens = path.join(demosNodeModules, 'design-tokens');
const tempDir = path.join(os.tmpdir(), `temp-chat-components`);

if (!fs.existsSync(freshDesignTokens)) {
  console.error(
    `Expected ${freshDesignTokens} to exist. Run install-peer-dependency.js for @cloudscape-design/components first.`,
  );
  process.exit(1);
}

// Clean slate
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`Cloning chat-components:${branch}...`);
run(`git clone --depth 1 --branch ${branch} ${repoUrl} ${tempDir}`);

console.log('Installing chat-components dev dependencies...');
// No postinstall loops — chat-components itself has a postinstall that
// runs `prepare-package-lock`, which is fine.
run('npm install', { cwd: tempDir });

// Replace chat-components' design-tokens with the freshly-built one.
// SCSS `@use` in chat-components resolves design-tokens from this path,
// so the hashed CSS var names compile to match components' base CSS.
const targetDesignTokens = path.join(tempDir, 'node_modules', '@cloudscape-design', 'design-tokens');
console.log(`Overriding chat-components' design-tokens with ${freshDesignTokens}`);
fs.rmSync(targetDesignTokens, { recursive: true, force: true });
fs.mkdirSync(targetDesignTokens, { recursive: true });
run(`cp -R ${freshDesignTokens}/. ${targetDesignTokens}/`);

console.log('Building chat-components...');
run('npm run build', { cwd: tempDir });

const builtDir = path.join(tempDir, 'lib', 'components');
const destDir = path.join(demosNodeModules, 'chat-components');
console.log(`Replacing ${destDir} with freshly-built chat-components`);
fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });
run(`cp -R ${builtDir}/. ${destDir}/`);

console.log('Cleaning up...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`chat-components (${branch}) has been rebuilt against the freshly-built design-tokens and installed.`);

function run(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    throw error;
  }
}
