// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box, { BoxProps } from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import List from '@cloudscape-design/components/list';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Section } from './utils';

// ─── Data ──────────────────────────────────────────────────────────────────────
const ALL_VARIANTS: BoxProps.VisualAccent.Color[] = [
  'red',
  'yellow',
  'indigo',
  'green',
  'orange',
  'purple',
  'mint',
  'lime',
  'grey',
  'teal',
  'cyan',
  'blue',
  'violet',
  'fuchsia',
  'magenta',
  'pink',
  'rose',
  'amber',
];

const BOX_VARIANTS: { variant: BoxProps['variant']; label: string; content: string }[] = [
  { variant: 'h4', label: 'h4', content: 'Heading 4' },
  { variant: 'p', label: 'p', content: 'Body paragraph text' },
];

const LIST_ITEMS: { id: string; content: string; icon: string; color: BoxProps.VisualAccent.Color }[] = [
  { id: 'health', content: 'Health overview', icon: 'face-happy', color: 'green' },
  { id: 'functions', content: 'Functions', icon: 'script', color: 'indigo' },
  { id: 'network', content: 'Network configuration', icon: 'globe', color: 'grey' },
  { id: 'multi-session', content: 'Multi-session data', icon: 'multiscreen', color: 'purple' },
  { id: 'alert', content: 'Alert center', icon: 'security', color: 'red' },
  { id: 'communication', content: 'Communication', icon: 'contact', color: 'mint' },
];

// ─── Section ─────────────────────────────────────────────────────────────────────
export default function BoxVisualAccent() {
  return (
    <Section header="Box visualAccent" level="h2" container={false}>
      <SpaceBetween size="l">
        <Box variant="p" color="text-body-secondary">
          Uses the existing Box component with a new <code>visualAccent</code> prop. No wrapper component or utility
          classes needed.
        </Box>

        {/* ── Box text variants × accent colors ─────────────────────────── */}
        <Container header={<Header variant="h3">Text inside accent boxes</Header>}>
          <SpaceBetween size="l">
            {BOX_VARIANTS.map(({ variant, label, content }) => (
              <section key={label}>
                <Box variant="h4" padding={{ bottom: 's' }}>
                  Wrapping Box variant=&quot;{label}&quot;
                </Box>
                <SpaceBetween size="m" direction="horizontal">
                  {ALL_VARIANTS.map(color => (
                    <Box key={color} visualAccent={{ color }} padding={{ horizontal: 'xxxs', vertical: 'n' }}>
                      <Box variant={variant} color="inherit">
                        {content}
                      </Box>
                    </Box>
                  ))}
                </SpaceBetween>
              </section>
            ))}
          </SpaceBetween>
        </Container>

        {/* ── Icons in accent boxes ─────────────────────────────────────── */}
        <Container header={<Header variant="h3">Icons in accent boxes</Header>}>
          <SpaceBetween size="m" direction="horizontal">
            {ALL_VARIANTS.map(color => (
              <Box key={color} visualAccent={{ color, aspectRatio: 'equal', borderRadius: '50%' }}>
                <Icon name="check" size="medium" />
              </Box>
            ))}
          </SpaceBetween>
        </Container>

        {/* ── Application in components ──────────────────────────────────── */}
        <Container header={<Header variant="h3">KeyValuePairs</Header>}>
          <KeyValuePairs
            columns={3}
            items={[
              {
                label: 'Components',
                value: (
                  <Box
                    visualAccent={{ color: 'mint' }}
                    padding={{ horizontal: 'xxxs', vertical: 'xxxs' }}
                    margin={{ top: 'xxs' }}
                  >
                    <span style={{ fontSize: '20px' }}>114</span>
                  </Box>
                ),
              },
              {
                label: 'Patterns',
                value: (
                  <Box
                    visualAccent={{ color: 'mint' }}
                    padding={{ horizontal: 'xxxs', vertical: 'xxxs' }}
                    margin={{ top: 'xxs' }}
                  >
                    <span style={{ fontSize: '20px' }}>81</span>
                  </Box>
                ),
              },
              {
                label: 'Demos',
                value: (
                  <Box
                    visualAccent={{ color: 'mint' }}
                    padding={{ horizontal: 'xxxs', vertical: 'xxxs' }}
                    margin={{ top: 'xxs' }}
                  >
                    <span style={{ fontSize: '20px' }}>35</span>
                  </Box>
                ),
              },
            ]}
          />
        </Container>

        <Container header={<Header variant="h3">List</Header>}>
          <List
            ariaLabel="List with accent icon badges"
            items={LIST_ITEMS}
            renderItem={item => ({
              id: item.id,
              content: item.content,
              icon: (
                <Box padding={'s'} visualAccent={{ color: item.color, borderRadius: '6px', aspectRatio: 'equal' }}>
                  <Icon name={item.icon as any} size="medium" />
                </Box>
              ),
            })}
          />
        </Container>
      </SpaceBetween>
    </Section>
  );
}
