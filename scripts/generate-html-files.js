// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const path = require('path');
const { writeFileAsync } = require('./utils/fsAsync');
const { runAsyncTask } = require('./utils/runAsyncTask');
const { outputPath } = require('./config');
const examplesList = require('../examples-list');

function getPageContent(pageName, { title }) {
  return createHtml({
    title,
    headImports: `<link href="${pageName}.css" rel="stylesheet">`,
    bodyImports: `<script src="${pageName}.js"></script>`,
    bodyContent: `<header class="custom-main-header" id="h">
      <ul class="menu-list awsui-context-top-navigation">
        <li class="title"><a href="index.html">Cloudscape Demos</a></li>
      </ul>
    </header>
    <div id="app"></div>`,
  });
}

function getIndexContent() {
  const links = examplesList.map(example => `<li><a href="${example.path}.html">${example.title}</a></li>`).join('\n');
  return createHtml({
    title: 'index',
    headImports: '',
    bodyImports: '',
    bodyContent: `<ul>
      ${links}
    </ul>`,
  });
}

function createHtml({ title, headImports, bodyImports, bodyContent }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cloudscape Demos - ${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="vendor.css" rel="stylesheet">
    ${headImports}
  </head>
  <body id="b">
    ${bodyContent}
    <script src="libs/fake-server.js"></script>
    <script src="vendor.js"></script>
    ${bodyImports}
  </body>
</html>`;
}

function generateHtmlFile(page) {
  const pageName = page.path.split('/').pop();
  const content = getPageContent(pageName, page);
  const filePath = path.join(outputPath, `${pageName}.html`);
  return writeFileAsync(filePath, content);
}

function generateIndexFile() {
  const filePath = path.join(outputPath, 'index.html');
  return writeFileAsync(filePath, getIndexContent());
}

const generateHtmlFiles = () => {
  const promises = [];
  for (const page of examplesList) {
    promises.push(generateHtmlFile(page));
  }
  promises.push(generateIndexFile());

  return Promise.all(promises);
};

runAsyncTask(generateHtmlFiles);
