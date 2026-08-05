// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import { featureNotifications } from '@cloudscape-design/components/plugins';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { DashboardHeader, DashboardMainInfo } from './components/header';
import { DashboardSideNavigation } from './components/side-navigation';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// This is for demo purposes only. Don't use it as a code reference.
// For usage examples, see the documentation: https://hub.cx.aws.dev/g0lcxjz9bx/build/how-to-guides/integrate-with-feature-notifications/
featureNotifications.registerFeatureNotifications({
  id: 'local-feature-notifications',
  suppressFeaturePrompt: false,
  featuresPageLink: '/new-amazing-features',
  filterFeatures: () => true,
  features: [
    {
      id: '1',
      header: <>Warm Pool Support for Mixed Instance Groups</>,
      content: (
        <Box variant="p">
          Warm pool feature now works with Auto Scaling Groups that have mixed instances policies. With warm pools,
          customers can improve the elasticity of their applications, deploy applications across multiple instance types
          to enhance availability.{' '}
          <Link variant="primary" href="/feature">
            Learn more
          </Link>{' '}
          about warm pools.
        </Box>
      ),
      contentCategory: (
        <Box fontSize="body-s" color="text-label">
          Auto Scaling
        </Box>
      ),
      releaseDate: new Date('2025-11-04'),
    },
    {
      id: '2',
      header: <>Instance lifecycle policy</>,
      content: (
        <Box variant="p">
          EC2 Auto Scaling allows customers now configure instance lifecycle policies that are designed to ensure that
          instances move to a retained state when graceful shutdown procedures don't complete successfully. To get
          started, visit the EC2 Auto Scaling console or refer to our{' '}
          <Link variant="primary" href="/tech-doc">
            technical documentation
          </Link>
          .
        </Box>
      ),
      contentCategory: (
        <Box fontSize="body-s" color="text-label">
          Auto Scaling
        </Box>
      ),
      releaseDate: new Date('2025-11-20'),
    },
  ],
  mountItem: (container, data) => {
    const root = createRoot(container);
    root.render(data);
  },
  persistenceConfig: {
    uniqueKey: 'feature-notifications',
  },
});

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <DashboardMainInfo />);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <DashboardHeader actions={<Button variant="primary">Launch instance</Button>} />
            <Content />
          </SpaceBetween>
        }
        breadcrumbs={<Breadcrumbs items={[{ text: 'Dashboard', href: '#/' }]} />}
        navigation={<DashboardSideNavigation />}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
      />
    </HelpPanelProvider>
  );
}
