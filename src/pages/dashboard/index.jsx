// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import '../../styles/dashboard.scss';

import { appLayoutAriaLabels } from '../../i18n-strings';

import { DashboardHeader, EC2Info } from './components/header';
import { FeaturesSpotlight, AccountAttributes } from './components/related-resources';
import ServiceOverview from './components/overview';
import ServiceHealth from './components/service-health';
import ZoneStatus from './components/zone-status';
import Alarms from './components/alarms';
import InstancesLimits from './components/instance-limits';
import Events from './components/events';
import CPUUtilisation from './components/cpu-utilisation';
import NetworkTraffic from './components/network-traffic';
import { DashboardSideNavigation } from './components/side-navigation';
import { Notifications } from '../commons';

function Breadcrumbs() {
  const breadcrumbItems = [
    {
      text: 'Service',
      href: '#/',
    },
    {
      text: 'Dashboard',
      href: '#/',
    },
  ];
  return <BreadcrumbGroup items={breadcrumbItems} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />;
}

function Content(props) {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
      ]}
    >
      <ServiceOverview />
      <ServiceHealth loadHelpPanelContent={props.loadHelpPanelContent} />
      <CPUUtilisation />
      <NetworkTraffic />
      <Alarms />
      <InstancesLimits />
      <Events />
      <ZoneStatus />
      <FeaturesSpotlight />
      <AccountAttributes />
    </Grid>
  );
}

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(<EC2Info />);
  const appLayout = useRef();

  const loadHelpPanelContent = toolsContent => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
    appLayout.current?.focusToolsClose();
  };

  return (
    <AppLayout
      ref={appLayout}
      content={
        <ContentLayout header={<DashboardHeader loadHelpPanelContent={loadHelpPanelContent} />}>
          <Content loadHelpPanelContent={loadHelpPanelContent} />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={<Breadcrumbs />}
      navigation={<DashboardSideNavigation />}
      tools={toolsContent}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      ariaLabels={appLayoutAriaLabels}
      notifications={<Notifications />}
    />
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
