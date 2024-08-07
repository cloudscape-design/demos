// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import {
  Box,
  BreadcrumbGroup,
  Button,
  ButtonDropdown,
  Container,
  Header,
  ProgressBar,
  StatusIndicator,
  SpaceBetween,
  Table,
  TextFilter,
  Tabs,
  CopyToClipboard,
  KeyValuePairs,
} from '@cloudscape-design/components';
import { CodeView } from '@cloudscape-design/code-view';
import jsonHighlight from '@cloudscape-design/code-view/highlight/json';
import yamlHighlight from '@cloudscape-design/code-view/highlight/yaml';
import xmlHighlight from '@cloudscape-design/code-view/highlight/xml';
import { useAsyncData } from '../commons/use-async-data';
import DataProvider from '../commons/data-provider';
import { TableEmptyState, InfoLink } from '../commons/common-components';
import { ORIGINS_COLUMN_DEFINITIONS, BEHAVIORS_COLUMN_DEFINITIONS, TAGS_COLUMN_DEFINITIONS } from './details-config';
import { resourceDetailBreadcrumbs } from '../../common/breadcrumbs';
import { baseTableAriaLabels, getHeaderCounterText, getTextFilterCounterText } from '../../i18n-strings';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { codeSnippets } from './details-code-snippets';

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
    <KeyValuePairs
      columns={4}
      items={[
        {
          label: 'Engine',
          value: 'Oracle Enterprise Edition 12.1.0.2.v7',
        },
        {
          label: 'DB instance class',
          value: 'db.t2.large',
        },
        {
          label: 'DB instance status',
          value: <StatusIndicator type="success">Available</StatusIndicator>,
        },
        {
          label: 'Pending maintenance',
          value: 'None',
        },
      ]}
    />
  </Container>
);

export const SettingsDetails = ({ distribution = DEMO_DISTRIBUTION, isInProgress }) => (
  <KeyValuePairs
    columns={4}
    items={[
      {
        type: 'group',
        items: [
          {
            label: 'Distribution ID',
            value: distribution.id,
          },
          {
            label: 'Domain name',
            value: distribution.domainName,
          },
          {
            label: 'ARN',
            value: (
              <CopyToClipboard
                variant="inline"
                textToCopy={`arn:aws:cloudfront::${distribution.domainName}/${distribution.id}`}
                copyButtonAriaLabel="Copy ARN"
                copySuccessText="ARN copied"
                copyErrorText="ARN failed to copy"
              />
            ),
          },
        ],
      },
      {
        type: 'group',
        items: [
          {
            label: distribution.state ? '' : 'Status',
            id: 'status-id',
            value: distribution.state ? (
              <StatusIndicator type={distribution.state === 'Deactivated' ? 'error' : 'success'}>
                {distribution.state}
              </StatusIndicator>
            ) : (
              <ProgressBar
                value={27}
                description={isInProgress ? 'Update in progress' : undefined}
                variant="key-value"
                resultText="Available"
                status={isInProgress ? 'in-progress' : 'success'}
                ariaLabelledby="status-id"
              />
            ),
          },
          {
            label: 'Price class',
            value: distribution.priceClass,
          },
          {
            label: 'CNAMEs',
            value: '-',
          },
        ],
      },
      {
        type: 'group',
        items: [
          {
            label: 'SSL certificate',
            value: distribution.sslCertificate,
          },
          {
            label: 'Custom SSL client support',
            value: '-',
          },
          {
            label: 'Logging',
            value: distribution.logging,
          },
        ],
      },
      {
        type: 'group',
        items: [
          {
            label: 'IPv6',
            value: 'Off',
          },
          {
            label: 'Default root object',
            value: '-',
          },
          {
            label: 'Comment',
            value: 'To verify',
          },
        ],
      },
    ]}
  />
);

