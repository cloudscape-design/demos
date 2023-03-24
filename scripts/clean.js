// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const del = require('del');
const { runAsyncTask } = require('./utils/runAsyncTask');
const config = require('./config');

const clean = () => del(config.outputPath);

runAsyncTask(clean);
