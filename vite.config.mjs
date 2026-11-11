// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import examplesList from './examples-list.json' with { type: 'json' };
import { getIndexContent, getPageContent } from './scripts/generate-html-files.js';
import themes from './themes.config.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(root, 'src');
const outputRoot = path.resolve(root, process.env.OUTPUT_PATH || 'lib');
const require = createRequire(import.meta.url);

const browserTarget = ['chrome130', 'edge130', 'firefox132', 'safari17'];
const ENTRY_PREFIX = '\0examples-entry:';

function pageName(example) {
  return example.path.split('/').pop();
}

function pageEntries() {
  return Object.fromEntries(
    examplesList.map(example => [
      example.path,
      ['src/common/apply-mode.ts', 'src/common/adjust-body-padding.ts', `src/pages/${example.path}/index`].map(file =>
        path.join(root, file),
      ),
    ]),
  );
}

function resolveTheme(themeName) {
  const themeConfig = themes[themeName];
  if (!themeConfig) {
    throw new Error(`Theme ${themeName} not found in themes.config.mjs`);
  }
  return themeConfig;
}

function themeDefines(themeConfig, mode) {
  return {
    'process.env.NODE_ENV': JSON.stringify(mode),
    ...Object.fromEntries(
      Object.entries(themeConfig.environment || {}).map(([key, value]) => [
        `process.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
  };
}

/** Rolldown needs one module per input, so each page's list of entry files becomes a virtual module importing them in order. */
function multiFileEntriesPlugin(entries) {
  return {
    name: 'demos:multi-file-entries',
    enforce: 'pre',
    resolveId(id) {
      return id.startsWith(ENTRY_PREFIX) ? id : null;
    },
    load(id) {
      if (!id.startsWith(ENTRY_PREFIX)) {
        return null;
      }
      const files = entries[id.slice(ENTRY_PREFIX.length)];
      return files.map(file => `import ${JSON.stringify(file)};`).join('\n');
    },
  };
}

function banJsInPagesPlugin() {
  return {
    name: 'demos:ban-js-in-pages',
    transform(code, id) {
      if (id.startsWith(path.join(srcRoot, 'pages')) && /\.jsx?$/.test(id.split('?')[0])) {
        this.error(`${path.relative(root, id)}: demos must be TypeScript`);
      }
      return null;
    },
  };
}

/** SVG imports: a `ReactComponent` named export and a data-URL default export. */
function svgrPlugin() {
  return {
    name: 'demos:svgr',
    enforce: 'pre',
    async load(id) {
      if (!id.startsWith(srcRoot) || !id.endsWith('.svg')) {
        return null;
      }
      const [{ transform }, { transformWithOxc }] = await Promise.all([import('@svgr/core'), import('vite')]);
      const svg = fs.readFileSync(id, 'utf8');
      const component = await transform(
        svg,
        { plugins: ['@svgr/plugin-jsx'], exportType: 'named', namedExport: 'ReactComponent', jsxRuntime: 'classic' },
        { filePath: id },
      );
      const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
      const { code } = await transformWithOxc(`${component}\nexport default ${JSON.stringify(dataUrl)};`, `${id}.jsx`, {
        jsx: { runtime: 'classic' },
      });
      return { code, moduleType: 'js' };
    },
  };
}

function collectStaticCss(bundle, chunk, seen = new Set()) {
  const css = [];
  for (const imported of chunk.imports) {
    if (!seen.has(imported)) {
      seen.add(imported);
      css.push(...collectStaticCss(bundle, bundle[imported], seen));
    }
  }
  css.push(...(chunk.viteMetadata?.importedCss ?? []));
  return [...new Set(css)];
}

/** Writes manifest.json in the shape scripts/generate-html-files.js reads: `<page>.js` and the `<page>.css` list. */
function pageManifestPlugin() {
  return {
    name: 'demos:manifest',
    generateBundle(_, bundle) {
      const manifest = {};
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          manifest[`${chunk.name}.js`] = chunk.fileName;
          manifest[`${chunk.name}.css`] = collectStaticCss(bundle, chunk);
        }
      }
      this.emitFile({ type: 'asset', fileName: 'manifest.json', source: JSON.stringify(manifest, null, 2) });
    },
  };
}

/** Resolves `~@scope/package/file` Sass imports from node_modules. */
function sassTildeImporter() {
  return {
    findFileUrl(url) {
      if (!url.startsWith('~')) {
        return null;
      }
      const [scope, name, ...rest] = url.slice(1).split('/');
      const pkgDir = path.dirname(require.resolve(`${scope}/${name}/package.json`));
      return pathToFileURL(path.join(pkgDir, ...rest));
    },
  };
}

function baseConfig(themeName, mode) {
  return {
    configFile: false,
    root,
    logLevel: process.env.VITE_LOG_LEVEL || (mode === 'production' ? 'warn' : 'info'),
    mode,
    define: themeDefines(resolveTheme(themeName), mode),
    oxc: { jsx: { runtime: 'classic' } },
    css: {
      modules: {
        generateScopedName: '[path]__[local]--[hash:base64:5]',
        localsConvention: name => (name === 'default' ? '_default' : name),
      },
      preprocessorOptions: {
        scss: { importers: [sassTildeImporter()] },
      },
    },
    plugins: [multiFileEntriesPlugin(pageEntries()), svgrPlugin(), banJsInPagesPlugin()],
  };
}

/**
 * Production config of the demo pages: content-hashed entries, a vendor chunk, source maps and the manifest that
 * scripts/generate-html-files.js reads. The output goes straight into lib/, so the pages stay at lib/<page>.html.
 * @param {string} themeName key of themes.config.mjs
 * @returns {import('vite').InlineConfig}
 */
export function createThemeAppConfig(themeName) {
  const base = baseConfig(themeName, 'production');
  return {
    ...base,
    publicDir: false,
    base: './',
    plugins: [...base.plugins, pageManifestPlugin()],
    build: {
      outDir: outputRoot,
      // `npm run build` and `build:theme` both run scripts/build-vite.mjs, which deletes lib/ (buildOutputDirs) before
      // the parallel jobs start, so stale hashed bundles and maps do not pile up. Emptying here would delete sibling
      // jobs' output.
      emptyOutDir: false,
      target: browserTarget,
      cssCodeSplit: true,
      sourcemap: true,
      reportCompressedSize: false,
      assetsInlineLimit: file => !/\.woff2?$/.test(file),
      modulePreload: false,
      rolldownOptions: {
        shimMissingExports: true,
        input: Object.fromEntries(Object.keys(pageEntries()).map(name => [name, ENTRY_PREFIX + name])),
        output: {
          comments: { legal: true },
          entryFileNames: '[name].[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash][extname]',
          codeSplitting: { groups: [{ name: 'vendor', test: /node_modules/ }] },
        },
      },
    },
  };
}

function resolveSourceFile(base) {
  const candidates = [base, ...['.ts', '.tsx', '/index.ts', '/index.tsx'].map(suffix => base + suffix)];
  const file = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) {
    throw new Error(`No source file for entry ${path.relative(root, base)}`);
  }
  return file;
}

/** Serves `/<page>.html` and the index (`/` or `/index.html`), rendered by generate-html-files.js. */
function devPagesPlugin() {
  const pages = new Map(examplesList.map(page => [pageName(page), page]));
  return {
    name: 'demos:dev-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const { pathname } = new URL(req.url, 'http://localhost');
          if (pathname === '/' || pathname === '/index.html') {
            res.setHeader('Content-Type', 'text/html');
            res.end(getIndexContent());
            return;
          }
          const name = pathname.match(/^\/([^/]+)\.html$/)?.[1];
          const page = name && pages.get(name);
          if (!page) {
            next();
            return;
          }
          const manifest = { [`${name}.js`]: `/@id/__x00__${ENTRY_PREFIX.slice(1)}${page.path}` };
          const html = await server.transformIndexHtml(req.url, getPageContent(name, page, manifest));
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

/**
 * Dev-server config. Pages are rendered on request and load their entry modules unbundled; the fake server and the
 * static copies are served from lib/ (scripts/start-dev.mjs builds them first).
 * @param {string} themeName key of themes.config.mjs
 * @param {import('vite').ServerOptions} [server]
 * @returns {import('vite').InlineConfig}
 */
export function createThemeDevConfig(themeName, server = {}) {
  const base = baseConfig(themeName, 'development');
  const entryFiles = [
    ...new Set(
      Object.values(pageEntries())
        .flat()
        .map(file => path.relative(root, resolveSourceFile(file))),
    ),
  ];
  return {
    ...base,
    base: '/',
    appType: 'custom',
    publicDir: outputRoot,
    plugins: [...base.plugins, devPagesPlugin()],
    optimizeDeps: { entries: entryFiles },
    // Transforming every entry at startup finds the dependencies the scanner misses before the first page load, so
    // the browser never gets a stale pre-bundled dependency.
    server: { ...server, warmup: { clientFiles: entryFiles } },
  };
}

/**
 * The output directories that a build writes, for scripts/build-vite.mjs to empty first. The builds run in parallel
 * with `emptyOutDir: false`, so none of them may clean up after the others. All themes share lib/.
 * @returns {string[]}
 */
export function buildOutputDirs() {
  const relativeRoot = path.relative(outputRoot, root);
  // Outside only if the first segment is exactly `..` (a directory may be named `..demos`) or it is on another drive.
  if (!path.isAbsolute(relativeRoot) && relativeRoot.split(path.sep)[0] !== '..') {
    throw new Error(`Refusing to clean ${outputRoot}: it contains the package root`);
  }
  return [outputRoot];
}

/**
 * The fake-server bundle (lib/libs/fake-server.js) plus the ace (lib/libs/ace) and resources (lib/resources) copies.
 * @param {string[]} themeNames
 * @returns {import('vite').InlineConfig}
 */
export function createFakeServerConfig(themeNames) {
  const [firstTheme] = themeNames;
  const outDir = path.join(outputRoot, 'libs');
  return {
    configFile: false,
    root,
    logLevel: process.env.VITE_LOG_LEVEL || 'warn',
    publicDir: false,
    mode: 'production',
    define: themeDefines(resolveTheme(firstTheme), 'production'),
    plugins: [
      {
        name: 'demos:copy-static',
        buildStart() {
          for (const entry of fs.readdirSync(path.join(srcRoot, 'resources'), { withFileTypes: true })) {
            if (entry.isFile()) {
              this.addWatchFile(path.join(srcRoot, 'resources', entry.name));
            }
          }
        },
        closeBundle() {
          fs.cpSync(path.join(root, 'node_modules/ace-builds/src-min-noconflict'), path.join(outDir, 'ace'), {
            recursive: true,
          });
          // Top-level files of src/resources only.
          const resources = path.join(outputRoot, 'resources');
          fs.mkdirSync(resources, { recursive: true });
          for (const entry of fs.readdirSync(path.join(srcRoot, 'resources'), { withFileTypes: true })) {
            if (entry.isFile()) {
              fs.copyFileSync(path.join(srcRoot, 'resources', entry.name), path.join(resources, entry.name));
            }
          }
        },
      },
    ],
    build: {
      outDir,
      // `npm run build` and `build:theme` both run scripts/build-vite.mjs, which deletes lib/ (buildOutputDirs) before
      // the parallel jobs start, so stale hashed bundles and maps do not pile up. Emptying here would delete sibling
      // jobs' output.
      emptyOutDir: false,
      target: browserTarget,
      sourcemap: true,
      reportCompressedSize: false,
      rolldownOptions: { output: { comments: { legal: true } } },
      lib: {
        entry: path.join(srcRoot, 'fake-server/index.ts'),
        name: 'FakeServer',
        formats: ['iife'],
        fileName: () => 'fake-server.js',
      },
    },
  };
}

export default createThemeAppConfig('external');
