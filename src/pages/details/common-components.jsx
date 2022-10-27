// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import {
  Box,
  BreadcrumbGroup,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  ProgressBar,
  StatusIndicator,
  SpaceBetween,
  Table,
} from '@cloudscape-design/components';
import { useAsyncData } from '../commons/use-async-data';
import DataProvider from '../commons/data-provider';
import { TableHeader, TableEmptyState, InfoLink } from '../commons/common-components';
import { ORIGINS_COLUMN_DEFINITIONS, BEHAVIORS_COLUMN_DEFINITIONS, TAGS_COLUMN_DEFINITIONS } from './details-config';
import { resourceDetailBreadcrumbs } from '../../common/breadcrumbs';
import { behaviorsSelectionLabels, originsSelectionLabels } from '../../common/labels';
import CopyText from '../commons/copy-text';

export const DEMO_DISTRIBUTION = {
  id: 'SLCCSMWOHOFUY0',
  domainName: 'abcdef01234567890.cloudfront.net',
  arn: 'arn:aws:cloudfront::abcdef01234567890.cloudfront.net/SLCCSMWOHOFUY0',
  priceClass: 'Use only US, Canada, Europe, and Asia',
  sslCertificate: 'Default CloudFront SSL certificate',
  logging: 'Off',
};

export const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceDetailBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export const PageHeader = ({ buttons }) => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {buttons.map((button, key) =>
            !button.items ? (
              <Button href={button.href || ''} disabled={button.disabled || false} key={key}>
                {button.text}
              </Button>
            ) : (
              <ButtonDropdown items={button.items} key={key}>
                {button.text}
              </ButtonDropdown>
            )
          )}
        </SpaceBetween>
      }
    >
      {DEMO_DISTRIBUTION.id}
    </Header>
  );
};

export const GeneralConfig = () => (
  <Container header={<Header variant="h2">General configuration</Header>}>
    <ColumnLayout columns={4} variant="text-grid">
      <div>
        <Box variant="awsui-key-label">Engine</Box>
        <div>Oracle Enterprise Edition 12.1.0.2.v7</div>
      </div>
      <div>
        <Box variant="awsui-key-label">DB instance class</Box>
        <div>db.t2.large</div>
      </div>
      <div>
        <Box variant="awsui-key-label">DB instance status</Box>
        <StatusIndicator type="success">Available</StatusIndicator>
      </div>
      <div>
        <Box variant="awsui-key-label">Pending maintenance</Box>
        <div>None</div>
      </div>
    </ColumnLayout>
  </Container>
);

export const SettingsDetails = ({ distribution = DEMO_DISTRIBUTION, isInProgress }) => (
  <ColumnLayout columns={4} variant="text-grid">
    <SpaceBetween size="l">
      <div>
        <Box variant="awsui-key-label">Distribution ID</Box>
        <div>{distribution.id}</div>
      </div>
      <div>
        <Box variant="awsui-key-label">Domain name</Box>
        <div>{distribution.domainName}</div>
      </div>
      <div>
        <Box variant="awsui-key-label">ARN</Box>
        <CopyText
          copyText={`arn:aws:cloudfront::${distribution.domainName}/${distribution.id}`}
          copyButtonLabel="Copy ARN"
          successText="ARN copied"
          errorText="ARN failed to copy"
        />
      </div>
    </SpaceBetween>

    <SpaceBetween size="l">
      {distribution.state ? (
        <StatusIndicator type={distribution.state === 'Deactivated' ? 'error' : 'success'}>
          {distribution.state}
        </StatusIndicator>
      ) : (
        <ProgressBar
          value={27}
          label="Status"
          description={isInProgress ? 'Update in progress' : undefined}
          variant="key-value"
          resultText="Available"
          status={isInProgress ? 'in-progress' : 'success'}
        />
      )}

      <div>
        <Box variant="awsui-key-label">Price class</Box>
        <div>{distribution.priceClass}</div>
      </div>
      <div>
        <Box variant="awsui-key-label">CNAMEs</Box>
        <div>-</div>
      </div>
    </SpaceBetween>
    <SpaceBetween size="l">
      <div>
        <Box variant="awsui-key-label">SSL certificate</Box>
        <div>{distribution.sslCertificate}</div>
      </div>
      <div>
        <Box variant="awsui-key-label">Custom SSL client support</Box>
        <div>-</div>
      </div>
      <div>
        <Box variant="awsui-key-label">Logging</Box>
        <div>{distribution.logging}</div>
      </div>
    </SpaceBetween>
    <SpaceBetween size="l">
      <div>
        <Box variant="awsui-key-label">IPv6</Box>
        <div>Off</div>
      </div>
      <div>
        <Box variant="awsui-key-label">Default root object</Box>
        <div>-</div>
      </div>
      <div>
        <Box variant="awsui-key-label">Comment</Box>
        <div>To verify</div>
      </div>
    </SpaceBetween>
  </ColumnLayout>
);

