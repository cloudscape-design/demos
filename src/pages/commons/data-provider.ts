// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import behaviorsData from '../../resources/behaviors.json';
import distributionsData from '../../resources/distributions';
import logsData from '../../resources/logs';
import originsData from '../../resources/origins.json';

const dataProviderData: Record<string, unknown[]> = {
  behaviors: behaviorsData,
  distributions: distributionsData,
  logs: logsData,
  origins: originsData,
};

export default class DataProvider {
  getData<T>(name: string) {
    // A copy, like a fresh response, so a demo that edits its rows never changes another's.
    return Promise.resolve(structuredClone(dataProviderData[name]) as T[]);
  }
  async getDataWithDates<T extends { date: string | number | Date }>(name: string) {
    const data = await this.getData<T>(name);
    return data.map((it: T) => ({ ...it, date: new Date(it.date) }));
  }
}
