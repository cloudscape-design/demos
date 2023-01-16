// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Link } from '@cloudscape-design/components';

interface ExternalLinkItemProps {
  href: string;
  text: string;
}

const labelSuffix = 'Opens in a new tab';

// a special case of external link, to be used within a link group, where all of them are external
// and we do not repeat the icon
export const ExternalLinkItem = ({ href, text }: ExternalLinkItemProps) => (
  <Link href={href} ariaLabel={`${text} ${labelSuffix}`} target="_blank">
    {text}
  </Link>
);
