// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import { Icon, Link, SpaceBetween } from '@cloudscape-design/components-core';

import Logo from './logo';
import { colors } from './theme';

function HeaderLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="#"
      style={{
        root: {
          color: {
            active: `light-dark(${colors.grey850}, ${colors.grey100})`,
            default: `light-dark(${colors.grey650}, ${colors.grey300})`,
            hover: `light-dark(${colors.grey850}, ${colors.grey100})`,
          },
          focusRing: {
            borderColor: colors.grey650,
          },
        },
      }}
    >
      <span style={{ fontSize: '18px' }}>{children}</span>
    </Link>
  );
}

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('awsui-polaris-dark-mode'));
    };

    // Check initial state
    checkDarkMode();

    // Create observer to watch for class changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-header-container">
      <div className="page-header">
        <Logo color={isDarkMode ? colors.grey100 : colors.grey850} />

        <SpaceBetween direction="horizontal" size="xl">
          <div className="header-nav-links">
            <SpaceBetween direction="horizontal" size="xl">
              <HeaderLink>Hotels</HeaderLink>

              <HeaderLink>My bookings</HeaderLink>

              <HeaderLink>Profile</HeaderLink>
            </SpaceBetween>
          </div>

          <span style={{ color: `light-dark(${colors.grey650}, ${colors.grey100})` }}>
            <Icon name="menu" />
          </span>
        </SpaceBetween>
      </div>
    </div>
  );
}
