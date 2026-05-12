// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@cloudscape-design/chat-components/avatar';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import type { IconProps } from '@cloudscape-design/components/icon';
import Icon from '@cloudscape-design/components/icon';
import LineChart from '@cloudscape-design/components/line-chart';
import Link from '@cloudscape-design/components/link';
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
import { GitHubIcon } from '../../icons';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Container variant="stacked">
      <SpaceBetween size="xs">
        <Link href="#" variant="primary" fontSize="body-m">
          {project.name}
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <SpaceBetween size="xxs">
            <Box variant="awsui-key-label">Status</Box>
            <StatusIndicator type={project.latestDeployment.statusType}>
              {project.latestDeployment.status}
            </StatusIndicator>
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box variant="awsui-key-label">Domain</Box>
            {project.domainName ? (
              <Link href={`https://${project.domainName}`} external={true} fontSize="body-s">
                {project.domainName}
              </Link>
            ) : (
              <Box color="text-body-secondary" fontSize="body-s">
                —
              </Box>
            )}
          </SpaceBetween>
          <SpaceBetween size="xxs">
            <Box variant="awsui-key-label">Last updated</Box>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'nowrap' }}>
              <GitHubIcon />
              <Link href="#" fontSize="body-s">
                {relativeTime(project.latestDeployment.createdAt)}
              </Link>
              <Box color="text-body-secondary" fontSize="body-s">
                by {project.latestDeployment.createdBy}
              </Box>
            </div>
          </SpaceBetween>
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
          <Container
            key={metric.label}
            variant="stacked"
            fitHeight={true}
            style={{
              content: { paddingBlock: '8px', paddingInline: '8px' },
              footer: { root: { paddingBlock: '4px', paddingInline: '8px' }, divider: {} },
            }}
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  href="#"
                  onFollow={e => {
                    e.preventDefault();
                    navigate(`/omega/project/${metric.projectName}`);
                  }}
                  variant="secondary"
                >
                  <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                    {metric.projectName}
                    <Icon name="arrow-right" />
                  </SpaceBetween>
                </Link>
              </div>
            }
          >
            <SpaceBetween size="xxs">
              <span style={{ fontSize: 12, fontWeight: 400, color: 'inherit', opacity: 0.7 }}>{metric.label}</span>
              <Box fontSize="heading-xl" fontWeight="normal">
                <span style={{ fontWeight: 500 }}>{metric.value}</span>
              </Box>
              <span style={{ fontSize: 12, fontWeight: 400, color: '#A4A4AD' }}>{metric.change}</span>
              <div style={{ height: 4 }} />
              <LineChart
                series={[
                  {
                    title: metric.label,
                    type: 'line',
                    data: metric.sparkline.map((y, i) => ({ x: i, y })),
                    ...(metric.color ? { color: metric.color } : {}),
                  },
                ]}
                height={50}
                hideFilter={true}
                hideLegend={true}
                xScaleType="linear"
                statusType="finished"
                empty=""
                i18nStrings={{}}
              />
            </SpaceBetween>
          </Container>
        ))}
      </ColumnLayout>
    </Container>
  );
}

function IntegrationIcon({ type }: { type: Integration['icon'] }) {
  const iconMap: Record<Integration['icon'], IconProps.Name> = {
    integration: 'arrow-right',
    'gen-ai': 'gen-ai',
    messaging: 'contact',
  };
  return <Icon name={iconMap[type]} variant="subtle" />;
}

function DomainsSection() {
  return (
    <Container
      fitHeight={true}
      header={
        <Header counter="(1)" actions={<Button iconName="add-plus" variant="icon" ariaLabel="Add domain" />}>
          Domains
        </Header>
      }
      style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="#">
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              View all domain details <Icon name="arrow-right" />
            </SpaceBetween>
          </Link>
        </div>
      }
    >
      <SpaceBetween size="xs">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="globe" variant="subtle" />
          <Link href="#" variant="primary">
            bananatruck.com
          </Link>
          <span style={{ flex: 1 }} />
          <Box color="text-body-secondary" fontSize="body-s">
            2 urls
          </Box>
        </div>
      </SpaceBetween>
    </Container>
  );
}

