# Implementation Plan: Local Component Linking

## Overview

Two focused changes: extend `webpack.config.mjs` with an environment-variable-gated alias block, then add `LOCAL-DEVELOPMENT.md` at the repo root. No new dependencies, no structural changes to the build pipeline.

## Tasks

- [x] 1. Add alias constants and helper to `webpack.config.mjs`
  - [x] 1.1 Declare `useLocalComponents` flag and repo-root constants at module scope
    - After the existing `import` block, add:
      - `const useLocalComponents = process.env.USE_LOCAL_COMPONENTS === 'true';`
      - Three constants: `COMPONENTS_REPO`, `GLOBAL_STYLES_REPO`, `THEMING_CORE_REPO` with the absolute paths from the design
    - Use strict string equality `=== 'true'`; no truthiness coercion
    - _Requirements: 1.3, 2.1, 2.2_

  - [x] 1.2 Implement `buildLocalAliases()` pure function
    - Add an inline helper function (not a separate file) that returns a `Record<string, string>` with all four `@cloudscape-design/*` alias entries
    - `@cloudscape-design/components` → `path.resolve(COMPONENTS_REPO, 'lib/components')`
    - `@cloudscape-design/design-tokens` → `path.resolve(COMPONENTS_REPO, 'lib/design-tokens')` (same repo root as components, satisfying the consistency requirement)
    - `@cloudscape-design/global-styles` → `path.resolve(GLOBAL_STYLES_REPO)`
    - `@cloudscape-design/theming-runtime` → `path.resolve(THEMING_CORE_REPO)`
    - Function must use `path.resolve` for all paths
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 4.1, 4.2, 5.1, 5.2_

  - [ ]* 1.3 Write unit tests for `buildLocalAliases()`
    - Test: when `USE_LOCAL_COMPONENTS=true`, alias map contains all four expected package keys
    - Test: all alias values are absolute paths (start with `/`)
    - Test: `@cloudscape-design/components` and `@cloudscape-design/design-tokens` share the same repo root prefix
    - Extract the helper to a testable module or test via the exported config, using `jest.resetModules()` + dynamic `import()` with env var manipulation
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 4.1, 5.1_

- [x] 2. Wire alias into `resolve` and add console feedback
  - [x] 2.1 Extend `resolve` block inside `createWebpackConfig()` defaults
    - Spread the alias conditionally: `...(useLocalComponents ? { alias: buildLocalAliases() } : {})`
    - Place inside the existing `resolve` object in `defaults`, alongside `extensions`
    - Do not change `splitChunks.cacheGroups.vendor.test` (remains `/node_modules/`)
    - _Requirements: 1.1, 1.2, 7.1, 7.2_

  - [x] 2.2 Add console feedback at module scope
    - After `buildLocalAliases` declaration, add an `if (useLocalComponents)` block that calls `console.log` with a header line and one line per alias entry
    - Place the block at top-level module scope (not inside `createWebpackConfig`) so it fires exactly once per webpack invocation
    - When `useLocalComponents` is false, no log is emitted
    - _Requirements: 6.1, 6.2_

  - [ ]* 2.3 Write unit tests for alias wiring and console behavior
    - Test: when `USE_LOCAL_COMPONENTS=true`, the final webpack config's `resolve.alias` contains all four package keys
    - Test: when `USE_LOCAL_COMPONENTS` is absent, `resolve.alias` is undefined or empty
    - Test: when `USE_LOCAL_COMPONENTS=true`, `console.log` is called (spy/mock) with a message containing each aliased package name
    - Test: when `USE_LOCAL_COMPONENTS` is absent, `console.log` is not called with any local-linking message
    - _Requirements: 1.1, 1.2, 6.1, 6.2_

- [x] 3. Checkpoint — Ensure all tests pass
  - Run `npm run test:unit` and confirm no regressions.
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create `LOCAL-DEVELOPMENT.md` documentation
  - [x] 4.1 Write `LOCAL-DEVELOPMENT.md` at the demos app root
    - Include: prerequisites section (Node.js version, paths to local repos, `npm run quick-build` step)
    - Include: startup command (`USE_LOCAL_COMPONENTS=true npm start`) and cross-platform alternative via `cross-env`
    - Include: full alias table (all four packages with their local paths)
    - Include: note that `npm run quick-build` must be re-run manually when component source or styles change
    - Include: disclaimer that `USE_LOCAL_COMPONENTS` has no effect in CI or production builds
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 5. Final checkpoint — Ensure all tests pass
  - Run `npm run typecheck` and `npm run test:unit` to confirm the full suite is clean.
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster iteration
- The design explicitly confirms no property-based tests are needed for this feature — all correctness criteria are covered by example-based unit tests
- Unit tests for `webpack.config.mjs` require `jest.resetModules()` and dynamic `import()` to re-evaluate the module with different `process.env` values per test
- The vendor chunk rule (`/node_modules/`) is intentionally left unchanged; local paths never match it, so locally resolved modules flow to application chunks automatically

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["1.3", "2.1", "2.2"] },
    { "id": 3, "tasks": ["2.3", "4.1"] }
  ]
}
```
