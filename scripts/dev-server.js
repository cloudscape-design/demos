// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';

import { preview } from 'vite';

import config from './config.js';

// Serves the built lib/<theme>/ for the e2e tests (`npm run serve`), on config.devServerPort.
const theme = process.env.THEME ?? '';

const server = await preview({
  configFile: false,
  root: config.outputPath,
  appType: 'mpa',
  logLevel: 'warn',
  build: { outDir: path.join(config.outputPath, theme) },
  preview: { port: config.devServerPort, strictPort: true, host: 'localhost' },
});
console.log(`Local server listening at http://localhost:${config.devServerPort}`);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    // preview() returns a PreviewServer, whose close(): Promise<void> stops the server (see Vite's PreviewServer type).
    await server.close();
    process.exit(0);
  });
}
