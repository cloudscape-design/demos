#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');

function addSplitPanelPreferences(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file uses useGlobalSplitPanel
  if (!content.includes('useGlobalSplitPanel')) {
    return false;
  }

  // Check if splitPanelPreferences is already in the file
  if (content.includes('splitPanelPreferences')) {
    // Check if it's in the destructuring
    const hookPattern = /const\s+{\s*([^}]+)\s*}\s*=\s*useGlobalSplitPanel\(\)/;
    const match = content.match(hookPattern);

    if (match && !match[1].includes('splitPanelPreferences')) {
      // Add to destructuring
      const currentProps = match[1];
      const newProps = currentProps.trim() + ',\n    splitPanelPreferences';
      content = content.replace(hookPattern, `const { ${newProps} } = useGlobalSplitPanel()`);
    }

    // Check if prop is added to CustomAppLayout
    if (!content.includes('splitPanelPreferences={splitPanelPreferences}')) {
      // Add prop before splitPanel=
      const pattern = /(onSplitPanelResize=\{onSplitPanelResize\})\s*\n(\s*)(splitPanel=)/;
      if (pattern.test(content)) {
        content = content.replace(pattern, '$1\n$2splitPanelPreferences={splitPanelPreferences}\n$2$3');
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
      }
    }
    return false;
  }

  // Add splitPanelPreferences to destructuring
  const hookPattern = /const\s+{\s*([^}]+)\s*}\s*=\s*useGlobalSplitPanel\(\)/;
  const match = content.match(hookPattern);

  if (match) {
    const currentProps = match[1];
    const newProps = currentProps.trim() + ',\n    splitPanelPreferences';
    content = content.replace(hookPattern, `const { ${newProps} } = useGlobalSplitPanel()`);

    // Add prop before splitPanel=
    const pattern = /(onSplitPanelResize=\{onSplitPanelResize\})\s*\n(\s*)(splitPanel=)/;
    if (pattern.test(content)) {
      content = content.replace(pattern, '$1\n$2splitPanelPreferences={splitPanelPreferences}\n$2$3');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  return false;
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let updatedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      updatedCount += processDirectory(fullPath);
    } else if (entry.name === 'app.tsx' || entry.name === 'root.tsx') {
      if (addSplitPanelPreferences(fullPath)) {
        console.log(`✓ Updated: ${path.relative(pagesDir, fullPath)}`);
        updatedCount++;
      }
    }
  }

  return updatedCount;
}

console.log('Adding splitPanelPreferences prop to CustomAppLayout...\n');
const count = processDirectory(pagesDir);
console.log(`\n✓ Updated ${count} files`);
