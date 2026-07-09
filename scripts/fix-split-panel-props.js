#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Fix script to add missing split panel hook calls and props
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const skipPages = ['commons', 'split-panel-comparison', 'split-panel-multiple'];

function addSplitPanelToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has split panel props
  if (content.includes('splitPanelOpen=') || content.includes('splitPanel=')) {
    console.log(`⊘ Skipped ${filePath} (already has split panel)`);
    return false;
  }

  // Check if has useGlobalSplitPanel import
  if (!content.includes('useGlobalSplitPanel')) {
    console.log(`⊘ Skipped ${filePath} (no useGlobalSplitPanel import)`);
    return false;
  }

  // Add hook call after toolsOpen state
  const hookCall =
    '  const { splitPanelOpen, onSplitPanelToggle, splitPanelSize, onSplitPanelResize } = useGlobalSplitPanel();';

  // Try to add after toolsOpen declaration
  if (content.includes('const [toolsOpen, setToolsOpen]')) {
    content = content.replace(/(const \[toolsOpen, setToolsOpen\][^\n]*\n)/, `$1${hookCall}\n`);
  } else if (content.includes('useState(false);') && content.includes('toolsOpen')) {
    // Alternative pattern
    content = content.replace(/(const \[toolsOpen[^\n]*\n)/, `$1${hookCall}\n`);
  }

  // Add split panel props before content prop in CustomAppLayout
  const splitPanelProps = `        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={onSplitPanelToggle}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={onSplitPanelResize}
        splitPanel={
          <SplitPanel header="Design exploration">
            <GlobalSplitPanelContent />
          </SplitPanel>
        }
`;

  // Find CustomAppLayout and add props before content=
  content = content.replace(/(\s+)(content=\{)/, `$1${splitPanelProps}$1$2`);

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function processPage(pageName) {
  const pageDir = path.join(pagesDir, pageName);
  const rootPath = path.join(pageDir, 'root.tsx');
  const appPath = path.join(pageDir, 'app.tsx');

  let fixed = false;

  try {
    if (fs.existsSync(rootPath)) {
      if (addSplitPanelToFile(rootPath)) {
        console.log(`✓ Fixed ${rootPath}`);
        fixed = true;
      }
    } else if (fs.existsSync(appPath)) {
      if (addSplitPanelToFile(appPath)) {
        console.log(`✓ Fixed ${appPath}`);
        fixed = true;
      }
    }
  } catch (error) {
    console.error(`✗ Error fixing ${pageName}:`, error.message);
  }

  return fixed;
}

const pages = fs.readdirSync(pagesDir).filter(name => {
  const stat = fs.statSync(path.join(pagesDir, name));
  return stat.isDirectory() && !skipPages.includes(name);
});

console.log(`Fixing ${pages.length} pages...\n`);

let fixedCount = 0;
pages.forEach(pageName => {
  if (processPage(pageName)) {
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} pages!`);
