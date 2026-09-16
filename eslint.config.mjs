// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import headerPlugin from '@tony.ganchev/eslint-plugin-header';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'node:path';
import tsEslint from 'typescript-eslint';

import cloudscapeBuildTools from '@cloudscape-design/build-tools/eslint/index.js';

// The @eslint-react unified plugin exposes its rules under multiple namespaces
// (e.g. `@eslint-react/*` and `@eslint-react/naming-convention/*`). ESLint splits
// a rule id at its last `/`, so the naming-convention rules must be registered
// under the dedicated `@eslint-react/naming-convention` plugin namespace.
const eslintReactPlugins = eslintReact.configs.recommended.plugins;

export default tsEslint.config(
  includeIgnoreFile(path.resolve('.gitignore')),
  {
    // The legacy .eslintrc did not report unused eslint-disable directives
    // (eslintrc defaulted this off). Flat config defaults it to "warn", which
    // would strip existing directives on --fix; keep the original behavior.
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.browser,
        process: true,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      '@eslint-react': eslintReactPlugins['@eslint-react'],
      '@eslint-react/naming-convention': eslintReactPlugins['@eslint-react/naming-convention'],
      '@cloudscape-design/build-tools': cloudscapeBuildTools,
      header: headerPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
      curly: 'error',
      eqeqeq: 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'header/header': [
        'error',
        'line',
        [' Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.', ' SPDX-License-Identifier: MIT-0'],
      ],
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'unused-imports/no-unused-imports': 'error',
      '@cloudscape-design/build-tools/no-internal-in-public-interfaces': 'error',
    },
  },
  {
    files: ['*.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // *.mjs build/config files (e.g. webpack.config.mjs) run in node. The legacy
    // `--ext ts,tsx,js,jsx` scope excluded them; `eslint .` now lints them too.
    files: ['*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['test/**/*.ts', 'setupJest.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      'react/display-name': 'warn',
      '@eslint-react/no-class-component': 'warn',
      '@eslint-react/naming-convention/filename': ['warn', { rule: 'kebab-case' }],
      '@eslint-react/naming-convention/filename-extension': ['warn', 'as-needed'],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // External packages come first.
            ['^react', '^(?!@cloudscape)@?\\w'],
            // Cloudscape packages.
            ['^@cloudscape'],
            // Things that start with a letter (or digit or underscore), or `~` followed by a letter.
            ['^~\\w'],
            // Anything not matched in another group.
            ['^'],
            // Styles come last.
            ['^.+\\.?(css)$', '^.+\\.?(css.js)$', '^.+\\.?(scss)$', '^.+\\.?(selectors.js)$'],
          ],
        },
      ],
    },
  },
);
