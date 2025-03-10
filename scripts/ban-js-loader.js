// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// This webpack loader is used to fail the build if JS files are used for demos.
export default function () {
  throw new Error(`JS demos are no longer supported. Use typescript. ${this.resourcePath}`);
}
