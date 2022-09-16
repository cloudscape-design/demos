// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const del = require('del');
const path = require('path');
const { runAsyncTask } = require('./utils/runAsyncTask');

const clean = () => del(path.resolve('build'));

runAsyncTask(clean);
