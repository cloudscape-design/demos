# Design Document: Local Component Linking

## Overview

This design describes how to add an environment-variable-controlled webpack alias mechanism to the demos app (`@cloudscape-design/demos`). When `USE_LOCAL_COMPONENTS=true` is set at dev-server startup, webpack redirects four `@cloudscape-design/*` package imports to local build outputs on disk instead of the pinned `node_modules` versions. The approach is purely additive: no `package.json` changes, no symlinks, no `node_modules` mutations.

## Architecture

The feature has two runtime artifacts:

1. **Webpack config extension** — a small alias-builder block added to `webpack.config.mjs` that reads `process.env.USE_LOCAL_COMPONENTS` and conditionally populates `resolve.alias`.
2. **Developer documentation** — `LOCAL-DEVELOPMENT.md` at the demos app root describing the workflow.

There are no new npm dependencies, no new source files, and no changes to the build pipeline or CI configuration.

```
webpack.config.mjs
│
├── reads USE_LOCAL_COMPONENTS from process.env (at config evaluation time)
│
├─[true]─► buildLocalAliases()
│           └── returns alias map { pkg → absolute-path, ... }
│           └── console.log each active alias
│
└─[false/absent]─► resolve.alias = {} (webpack default; no-op)
```

## Components

### `buildLocalAliases()` — inline helper in `webpack.config.mjs`

A single pure function that accepts no arguments and returns a `Record<string, string>` of webpack alias entries. It is only called when the env var is active. Keeping it as an inline helper (not a separate file) preserves the single-file nature of the existing webpack config.

**Responsibilities:**
- Compute absolute paths with `path.resolve()` for all four packages.
- Return the complete alias map ready for spread into `resolve.alias`.

**Does NOT:**
- Touch `process.env` (the caller already gate-checks it).
- Mutate the vendor chunk pattern.
- Introduce any fallback logic — if a path is wrong, webpack's normal module-not-found error surfaces naturally.

### Alias map

| Package import | Local path |
|---|---|
| `@cloudscape-design/components` | `/Users/ienakaai/Documents/cloudscape-components/components/lib/components` |
| `@cloudscape-design/design-tokens` | `/Users/ienakaai/Documents/cloudscape-components/components/lib/design-tokens` |
| `@cloudscape-design/global-styles` | `/Users/ienakaai/Documents/cloudscape-global-styles` |
| `@cloudscape-design/theming-runtime` | `/Users/ienakaai/Documents/cloudscape-theming-core` |

`components` and `design-tokens` share the same repo root (`/Users/ienakaai/Documents/cloudscape-components/components/lib`), making them derived from a single base path constant. `global-styles` and `theming-runtime` each point to the top-level directory of their respective repos, where `package.json` `main` (or `index.js`) acts as the entry point.

### `resolve.alias` integration point

webpack merges `resolve` objects through `lodash.mergeWith`. The alias block is added to the `defaults` object inside `createWebpackConfig()`, where it is unconditionally spread. Because it is placed in `defaults`, both webpack configs (the main entry config and the fake-server config) inherit it — appropriate since both may import Cloudscape packages.

```javascript
// Inside createWebpackConfig() defaults object
resolve: {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ...(useLocalComponents ? { alias: buildLocalAliases() } : {}),
},
```

### Vendor chunk isolation

The existing `splitChunks.cacheGroups.vendor.test` is `/node_modules/`. Aliased local paths (`/Users/ienakaai/Documents/...`) do not match this pattern, so locally resolved modules are automatically assigned to application chunks — not the vendor chunk. No change to the vendor rule is needed or made.

### Console feedback

The `console.log` call is placed at config-evaluation time (outside `createWebpackConfig`, in the top-level module scope) so it fires exactly once per `webpack` invocation, not once per config object in the array:

```javascript
const useLocalComponents = process.env.USE_LOCAL_COMPONENTS === 'true';

if (useLocalComponents) {
  const aliases = buildLocalAliases();
  console.log('[local-component-linking] Active aliases:');
  Object.entries(aliases).forEach(([pkg, localPath]) => {
    console.log(`  ${pkg} → ${localPath}`);
  });
}
```

## Interfaces

### Environment interface

```
USE_LOCAL_COMPONENTS=true  →  alias map applied
USE_LOCAL_COMPONENTS=false  →  no-op (same as absent)
<absent>  →  no-op
```

The value is read via `process.env.USE_LOCAL_COMPONENTS` as a string. Strict equality to `"true"` is required; no case-folding, no truthiness coercion.

### Webpack config interface

`createWebpackConfig(base, options)` gains no new parameters. The alias logic is encapsulated entirely inside the function body through `useLocalComponents`, which is evaluated at module load time.

### Developer CLI interface

