// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export async function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
