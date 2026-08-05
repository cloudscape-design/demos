// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { Link } from '@cloudscape-design/components';

import Logo from './logo';
import { colors } from './theme';

function SupportLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="#"
      style={{
        root: {
          color: {
            active: colors.grey350,
            default: colors.grey400,
            hover: colors.grey350,
          },
          focusRing: {
            borderColor: colors.grey100,
          },
        },
      }}
    >
      {children}
    </Link>
  );
}

function ConnectLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="#"
      variant="primary"
      style={{
        root: {
          color: {
            active: colors.grey350,
            default: colors.grey400,
            hover: colors.grey350,
          },
          focusRing: {
            borderColor: colors.grey100,
          },
        },
      }}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="page-footer">
      <div className="footer-content">
        <div className="tagline">
          <Logo color={colors.grey0} />

          <span>
            Book the perfect hotel
            <br />
            for your dream getaway.
          </span>
        </div>

        <div className="support">
          <h3>Support</h3>

          <SupportLink>Help Centre</SupportLink>

          <SupportLink>Travel resources</SupportLink>

          <SupportLink>Cancellation options</SupportLink>

          <SupportLink>Contact</SupportLink>
        </div>

        <div className="corporate">
          <h3>Corporate</h3>

          <SupportLink>Newsroom</SupportLink>

          <SupportLink>Careers</SupportLink>

          <SupportLink>Gift cards</SupportLink>

          <SupportLink>Investors</SupportLink>
        </div>

        <div className="copyright">
          <span>© 2025, WanderWoo, Inc. All rights reserved</span>
          <span>|</span>
          <ConnectLink>Connect</ConnectLink>
          <span>|</span>
          <ConnectLink>Site Terms</ConnectLink>
          <span>|</span>
          <ConnectLink>Cookie Preferences</ConnectLink>
        </div>
      </div>
    </div>
  );
}
