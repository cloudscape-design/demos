// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export default function fetchJson(options) {
  return fetch(options).then(response => {
    if (!response.ok) {
      throw new Error(`Response error: ${response.status}`);
    } else {
      return response.json();
    }
  });
}
