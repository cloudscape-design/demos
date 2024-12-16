// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { Button, ButtonDropdown, ButtonDropdownProps, Header, SpaceBetween } from '@cloudscape-design/components';

import { DEMO_DISTRIBUTION } from '../config';

export const PageHeader = ({ buttons }: { buttons: ButtonDropdownProps.ItemOrGroup[] }) => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {buttons.map((button, key) =>
            button.itemType === 'action' ? (
              <Button href={button.href || ''} disabled={button.disabled || false} key={key}>
                {button.text}
              </Button>
            ) : (
              <ButtonDropdown items={(button as ButtonDropdownProps.ItemGroup).items} key={key}>
                {button.text}
              </ButtonDropdown>
            )
          )}
        </SpaceBetween>
      }
    >
      {DEMO_DISTRIBUTION.id}
    </Header>
  );
};
