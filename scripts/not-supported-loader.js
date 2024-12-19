// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// This webpack loader is used to fail the build if JS files are used for demos.
module.exports = function (source) {
  const path = this.resourcePath;
  // TODO: move the rest of the js files from the src folder and remove the loader for JS
  if (path.includes('/pages/')) {
    throw new Error(`JS demos are no longer supported. Use typescript. ${path}`);
  }
  return source;
};
