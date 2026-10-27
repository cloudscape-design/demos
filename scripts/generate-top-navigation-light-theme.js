#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Regenerates src/common/top-navigation-light-theme.ts.
//
// Cloudscape renders TopNavigation inside the `awsui-context-top-navigation`
// secondary theme context, which is dark by design. To make the demo header
// light we hand that context the *global* token values instead, so the header
// matches the page surface in both light and dark mode.
//
// Rather than hand-pick tokens (and miss some, leaving dark fragments in
// dropdowns or badges), this derives the full set: every token whose value the
// context actually overrides, restored to its global value. Only tokens that
// are themeable in that context are emitted, since applyTheme drops the rest.
//
// Usage: node ./scripts/generate-top-navigation-light-theme.js

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const tokensPath = path.join(process.cwd(), 'node_modules/@cloudscape-design/design-tokens/index-one-theme.json');
const themingTypesPath = path.join(
  process.cwd(),
  'node_modules/@cloudscape-design/components/internal/generated/theming/index.d.ts',
);
const outputPath = path.join(process.cwd(), 'src/common/top-navigation-light-theme.ts');

const CONTEXT = 'top-navigation';

const toCamelCase = name => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

// Pull the token values for both modes out of a design-tokens entry.
const modeValues = entry => {
  const value = entry && typeof entry === 'object' && '$value' in entry ? entry.$value : entry;
  if (value && typeof value === 'object') {
    return { light: value.light, dark: value.dark };
  }
  return { light: value, dark: value };
};

// The themeable token names for the context, read from the generated theming
// types so we never emit a token applyTheme would reject.
function readThemeableTokens() {
  const lines = readFileSync(themingTypesPath, 'utf8').split('\n');
  const start = lines.findIndex(line => line.includes(`'${CONTEXT}'?`));
  if (start === -1) {
    throw new Error(`Could not find the '${CONTEXT}' context in ${themingTypesPath}`);
  }
  const names = new Set();
  let depth = 0;
  for (const line of lines.slice(start)) {
    depth += (line.match(/{/g) ?? []).length - (line.match(/}/g) ?? []).length;
    const match = line.match(/^\s*(\w+)\??:/);
    if (match) {
      names.add(match[1]);
    }
    if (depth === 0 && names.size > 0) {
      break;
    }
  }
  return names;
}

const dictionary = JSON.parse(readFileSync(tokensPath, 'utf8'));
const globalTokens = dictionary.tokens;
const contextTokens = dictionary.contexts[CONTEXT].tokens;
const themeable = readThemeableTokens();

const overrides = [];
let skipped = 0;
for (const [name, contextEntry] of Object.entries(contextTokens)) {
  if (!(name in globalTokens)) {
    continue;
  }
  const globalValue = modeValues(globalTokens[name]);
  const contextValue = modeValues(contextEntry);
  const differs = globalValue.light !== contextValue.light || globalValue.dark !== contextValue.dark;
  if (!differs || globalValue.light === undefined) {
    continue;
  }
  const camelName = toCamelCase(name);
  if (!themeable.has(camelName)) {
    skipped += 1;
    continue;
  }
  overrides.push([camelName, globalValue]);
}
overrides.sort(([a], [b]) => a.localeCompare(b));

const body = overrides
  .map(([name, { light, dark }]) => `  ${name}: { light: '${light}', dark: '${dark}' },`)
  .join('\n');

const contents = `// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// GENERATED FILE -- do not edit by hand.
// Regenerate with: node ./scripts/generate-top-navigation-light-theme.js
//
// Cloudscape renders TopNavigation inside the dark \`awsui-context-top-navigation\`
// secondary context. These overrides hand that context the global token values
// instead, so the demo header reads as a light header in light mode and stays
// consistent with the page surface in dark mode.
//
// Every token the context overrides is restored here (${overrides.length} tokens), so no
// dark values survive in nested surfaces such as dropdowns and badges.

export const topNavigationLightThemeTokens = {
${body}
} as const;
`;

writeFileSync(outputPath, contents);
console.log(
  `Wrote ${overrides.length} token overrides to ${outputPath}` +
    (skipped > 0 ? ` (skipped ${skipped} tokens that are not themeable in the ${CONTEXT} context)` : ''),
);

// ---------------------------------------------------------------------------
// Part two: the tokens applyTheme cannot reach.
//
// Not every value the context flips is a public, themeable token. Internal ones
// -- all the `--shadow-*` values among them -- are absent from the token
// dictionary, so applyTheme silently leaves them dark. That is visible: the
// header's dropdown kept an opaque black drop shadow in light mode.
//
// For those we go one level down and emit plain CSS, reading the hashed custom
// property names and their light values straight out of the installed
// components build so the two always agree.
// ---------------------------------------------------------------------------

const baseThemeCssPath = path.join(
  process.cwd(),
  'node_modules/@cloudscape-design/components/internal/base-theme/styles.scoped.css',
);
const cssOutputPath = path.join(process.cwd(), 'src/styles/top-navigation-light-context.scss');

const baseThemeCss = readFileSync(baseThemeCssPath, 'utf8');

// Collect `--custom-property: value` declarations from every rule whose
// selector satisfies `matches`.
const declarationsFor = matches => {
  const found = {};
  for (const rule of baseThemeCss.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
    const selector = rule[1].split(/\s+/).join(' ').trim();
    if (!matches(selector)) {
      continue;
    }
    for (const declaration of rule[2].matchAll(/(--[a-z0-9-]+):\s*([^;]+)/g)) {
      found[declaration[1]] = declaration[2].trim();
    }
  }
  return found;
};

const lightScope = declarationsFor(selector => selector === String.raw`.awsui-one-theme:not(#\9)`);
const contextScope = declarationsFor(
  selector =>
    selector.includes('awsui-context-top-navigation') &&
    selector.includes('one-theme') &&
    !selector.includes('dark-mode'),
);

// Strip the build hash suffix so a property can be matched back to its token.
const tokenNameOf = property => property.slice(2).replace(/-[a-z0-9]{6,8}$/, '');

const cssResets = Object.keys(contextScope)
  .filter(property => {
    const lightValue = lightScope[property];
    if (lightValue === undefined || lightValue === contextScope[property]) {
      return false; // Not flipped by the context, or has no light counterpart.
    }
    return !themeable.has(toCamelCase(tokenNameOf(property))); // applyTheme has the rest.
  })
  .sort()
  .map(property => `  ${property}: ${lightScope[property]};`)
  .join('\n');

const cssContents = `// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// GENERATED FILE -- do not edit by hand.
// Regenerate with: node ./scripts/generate-top-navigation-light-theme.js
//
// The light-header companion to src/common/top-navigation-light-theme.ts.
//
// These values are flipped dark by the \`awsui-context-top-navigation\` context
// but are not public themeable tokens, so applyTheme cannot restore them. The
// most visible case is \`--shadow-dropdown\`, which left the header's dropdown
// with an opaque black drop shadow in light mode.
//
// Scoped to light mode only: in dark mode the context's own dark values are
// already correct. The doubled \`:not(#\\9)\` raises specificity above the base
// theme's own single-\`:not\` rules without resorting to \`!important\`.
//
// The custom property names carry a build hash, so this file must be
// regenerated whenever @cloudscape-design/components is rebuilt.

body:not(.awsui-dark-mode) .awsui-context-top-navigation:not(#\\9):not(#\\9) {
${cssResets}
}
`;

writeFileSync(cssOutputPath, cssContents);
console.log(`Wrote ${cssResets.split('\n').length} CSS property resets to ${cssOutputPath}`);
