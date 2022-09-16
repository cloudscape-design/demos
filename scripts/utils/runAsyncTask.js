// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const runAsyncTask = async fn => {
  try {
    await fn();
    console.log(`[Success] ${fn.name}`);
  } catch (err) {
    console.error(`[Fail] ${fn.name}`);
    console.error(err);
    process.exit(1);
  }
};

module.exports = {
  runAsyncTask,
};
