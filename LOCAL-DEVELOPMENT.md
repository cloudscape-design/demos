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
  npm run quick-build
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

`npm run quick-build` does **not** watch for changes. You must re-run it manually in the Local Components Repo whenever component source files or styles change:

```bash
cd /Users/ienakaai/Documents/cloudscape-components/components
npm run quick-build
```

After the build completes, webpack's HMR will pick up the updated files automatically (no server restart needed for most changes).

## CI and Production Builds

`USE_LOCAL_COMPONENTS` is never set in CI pipelines or production build environments. When the variable is absent or not equal to `"true"`, the alias map is not applied and all Cloudscape packages resolve from `node_modules` as normal. This feature is strictly a local-development aid and has no effect on CI or production builds.
