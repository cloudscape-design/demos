// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

function HeroHeader() {
  return (
    <Box data-testid="hero-header" padding={{ top: 'xxl', bottom: 'xxxl' }} className="hero-header">
      <Grid gridDefinition={[{ colspan: { default: 12, xs: 8, s: 8 } }, { colspan: { default: 12, xs: 4, s: 4 } }]}>
        <SpaceBetween size="xl">
          <div>
            <Box variant="h1">Share an idea</Box>
            <Box
              color="text-body-secondary"
              fontSize="heading-m"
              fontWeight="light"
              variant="p"
              margin={{ top: 'xxs', bottom: 'xs' }}
            >
              Your ideas help us know where we could make an impact for our customers. Have an idea on mind? We would
              like to hear it!
            </Box>
          </div>
          <Box>
            <SpaceBetween size="s" direction="horizontal">
              <Button>Try for free</Button>
              <Button variant="primary">Suggest an idea</Button>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      </Grid>
    </Box>
  );
}

export { HeroHeader };
