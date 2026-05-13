// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { type ReactNode } from 'react';

import { Icon } from '@cloudscape-design/components';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

interface WidgetContainerProps {
  title: string;
  actions?: ReactNode;
  footerText?: string;
  footerHref?: string;
  children: ReactNode;
}

export function WidgetContainer({ title, actions, footerText, footerHref, children }: WidgetContainerProps) {
  return (
    <Container
      header={<Header actions={actions ?? <Button iconName="ellipsis" ariaLabel="More options" />}>{title}</Header>}
      footer={
        footerText ? (
          <div style={{ textAlign: 'center' }}>
            <Link href={footerHref} variant="secondary">
              {footerText} <Icon name="arrow-right" />
            </Link>
          </div>
        ) : undefined
      }
    >
      {children}
    </Container>
  );
}
