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
        <ul class="menu-list awsui-context-top-navigation" style="display: none;">
            <li class="title"><a href="index.html">Cloudscape Demos</a></li>
            <li>
                <label>
                    <input id="one-theme-toggle" type="checkbox" />
                    One Theme
                </label>
            </li>
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
  // Group examples by type
  const groups = {};
  for (const example of examplesList) {
    const type = example.type || 'other';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(example);
  }

  // Generate links for a group
  function renderLinks(examples) {
    return examples
      .map(example => {
        if (example.path.includes('#')) {
          const [basePath, hash] = example.path.split('#');
          return `<li><a href="${applyTheme(basePath, 'html')}#${hash}">${example.title}</a></li>`;
        }
        return `<li><a href="${applyTheme(example.path, 'html')}">${example.title}</a></li>`;
      })
      .join('\n');
  }

  // Format type name as a readable title
  function formatTitle(type) {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Build columns HTML
  const columns = Object.keys(groups)
    .map(type => {
      return `<div class="column">
          <h2>${formatTitle(type)}</h2>
          <ul>${renderLinks(groups[type])}</ul>
        </div>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Cloudscape Demos - index</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: "Amazon Ember", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #151515;
          color: #d1d5db;
          min-height: 100vh;
          padding: 48px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 32px;
          letter-spacing: -0.02em;
        }
        .wrapper {
          width: 100%;
          max-width: 960px;
        }
        .columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          width: 100%;
          max-width: 100%;
        }
        .column h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #e5e7eb;
          margin-bottom: 16px;
          padding-left: 0px;
        }
        ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        li {
          border-radius: 8px;
          transition: background 0.15s ease;
        }
        a {
          display: block;
          padding: 12px 0px;
          color: #bfbfbfff;
          text-decoration: none;
          font-size: 0.95rem;
          border-radius: 8px;
          transition: color 0.15s ease;
        }
        a:hover {
          color: #ffffff;
          text-decoration: underline;
        }
        @media (max-width: 640px) {
          .columns {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <h1>One Theme Demo</h1>
        <div class="columns">
          ${columns}
        </div>
      </div>
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
  // Skip hash-routed entries — they use the same HTML file as their base path
  if (!page.path.includes('#')) {
    await generateHtmlFile(page);
  }
  await generateIndexFile();
}
