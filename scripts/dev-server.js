// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';
import express from 'express';
import config from './config.js';

const app = express();
const defaultTheme = '';

app.use(express.static(`${path.join(config.outputPath, process.env.THEME ?? defaultTheme)}`));
app.listen(config.devServerPort, () => {
  console.log(`Local server listening at http://localhost:${config.devServerPort}`);
});
