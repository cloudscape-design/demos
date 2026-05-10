// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useParams } from 'react-router-dom';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { SAMPLE_PROJECTS } from '../../data';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = SAMPLE_PROJECTS.find(p => p.id === id);

  if (!project) {
    return <Header variant="h1">Project not found</Header>;
  }

  return (
    <SpaceBetween size="l">
      <Header variant="h1">{project.name}</Header>

      <Container data-testid="latest-deployment-section" header={<Header variant="h2">Production deployment</Header>}>
        <KeyValuePairs
          columns={4}
          items={[
            {
              label: 'Deployment',
              value: project.latestDeployment.id,
            },
            {
              label: 'Status',
              value: (
                <StatusIndicator type={project.latestDeployment.statusType}>
                  {project.latestDeployment.status}
                </StatusIndicator>
              ),
            },
            {
              label: 'Source',
              value: (
                <Link href={project.latestDeployment.sourceUrl} external={true}>
                  {project.latestDeployment.sourceBranch}
                </Link>
              ),
            },
            {
              label: 'Created',
              value: project.latestDeployment.createdAt,
            },
            {
              label: 'Domain',
              value: project.domainName ? (
                <Link href={`https://${project.domainName}`} external={true}>
                  {project.domainName}
                </Link>
              ) : (
                '-'
              ),
            },
          ]}
        />
      </Container>
    </SpaceBetween>
  );
}
