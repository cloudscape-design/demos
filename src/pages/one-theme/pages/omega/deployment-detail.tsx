// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import Popover from '@cloudscape-design/components/popover';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import * as awsui from '@cloudscape-design/design-tokens';

import { DEPLOYMENTS, relativeTime } from '../../data';
import { GitBranchIcon, GitCommitIcon } from '../../icons';

const BUILD_LOGS = `2025-06-16T22:58:03.121Z [INFO]: # Build environment configured with Standard build compute type: 8GiB Memory, 4vCPUs, 128GB Disk Space
2025-06-16T22:58:03.864Z [INFO]: # Cloning repository: git@github.com:user/amplify-test.git
2025-06-16T22:58:04.847Z [INFO]:
2025-06-16T22:58:04.848Z [INFO]: Cloning into 'amplify-test'...
2025-06-16T22:58:04.848Z [INFO]: # Checking for Git submodules at: /codebuild/output/src1739282142/src/amplify-test/.gitmodules
2025-06-16T22:58:04.858Z [INFO]: # Retrieving environment cache...
2025-06-16T22:58:04.896Z [WARN]: ! Unable to write cache: {"code":"ERR_BAD_REQUEST","message":"Request failed with status code 404"}
2025-06-16T22:58:04.896Z [INFO]: ---- Setting Up SSM Secrets ----
2025-06-16T22:58:04.896Z [INFO]: SSM params {"Path":"/amplify/d2swyjp87qkpkj/main/","WithDecryption":true}
2025-06-16T22:58:05.802Z [INFO]: # No package override configuration found.
2025-06-16T22:58:05.807Z [INFO]: # Retrieving cache...
2025-06-16T22:58:05.853Z [INFO]: # Retrieved cache
2025-06-16T22:58:09.647Z [INFO]: ## Starting Backend Build
                                  # Starting phase: build
                                  # Executing command: npm ci --cache .npm --prefer-offline`;

const LOG_LEVEL_COLORS: Record<string, string> = {
  INFO: awsui.colorTextStatusInfo,
  WARN: awsui.colorTextStatusWarning,
  ERROR: awsui.colorTextStatusError,
};

function LogsView({ code }: { code: string }) {
  return (
    <pre
      style={{
        background: awsui.colorBackgroundLayoutMain,
        padding: 16,
        borderRadius: 4,
        border: `1px solid ${awsui.colorBorderDividerDefault}`,
        overflow: 'auto',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: 12,
        color: awsui.colorTextBodyDefault,
        whiteSpace: 'pre-wrap',
      }}
    >
      {code.split('\n').map((line, i) => {
        const match = line.match(/^(\S+)\s+\[(\w+)]:\s?(.*)/);
        if (!match) {
          return (
            <span key={i}>
              <span style={{ color: awsui.colorTextBodyDefault }}>{line}</span>
              {'\n'}
            </span>
          );
        }
        const [, timestamp, level, message] = match;
        return (
          <span key={i}>
            <span style={{ color: awsui.colorTextBodySecondary }}>{timestamp}</span>{' '}
            <span style={{ color: LOG_LEVEL_COLORS[level], fontWeight: 700 }}>{level}</span>
            {'    '}
            <span style={{ color: awsui.colorTextBodyDefault }}>{message}</span>
            {'\n'}
          </span>
        );
      })}
    </pre>
  );
}

interface EnvVar {
  key: string;
  value: string;
  secret: boolean;
}

const ENV_VARS: EnvVar[] = [
  { key: 'key1', value: 's3cr3t_v4lue', secret: true },
  { key: 'key2', value: 'val2', secret: false },
  { key: 'key3', value: 'val3', secret: false },
];

interface IntegrationRow {
  name: string;
  resourceType: string;
  status: 'Active' | 'Disconnected';
}

const INTEGRATIONS: IntegrationRow[] = [
  { name: 'dsql-db-foo', resourceType: 'DSQL database', status: 'Active' },
  { name: 'foo-chat-agent', resourceType: 'Agent', status: 'Active' },
  { name: 'foo-blob', resourceType: 'Storage', status: 'Disconnected' },
];

function HeaderWithInfo({ children, info }: { children: React.ReactNode; info: React.ReactNode }) {
  return (
    <SpaceBetween size="xxs" direction="horizontal" alignItems="end">
      <Header>{children}</Header>
      <Popover position="right" size="medium" triggerType="custom" content={info}>
        <Button variant="inline-icon" iconName="status-info" />
      </Popover>
    </SpaceBetween>
  );
}

function SourceDisplay({ deployment }: { deployment: (typeof DEPLOYMENTS)[0] }) {
  if (deployment.sourceType === 'zip') {
    return <Box>Zip upload</Box>;
  }
  return (
    <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
      <Box>Git</Box>
      <GitBranchIcon />
      <Box>{deployment.sourceBranch}</Box>
      {deployment.sourceCommit && (
        <>
          <GitCommitIcon />
          <Box>{deployment.sourceCommit}</Box>
        </>
      )}
    </SpaceBetween>
  );
}

