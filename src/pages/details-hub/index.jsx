// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import DataProvider from '../commons/data-provider';
import { useAsyncData } from '../commons/use-async-data';
import { INSTANCE_DROPDOWN_ITEMS, LOGS_COLUMN_DEFINITIONS } from '../details/details-config';
import { Box, Button, ContentLayout, Header, Link, SpaceBetween, Table } from '@cloudscape-design/components';
import { Breadcrumbs, GeneralConfig, OriginsTable, PageHeader } from '../details/common-components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { getHeaderCounterText } from '../../i18n-strings';
import { logsTableAriaLabels } from './commons';
import '../../styles/base.scss';

function LogsTable() {
  const [logs, logsLoading] = useAsyncData(() => new DataProvider().getData('logs'));
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;

  return (
    <Table
      className="logs-table"
      loading={logsLoading}
      loadingText="Loading logs"
      columnDefinitions={LOGS_COLUMN_DEFINITIONS}
      items={logs.slice(0, 5)}
      ariaLabels={logsTableAriaLabels}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
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
      footer={
        <Box textAlign="center">
          <Link href="#">View all logs</Link>
        </Box>
      }
    />
  );
}

class App extends React.Component {
  render() {
    return (
      <CustomAppLayout
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
              <LogsTable />
              <OriginsTable />
            </SpaceBetween>
          </ContentLayout>
        }
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="#/distributions" />}
        toolsHide={true}
        contentType="default"
        notifications={<Notifications />}
      />
    );
  }
}

createRoot(document.getElementById('app')).render(<App />);
