// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Extract current page name (e.g., 'components-overview' from '/examples/core/components-overview.html') from URL
export const currentDemoName = window.location.pathname.split('/').pop()?.replace('.html', '');

// Build a demo page URL preserving current structure and query params
export function buildNavigationUrl(pageName: string): string {
  const { origin, pathname, search } = window.location;
  if (process.env.NODE_ENV === 'development') {
    // Development: http://localhost:9615/page.html
    return `${origin}/${pageName}.html${search}`;
  } else {
    // Production: preserve existing path structure
    const basePath = pathname.substring(0, pathname.lastIndexOf('/'));
    return `${origin}${basePath}/${pageName}.html${search}`;
  }
}

type SystemType = 'console' | 'core';

/**
 * For prod origins: switches between different domains (cloudscape.aws.dev <-> core.cloudscape.aws.dev)
 * For test origins (cloudfront): switches path segment (/examples/console/ <-> /examples/core/)
 */
export function buildSystemSwitchUrl(targetSystem: SystemType): string {
  const { origin, search } = window.location;

  const pageName = currentDemoName || 'components-overview';

  if (origin.includes('cloudfront.net')) {
    return `${origin}/examples/${targetSystem}/${pageName}.html${search}`;
  }

  // Switch between prod domains
  if (targetSystem === 'core') {
    return `https://core.cloudscape.aws.dev/examples/react/${pageName}.html${search}`;
  }

  if (targetSystem === 'console') {
    return `https://cloudscape.aws.dev/examples/react/${pageName}.html${search}`;
  }

  return buildNavigationUrl(pageName);
}
