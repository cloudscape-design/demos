// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Local stub for NavigationBar which is not yet available in the installed
 * version of @cloudscape-design/components. This renders a simple semantic
 * wrapper that mirrors the expected API surface used in the one-theme demo.
 */
import React from 'react';

export interface NavigationBarProps {
  placement?: 'start' | 'top';
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
  role?: string;
  content?: React.ReactNode;
}

export default function NavigationBar({ placement, ariaLabel, role, content }: NavigationBarProps) {
  const isTop = placement === 'top';
  return (
    <nav
      aria-label={ariaLabel}
      role={role}
      style={{
        display: 'flex',
        flexDirection: isTop ? 'row' : 'column',
        flexShrink: 0,
      }}
    >
      {content}
    </nav>
  );
}
