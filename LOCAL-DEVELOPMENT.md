# Local Development with Local Cloudscape Packages

This guide describes how to run the demos app against locally built Cloudscape packages instead of the pinned npm versions.

## Prerequisites

- **Node.js** — same version required by the demos app (see `.nvmrc` or `engines` in `package.json`)
- **Local repos cloned** at the following paths:
  - `/Users/ienakaai/Documents/cloudscape-components/components` — components and design-tokens source
  - `/Users/ienakaai/Documents/cloudscape-global-styles` — global-styles source
  - `/Users/ienakaai/Documents/cloudscape-theming-core` — theming-runtime source
- **Quick build completed** — before starting the dev server, run a build in the Local Components Repo:

  ```bash
  cd /Users/ienakaai/Documents/cloudscape-components/components
  INCLUDE_ONE_THEME=true npm run quick-build
  ```

## Starting the Dev Server with Local Packages

Set `USE_LOCAL_COMPONENTS=true` when launching the dev server:

```bash
USE_LOCAL_COMPONENTS=true npm start
```

**Cross-platform alternative** using `cross-env` (already a dev dependency):

```bash
npx cross-env USE_LOCAL_COMPONENTS=true npm start
```

When the variable is active, webpack prints a confirmation listing each active alias at startup.

## Active Alias Map

| Package import | Resolved to |
|---|---|
| `@cloudscape-design/components` | `/Users/ienakaai/Documents/cloudscape-components/components/lib/components` |
| `@cloudscape-design/design-tokens` | `/Users/ienakaai/Documents/cloudscape-components/components/lib/design-tokens` |
| `@cloudscape-design/global-styles` | `/Users/ienakaai/Documents/cloudscape-global-styles` |
| `@cloudscape-design/theming-runtime` | `/Users/ienakaai/Documents/cloudscape-theming-core` |

## Rebuilding After Source Changes

`npm run quick-build` does **not** watch for changes. After every edit in the components source, you must:

1. Rebuild in the components repo:
   ```bash
   cd /Users/ienakaai/Documents/cloudscape-components/components
   INCLUDE_ONE_THEME=true npm run quick-build
   ```

2. Restart the demos dev server (webpack does not pick up changes to the aliased build output automatically):
   ```bash
   USE_LOCAL_COMPONENTS=true npm start
   ```

## Activating One-Theme

The demos app defaults to `awsui-visual-refresh` on the `<body>` tag. To activate the one-theme styles built with `INCLUDE_ONE_THEME=true`, the body class must be `awsui-one-theme` instead.

This is already set in `scripts/generate-html-files.js`. If you ever need to switch back to the default visual refresh, change the body class back to `awsui-visual-refresh`.

## CI and Production Builds

`USE_LOCAL_COMPONENTS` is never set in CI pipelines or production build environments. When the variable is absent or not equal to `"true"`, the alias map is not applied and all Cloudscape packages resolve from `node_modules` as normal. This feature is strictly a local-development aid and has no effect on CI or production builds.
