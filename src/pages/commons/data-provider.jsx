// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export default class DataProvider {
  getData(name) {
    return fetch(`../resources/${name}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data.map(it => ({ ...it, date: new Date(it.date) })));
  }
}
