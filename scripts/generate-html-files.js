// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';
import examplesList from '../examples-list.json' with { type: 'json' };
import { writeFileAsync } from './utils/fsAsync.js';
import config from './config.js';

const frameworkUtils = {
  initialMarkup: `<div id="app"></div>`,
  getStyles(pageName) {
    return `
        <link href="vendor.css" rel="stylesheet">
        <link href="${pageName}.css" rel="stylesheet">
      `;
  },
  getScripts(pageName) {
    return `
        <script src="vendor.js"></script>
        <script src="${pageName}.js"></script>
      `;
  },
};

function applyTheme(filename, extension) {
  return `${filename}.${extension}`;
}

function getPageContent(pageName, { title }) {
  const systemName = 'Cloudscape';
  const pageTitle = `${systemName} Demos - ${title}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <title>${pageTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    ${frameworkUtils.getStyles(pageName)}
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
${frameworkUtils.getScripts(pageName)}
</body>
</html>
`;
}

function getIndexContent() {
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

function generateHtmlFile(page) {
  const pageName = page.path.split('/').pop();
  const content = getPageContent(pageName, page);
  const filePath = path.join(config.outputPath, applyTheme(pageName, 'html'));
  return writeFileAsync(filePath, content);
}

for (const page of examplesList) {
  await generateHtmlFile(page);
  await generateIndexFile();
}
