// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';

export default {
  outputPath: path.resolve(process.env.OUTPUT_PATH || 'lib'),
  devServerPort: Number(process.env.DEV_SERVER_PORT) || 9615,
};