function IntegrationsSection() {
  return (
    <Container
      fitHeight={true}
      style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
      header={
        <Header counter="(5)" actions={<Button iconName="add-plus" variant="icon" ariaLabel="Add integration" />}>
          Integrations
        </Header>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="#">
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              View all integration details <Icon name="arrow-right" />
            </SpaceBetween>
          </Link>
        </div>
      }
    >
      <div>
        {INTEGRATIONS.map((integration, index) => (
          <div
            key={integration.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderTop: index > 0 ? `1px solid ${awsui.colorBorderDividerDefault}` : undefined,
            }}
          >
            <IntegrationIcon type={integration.icon} />
            <Link href="#" variant="primary" fontSize="body-s">
              {integration.name}
            </Link>
            <span style={{ flex: 1 }} />
            <Box color="text-body-secondary" fontSize="body-s">
              {integration.lastUsed}
            </Box>
          </div>
        ))}
      </div>
    </Container>
  );
}

const COLLABORATORS = [
  { name: 'Laura Palmer', initials: 'LP', background: 'rgba(251, 211, 50, 0.2)', textColor: '#FFE347' },
  { name: 'Audrey Horn', initials: 'AH', background: 'rgba(178, 168, 255, 0.2)', textColor: '#B2A8FF' },
  { name: 'Bobby Briggs', initials: 'BB', background: 'rgba(255, 153, 204, 0.2)', textColor: '#F9C' },
];

function CollaborationSection() {
  return (
    <>
      <style>{`.avatar-normal-weight * { font-weight: 400 !important; }`}</style>
      <Container
        fitHeight={true}
        style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
        header={
          <Header counter="(6)" actions={<Button iconName="add-plus" variant="icon" ariaLabel="Add collaborator" />}>
            Collaboration
          </Header>
        }
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="#">
              <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                View all collaborators <Icon name="arrow-right" />
              </SpaceBetween>
            </Link>
          </div>
        }
      >
        <div>
          {COLLABORATORS.map((person, index) => (
            <div
              key={person.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 0',
                borderTop: index > 0 ? `1px solid ${awsui.colorBorderDividerDefault}` : undefined,
              }}
            >
              <div className="avatar-normal-weight">
                <Avatar
                  ariaLabel={`Avatar of ${person.name}`}
                  initials={person.initials}
                  tooltipText={person.name}
                  style={{
                    root: { background: person.background, ...(person.textColor ? { color: person.textColor } : {}) },
                  }}
                />
              </div>
              <Box fontWeight="normal">{person.name}</Box>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderTop: `1px solid ${awsui.colorBorderDividerDefault}`,
            }}
          >
            <Icon name="envelope" variant="subtle" />
            <Box color="text-body-secondary">2 pending</Box>
          </div>
        </div>
      </Container>
    </>
  );
}

function UsageSection() {
  return (
    <Container
      fitHeight={true}
      style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
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
      style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
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
                <Box fontSize="body-m">{step.title}</Box>
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
      {/* Projects + Integrations + Domains row */}
      <Grid gridDefinition={[{ colspan: 6 }, { colspan: 3 }, { colspan: 3 }]}>
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
        >
          <SpaceBetween size="xs">
            {SAMPLE_PROJECTS.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SpaceBetween>
        </Container>
        <IntegrationsSection />
        <DomainsSection />
      </Grid>

      {/* Telemetry + Collaboration row */}
      <Grid gridDefinition={[{ colspan: 9 }, { colspan: 3 }]}>
        <TelemetrySection />
        <CollaborationSection />
      </Grid>

      {/* Usage + Next steps row */}
      <Grid gridDefinition={[{ colspan: { default: 7, l: 6 } }, { colspan: { default: 5, l: 6 } }]}>
        <UsageSection />
        <NextStepsSection />
      </Grid>
    </SpaceBetween>
  );
}