export default function DeploymentDetailPage() {
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const deployment = DEPLOYMENTS.find(d => d.id === deploymentId) ?? DEPLOYMENTS[0];

  const [logFilter, setLogFilter] = useState('');
  const [envFilter, setEnvFilter] = useState('');
  const [intFilter, setIntFilter] = useState('');

  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Redeploy</Button>
                <Button variant="primary" iconName="external" iconAlign="right" href="#" target="_blank">
                  Visit
                </Button>
              </SpaceBetween>
            }
          >
            {deployment.id}
          </Header>
        }
      >
        <SpaceBetween size="l">
          <KeyValuePairs
            columns={4}
            items={[
              {
                label: 'Status',
                value: <StatusIndicator type={deployment.statusType}>{deployment.status}</StatusIndicator>,
              },
              {
                label: 'Source',
                value: <SourceDisplay deployment={deployment} />,
              },
              {
                label: 'Created',
                value: (
                  <SpaceBetween size="xxs" direction="horizontal">
                    <Popover content={deployment.createdAt} dismissButton={false} size="small">
                      {relativeTime(deployment.createdAt)}
                    </Popover>
                    <Box color="text-body-secondary">by {deployment.createdBy}</Box>
                  </SpaceBetween>
                ),
              },
              {
                label: 'Deployment URL',
                value: (
                  <Link href="#" external={true}>
                    app-foo-14jkgas8-alicedev-projects-24u092a.omega.aws
                  </Link>
                ),
              },
            ]}
          />
          <ExpandableSection headerText="Source and build configuration">
            <Box color="text-body-secondary">Build configuration details would appear here.</Box>
          </ExpandableSection>
        </SpaceBetween>
      </Container>

      <Container
        header={<Header actions={<StatusIndicator type="success">1m 42s</StatusIndicator>}>Build logs</Header>}
      >
        <SpaceBetween size="s">
          <div style={{ minWidth: 300 }}>
            <TextFilter
              filteringText={logFilter}
              filteringPlaceholder="Find logs"
              onChange={({ detail }) => setLogFilter(detail.filteringText)}
            />
          </div>
          <LogsView code={BUILD_LOGS} />
        </SpaceBetween>
      </Container>

      <Grid gridDefinition={[{ colspan: { default: 12, l: 6 } }, { colspan: { default: 12, l: 6 } }]}>
        <Table
          header={
            <HeaderWithInfo
              info={
                <Box>
                  These were the variables set at time of deployment. You can edit these in your{' '}
                  <Link variant="primary" href="#">
                    settings
                  </Link>{' '}
                  and deploy again.
                </Box>
              }
            >
              Environment variables
            </HeaderWithInfo>
          }
          items={ENV_VARS.filter(v => !envFilter || v.key.includes(envFilter))}
          filter={
            <TextFilter
              filteringText={envFilter}
              filteringPlaceholder="Find environment variables"
              onChange={({ detail }) => setEnvFilter(detail.filteringText)}
            />
          }
          pagination={<Pagination currentPageIndex={1} pagesCount={1} />}
          columnDefinitions={[
            {
              id: 'key',
              header: 'Key',
              sortingField: 'key',
              cell: item => item.key,
            },
            {
              id: 'value',
              header: 'Value',
              sortingField: 'value',
              cell: item => (item.secret ? '••••••' : item.value),
            },
          ]}
        />

        <Table
          header={
            <HeaderWithInfo
              info={
                <Box>
                  These integrations were set at the time that {deployment.id} was deployed and show the connection
                  status at time of deployment.
                </Box>
              }
            >
              Integrations
            </HeaderWithInfo>
          }
          items={INTEGRATIONS.filter(i => !intFilter || i.name.includes(intFilter))}
          filter={
            <TextFilter
              filteringText={intFilter}
              filteringPlaceholder="Find integrations"
              onChange={({ detail }) => setIntFilter(detail.filteringText)}
            />
          }
          pagination={<Pagination currentPageIndex={1} pagesCount={1} />}
          columnDefinitions={[
            {
              id: 'name',
              header: 'Integration',
              sortingField: 'name',
              cell: item => <Link href="#">{item.name}</Link>,
            },
            {
              id: 'resourceType',
              header: 'Resource type',
              sortingField: 'resourceType',
              cell: item => item.resourceType,
            },
            {
              id: 'status',
              header: 'Connection status',
              sortingField: 'status',
              cell: item => (
                <StatusIndicator type={item.status === 'Active' ? 'success' : 'error'}>{item.status}</StatusIndicator>
              ),
            },
          ]}
        />
      </Grid>
    </SpaceBetween>
  );
}
