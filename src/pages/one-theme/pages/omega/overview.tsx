// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import type { IconProps } from '@cloudscape-design/components/icon';
import Icon from '@cloudscape-design/components/icon';
import Input from '@cloudscape-design/components/input';
import LineChart from '@cloudscape-design/components/line-chart';
import Link from '@cloudscape-design/components/link';
import Popover from '@cloudscape-design/components/popover';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import * as awsui from '@cloudscape-design/design-tokens';

import {
  type Integration,
  INTEGRATIONS,
  NEXT_STEPS,
  type Project,
  relativeTime,
  SAMPLE_PROJECTS,
  TELEMETRY_METRICS,
  USAGE_METRICS,
} from '../../data';
import { GitBranchIcon, GitHubIcon } from '../../icons';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Container variant="stacked">
      <SpaceBetween size="xs">
        <Header actions={<Button variant="icon" iconName="ellipsis" ariaLabel="More options" />}>{project.name}</Header>
        {project.domainName && (
          <Link href={`https://${project.domainName}`} variant="secondary" external={true} fontSize="body-m">
            {project.domainName}
          </Link>
        )}
        <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
          <GitHubIcon />
          <Link href="#" variant="primary">
            <Box color="text-body-secondary">
              {project.repoOwner}/{project.repoName}
            </Box>
          </Link>
        </SpaceBetween>
        <Box variant="h5">{project.lastCommitMessage}</Box>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SpaceBetween direction="horizontal" size="xs">
            <StatusIndicator type={project.latestDeployment.statusType}>
              <Popover content={project.latestDeployment.createdAt} dismissButton={false} size="small">
                {relativeTime(project.latestDeployment.createdAt)}
              </Popover>
            </StatusIndicator>
            {project.latestDeployment.sourceBranch && (
              <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                <GitBranchIcon />
                <Box color="text-body-secondary" fontSize="body-s">
                  {project.latestDeployment.sourceBranch}
                </Box>
              </SpaceBetween>
            )}
          </SpaceBetween>
          <Button variant="inline-icon" iconName="arrow-right" />
        </div>
      </SpaceBetween>
    </Container>
  );
}

function TelemetrySection() {
  const navigate = useNavigate();
  return (
    <Container fitHeight={true} header={<Header>Telemetry highlights</Header>}>
      <ColumnLayout columns={4}>
        {TELEMETRY_METRICS.map(metric => (
          <SpaceBetween key={metric.label} size="xxs">
            <Box padding={{ top: 'm' }}>
              <LineChart
                series={[
                  {
                    title: metric.label,
                    type: 'line',
                    data: metric.sparkline.map((y, i) => ({ x: i, y })),
                  },
                ]}
                height={36}
                hideFilter={true}
                hideLegend={true}
                xScaleType="linear"
                statusType="finished"
                empty=""
                i18nStrings={{}}
              />
            </Box>
            <Box color="text-body-secondary" fontWeight="bold">
              {metric.label}
            </Box>
            <SpaceBetween size="xs" direction="horizontal" alignItems="end">
              <Box fontSize="heading-l" fontWeight="bold">
                {metric.value}
              </Box>
              <Box color="text-body-secondary" fontSize="body-s">
                {metric.change}
              </Box>
            </SpaceBetween>
            <Link
              href="#"
              onFollow={e => {
                e.preventDefault();
                navigate(`/omega/project/${metric.projectName}`);
              }}
              variant="primary"
            >
              <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                {metric.projectName}
                <Icon name="arrow-right" />
              </SpaceBetween>
            </Link>
          </SpaceBetween>
        ))}
      </ColumnLayout>
    </Container>
  );
}

function IntegrationIcon({ type }: { type: Integration['icon'] }) {
  const iconMap: Record<Integration['icon'], IconProps.Name> = {
    storage: 'folder',
    'gen-ai': 'gen-ai',
    database: 'share',
  };
  return <Icon name={iconMap[type]} variant="subtle" />;
}

