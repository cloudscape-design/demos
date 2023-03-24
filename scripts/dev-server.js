// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const express = require('express');
const { devServerPort, outputPath } = require('./config');

const app = express();

app.use(express.static(outputPath));
app.listen(devServerPort, () => {
  console.log(`Local server listening at http://localhost:${devServerPort}`);
});
