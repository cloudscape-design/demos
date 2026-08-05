// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const mockExamplesList = [
  { path: 'table', title: 'Table view', visibleOn: ['console', 'external'] },
  { path: 'chat', title: 'Chat', visibleOn: ['console', 'core', 'external'] },
  { path: 'form', title: 'Single page create', visibleOn: ['core'] },
  { path: 'landing-page', title: 'Service homepage', excludeDemoAssetOnExternal: true, visibleOn: ['console'] },
];

jest.mock('../../../../examples-list.json', () => mockExamplesList);

describe('filteredDemos', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  function loadFilteredDemos() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('../filter-demos').filteredDemos;
  }

  it('returns all demos in development mode', () => {
    process.env.NODE_ENV = 'development';
    process.env.SYSTEM = 'core';
    const filteredDemos = loadFilteredDemos();
    expect(filteredDemos()).toEqual(mockExamplesList);
  });

  it('returns only console-visible demos when SYSTEM is console', () => {
    process.env.NODE_ENV = 'production';
    process.env.SYSTEM = 'console';
    const filteredDemos = loadFilteredDemos();
    const result = filteredDemos();
    expect(result.map((d: { path: string }) => d.path)).toEqual(['table', 'chat', 'landing-page']);
  });

  it('returns only core-visible demos when SYSTEM is core', () => {
    process.env.NODE_ENV = 'production';
    process.env.SYSTEM = 'core';
    const filteredDemos = loadFilteredDemos();
    const result = filteredDemos();
    expect(result.map((d: { path: string }) => d.path)).toEqual(['chat', 'form']);
  });

  it('returns only external-visible demos when SYSTEM is external', () => {
    process.env.NODE_ENV = 'production';
    process.env.SYSTEM = 'external';
    const filteredDemos = loadFilteredDemos();
    const result = filteredDemos();
    expect(result.map((d: { path: string }) => d.path)).toEqual(['table', 'chat']);
  });

  it('defaults to console filtering when SYSTEM is undefined', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.SYSTEM;
    const filteredDemos = loadFilteredDemos();
    const result = filteredDemos();
    expect(result.map((d: { path: string }) => d.path)).toEqual(['table', 'chat', 'landing-page']);
  });
});
