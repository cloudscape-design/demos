// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { build, createServer } from 'vite';

import { createFakeServerConfig, createThemeDevConfig } from '../vite.config.mjs';
import config from './config.js';

// Usage: npm start [-- --host [address]] [--port <port>]
//   or:  node scripts/start-dev.mjs [--host [address]] [--port <port>]
// Starts the Vite dev server on config.devServerPort (9615).

const theme = 'external';

function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const [flag, inlineValue] = argv[i].split(/=(.*)/s, 2);
    const takeValue = optional => {
      if (inlineValue !== undefined) {
        return inlineValue;
      }
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        i++;
        return next;
      }
      if (optional) {
        return true;
      }
      throw new Error(`${flag} needs a value`);
    };
    if (flag === '--host') {
      options.host = takeValue(true);
    } else if (flag === '--port') {
      options.port = Number(takeValue(false));
      if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) {
        throw new Error(`Invalid --port ${argv[i]}`);
      }
    } else {
      throw new Error(`Unknown option ${argv[i]}, expected --host or --port`);
    }
  }
  return options;
}

/**
 * Builds the fake server and the static copies in watch mode, so edits to them reach the browser on reload.
 * Resolves with the watcher once the first build is written; a failing first build rejects.
 */
async function watchStaticFiles(buildConfig) {
  const watcher = await build({ ...buildConfig, build: { ...buildConfig.build, watch: {} } });
  let initialBuild = true;
  await new Promise((resolve, reject) => {
    watcher.on('event', async event => {
      if (event.code === 'BUNDLE_END') {
        await event.result.close();
        if (!initialBuild) {
          console.log('Rebuilt the fake server and static files');
        }
        initialBuild = false;
        resolve();
      } else if (event.code === 'ERROR') {
        await event.result?.close();
        if (initialBuild) {
          await watcher.close();
          reject(event.error);
        } else {
          console.error(`Fake server build failed: ${event.error.message}`);
        }
      }
    });
  });
  return watcher;
}

async function main() {
  const { host, port = config.devServerPort } = parseArgs(process.argv.slice(2));
  console.log('Building the fake server and static files...');
  const watcher = await watchStaticFiles(createFakeServerConfig([theme]));
  const server = await createServer(createThemeDevConfig(theme, { host, port, strictPort: true }));
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, async () => {
      await Promise.all([server.close(), watcher.close()]);
      process.exit(0);
    });
  }
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
