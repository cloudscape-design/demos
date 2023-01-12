// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Link, { LinkProps } from '@cloudscape-design/components/link';

interface InfoLinkProps {
  id?: string;
  ariaLabel?: string;
  onFollow: LinkProps['onFollow'];
}
export const InfoLink = ({ id, onFollow, ariaLabel }: InfoLinkProps) => (
  <Link variant="info" id={id} onFollow={onFollow} ariaLabel={ariaLabel}>
    Info
  </Link>
);
