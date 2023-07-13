// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  Container,
  ContentLayout,
  Header,
  Pagination,
  SpaceBetween,
  Table,
  Tabs,
  TextFilter,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useAsyncData } from '../commons/use-async-data';
import DataProvider from '../commons/data-provider';
import {
  INSTANCE_DROPDOWN_ITEMS,
  LOGS_COLUMN_DEFINITIONS,
  INVALIDATIONS_COLUMN_DEFINITIONS,
} from '../details/details-config';
import {
  BehaviorsTable,
  Breadcrumbs,
  EmptyTable,
  GeneralConfig,
  OriginsTable,
  PageHeader,
  SettingsDetails,
  TagsTable,
} from '../details/common-components';
import {
  CustomAppLayout,
  Navigation,
  TableEmptyState,
  TableNoMatchState,
  InfoLink,
  Notifications,
} from '../commons/common-components';
import { getHeaderCounterText, getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import ToolsContent from '../details/tools-content';
import { logsTableAriaLabels } from '../details-hub/commons';
import '../../styles/base.scss';

const Details = ({ loadHelpPanelContent }) => (
  <Container
    header={
      <Header variant="h2" info={<InfoLink onFollow={() => loadHelpPanelContent(1)} />} actions={<Button>Edit</Button>}>
        Details
      </Header>
    }
  >
    <SettingsDetails isInProgress={true} />
  </Container>
);

function LogsTable() {
  const [logs, logsLoading] = useAsyncData(() => new DataProvider().getData('logs'));
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(logs, {
    filtering: {
      empty: <TableEmptyState resourceName="Log" />,
      noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
    },
    pagination: { pageSize: 10 },
  });

  return (
    <Table
      className="logs-table"
      {...collectionProps}
      loading={logsLoading}
      loadingText="Loading logs"
      columnDefinitions={LOGS_COLUMN_DEFINITIONS}
      items={items}
      ariaLabels={logsTableAriaLabels}
      renderAriaLive={renderAriaLive}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={evt => setSelectedItems(evt.detail.selectedItems)}
      header={
        <Header
          counter={!logsLoading && getHeaderCounterText(logs, selectedItems)}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>View</Button>
              <Button disabled={!atLeastOneSelected}>Watch</Button>
              <Button disabled={!atLeastOneSelected}>Download</Button>
            </SpaceBetween>
          }
        >
          Logs
        </Header>
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Find logs"
          filteringPlaceholder="Find logs"
          filteringClearAriaLabel="Clear"
          countText={getTextFilterCounterText(filteredItemsCount)}
        />
      }
      pagination={<Pagination {...paginationProps} />}
    />
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toolsIndex: 0, toolsOpen: false };
    this.appLayout = createRef();
  }

  loadHelpPanelContent(index) {
    this.setState({ toolsIndex: index, toolsOpen: true });
    this.appLayout.current?.focusToolsClose();
  }

  render() {
    const tabs = [
      {
        label: 'Details',
        id: 'details',
        content: <Details loadHelpPanelContent={this.loadHelpPanelContent.bind(this)} />,
      },
      {
        label: 'Logs',
        id: 'logs',
        content: <LogsTable />,
      },
      {
        label: 'Origins',
        id: 'origins',
        content: <OriginsTable />,
      },
      {
        label: 'Behaviors',
        id: 'behaviors',
        content: <BehaviorsTable />,
      },
      {
        label: 'Invalidations',
        id: 'invalidations',
        content: <EmptyTable title="Invalidation" columnDefinitions={INVALIDATIONS_COLUMN_DEFINITIONS} />,
      },
      {
        label: 'Tags',
        id: 'tags',
        content: <TagsTable loadHelpPanelContent={this.loadHelpPanelContent.bind(this)} />,
      },
    ];

    return (
      <CustomAppLayout
        ref={this.appLayout}
        content={
          <ContentLayout
            header={
              <PageHeader
                buttons={[{ text: 'Actions', items: INSTANCE_DROPDOWN_ITEMS }, { text: 'Edit' }, { text: 'Delete' }]}
              />
            }
          >
            <SpaceBetween size="l">
              <GeneralConfig />
              <Tabs tabs={tabs} ariaLabel="Resource details" />
            </SpaceBetween>
          </ContentLayout>
        }
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        tools={ToolsContent[this.state.toolsIndex]}
        toolsOpen={this.state.toolsOpen}
        onToolsChange={({ detail }) => this.setState({ toolsOpen: detail.open })}
        notifications={<Notifications />}
      />
    );
  }
}

createRoot(document.getElementById('app')).render(<App />);
