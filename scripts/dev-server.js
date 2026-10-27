// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';
import express from 'express';
import config from './config.js';

const app = express();
const defaultTheme = '';

app.use(express.static(`${path.join(config.outputPath, process.env.THEME ?? defaultTheme)}`));
// Bind to loopback explicitly: `listen(port)` alone listens on every interface,
// which publishes this server to the local network. Nothing here needs to be
// reachable off-host -- the e2e suite drives it from localhost. To view it from
// another device, forward the port over SSH rather than widening the bind.
app.listen(config.devServerPort, '127.0.0.1', () => {
  console.log(`Local server listening at http://localhost:${config.devServerPort}`);
});