function IntegrationsSection() {
  return (
    <Container
      header={
        <Header counter="(5)" actions={<Button iconName="add-plus">Add</Button>}>
          Integrations
        </Header>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="#">
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              View all <Icon name="arrow-right" />
            </SpaceBetween>
          </Link>
        </div>
      }
    >
      <SpaceBetween size="xs">
        {INTEGRATIONS.map(integration => (
          <Button key={integration.name} fullWidth={true} variant="normal">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <IntegrationIcon type={integration.icon} />
              <Box fontSize="body-s">{integration.name}</Box>
              <span style={{ flex: 1 }} />
              <Box color="text-body-secondary" fontSize="body-s">
                {integration.lastUsed}
              </Box>
            </span>
          </Button>
        ))}
      </SpaceBetween>
    </Container>
  );
}

function CollaborationSection() {
  const [email, setEmail] = useState('');

  return (
    <Container
      fitHeight={true}
      header={<Header>Collaboration</Header>}
      footer={
        <Link href="#" external={true} variant="primary">
          Manage team in AWS Portal
        </Link>
      }
    >
      <SpaceBetween size="m">
        <FormField label="Email">
          <Input
            value={email}
            onChange={({ detail }) => setEmail(detail.value)}
            placeholder="friend@example.com"
            type="email"
          />
        </FormField>
        <Button>Invite collaborator</Button>
      </SpaceBetween>
    </Container>
  );
}

function UsageSection() {
  return (
    <Container
      fitHeight={true}
      header={<Header>Usage</Header>}
      footer={
        <Link href="#" external={true} variant="primary">
          View usage in AWS Portal
        </Link>
      }
    >
      <ColumnLayout columns={2}>
        {USAGE_METRICS.map(metric => (
          <SpaceBetween key={metric.label} size="xxs">
            <Box variant="awsui-key-label">{metric.label}</Box>
            <ProgressBar value={metric.percentage} additionalInfo={`${metric.current} / ${metric.limit}`} />
          </SpaceBetween>
        ))}
      </ColumnLayout>
    </Container>
  );
}

function NextStepsSection() {
  return (
    <Container
      fitHeight={true}
      header={<Header>Next steps</Header>}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="#">
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              View all recommendations <Icon name="arrow-right" />
            </SpaceBetween>
          </Link>
        </div>
      }
    >
      <ColumnLayout columns={2}>
        {NEXT_STEPS.map(step => (
          <Container variant="stacked" key={step.title}>
            <SpaceBetween size="s">
              {/* Decorative illustration placeholder */}
              <div
                style={{
                  height: 40,
                  borderRadius: 4,
                  opacity: 0.3,
                  background: `linear-gradient(135deg, ${awsui.colorChartsPaletteCategorical1} 0%, ${awsui.colorChartsPaletteCategorical2} 100%)`,
                }}
              />
              <SpaceBetween size="xxs">
                <Box fontWeight="bold" fontSize="body-m">
                  {step.title}
                </Box>
                <Box color="text-body-secondary" fontSize="body-s">
                  {step.description}
                </Box>
              </SpaceBetween>
            </SpaceBetween>
          </Container>
        ))}
      </ColumnLayout>
    </Container>
  );
}

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <SpaceBetween size="l">
      {/* Projects section */}
      <Container
        fitHeight={true}
        header={
          <Header
            counter="(3)"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button iconName="refresh" ariaLabel="Refresh" variant="icon" />
                <Button iconName="add-plus" onClick={() => navigate('/omega/create')}>
                  Create
                </Button>
              </SpaceBetween>
            }
          >
            Projects
          </Header>
        }
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              href="#/omega/projects"
              onFollow={e => {
                e.preventDefault();
                navigate('/omega/projects');
              }}
            >
              <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                View all projects <Icon name="arrow-right" />
              </SpaceBetween>
            </Link>
          </div>
        }
      >
        <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}>
          {SAMPLE_PROJECTS.slice(0, 3).map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </Container>

      {/* Telemetry + Integrations row */}
      <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
        <TelemetrySection />
        <IntegrationsSection />
      </Grid>

      {/* Collaboration + Usage + Next steps row */}
      <Grid
        gridDefinition={[
          { colspan: { default: 5, l: 3 } },
          { colspan: { default: 7, l: 3 } },
          { colspan: { default: 6, l: 6 } },
        ]}
      >
        <CollaborationSection />
        <UsageSection />
        <NextStepsSection />
      </Grid>
    </SpaceBetween>
  );
}
