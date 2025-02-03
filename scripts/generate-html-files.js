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
      <div class="mode-changer">
          <label>
            <input type="radio" name="colorModeOption" value="light-mode" checked>
            Light
          </label>
  
          <label>
            <input type="radio" name="colorModeOption" value="dark-mode">
            Dark
          </label>
        </div>
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
  // `awsui-visual-refresh` class is added for our internal tests. It is not needed in real use-cases.
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cloudscape Demos - ${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="vendor.css" rel="stylesheet">
    <style>
    .custom-main-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .mode-changer {
      display: flex;
      align-items: center;
      color: white;
      font-size: 12px;
      padding-right: 20px;
    }
    .mode-changer label {
      display: flex;
      align-items: center;
      margin-inline: 4px;
    }
  </style>
    ${headImports}
  </head>
  <body id="b" class="awsui-visual-refresh">
    ${bodyContent}
    <script src="libs/fake-server.js"></script>
    <script src="vendor.js"></script>
    <script>

    const element = document.getElementById("b");

    document.addEventListener("DOMContentLoaded", () => {
      const element = document.getElementById("b");

      //////// Light mode vs. Dark mode
      const colorModeRadioButtons = document.getElementsByName("colorModeOption");

      // Apply the appropriate class to the body tag on page load
      const initialColorMode = Array.from(colorModeRadioButtons).find(radio => radio.checked).value;
      toggleBodyColorMode(initialColorMode);

      // Add event listeners for color mode radio buttons
      colorModeRadioButtons.forEach((radio) => {
        radio.addEventListener("change", () => toggleBodyColorMode(radio.value));
      });

      function toggleBodyColorMode(option) {
        element.classList.remove("awsui-light-mode", "awsui-dark-mode"); // Remove existing class names
        switch (option) {
          case "light-mode":
            element.classList.add("awsui-light-mode");
            break;
          case "dark-mode":
            element.classList.add("awsui-dark-mode");
            break;
          default:
            break;
        }
      }
      });
      </script>
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
