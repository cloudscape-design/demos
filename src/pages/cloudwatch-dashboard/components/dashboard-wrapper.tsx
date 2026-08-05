// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { Dashboard, DashboardConfig } from '@amzn/cloudwatchdashboards-inside';

import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { definition } from '../config';

interface DashboardWrappertProps {
  definition: typeof definition;
  config: DashboardConfig;
}
export default function DashboardWrapper({ definition, config }: DashboardWrappertProps) {
  const [loading, setLoading] = useState(true);
  const dashboardContainerRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<Dashboard | null>(null);

  useEffect(() => {
    if (dashboardContainerRef.current) {
      const dashboard = new Dashboard(dashboardContainerRef.current, 'Vasya-test-dashboard', 'us-east-1', config);
      dashboardRef.current = dashboard;

      const handleReady = () => {
        dashboard.update(definition);
        setLoading(false);
      };

      dashboard.on('ready', handleReady);

      return () => {
        dashboard.release();
      };
    }
  }, [config, definition]);

  return (
    <div>
      {loading && <StatusIndicator type="loading">Loading</StatusIndicator>}
      <div ref={dashboardContainerRef} />
    </div>
  );
}
