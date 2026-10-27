#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Can be used in postinstall script like so:
// "postinstall": "node ./scripts/install-peer-dependency.js collection-hooks:property-filter-token-groups"
// where "collection-hooks" is the package to fetch and "property-filter-token-groups" is the branch name in GitHub.

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'node:fs';
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
  const packageJsonBackupPath = path.join(tempDir, `${moduleName}-package.json`);

  // Preserve the registry package metadata (especially its published version)
  // while replacing its implementation with the custom source build.
  execCommand(`cp ${modulePath}/package.json ${packageJsonBackupPath}`);

  console.log(`Removing existing ${moduleName} from node_modules...`, modulePath);
  execCommand(`rm -rf ${modulePath}`);

  console.log(`Copying built ${moduleName} to node_modules...`, modulePath, `${tempDir}${artifactPath}`);
  execCommand(`mkdir -p ${modulePath}`);
  execCommand(`cp -R ${tempDir}${artifactPath} ${modulePath}`);
  execCommand(`cp ${packageJsonBackupPath} ${modulePath}/package.json`);

  // We restore the registry package.json to preserve its published version, but
  // its `sideEffects` list describes the registry artifacts — not the custom
  // source build we just copied in. When the build introduces new side-effectful
  // modules (e.g. the One Theme build's `internal/base-theme/styles.css.js`,
  // which is imported for its CSS side effect but exports nothing used), the
  // restored list omits them, so webpack tree-shakes the module away in a
  // production build and its token CSS silently disappears from the bundle.
  // Reconcile the restored manifest's `sideEffects` with the source build so it
  // matches the artifacts actually installed. Only do this for the primary
  // package, whose source manifest lives at the cloned repo root; sibling
  // modules (e.g. design-tokens emitted from the same repo) have their own
  // manifests and are left untouched.
  if (moduleName === packageName) {
    reconcileSideEffects(path.join(modulePath, 'package.json'), path.join(tempDir, 'package.json'));
  }
}

// Clean up
console.log('Cleaning up...');
execCommand(`rm -rf ${tempDir}`);

console.log(`${packageName} has been successfully installed from branch ${targetBranch}!`);

// Reconcile the restored (registry) manifest's `sideEffects` with the source
// build's declaration so it correctly describes the artifacts we just copied
// in. Preserves everything else in the restored manifest (notably its published
// `version`).
//
// Webpack uses `sideEffects` to decide which imported-only modules it may prune
// in a production build. The registry allowlist can under-describe a custom
// source build: for example, the One Theme build added `internal/base-theme/
// styles.css.js` (imported purely for its token CSS side effect, exporting
// nothing used), but that module is absent from the registry list, so webpack
// tree-shakes it away and every token value silently drops out of the bundle.
//
// - Source declares an array  -> union it into the restored list (source is
//   authoritative about its own artifacts).
// - Source declares no field  -> webpack's safe default (every module is
//   side-effectful); remove the restored allowlist so we don't over-prune.
// - Any other form            -> leave the restored manifest untouched.
function reconcileSideEffects(targetManifestPath, sourceManifestPath) {
  let target;
  let source;
  try {
    target = JSON.parse(readFileSync(targetManifestPath, 'utf8'));
    source = JSON.parse(readFileSync(sourceManifestPath, 'utf8'));
  } catch (error) {
    console.warn(`Skipping sideEffects reconciliation: could not read manifests (${error.message})`);
    return;
  }

  const hasField = Object.prototype.hasOwnProperty.call(source, 'sideEffects');

  if (!hasField) {
    if (target.sideEffects === undefined) {
      return; // Already matches the safe default.
    }
    delete target.sideEffects;
    writeFileSync(targetManifestPath, JSON.stringify(target, null, 2) + '\n');
    console.log(
      `Removed stale sideEffects from ${targetManifestPath}; source build declares none, so webpack keeps all module side effects.`,
    );
    return;
  }

  if (!Array.isArray(source.sideEffects)) {
    return; // Boolean/other form: don't guess.
  }

  const targetSideEffects = Array.isArray(target.sideEffects) ? target.sideEffects : [];
  const merged = [...targetSideEffects];
  for (const entry of source.sideEffects) {
    if (!merged.includes(entry)) {
      merged.push(entry);
    }
  }
  if (merged.length === targetSideEffects.length) {
    return; // Nothing new to add.
  }
  target.sideEffects = merged;
  writeFileSync(targetManifestPath, JSON.stringify(target, null, 2) + '\n');
  console.log(`Updated sideEffects in ${targetManifestPath} to match the source build.`);
}

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
