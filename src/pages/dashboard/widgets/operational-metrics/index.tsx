// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useContext, useState } from 'react';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import { WidgetConfig } from '../interfaces';
import Select from '@cloudscape-design/components/select';
import FormField from '@cloudscape-design/components/form-field';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { BreakdownChart } from './chart';
import { allContent, WidgetPreferences, Content } from './preferences';
import { ResponsiveLayout } from '../../components/responsive-layout';
import { EmptyState } from '../../components/empty-state';

export const operationalMetrics: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 3 },
  data: {
    icon: 'mixedContent',
    title: 'Operational metrics',
    description: 'Operational metrics of your service',
    provider: OperationalMetricsProvider,
    header: OperationalMetricsHeader,
    content: OperationalMetricsContent,
  },
};

interface OperationalWidgetContextType {
  visibleContent: ReadonlyArray<Content>;
  openPreferences: () => void;
}

const OperationalWidgetContext = createContext<OperationalWidgetContextType>({
  visibleContent: [],
  openPreferences: () => {},
});

function OperationalMetricsProvider({ children }: { children: React.ReactElement }) {
  const [preferencesVisible, setPreferencesVisible] = useState(false);
  const [visibleContent, setVisibleContent] = useState<ReadonlyArray<Content>>(allContent);
  return (
    <OperationalWidgetContext.Provider value={{ visibleContent, openPreferences: () => setPreferencesVisible(true) }}>
      {React.cloneElement(React.Children.only(children), {
        removeConfirmationText: 'Operational metrics',
        actions: [{ text: 'Preferences', onClick: () => setPreferencesVisible(true) }],
      })}
      {preferencesVisible && (
        <WidgetPreferences
          preferences={visibleContent}
          onConfirm={visibleContent => {
            setVisibleContent(visibleContent);
            setPreferencesVisible(false);
          }}
          onDismiss={() => setPreferencesVisible(false)}
        />
      )}
    </OperationalWidgetContext.Provider>
  );
}

function OperationalMetricsHeader() {
  return (
    <Header
      actions={
        <Button href="#" iconName="external" iconAlign="right" target="_blank">
          View in Cloudwatch
        </Button>
      }
    >
      Operational metrics
    </Header>
  );
}

function OperationalMetricsContent() {
  const { visibleContent, openPreferences } = useContext(OperationalWidgetContext);
  const someCostVisible = (['status', 'running', 'monitoring', 'issues'] as const).some(content =>
    visibleContent.includes(content)
  );
  if (visibleContent.length <= 0) {
    return (
      <EmptyState
        title="No data to display"
        description="Open widget preferences to choose some operational data to be displayed."
        verticalCenter={true}
        action={<Button onClick={openPreferences}>Open preferences</Button>}
      />
    );
  }
  return (
    <ResponsiveLayout
      filters={
        <FormField label="Filter displayed data">
          <Select
            selectedOption={{ label: 'December 2022' }}
            placeholder="Filter data"
            empty="Not supported in the demo"
            onChange={() => {
              /*noop*/
            }}
          />
        </FormField>
      }
    >
      {someCostVisible && (
        <ResponsiveLayout.Column header={<Header variant="h3">Overview</Header>}>
          <SpaceBetween size="s">
            {visibleContent.includes('status') && (
              <div>
                <Box variant="awsui-key-label">Status</Box>
                <StatusIndicator type="success">Running</StatusIndicator>
              </div>
            )}
            {visibleContent.includes('running') && (
              <div>
                <Box variant="awsui-key-label">Running resources</Box>
                <div>120</div>
              </div>
            )}
            {visibleContent.includes('monitoring') && (
              <div>
                <Box variant="awsui-key-label">Monitoring</Box>
                <div>Enabled</div>
              </div>
            )}
            {visibleContent.includes('issues') && (
              <div>
                <Box variant="awsui-key-label">Open issues</Box>
                <div>0</div>
              </div>
            )}
          </SpaceBetween>
        </ResponsiveLayout.Column>
      )}
      {visibleContent.includes('breakdown') && (
        <ResponsiveLayout.Column header={<Header variant="h3">Breakdown</Header>}>
          <BreakdownChart />
        </ResponsiveLayout.Column>
      )}
    </ResponsiveLayout>
  );
}
