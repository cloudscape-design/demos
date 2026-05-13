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
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import LineChart from '@cloudscape-design/components/line-chart';
import Link from '@cloudscape-design/components/link';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import * as awsui from '@cloudscape-design/design-tokens';

import profileImg from '../../../../common/profile.png';
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
        <KeyValuePairs
          columns={3}
          items={[
            {
              label: 'Status',
              value: (
                <StatusIndicator type={project.latestDeployment.statusType}>
                  {project.latestDeployment.status}
                </StatusIndicator>
              ),
            },
            {
              label: 'Domain',
              value: project.domainName ? (
                <span style={{ whiteSpace: 'nowrap' }}>
                  <Link href={`https://${project.domainName}`} external={true} fontSize="body-m">
                    {project.domainName}
                  </Link>
                </span>
              ) : (
                '—'
              ),
            },
            {
              label: 'Last updated',
              value: (
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}
                >
                  <span style={{ flexShrink: 0, display: 'flex' }}>
                    <GitHubIcon />
                  </span>
                  <Link href="#" fontSize="body-m">
                    {relativeTime(project.latestDeployment.createdAt)}
                  </Link>
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#909090' }}>
                    by {project.latestDeployment.createdBy}
                  </span>
                </div>
              ),
            },
          ]}
        />
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
              content: { paddingBlock: '8px', paddingInline: '12px' },
              footer: { root: { paddingBlock: '4px', paddingInline: '12px' }, divider: {} },
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
              <KeyValuePairs
                columns={1}
                items={[
                  {
                    label: metric.label,
                    value: (
                      <SpaceBetween size="xxs">
                        <Box fontSize="heading-xl" fontWeight="normal">
                          <span style={{ fontWeight: 500 }}>{metric.value}</span>
                        </Box>
                        <span style={{ fontSize: 12, fontWeight: 400, color: '#A4A4AD' }}>{metric.change}</span>
                      </SpaceBetween>
                    ),
                  },
                ]}
              />
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
          <span style={{ fontSize: 12, fontWeight: 400, color: '#909090' }}>2 urls</span>
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
            <Link href="#" variant="primary" fontSize="body-m">
              {integration.name}
            </Link>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 12, fontWeight: 400, color: '#909090' }}>{integration.lastUsed}</span>
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
      <style>{`.avatar-normal-weight * { font-weight: 400 !important; } [class*='awsui_counter'] { font-size: 12px !important; }`}</style>
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

function ProfileSection() {
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={profileImg}
        alt="Profile"
        style={{
          position: 'absolute',
          top: 16,
          right: 20,
          width: 68,
          height: 68,
          objectFit: 'cover',
          borderRadius: 4,
          display: 'block',
          zIndex: 1,
        }}
      />
      <Container
        fitHeight={true}
        style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
        header={<Header>Profile</Header>}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="#" variant="secondary">
              <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                view profile details <Icon name="arrow-right" />
              </SpaceBetween>
            </Link>
          </div>
        }
      >
        <div>
          <KeyValuePairs
            columns={1}
            items={[
              { label: 'Name', value: 'Alice Deverill' },
              { label: 'Email', value: 'Alice-dev@banana-truck.com' },
              { label: 'Multi-factor authentication', value: 'Configured' },
            ]}
          />
        </div>
      </Container>
    </div>
  );
}

function UsageSection() {
  return (
    <Container
      fitHeight={true}
      style={{ footer: { root: {}, divider: { borderWidth: '0' } } }}
      header={<Header>Usage</Header>}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="#" variant="secondary">
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              view usage details <Icon name="arrow-right" />
            </SpaceBetween>
          </Link>
        </div>
      }
    >
      <SpaceBetween size="m">
        <ProgressBar value={30} style={{ progressValue: { backgroundColor: '#79FF3B' } }} />
        <KeyValuePairs
          columns={2}
          items={USAGE_METRICS.map(metric => ({
            label: metric.label,
            value: (
              <SpaceBetween size="xxs">
                <Box fontSize="heading-l" fontWeight="normal">
                  <span style={{ fontWeight: 500, color: '#C9C9C9' }}>{metric.current}%</span>
                </Box>
                <span style={{ fontSize: 12, color: '#909090' }}>
                  {metric.current}/{metric.limit}
                </span>
              </SpaceBetween>
            ),
          }))}
        />
      </SpaceBetween>
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
          <Link href="#" variant="secondary">
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              View more recommendations <Icon name="arrow-right" />
            </SpaceBetween>
          </Link>
        </div>
      }
    >
      <SpaceBetween size="s">
        {NEXT_STEPS.map(step => (
          <div
            key={step.title}
            style={{
              borderRadius: awsui.borderRadiusContainer,
              padding: 16,
              background: `linear-gradient(135deg, ${awsui.colorBackgroundContainerContent} 0%, #1a2a4a 100%)`,
              border: `1px solid ${awsui.colorBorderDividerDefault}`,
            }}
          >
            <SpaceBetween size="s">
              <Box fontSize="heading-m" fontWeight="normal">
                {step.title}
              </Box>
              <Box color="text-body-secondary" fontSize="body-s">
                {step.description}
              </Box>
              <div style={{ marginTop: 8 }} />
              <Link href="#" variant="secondary">
                <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                  {step.actionLabel} <Icon name="arrow-right" />
                </SpaceBetween>
              </Link>
            </SpaceBetween>
          </div>
        ))}
      </SpaceBetween>
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

      {/* Profile + Usage + Next steps row */}
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 5 }, { colspan: 4 }]}>
        <ProfileSection />
        <UsageSection />
        <NextStepsSection />
      </Grid>
    </SpaceBetween>
  );
}
