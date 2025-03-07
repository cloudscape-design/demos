// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import fs from 'node:fs/promises';
import path from 'node:path';

export const writeFileAsync = async (...args) => {
  await fs.mkdir(path.dirname(args[0]), { recursive: true });
  return fs.writeFile(...args);
};
