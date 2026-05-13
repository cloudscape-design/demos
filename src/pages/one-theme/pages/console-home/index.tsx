// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '@cloudscape-design/components/alert';
import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ButtonGroup from '@cloudscape-design/components/button-group';
import Grid from '@cloudscape-design/components/grid';
import Input from '@cloudscape-design/components/input';
import PromptInput from '@cloudscape-design/components/prompt-input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import awsLogoUrl from '../../aws.svg';
import { CostUsageWidget } from './cost-usage-widget';
import { ExploreWidget } from './explore-widget';

const SUGGESTED_PROMPTS: Array<{ icon: string; text: string }> = [
  { icon: '🤘', text: 'Build a web app' },
  { icon: '🐇', text: 'Setup starter home account' },
  { icon: '🔮', text: 'Troubleshoot account' },
];

function AiToolsBanner() {
  return (
    <Alert
      type="info"
      header="Setup your AWS credentials to use with AI coding tools"
      action={<Button variant="normal">Copy agent prompt</Button>}
    >
      Copy this prompt to use AWS with your local AI coding tool (Kiro, VS Code, Claude Code, Cursor, Windsurf)
    </Alert>
  );
}

function WelcomeSection() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 16px 64px' }}>
      <Box variant="h1" textAlign="center" fontSize="display-l" padding={{ bottom: 'xl' }}>
        Welcome John,
        <br />
        this is your workspace
      </Box>
      <div style={{ width: '100%', maxWidth: 720 }}>
        <PromptInput
          onChange={({ detail }) => setValue(detail.value)}
          value={value}
          actionButtonAriaLabel="Send message"
          actionButtonIconName="send"
          ariaLabel="Prompt input with action button"
          disableSecondaryActionsPaddings={true}
          placeholder="Ask a question"
          minRows={3}
          secondaryActions={
            <Box padding={{ left: 'xxs', top: 'xs' }}>
              <ButtonGroup
                ariaLabel="Chat actions"
                items={[
                  { type: 'icon-button', id: 'upload', iconName: 'upload', text: 'Upload files' },
                  { type: 'icon-button', id: 'expand', iconName: 'expand', text: 'Go full page' },
                ]}
                variant="icon"
              />
            </Box>
          }
        />
        <Box padding={{ top: 'm' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {SUGGESTED_PROMPTS.map(prompt => (
              <Button
                key={prompt.text}
                variant="normal"
                onClick={() => setValue(prompt.text)}
                style={{
                  root: {
                    borderColor: {
                      default: '#5C7FFF',
                      hover: '#809bff',
                    },
                    paddingBlock: '12px',
                    paddingInline: '16px',
                  },
                }}
              >
                <span aria-hidden="true" style={{ marginInlineEnd: 6 }}>
                  {prompt.icon}
                </span>
                {prompt.text}
              </Button>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
}

function ConsoleHomeContent() {
  return (
    <SpaceBetween size="l">
      <AiToolsBanner />

      <WelcomeSection />

      <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
        <CostUsageWidget />
        <ExploreWidget />
      </Grid>
    </SpaceBetween>
  );
}

function ConsoleTopNav() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <TopNavigation
      identity={{
        href: '#/console',
        logo: { src: awsLogoUrl, alt: 'AWS' },
      }}
      search={
        <Input
          type="search"
          placeholder="Search [⌥S]"
          ariaLabel="Search services, features, and documentation"
          value={searchValue}
          onChange={({ detail }) => setSearchValue(detail.value)}
        />
      }
      utilities={[
        { type: 'button', iconName: 'gen-ai', ariaLabel: 'Amazon Q', disableUtilityCollapse: true },
        { type: 'button', iconName: 'view-horizontal', ariaLabel: 'Services', disableUtilityCollapse: true },
        { type: 'button', iconName: 'notification', ariaLabel: 'Notifications', disableUtilityCollapse: true },
        { type: 'button', iconName: 'status-info', ariaLabel: 'Support', disableUtilityCollapse: true },
        {
          type: 'menu-dropdown',
          text: 'My workspace',
          items: [
            { id: 'account', text: 'Account settings' },
            { id: 'courtyard', text: 'Courtyard', href: '#/courtyard/workspaces' },
            { id: 'omega', text: 'Omega', href: '#/omega' },
            { id: 'billing', text: 'Billing', href: '#/courtyard/billing' },
            { id: 'security', text: 'Security credentials' },
            { id: 'signout', text: 'Sign out', href: '#/' },
          ],
          onItemClick: ({ detail }) => {
            if (detail.id === 'courtyard') {
              navigate('/courtyard/workspaces');
            } else if (detail.id === 'omega') {
              navigate('/omega');
            } else if (detail.id === 'billing') {
              navigate('/courtyard/billing');
            } else if (detail.id === 'signout') {
              navigate('/');
            }
          },
        },
      ]}
      i18nStrings={{
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
      }}
    />
  );
}

export default function ConsoleHomePage() {
  return (
    <>
      {/* Bumps the TopNavigation logo above Cloudscape's default 32px cap. */}
      <style>{`#h [class*="awsui_logo"] { max-block-size: 22px; block-size: 22px; }`}</style>
      <div id="h">
        <ConsoleTopNav />
      </div>

      <AppLayoutToolbar navigationHide={true} toolsHide={true} content={<ConsoleHomeContent />} />
    </>
  );
}
