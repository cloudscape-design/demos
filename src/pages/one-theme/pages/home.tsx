// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import * as awsui from '@cloudscape-design/design-tokens';

import { AwsLogo } from '../aws-logo';

const NAV_LINKS = ['Discover AWS', 'Products', 'Solutions', 'Pricing', 'Resources'];

interface EntryPoint {
  title: string;
  description: string;
  path: string;
  cta: string;
  accent: string;
}

const ENTRY_POINTS: EntryPoint[] = [
  {
    title: 'Auth',
    description:
      'Multi-step sign-up flow covering email, verification, password, and contact details with social sign-in options.',
    path: '/auth',
    cta: 'Start sign-up',
    accent: '#FF9900',
  },
  {
    title: 'AWS Console',
    description:
      'Console home with Amazon Q prompt, recent services, cost & usage overview, and an "Explore AWS" activity tracker.',
    path: '/console',
    cta: 'Open console',
    accent: '#7AA9FF',
  },
  {
    title: 'AWS Courtyard',
    description:
      'Account management suite: project accounts (workspaces), team members, billing with spend tracking, and profile.',
    path: '/courtyard/workspaces',
    cta: 'Open Courtyard',
    accent: '#4BAE8A',
  },
  {
    title: 'Omega',
    description: 'Product console with overview dashboard, projects, deployments, deployment logs, and create flow.',
    path: '/omega',
    cta: 'Open Omega',
    accent: '#E885D2',
  },
];

function EntryCard({ entry, onOpen }: { entry: EntryPoint; onOpen: () => void }) {
  return (
    <Container fitHeight={true}>
      <SpaceBetween size="m">
        <div
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: entry.accent,
            width: 48,
          }}
          aria-hidden="true"
        />
        <Header variant="h2">{entry.title}</Header>
        <Box color="text-body-secondary">{entry.description}</Box>
        <Button variant="primary" onClick={onOpen}>
          {entry.cta}
        </Button>
      </SpaceBetween>
    </Container>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Amazon Ember, Helvetica Neue, sans-serif',
      }}
    >
      {/* Top utility bar */}
      <div
        style={{
          backgroundColor: awsui.colorBackgroundHomeHeader,
          color: awsui.colorTextHomeHeaderDefault,
          padding: '6px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 24,
          fontSize: 13,
        }}
      >
        <a href="#" style={{ color: awsui.colorTextHomeHeaderDefault, textDecoration: 'none' }}>
          🌐 English
        </a>
        <a href="#" style={{ color: awsui.colorTextHomeHeaderDefault, textDecoration: 'none' }}>
          Contact us
        </a>
        <a href="#" style={{ color: awsui.colorTextHomeHeaderDefault, textDecoration: 'none' }}>
          AWS Marketplace
        </a>
        <a href="#" style={{ color: awsui.colorTextHomeHeaderDefault, textDecoration: 'none' }}>
          Support ▾
        </a>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            navigate('/auth');
          }}
          style={{ color: awsui.colorTextHomeHeaderDefault, textDecoration: 'none' }}
        >
          My Account
        </a>
      </div>

      {/* Main navigation */}
      <div
        style={{
          backgroundColor: awsui.colorBackgroundContainerContent,
          borderBottom: `1px solid ${awsui.colorBorderDividerDefault}`,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          height: 56,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
          <AwsLogo style={{ height: 32, width: 'auto' }} />
        </div>

        {NAV_LINKS.map(link => (
          <a
            key={link}
            href="#"
            style={{ textDecoration: 'none', color: awsui.colorTextBodyDefault, fontSize: 14, fontWeight: 500 }}
          >
            {link}
          </a>
        ))}

        <div style={{ flex: 1 }} />

        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            navigate('/console');
          }}
          style={{
            textDecoration: 'none',
            color: awsui.colorTextBodyDefault,
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          Sign in to console
        </a>

        <Button variant="primary" onClick={() => navigate('/auth')}>
          Create an account
        </Button>
      </div>

      {/* Main content: "One Theme" entry points */}
      <div style={{ flex: 1, backgroundColor: awsui.colorBackgroundCellShaded }}>
        <ContentLayout
          defaultPadding={true}
          header={
            <Box padding={{ vertical: 'xxl' }}>
              <SpaceBetween size="s">
                <Box fontSize="display-l" fontWeight="bold" variant="h1" padding="n">
                  One Theme
                </Box>
                <Box fontSize="heading-m" fontWeight="light" color="text-body-secondary">
                  A showcase of AWS experiences — sign up, use the console, manage accounts, and deploy apps — all built
                  with Cloudscape components and shared design tokens.
                </Box>
              </SpaceBetween>
            </Box>
          }
        >
          <SpaceBetween size="xl">
            <ColumnLayout columns={2} minColumnWidth={320}>
              {ENTRY_POINTS.map(entry => (
                <EntryCard key={entry.path} entry={entry} onOpen={() => navigate(entry.path)} />
              ))}
            </ColumnLayout>

            <Container>
              <SpaceBetween size="s">
                <Header variant="h3">Quick links</Header>
                <SpaceBetween direction="horizontal" size="m">
                  {ENTRY_POINTS.map(entry => (
                    <Link
                      key={entry.path}
                      href={`#${entry.path}`}
                      onFollow={e => {
                        e.preventDefault();
                        navigate(entry.path);
                      }}
                    >
                      {entry.title}
                    </Link>
                  ))}
                </SpaceBetween>
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </ContentLayout>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: awsui.colorBackgroundHomeHeader,
          color: awsui.colorTextBodySecondary,
          textAlign: 'center',
          padding: '16px 24px',
          fontSize: 12,
        }}
      >
        © 2026, Amazon Web Services, Inc. or its affiliates. &nbsp;
        <a href="#" style={{ color: awsui.colorTextBodySecondary }}>
          Privacy
        </a>
        &nbsp;|&nbsp;
        <a href="#" style={{ color: awsui.colorTextBodySecondary }}>
          Site terms
        </a>
        &nbsp;|&nbsp;
        <a href="#" style={{ color: awsui.colorTextBodySecondary }}>
          Cookie Notice
        </a>
      </div>
    </div>
  );
}
