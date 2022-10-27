// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import DataProvider from '../commons/data-provider';
import { CARD_DEFINITIONS, VISIBLE_CONTENT_OPTIONS, PAGE_SIZE_OPTIONS, DEFAULT_PREFERENCES } from './cards-config';
import { Cards, CollectionPreferences, Pagination, TextFilter } from '@cloudscape-design/components';
import { Breadcrumbs, ToolsContent } from './common-components';
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import { distributionSelectionLabels, paginationLabels } from '../../common/labels';
import { FullPageHeader } from '../table/common-components';
import { getFilterCounterText } from '../../common/tableCounterStrings';
import { useLocalStorage } from '../../common/localStorage';
import '../../styles/base.scss';

function DetailsCards({ loadHelpPanelContent }) {
  const [loading, setLoading] = useState(true);
  const [distributions, setDistributions] = useState([]);
  const [preferences, setPreferences] = useLocalStorage('React-Cards-Preferences', DEFAULT_PREFERENCES);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    distributions,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    }
  );

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
      setLoading(false);
    });
  }, []);

  return (
    <Cards
      {...collectionProps}
      stickyHeader={true}
      cardDefinition={CARD_DEFINITIONS}
      visibleSections={preferences.visibleContent}
      loading={loading}
      loadingText="Loading distributions"
      items={items}
      selectionType="multi"
      variant="full-page"
      ariaLabels={distributionSelectionLabels}
      header={
        <FullPageHeader
          selectedItems={collectionProps.selectedItems}
          totalItems={distributions}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter distributions"
          filteringPlaceholder="Find distributions"
          countText={getFilterCounterText(filteredItemsCount)}
          disabled={loading}
        />
      }
      pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} disabled={loading} />}
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          disabled={loading}
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: PAGE_SIZE_OPTIONS,
          }}
          visibleContentPreference={{
            title: 'Select visible columns',
            options: VISIBLE_CONTENT_OPTIONS,
          }}
        />
      }
    />
  );
}

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();
  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={<DetailsCards loadHelpPanelContent={() => {
        setToolsOpen(true);
        appLayout.current?.focusToolsClose();
      }} />}
      contentType="cards"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
