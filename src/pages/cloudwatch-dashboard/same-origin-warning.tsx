// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';

export function DevSameOriginWarning() {
  const { hostname, protocol } = document.location;
  const amazonSubdomain = /.amazon.com$/.test(hostname) || /.a2z.com$/.test(hostname);
  const sameOrigin = protocol === 'https:' && amazonSubdomain;

  if (!sameOrigin) {
    return (
      <Alert
        header="You need to host this page in compliance with same-origin policy"
        type="error"
        statusIconAriaLabel="Error"
      >
        <span>
          The dashboard will not work properly unless the page is hosted:
          <ul>
            <li>over https</li>
            <li>on amazon.com or a2z.com subdomains</li>
          </ul>
          Use startHttps script <Box variant="code">sudo npm run startHttps</Box> from examples package to achieve this
        </span>
      </Alert>
    );
  }
  return null;
}
