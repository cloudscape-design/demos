// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import examplesList from '../examples-list.json' with { type: 'json' };
import { writeFileAsync } from './utils/fsAsync.js';
import config from './config.js';

function loadManifest() {
  const manifestPath = path.join(config.outputPath, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`${manifestPath} not found; run the Vite build (npm run build) first`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

// The manifest (written by vite.config.mjs, or built in memory by the dev server) maps `<page>.js` to the page's entry
// module and `<page>.css` to the list of stylesheets that entry needs.
const frameworkUtils = {
  initialMarkup: `<div id="app"></div>`,
  getStyles(pageName, manifest) {
    return (manifest[`${pageName}.css`] ?? []).map(href => `<link href="${href}" rel="stylesheet">`).join('\n    ');
  },
  getScripts(pageName, manifest) {
    return `<script type="module" src="${manifest[`${pageName}.js`]}"></script>`;
  },
};

function applyTheme(filename, extension) {
  return `${filename}.${extension}`;
}

/**
 * The HTML of one demo page.
 * @param {string} pageName file name of the page, without `.html`
 * @param {{ title: string }} page entry of examples-list.json
 * @param {Record<string, string | string[]>} manifest `<page>.js` entry module and `<page>.css` stylesheets
 */
export function getPageContent(pageName, { title }, manifest) {
  const systemName = 'Cloudscape';
  const pageTitle = `${systemName} Demos - ${title}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <title>${pageTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    ${frameworkUtils.getStyles(pageName, manifest)}
</head>
<!-- this class is not needed in production, only for testing -->
<body class="awsui-visual-refresh">
<div id="b">
    <header class="custom-main-header" id="h">
        <ul class="menu-list awsui-context-top-navigation">
            <li class="title"><a href="index.html">Cloudscape Demos</a></li>
        </ul>
    </header>
    ${frameworkUtils.initialMarkup}
</div>
<script src="./libs/fake-server.js"></script>
${frameworkUtils.getScripts(pageName, manifest)}
</body>
</html>
`;
}

/** The HTML of the index page, linking every demo. */
export function getIndexContent() {
  const links = examplesList
    .map(example => `<li><a href="${applyTheme(example.path, 'html')}">${example.title}</a></li>`)
    .join('\n');
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Cloudscape Demos - index</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    </head>
    <body>
      <ul>${links}</ul>
    </body>
  </html>
  `;
}

function generateIndexFile() {
  const filePath = path.join(config.outputPath, 'index.html');
  return writeFileAsync(filePath, getIndexContent());
}

function generateHtmlFile(page, manifest) {
  const pageName = page.path.split('/').pop();
  const content = getPageContent(pageName, page, manifest);
  const filePath = path.join(config.outputPath, applyTheme(pageName, 'html'));
  return writeFileAsync(filePath, content);
}

async function main() {
  const manifest = loadManifest();
  await Promise.all(examplesList.map(page => generateHtmlFile(page, manifest)));
  await generateIndexFile();
}

// Run as a script (`node ./scripts/generate-html-files`, without the extension), not when vite.config.mjs imports it.
// Real paths, because the checkout may be reached through a symlink.
function isInvokedDirectly() {
  if (!process.argv[1]) {
    return false;
  }
  const invoked = [process.argv[1], `${process.argv[1]}.js`].map(file => path.resolve(file)).find(fs.existsSync);
  return invoked !== undefined && fs.realpathSync(invoked) === fs.realpathSync(fileURLToPath(import.meta.url));
}

if (isInvokedDirectly()) {
  main().catch(error => {
    console.error(error.message);
    process.exit(1);
  });
}
