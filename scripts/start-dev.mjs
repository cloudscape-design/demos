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

async function main() {
  const { host, port = config.devServerPort } = parseArgs(process.argv.slice(2));
  console.log('Building the fake server and static files...');
  await build(createFakeServerConfig([theme]));
  const server = await createServer(createThemeDevConfig(theme, { host, port, strictPort: true }));
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, async () => {
      await server.close();
      process.exit(0);
    });
  }
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
