// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { lazy, Suspense, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import NavigationBar from '@cloudscape-design/components/navigation-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import * as awsui from '@cloudscape-design/design-tokens';

import { AwsLogoMark } from '../aws-mark';
import { Sidebar, SidebarSection } from '../components/sidebar';

const WorkspacesPage = lazy(() => import('./courtyard/workspaces'));
const TeamPage = lazy(() => import('./courtyard/team'));
const BillingPage = lazy(() => import('./courtyard/billing'));
const ProfilePage = lazy(() => import('./courtyard/profile'));

const SECTIONS: SidebarSection[] = [
  {
    items: [
      { icon: 'folder', label: 'Workspaces', path: '/courtyard/workspaces' },
      { icon: 'group-active', label: 'Team', path: '/courtyard/team' },
      { icon: 'ticket', label: 'Billing', path: '/courtyard/billing' },
      { icon: 'user-profile', label: 'Profile', path: '/courtyard/profile' },
    ],
  },
];

interface CourtyardFooterProps {
  userName: string;
  userEmail: string;
  profileActive: boolean;
  onNavigate: (path: string) => void;
}

function CourtyardFooter({ userName, userEmail, profileActive, onNavigate }: CourtyardFooterProps) {
  const buttonStyle = { root: { borderRadius: '4px' } };
  return (
    <div
      style={{
        margin: awsui.spaceScaledS,
        padding: `${awsui.spaceStaticXs} ${awsui.spaceStaticXs} ${awsui.spaceStaticM}`,
        display: 'flex',
        flexDirection: 'column',
        gap: awsui.spaceStaticXs,
        background: awsui.colorBackgroundContainerContent,
        borderRadius: awsui.borderRadiusContainer,
        // Fixed width keeps the footer rendered at its expanded size at all times.
        // During the sidebar expand/collapse animation the outer container's
        // `overflow: hidden` clips the footer rather than letting its buttons and
        // text reflow mid-transition.
        boxSizing: 'border-box',
        inlineSize: `calc(240px - 2 * ${awsui.spaceScaledS})`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: awsui.spaceStaticXxxs }}>
        <Box variant="strong">{userName}</Box>
        <Box variant="small" color="text-body-secondary">
          {userEmail}
        </Box>
      </div>
      <SpaceBetween size="xs" direction="vertical">
        <Button
          fullWidth={true}
          variant={profileActive ? 'primary' : 'normal'}
          onClick={() => onNavigate('/courtyard/profile')}
          ariaLabel="Profile"
          style={buttonStyle}
        >
          Profile
        </Button>
        <Button
          fullWidth={true}
          iconName="external"
          iconAlign="right"
          target="_blank"
          href="https://console.aws.amazon.com/iam/home#/security_credentials"
          style={buttonStyle}
        >
          Manage security
        </Button>
      </SpaceBetween>
      <Button fullWidth={true} variant="inline-link" onClick={() => onNavigate('/')} ariaLabel="Sign out">
        Sign out
      </Button>
    </div>
  );
}

export default function CourtyardShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  // Path is like /courtyard/workspaces — strip leading /courtyard/ to get the tab.
  const activeTab = location.pathname.replace(/^\/courtyard\/?/, '').split('/')[0] || 'workspaces';

  const PageComponent = (() => {
    switch (activeTab) {
      case 'team':
        return TeamPage;
      case 'billing':
        return BillingPage;
      case 'profile':
        return ProfilePage;
      case 'workspaces':
      default:
        return WorkspacesPage;
    }
  })();

  return (
    <AppLayoutToolbar
      navigationHide={true}
      toolsHide={true}
      disableContentPaddings={true}
      content={
        <div
          style={{
            display: 'flex',
            height: '100dvh',
            backgroundColor: awsui.colorBackgroundLayoutMain,
          }}
        >
          <NavigationBar
            placement="start"
            variant="secondary"
            ariaLabel="Side navigation"
            content={
              <Sidebar
                brand={{ text: 'Courtyard', short: <AwsLogoMark width={52} height={30} aria-label="AWS" /> }}
                sections={SECTIONS}
                activePath={location.pathname}
                user={{ name: 'Alex', email: 'alex@example.com' }}
                expanded={expanded}
                onToggle={() => setExpanded(e => !e)}
                onNavigate={navigate}
                footer={
                  <CourtyardFooter
                    userName="Alex"
                    userEmail="alex@example.com"
                    profileActive={activeTab === 'profile'}
                    onNavigate={navigate}
                  />
                }
              />
            }
          />
          <main style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }} tabIndex={-1}>
            <Suspense fallback={<Spinner size="large" />}>
              <PageComponent />
            </Suspense>
          </main>
        </div>
      }
    />
  );
}