```bash
# Normal dev server (npm packages from node_modules)
npm start

# Dev server with local components
USE_LOCAL_COMPONENTS=true npm start

# Cross-platform via cross-env (already a dev dependency)
npx cross-env USE_LOCAL_COMPONENTS=true npm start
```

## Data Models

No persistent data. The only "data" is the alias map, which is a plain JavaScript object:

```typescript
type AliasMap = Record<string, string>;
// e.g.
// {
//   '@cloudscape-design/components': '/Users/.../lib/components',
//   '@cloudscape-design/design-tokens': '/Users/.../lib/design-tokens',
//   '@cloudscape-design/global-styles': '/Users/.../cloudscape-global-styles',
//   '@cloudscape-design/theming-runtime': '/Users/.../cloudscape-theming-core',
// }
```

## Error Handling

| Scenario | Behavior |
|---|---|
| Alias path directory is missing / has no entry point | webpack emits `Module not found` error at build time. This is the desired fail-fast behavior — no silent fallback to `node_modules`. |
| `USE_LOCAL_COMPONENTS` is set but empty string | Empty string `!== "true"`, so alias map is not applied. |
| `USE_LOCAL_COMPONENTS=true` with a stale build | webpack resolves successfully but demos render stale component code. Developer must re-run `npm run quick-build` in the components repo. |
| CI / production build | `USE_LOCAL_COMPONENTS` is not set in CI pipelines, so the alias map is never applied. CI behavior is identical to today. |

## Implementation Plan

The change is entirely within `webpack.config.mjs` and adds one new file `LOCAL-DEVELOPMENT.md`.

### Step 1 — Add alias logic to `webpack.config.mjs`

After the existing imports and before the `configs` array, add:

```javascript
const useLocalComponents = process.env.USE_LOCAL_COMPONENTS === 'true';

const COMPONENTS_REPO = '/Users/ienakaai/Documents/cloudscape-components/components';
const GLOBAL_STYLES_REPO = '/Users/ienakaai/Documents/cloudscape-global-styles';
const THEMING_CORE_REPO = '/Users/ienakaai/Documents/cloudscape-theming-core';

function buildLocalAliases() {
  return {
    '@cloudscape-design/components': path.resolve(COMPONENTS_REPO, 'lib/components'),
    '@cloudscape-design/design-tokens': path.resolve(COMPONENTS_REPO, 'lib/design-tokens'),
    '@cloudscape-design/global-styles': path.resolve(GLOBAL_STYLES_REPO),
    '@cloudscape-design/theming-runtime': path.resolve(THEMING_CORE_REPO),
  };
}

if (useLocalComponents) {
  console.log('[local-component-linking] Local package aliases are active:');
  Object.entries(buildLocalAliases()).forEach(([pkg, localPath]) => {
    console.log(`  ${pkg} → ${localPath}`);
  });
}
```

Inside `createWebpackConfig`, extend the `resolve` block in `defaults`:

```javascript
resolve: {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ...(useLocalComponents ? { alias: buildLocalAliases() } : {}),
},
```

### Step 2 — Add `LOCAL-DEVELOPMENT.md`

Create `LOCAL-DEVELOPMENT.md` at the demos app root. See documentation section below.

## Documentation

`LOCAL-DEVELOPMENT.md` covers:
- Prerequisites: Node.js, local repo paths, `npm run quick-build`
- Startup command
- Full alias table
- Manual rebuild note
- CI/production disclaimer

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property reflection note:** All acceptance criteria in this feature resolve to binary-state configuration checks (is a specific key present/absent in a config object?). No criterion exhibits meaningful input variation across an unbounded domain. After reviewing the prework analysis, all testable criteria are best expressed as example-based unit tests, not property-based tests. There are therefore no universal-quantification properties to write for this feature.

The testable criteria are covered by example-based tests:

- **Alias map enabled**: When `USE_LOCAL_COMPONENTS=true`, `resolve.alias` contains all four expected package keys with correct absolute paths.
- **Alias map disabled**: When `USE_LOCAL_COMPONENTS` is absent or not `"true"`, `resolve.alias` is not extended.
- **Consistent root**: `@cloudscape-design/components` and `@cloudscape-design/design-tokens` alias values share the same repo root prefix.
- **Absolute paths**: All alias values are absolute paths (start with `/`).
- **Console output — enabled**: When `USE_LOCAL_COMPONENTS=true`, `console.log` is called with a message referencing each aliased package.
- **Console output — disabled**: When `USE_LOCAL_COMPONENTS` is absent, `console.log` is not called with any local-linking message.
- **Vendor chunk unchanged**: The `splitChunks.cacheGroups.vendor.test` value remains `/node_modules/` regardless of alias state.