export const EmptyTable = props => {
  const resourceType = props.title || 'Tag';
  const colDefs = props.columnDefinitions || TAGS_COLUMN_DEFINITIONS;
  return (
    <Table
      empty={<TableEmptyState resourceName={resourceType} />}
      columnDefinitions={colDefs}
      items={[]}
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={true}>Edit</Button>
              <Button disabled={true}>Delete</Button>
              <Button>Create {resourceType.toLowerCase()}</Button>
            </SpaceBetween>
          }
        >{`${resourceType}s`}</Header>
      }
    />
  );
};

export function OriginsTable() {
  const [origins, originsLoading] = useAsyncData(() => new DataProvider().getData('origins'));
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;

  return (
    <Table
      className="origins-table"
      columnDefinitions={ORIGINS_COLUMN_DEFINITIONS}
      loading={originsLoading}
      loadingText="Loading origins"
      items={origins}
      ariaLabels={originsSelectionLabels}
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
      header={
        <TableHeader
          title="Origins"
          selectedItems={selectedItems}
          totalItems={origins}
          actionButtons={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>Edit</Button>
              <Button disabled={!atLeastOneSelected}>Delete</Button>
              <Button>Create origin</Button>
            </SpaceBetween>
          }
        />
      }
    />
  );
}

export function BehaviorsTable() {
  const [behaviors, behaviorsLoading] = useAsyncData(() => new DataProvider().getData('behaviors'));
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;

  return (
    <Table
      className="cache-table"
      columnDefinitions={BEHAVIORS_COLUMN_DEFINITIONS}
      items={behaviors}
      loading={behaviorsLoading}
      loadingText="Loading behaviors"
      ariaLabels={behaviorsSelectionLabels}
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
      header={
        <TableHeader
          title="Cache behavior settings"
          selectedItems={selectedItems}
          totalItems={behaviors}
          actionButtons={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>Edit</Button>
              <Button disabled={!atLeastOneSelected}>Delete</Button>
              <Button>Create behavior</Button>
            </SpaceBetween>
          }
        />
      }
    />
  );
}

export function TagsTable({ loadHelpPanelContent }) {
  const [tags, tagsLoading] = useAsyncData(async () => {
    const { ResourceTagMappingList } = await window.FakeServer.GetResources();
    return ResourceTagMappingList.reduce((tags, resourceTagMapping) => [...tags, ...resourceTagMapping.Tags], []);
  });

  return (
    <Table
      id="tags-panel"
      columnDefinitions={TAGS_COLUMN_DEFINITIONS}
      items={tags}
      loading={tagsLoading}
      loadingText="Loading tags"
      header={
        <Header
          variant="h2"
          counter={`(${tags.length})`}
          info={<InfoLink onFollow={() => loadHelpPanelContent(2)} ariaLabel={'Information about tags.'} />}
          actions={<Button>Manage tags</Button>}
          description={
            <>
              A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value. You
              can use tags to search and filter your resources or track your AWS costs.
            </>
          }
        >
          Tags
        </Header>
      }
    />
  );
}
