// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// The demos are built in a single theme. scripts/build-vite.mjs reads the theme names from here.
export default {
  external: {
    environment: {
      ALWAYS_VISUAL_REFRESH: true,
      SYSTEM: 'external',
      THEME: 'external',
    },
  },
};
