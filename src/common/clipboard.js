// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Force function to return a promise even if it throws synchronously
// eslint-disable-next-line require-await
export async function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
