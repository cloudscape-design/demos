// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useId } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import Link from '@cloudscape-design/components/link';

import { SeparatedList } from './separated-list';

interface ExternalLinkItemProps {
  href: string;
  text: string;
}

interface ExternalLinkGroupProps {
  variant?: 'default' | 'container';
  header?: string;
  groupAriaLabel?: string;
  items: Array<ExternalLinkItemProps>;
}

function ExternalLinkItem({ href, text }: ExternalLinkItemProps) {
  return (
    <Link href={href} target="_blank">
      {text}
    </Link>
  );
}

export function ExternalLinkGroup({
  header = 'Learn more',
  groupAriaLabel,
  items,
  variant = 'default',
}: ExternalLinkGroupProps) {
  const externalIcon = (
    <span role="img" aria-label="Links open in a new tab">
      <Icon name="external" size="inherit" />
    </span>
  );

  const headerId = `header-${useId()}`;

  if (variant === 'container') {
    return (
      <Container
        header={
          <Header>
            <span id={headerId}>
              {header} {externalIcon}
            </span>
          </Header>
        }
      >
        <SeparatedList
          ariaLabel={groupAriaLabel}
          ariaLabelledBy={groupAriaLabel ? undefined : headerId}
          items={items.map((item, index) => (
            <ExternalLinkItem key={index} href={item.href} text={item.text} />
          ))}
        />
      </Container>
    );
  }

  return (
    <>
      <h3 id={headerId}>
        {header} {externalIcon}
      </h3>
      <ul aria-label={groupAriaLabel} aria-labelledby={groupAriaLabel ? undefined : headerId}>
        {items.map((item, index) => (
          <li key={index}>
            <ExternalLinkItem href={item.href} text={item.text} />
          </li>
        ))}
      </ul>
    </>
  );
}
