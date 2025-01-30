// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import customTheme from '../../common/theme-definition';
applyTheme({ theme: customTheme });
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  AppLayout,
  Box,
  Button,
  Container,
  ContentLayout,
  Header,
  Link,
  Pagination,
  SpaceBetween,
  Table,
  Tabs,
  TextFilter,
} from '@cloudscape-design/components';

import { getHeaderCounterText, getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import { CustomNavBar } from '../bingo-ideas/index';
import { SideContentHome, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import thumbnail1Image from '../commons/thumbnail-1.png';
import thumbnail1Image2 from '../commons/thumbnail-2.png';
import thumbnail1Image3 from '../commons/thumbnail-3.png';
import { useAsyncData } from '../commons/use-async-data';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import { BehaviorsTable, EmptyTable, ForYou, OriginsTable, TagsTable } from '../details/common-components';
import { INVALIDATIONS_COLUMN_DEFINITIONS, LOGS_COLUMN_DEFINITIONS } from '../details/details-config';
import { logsTableAriaLabels } from '../details-hub/commons';

import '../../styles/base.scss';
import '../../styles/product-page.scss';

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
    <Box margin={{ top: 's' }}>
      <Table
        enableKeyboardNavigation={true}
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
    </Box>
  );
}

function CarouselCard({ imageSrc }) {
  return (
    <Container
      media={{
        content: (
          <img
            src={imageSrc}
            alt="Carousel thumbnail"
            style={{ width: '100%', objectFit: 'cover' }} // Ensures the image looks good in the container
          />
        ),
        height: 120,
        position: 'top',
      }}
    >
      <SpaceBetween direction="vertical" size="xxs">
        <Box variant="p">Podcast by Eli Volluri</Box>
        <Link href="#" variant="primary">
          See details
        </Link>
      </SpaceBetween>
    </Container>
  );
}

function Carousel() {
  return (
    <SpaceBetween size="s" direction="horizontal">
      <CarouselCard imageSrc={thumbnail1Image} />
      <CarouselCard imageSrc={thumbnail1Image2} />
      <CarouselCard imageSrc={thumbnail1Image3} />
    </SpaceBetween>
  );
}

const App = () => {
  const appLayout = useRef(null);

  const loadHelpPanelContent = () => {
    appLayout.current?.focusToolsClose();
  };

  const tabs = [
    { label: 'For you', id: 'details', content: <ForYou /> },
    { label: 'Following', id: 'logs', content: <LogsTable /> },
    { label: 'Popular', id: 'origins', content: <OriginsTable /> },
    { label: 'Watch', id: 'behaviors', content: <BehaviorsTable /> },
    {
      label: 'Listen',
      id: 'invalidations',
      content: <EmptyTable title="Invalidation" columnDefinitions={INVALIDATIONS_COLUMN_DEFINITIONS} />,
    },
    { label: 'Custom feed', id: 'tags', content: <TagsTable loadHelpPanelContent={loadHelpPanelContent} /> },
  ];

  return (
    <AppLayout
      disableContentPaddings
      navigation={<DashboardSideNavigation />}
      toolsHide
      maxContentWidth={9999999999999}
      breadcrumbs={<CustomNavBar />}
      content={
        <ContentLayout
          className="product-detail-page"
          defaultPadding={true}
          maxContentWidth={1280}
          disableOverlap={true}
        >
          <div className="product-page-content-grid">
            <aside aria-label="Side bar" className="product-page-aside">
              <div className="product-page-aside-sticky">
                <SideContentHome />
              </div>
            </aside>

            <main className="product-page-content">
              <SpaceBetween size="xxl">
                <SpaceBetween size="xl">
                  <Box margin={{ top: 'm' }}>
                    <Header variant="h2">Spotlight</Header>
                  </Box>
                  <Box margin={{ bottom: 'xl' }}>
                    <Carousel />
                  </Box>
                </SpaceBetween>
                <SpaceBetween size="s">
                  <Header variant="h2">Trending</Header>
                  <Tabs className="custom-style-tabs" tabs={tabs} ariaLabel="Resource details" />
                </SpaceBetween>
              </SpaceBetween>
            </main>
          </div>
        </ContentLayout>
      }
    />
  );
};

createRoot(document.getElementById('app')).render(<App />);
