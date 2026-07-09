#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Migration script to convert pages from global drawer plugin to split panel
 *
 * This script:
 * 1. Removes WithGlobalDrawer wrapper from index.tsx files
 * 2. Adds split panel imports and hooks to root.tsx files
 * 3. Adds split panel props to CustomAppLayout
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');

// Pages to skip (already migrated or special cases)
const skipPages = ['cards', 'commons', 'split-panel-comparison', 'split-panel-multiple'];

function migrateIndexFile(indexPath) {
  let content = fs.readFileSync(indexPath, 'utf8');

  // Remove WithGlobalDrawer import
  content = content.replace(
    /import\s+{\s*WithGlobalDrawer\s*}\s+from\s+['"]\.\.\/commons\/common-components['"];?\n?/g,
    '',
  );

  // Remove WithGlobalDrawer wrapper
  content = content.replace(
    /createRoot\(document\.getElementById\(['"]app['"]\)!\)\.render\(\s*<WithGlobalDrawer>\s*<App\s*\/>\s*<\/WithGlobalDrawer>\s*\);?/g,
    "createRoot(document.getElementById('app')!).render(<App />);",
  );

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`✓ Migrated ${indexPath}`);
}

function migrateRootFile(rootPath) {
  let content = fs.readFileSync(rootPath, 'utf8');

  // Check if already has split panel
  if (content.includes('useGlobalSplitPanel') || content.includes('splitPanelOpen')) {
    console.log(`⊘ Skipped ${rootPath} (already has split panel)`);
    return;
  }

  // Add SplitPanel import if not present
  if (!content.includes('import SplitPanel')) {
    content = content.replace(
      /(import.*from\s+['"]@cloudscape-design\/components\/app-layout['"];?\n)/,
      "$1import SplitPanel from '@cloudscape-design/components/split-panel';\n",
    );
  }

  // Add split panel utilities to common-components import
  content = content.replace(
    /(import\s+{[^}]*)(}\s+from\s+['"]\.\.\/commons\/common-components['"])/,
    (match, p1, p2) => {
      if (!p1.includes('GlobalSplitPanelContent')) {
        return p1 + ',\n  GlobalSplitPanelContent,\n  useGlobalSplitPanel' + p2;
      }
      return match;
    },
  );

  // Add hook call in App component
  content = content.replace(
    /(export\s+(?:function|const)\s+App\s*=\s*\([^)]*\)\s*(?:=>)?\s*{[\s\S]*?)(const\s+\[toolsOpen)/,
    '$1const { splitPanelOpen, onSplitPanelToggle, splitPanelSize, onSplitPanelResize } = useGlobalSplitPanel();\n  $2',
  );

  // Add split panel props to CustomAppLayout
  content = content.replace(
    /(onToolsChange=\{[^}]+}\}[\s\n]*)/,
    `$1splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={onSplitPanelToggle}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={onSplitPanelResize}
        splitPanel={
          <SplitPanel header="Design exploration">
            <GlobalSplitPanelContent />
          </SplitPanel>
        }
        `,
  );

  fs.writeFileSync(rootPath, content, 'utf8');
  console.log(`✓ Migrated ${rootPath}`);
}

function migratePage(pageName) {
  const pageDir = path.join(pagesDir, pageName);
  const indexPath = path.join(pageDir, 'index.tsx');
  const rootPath = path.join(pageDir, 'root.tsx');
  const appPath = path.join(pageDir, 'app.tsx');

  try {
    // Migrate index.tsx if it exists
    if (fs.existsSync(indexPath)) {
      migrateIndexFile(indexPath);
    }

    // Migrate root.tsx or app.tsx if they exist
    if (fs.existsSync(rootPath)) {
      migrateRootFile(rootPath);
    } else if (fs.existsSync(appPath)) {
      migrateRootFile(appPath);
    }
  } catch (error) {
    console.error(`✗ Error migrating ${pageName}:`, error.message);
  }
}

// Get all page directories
const pages = fs.readdirSync(pagesDir).filter(name => {
  const stat = fs.statSync(path.join(pagesDir, name));
  return stat.isDirectory() && !skipPages.includes(name);
});

console.log(`Found ${pages.length} pages to migrate\n`);

pages.forEach(pageName => {
  console.log(`\nMigrating ${pageName}...`);
  migratePage(pageName);
});

console.log('\n✓ Migration complete!');
console.log('\nNext steps:');
console.log('1. Review the changes with git diff');
console.log('2. Test the pages to ensure split panel works correctly');
console.log('3. Remove the old global drawer files:');
console.log('   - src/pages/commons/global-drawer-plugin.tsx');
console.log('   - src/pages/commons/with-global-drawer.tsx');
console.log('   - src/common/mount.tsx');
