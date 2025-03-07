// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Cards from '@cloudscape-design/components/cards';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Distribution } from '../../fake-server/types';
import {
  distributionCardsAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  renderDistributionCardsAriaLive,
} from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { useLocalStorage } from '../commons/use-local-storage';
import { CARD_DEFINITIONS, DEFAULT_PREFERENCES, PAGE_SIZE_OPTIONS, VISIBLE_CONTENT_OPTIONS } from './cards-config';
import { Breadcrumbs, ToolsContent } from './common-components';

import '../../styles/base.scss';

interface DetailsCardsProps {
  loadHelpPanelContent: () => void;
}

function DetailsCards({ loadHelpPanelContent }: DetailsCardsProps) {
  const [loading, setLoading] = useState(true);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [preferences, setPreferences] = useLocalStorage('React-Cards-Preferences', DEFAULT_PREFERENCES);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    distributions,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      selection: {},
    },
  );

  useEffect(() => {
    new DataProvider().getDataWithDates<Distribution>('distributions').then(distributions => {
      setDistributions(distributions);
      setLoading(false);
    });
  }, []);

  return (
    <Cards
      {...collectionProps}
      stickyHeader={true}
      cardDefinition={CARD_DEFINITIONS}
      visibleSections={preferences?.visibleContent}
      loading={loading}
      loadingText="Loading distributions"
      items={items}
      selectionType="multi"
      variant="full-page"
      ariaLabels={distributionCardsAriaLabels}
      renderAriaLive={renderDistributionCardsAriaLive}
      header={
        <FullPageHeader
          selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
          counter={!loading ? getHeaderCounterText(distributions, collectionProps.selectedItems) : undefined}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter distributions"
          filteringPlaceholder="Find distributions"
          filteringClearAriaLabel="Clear"
          countText={getTextFilterCounterText(filteredItemsCount)}
          disabled={loading}
        />
      }
      pagination={<Pagination {...paginationProps} disabled={loading} />}
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

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <DetailsCards
          loadHelpPanelContent={() => {
            setToolsOpen(true);
            appLayout.current?.focusToolsClose();
          }}
        />
      }
      contentType="cards"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
