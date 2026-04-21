#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Script to add WithGlobalDrawer wrapper to all page index files

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');

// Pages that already have the wrapper or have special handling
const skipPages = ['cards', 'components-overview', 'commons'];

function updateIndexFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has WithGlobalDrawer
  if (content.includes('WithGlobalDrawer')) {
    console.log(`Skipping ${filePath} - already updated`);
    return false;
  }

  let updated = content;

  // Add WithGlobalDrawer to imports from common-components
  if (content.includes("from '../commons/common-components'")) {
    updated = updated.replace(/(from ['"]\.\.\/commons\/common-components['"])/, match => {
      const importLine = content.match(/import\s+{([^}]+)}\s+from\s+['"]\.\.\/commons\/common-components['"]/);
      if (importLine && !importLine[1].includes('WithGlobalDrawer')) {
        return match.replace(/import\s+{([^}]+)}/, (m, imports) => `import { ${imports.trim()}, WithGlobalDrawer }`);
      }
      return match;
    });
  } else if (content.includes("from '../commons'")) {
    // Add import if only importing from commons
    updated = updated.replace(
      /(import\s+{[^}]+}\s+from\s+['"]\.\.\/commons['"];)/,
      `$1\nimport { WithGlobalDrawer } from '../commons/common-components';`,
    );
  } else {
    // Add new import line
    const lastImportIndex = updated.lastIndexOf('import ');
    const endOfLine = updated.indexOf('\n', lastImportIndex);
    updated =
      updated.slice(0, endOfLine + 1) +
      "import { WithGlobalDrawer } from '../commons/common-components';\n" +
      updated.slice(endOfLine + 1);
  }

  // Wrap the render call with WithGlobalDrawer
  // Handle simple case: render(<App />)
  updated = updated.replace(
    /createRoot\(document\.getElementById\(['"]app['"]\)!\)\.render\(<App\s*\/>\);/,
    `createRoot(document.getElementById('app')!).render(\n  <WithGlobalDrawer>\n    <App />\n  </WithGlobalDrawer>\n);`,
  );

  // Handle case with props: render(<App prop={value} />)
  updated = updated.replace(
    /createRoot\(document\.getElementById\(['"]app['"]\)!\)\.render\(<App\s+([^>]+)\/>\);/,
    `createRoot(document.getElementById('app')!).render(\n  <WithGlobalDrawer>\n    <App $1/>\n  </WithGlobalDrawer>\n);`,
  );

  // Handle multiline render with existing wrapper (like onboarding)
  updated = updated.replace(
    /createRoot\(document\.getElementById\(['"]app['"]\)!\)\.render\(\s*\n\s*<(\w+)>\s*\n\s*<App>/,
    (match, wrapper) => {
      if (wrapper !== 'WithGlobalDrawer') {
        return `createRoot(document.getElementById('app')!).render(\n  <WithGlobalDrawer>\n    <${wrapper}>\n      <App>`;
      }
      return match;
    },
  );

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated ${filePath}`);
    return true;
  }

  console.log(`No changes needed for ${filePath}`);
  return false;
}

async function main() {
  const indexFiles = await glob('**/index.tsx', { cwd: pagesDir, absolute: true });

  let updatedCount = 0;
  for (const file of indexFiles) {
    const pageName = path.basename(path.dirname(file));
    if (skipPages.includes(pageName)) {
      console.log(`Skipping ${pageName} (in skip list)`);
      continue;
    }

    const wasUpdated = updateIndexFile(file);
    if (wasUpdated) {
      updatedCount++;
    }
  }

  console.log(`\nCompleted! Updated ${updatedCount} files.`);
}

main().catch(console.error);
