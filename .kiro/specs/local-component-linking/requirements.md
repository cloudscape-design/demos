# Requirements Document

## Introduction

This feature enables a local development workflow in the demos app (`@cloudscape-design/demos`) that allows the webpack dev server to consume locally built versions of Cloudscape packages instead of the pinned npm versions. The toggle is controlled via an environment variable (`USE_LOCAL_COMPONENTS=true`) that activates webpack `resolve.alias` entries pointing to local build outputs. This approach avoids symlinks, prevents React deduplication issues, and requires no changes to `package.json` or `node_modules`.

## Glossary

- **Demos App**: The webpack-based application at `/Users/ienakaai/Documents/cloudscape-github-demos/demos`, identified as `@cloudscape-design/demos`.
- **Webpack Config**: The file `webpack.config.mjs` in the demos app root that controls bundling, dev server, and module resolution.
- **Local Components Repo**: The Cloudscape components source repository at `/Users/ienakaai/Documents/cloudscape-components/components`, whose built output lives at `lib/components/`.
- **Local Global-Styles Repo**: The repository at `/Users/ienakaai/Documents/cloudscape-global-styles` containing a built version of `@cloudscape-design/global-styles`.
- **Local Theming-Core Repo**: The repository at `/Users/ienakaai/Documents/cloudscape-theming-core` containing a built version of `@cloudscape-design/theming-runtime`.
- **Alias Map**: The set of webpack `resolve.alias` entries that redirect package imports to local build paths.
- **USE_LOCAL_COMPONENTS**: The environment variable whose presence and value of `"true"` activates the Alias Map in the Webpack Config.
- **Quick Build**: The command `npm run quick-build` executed in the Local Components Repo to produce a fast incremental build.

## Requirements

### Requirement 1

**User Story:** As a developer, I want to toggle local Cloudscape package resolution via an environment variable, so that I can switch between pinned npm packages and local builds without modifying `package.json` or installing symlinks.

#### Acceptance Criteria

1. WHEN `USE_LOCAL_COMPONENTS` is set to `"true"` at webpack startup, THE Webpack Config SHALL apply the Alias Map to `resolve.alias`.
2. WHEN `USE_LOCAL_COMPONENTS` is absent or not `"true"`, THE Webpack Config SHALL resolve all Cloudscape packages from `node_modules` without modification.
3. THE Webpack Config SHALL read the value of `USE_LOCAL_COMPONENTS` from `process.env` at config evaluation time.

### Requirement 2

**User Story:** As a developer, I want `@cloudscape-design/components` aliased to the local build output, so that source changes in the components repo are reflected in the demos app after a quick build.

#### Acceptance Criteria

1. WHERE `USE_LOCAL_COMPONENTS` is `"true"`, THE Webpack Config SHALL alias `@cloudscape-design/components` to the absolute path `/Users/ienakaai/Documents/cloudscape-components/components/lib/components`.
2. THE Webpack Config SHALL resolve the alias path using `path.resolve` or an equivalent absolute path mechanism to prevent relative path ambiguity.
3. WHEN the aliased build output directory does not contain `index.js`, THE Webpack Config SHALL produce a webpack module-not-found error at build time rather than silently falling back to `node_modules`.

### Requirement 3

**User Story:** As a developer, I want `@cloudscape-design/design-tokens` aliased to the locally built tokens, so that token changes in the components repo are visible in the demos app without publishing to npm.

#### Acceptance Criteria

1. WHERE `USE_LOCAL_COMPONENTS` is `"true"`, THE Webpack Config SHALL alias `@cloudscape-design/design-tokens` to the design-tokens build output directory within the Local Components Repo.
2. THE Webpack Config SHALL derive the design-tokens alias path from the same root as the components alias to maintain consistency.

### Requirement 4

**User Story:** As a developer, I want `@cloudscape-design/global-styles` aliased to the Local Global-Styles Repo build output, so that style changes there are immediately testable in the demos app.

#### Acceptance Criteria

1. WHERE `USE_LOCAL_COMPONENTS` is `"true"`, THE Webpack Config SHALL alias `@cloudscape-design/global-styles` to the build output of the Local Global-Styles Repo at `/Users/ienakaai/Documents/cloudscape-global-styles`.
2. THE alias path SHALL point to the directory that contains the package's entry point as defined in that package's `package.json` `main` field or top-level `index.js`.

### Requirement 5

**User Story:** As a developer, I want `@cloudscape-design/theming-runtime` aliased to the Local Theming-Core Repo build output, so that theming changes are reflected in the demos app.

#### Acceptance Criteria

1. WHERE `USE_LOCAL_COMPONENTS` is `"true"`, THE Webpack Config SHALL alias `@cloudscape-design/theming-runtime` to the build output of the Local Theming-Core Repo at `/Users/ienakaai/Documents/cloudscape-theming-core`.
2. THE alias path SHALL resolve to the directory that contains the package's entry point.

### Requirement 6

**User Story:** As a developer, I want clear console feedback when local linking is active, so that I can confirm the mode without inspecting the webpack config.

#### Acceptance Criteria

1. WHEN `USE_LOCAL_COMPONENTS` is `"true"`, THE Webpack Config SHALL emit a `console.log` message at config evaluation time listing all active alias entries.
2. WHEN `USE_LOCAL_COMPONENTS` is absent or not `"true"`, THE Webpack Config SHALL NOT emit any local-linking log messages.

### Requirement 7

**User Story:** As a developer, I want the existing vendor chunk splitting behavior to remain unaffected, so that the build and dev server performance characteristics do not degrade.

#### Acceptance Criteria

1. THE Webpack Config SHALL retain the existing `splitChunks` `cacheGroups` vendor rule that matches `/node_modules/` without modification.
2. WHEN aliases are active, THE Webpack Config SHALL NOT add the aliased local paths to the vendor chunk pattern, so that locally resolved modules are treated as application code for chunk assignment.

### Requirement 8

**User Story:** As a developer, I want documentation in the repo on how to use the local linking workflow, so that I can set it up quickly and share the process with teammates.

#### Acceptance Criteria

1. THE Demos App SHALL include a markdown document that describes the prerequisite build step (`npm run quick-build` in the Local Components Repo), the startup command (`USE_LOCAL_COMPONENTS=true npm start`), and the full list of aliased packages.
2. THE documentation SHALL specify that the Quick Build command must be re-run manually whenever component styles or source files change.
3. THE documentation SHALL note that the feature is local-development only and has no effect in CI or production builds.