export const EmptyTable = props => {
  const resourceType = props.title || 'Tag';
  const colDefs = props.columnDefinitions || TAGS_COLUMN_DEFINITIONS;
  return (
    <Table
      enableKeyboardNavigation={true}
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

export const DistributionDetails = () => {
  return (
    <Container header={<Header variant="h2">Distribution configuration details</Header>}>
      <Tabs
        tabs={[
          {
            label: 'JSON',
            id: 'json',
            content: <CodeView highlight={jsonHighlight} lineNumbers content={codeSnippets.json} />,
          },
          {
            label: 'YAML',
            id: 'yaml',
            content: <CodeView highlight={yamlHighlight} lineNumbers content={codeSnippets.yaml} />,
          },
          {
            label: 'XML',
            id: 'xml',
            content: <CodeView highlight={xmlHighlight} lineNumbers content={codeSnippets.xml} />,
          },
        ]}
      />
    </Container>
  );
};

const originsSelectionLabels = {
  ...baseTableAriaLabels,
  itemSelectionLabel: (data, row) => `select ${row.name}`,
  selectionGroupLabel: 'Origins selection',
};

export function OriginsTable() {
  const [origins, originsLoading] = useAsyncData(() => new DataProvider().getData('origins'));
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;

  return (
    <Table
      enableKeyboardNavigation={true}
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
        <Header
          counter={!originsLoading && getHeaderCounterText(origins, selectedItems)}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>Edit</Button>
              <Button disabled={!atLeastOneSelected}>Delete</Button>
              <Button>Create origin</Button>
            </SpaceBetween>
          }
        >
          Origins
        </Header>
      }
    />
  );
}

const behaviorsSelectionLabels = {
  ...baseTableAriaLabels,
  itemSelectionLabel: (data, row) => `select path ${row.pathPattern} from origin ${row.origin}`,
  selectionGroupLabel: 'Behaviors selection',
};

export function BehaviorsTable() {
  const [behaviors, behaviorsLoading] = useAsyncData(() => new DataProvider().getData('behaviors'));
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;

  return (
    <Table
      enableKeyboardNavigation={true}
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
        <Header
          counter={!behaviorsLoading && getHeaderCounterText(behaviors, selectedItems)}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>Edit</Button>
              <Button disabled={!atLeastOneSelected}>Delete</Button>
              <Button>Create behavior</Button>
            </SpaceBetween>
          }
        >
          Cache behavior settings
        </Header>
      }
    />
  );
}

export function TagsTable({ loadHelpPanelContent }) {
  const [tags, tagsLoading] = useAsyncData(async () => {
    const { ResourceTagMappingList } = await window.FakeServer.GetResources();
    return ResourceTagMappingList.reduce((tags, resourceTagMapping) => [...tags, ...resourceTagMapping.Tags], []);
  });

  const { items, collectionProps, filteredItemsCount, filterProps, actions } = useCollection(tags, {
    filtering: {
      noMatch: (
        <Box textAlign="center" color="inherit">
          <Box variant="strong" textAlign="center" color="inherit">
            No matches
          </Box>
          <Box variant="p" padding={{ bottom: 's' }} color="inherit">
            No tags matched the search text.
          </Box>
          <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
        </Box>
      ),
    },
    sorting: {},
  });

  return (
    <Table
      enableKeyboardNavigation={true}
      id="tags-panel"
      columnDefinitions={TAGS_COLUMN_DEFINITIONS}
      items={items}
      {...collectionProps}
      loading={tagsLoading}
      loadingText="Loading tags"
      filter={
        <TextFilter
          {...filterProps}
          filteringPlaceholder="Find tags"
          filteringAriaLabel="Filter tags"
          countText={getTextFilterCounterText(filteredItemsCount)}
        />
      }
      header={
        <Header
          variant="h2"
          counter={!tagsLoading && `(${tags.length})`}
          info={<InfoLink onFollow={() => loadHelpPanelContent(2)} />}
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
