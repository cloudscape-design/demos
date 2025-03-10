// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import express from 'express';
import config from './config.js';

const app = express();

app.use(express.static(config.outputPath));
app.listen(config.devServerPort, () => {
  console.log(`Local server listening at localhost:${config.devServerPort}`);
});
