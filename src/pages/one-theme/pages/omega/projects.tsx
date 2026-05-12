// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Popover from '@cloudscape-design/components/popover';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import TextFilter from '@cloudscape-design/components/text-filter';

import { relativeTime, SAMPLE_PROJECTS } from '../../data';
import { GitHubIcon } from '../../icons';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');

  const filtered = SAMPLE_PROJECTS.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <Cards
      cardDefinition={{
        header: p => (
          <Link
            variant="primary"
            fontSize="heading-m"
            href={`#/omega/project/${p.id}`}
            onFollow={e => {
              e.preventDefault();
              navigate(`/omega/project/${p.id}`);
            }}
          >
            {p.name}
          </Link>
        ),
        sections: [
          {
            id: 'details',
            content: p => (
              <KeyValuePairs
                columns={2}
                items={[
                  {
                    label: 'Deployment status',
                    value: p.deploymentStatus ? (
                      <StatusIndicator type={p.latestDeployment.statusType}>{p.deploymentStatus}</StatusIndicator>
                    ) : (
                      '-'
                    ),
                  },
                  {
                    label: 'Last updated',
                    value: p.lastUpdated ? (
                      <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
                        <GitHubIcon />
                        <Popover content={p.lastUpdated} dismissButton={false} size="small">
                          {relativeTime(p.lastUpdated)}
                        </Popover>{' '}
                        by {p.repoOwner}
                      </SpaceBetween>
                    ) : (
                      '-'
                    ),
                  },
                  {
                    label: 'Domain name',
                    value: p.domainName ? (
                      <Link href="#" external={true}>
                        {p.domainName}
                      </Link>
                    ) : (
                      '-'
                    ),
                  },
                ]}
              />
            ),
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 700, cards: 2 }, { minWidth: 1200, cards: 3 }]}
      items={filtered}
      trackBy="id"
      onSelectionChange={() => undefined}
      renderAriaLive={({ totalItemsCount }) => `${totalItemsCount} projects`}
      header={
        <Header
          variant="h1"
          counter={`(${filtered.length})`}
          actions={
            <Button variant="primary" onClick={() => navigate('/omega/create')}>
              Create project
            </Button>
          }
        >
          Projects
        </Header>
      }
      entireCardClickable={true}
      filter={
        <TextFilter
          filteringText={filterText}
          filteringPlaceholder="Find projects"
          onChange={({ detail }) => setFilterText(detail.filteringText)}
          countText={`${filtered.length} match${filtered.length !== 1 ? 'es' : ''}`}
        />
      }
      empty={
        <Box textAlign="center" color="inherit" padding="l">
          <b>No projects</b>
          <Box variant="p" color="text-body-secondary">
            {filterText ? 'No projects match your filter.' : 'Create a project to get started.'}
          </Box>
          {!filterText && (
            <Button variant="primary" onClick={() => navigate('/omega/create')}>
              Create project
            </Button>
          )}
        </Box>
      }
    />
  );
}
