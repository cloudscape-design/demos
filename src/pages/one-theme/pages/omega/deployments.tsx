// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import Popover from '@cloudscape-design/components/popover';
import type { SelectProps } from '@cloudscape-design/components/select';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { type Deployment, DEPLOYMENTS, relativeTime } from '../../data';
import { GitBranchIcon, GitCommitIcon } from '../../icons';

const ENV_OPTIONS: SelectProps.Option[] = [
  { value: 'all', label: 'All' },
  { value: 'Production', label: 'Production' },
  { value: 'Preview', label: 'Preview' },
];

function SourceCell({ deployment, showDescription = true }: { deployment: Deployment; showDescription?: boolean }) {
  if (deployment.sourceType === 'zip') {
    return <Box>Zip upload</Box>;
  }
  return (
    <SpaceBetween size="s" direction="horizontal" alignItems="center">
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
      {deployment.commitMessage && showDescription && <Box color="text-body-secondary">{deployment.commitMessage}</Box>}
    </SpaceBetween>
  );
}

function CreatedCell({ deployment }: { deployment: Deployment }) {
  return (
    <SpaceBetween size="xxs" direction="horizontal">
      <Popover content={deployment.createdAt} dismissButton={false} size="small">
        {relativeTime(deployment.createdAt)}
      </Popover>
      <Box color="text-body-secondary">by {deployment.createdBy}</Box>
    </SpaceBetween>
  );
}

const latestProduction = DEPLOYMENTS.find(d => d.environment === 'Production' && d.statusType === 'success');

export default function DeploymentsPage() {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');
  const [envFilter, setEnvFilter] = useState<SelectProps.Option>(ENV_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = DEPLOYMENTS.filter(d => {
    if (filterText && !d.id.toLowerCase().includes(filterText.toLowerCase())) {
      return false;
    }
    if (envFilter.value !== 'all' && d.environment !== envFilter.value) {
      return false;
    }
    return true;
  });

  return (
    <SpaceBetween size="l">
      <Header variant="h1">Deployments</Header>

      {latestProduction && (
        <Container header={<Header>Latest production deployment</Header>}>
          <KeyValuePairs
            columns={4}
            items={[
              {
                label: 'Deployment',
                value: (
                  <Link
                    href="#"
                    onFollow={e => {
                      e.preventDefault();
                      navigate(`/omega/deployments/${latestProduction.id}`);
                    }}
                  >
                    {latestProduction.id}
                  </Link>
                ),
              },
              {
                label: 'Status',
                value: <StatusIndicator type={latestProduction.statusType}>{latestProduction.status}</StatusIndicator>,
              },
              { label: 'Source', value: <SourceCell deployment={latestProduction} showDescription={false} /> },
              { label: 'Created', value: <CreatedCell deployment={latestProduction} /> },
            ]}
          />
        </Container>
      )}

      <Table
        header={
          <Header
            counter={`(${filtered.length})`}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button iconName="refresh" ariaLabel="Refresh" />
                <Button variant="primary">Create deployment</Button>
              </SpaceBetween>
            }
          >
            All deployments
          </Header>
        }
        items={filtered}
        filter={
          <SpaceBetween direction="horizontal" size="s" alignItems="end">
            <div style={{ minWidth: 400 }}>
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Find deployment"
                onChange={({ detail }) => setFilterText(detail.filteringText)}
              />
            </div>
            <div style={{ minWidth: 200 }}>
              <Select
                selectedOption={envFilter}
                onChange={({ detail }) => setEnvFilter(detail.selectedOption)}
                options={ENV_OPTIONS}
                ariaLabel="Environment"
                inlineLabelText="Environment"
              />
            </div>
          </SpaceBetween>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPage}
            pagesCount={1}
            onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
          />
        }
        columnDefinitions={[
          {
            id: 'id',
            header: 'Deployment ID',
            sortingField: 'id',
            cell: d => (
              <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                <Link
                  href="#"
                  onFollow={e => {
                    e.preventDefault();
                    navigate(`/omega/deployments/${d.id}`);
                  }}
                >
                  {d.id}
                </Link>
              </SpaceBetween>
            ),
          },
          {
            id: 'status',
            header: 'Status',
            sortingField: 'status',
            cell: d => <StatusIndicator type={d.statusType}>{d.status}</StatusIndicator>,
          },
          {
            id: 'source',
            header: 'Source',
            sortingField: 'sourceType',
            cell: d => <SourceCell deployment={d} />,
          },
          {
            id: 'environment',
            header: 'Environment',
            sortingField: 'environment',
            cell: d => d.environment,
          },
          {
            id: 'created',
            header: 'Created',
            sortingField: 'createdAt',
            cell: d => <CreatedCell deployment={d} />,
          },
          {
            id: 'duration',
            header: 'Duration',
            cell: d => d.duration,
          },
          {
            id: 'actions',
            header: '',
            cell: () => (
              <ButtonDropdown
                variant="inline-icon"
                ariaLabel="Actions"
                expandToViewport={true}
                items={[
                  { id: 'redeploy', text: 'Redeploy' },
                  { id: 'visit', text: 'Visit', href: '#', external: true },
                ]}
              />
            ),
            width: 50,
          },
        ]}
        sortingColumn={{ sortingField: 'createdAt' }}
        sortingDescending={true}
      />
    </SpaceBetween>
  );
}
