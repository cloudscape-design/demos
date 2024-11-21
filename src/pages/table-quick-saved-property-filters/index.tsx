// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  AppLayoutProps,
  ButtonDropdown,
  Box,
  Button,
  Badge,
  Container,
  CollectionPreferencesProps,
  Flashbar,
  Header,
  Grid,
  Checkbox,
  ExpandableSection,
  Pagination,
  PropertyFilter,
  Select,
  Table,
  SpaceBetween,
  PropertyFilterProps,
} from '@cloudscape-design/components';

import { useDisclaimerFlashbarItem } from '../commons/disclaimer-flashbar-item';
import INSTANCES from '../../resources/ec2-instances';
import { EC2Instance } from '../commons/interfaces';
import {
  getTextFilterCounterText,
  getHeaderCounterText,
  renderAriaLive,
  propertyFilterI18nStrings,
} from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState, Navigation } from '../commons/common-components';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { FullPageHeader } from '../commons';
import { useFilterSets, FilterSet } from '../table-saved-filters/use-filter-sets';
import { TablePreferences, COLUMN_DEFINITIONS, filteringProperties, tableAriaLabels } from './table-configs';
import '../../styles/table-select.scss';

const defaultFilterSets: FilterSet[] = [
  {
    name: 'Running instances using Linux',
    query: {
      operation: 'and',
      tokens: [
        { propertyKey: 'platformDetails', operator: '=', value: 'Linux' },
        { propertyKey: 'state', operator: '=', value: 'Running' },
      ],
    },
  },
  {
    name: 'Non-active instances in alarm',
    query: {
      operation: 'and',
      tokens: [],
      tokenGroups: [
        { propertyKey: 'state', operator: '=', value: ['Stopping', 'Stopped', 'Shutting down', 'Terminated'] },
        { propertyKey: 'inAlarm', operator: '=', value: 'true' },
      ],
    },
  },
];

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const disclaimerItem = useDisclaimerFlashbarItem(() => {
    setFlashNotifications(currentNotifications => currentNotifications.filter(item => item.id !== disclaimerItem?.id));
  });
  const [flashNotifications, setFlashNotifications] = useState(disclaimerItem ? [disclaimerItem] : []);

  const [savedFilterSets, setSavedFilterSets] = useState(defaultFilterSets);
  const selectRef = useRef(null);

  const [instances] = useState<EC2Instance[]>(INSTANCES);
  const [loading] = useState(false);
  const [quickPanelOpen, setQuickPanelOpen] = useState(true);

  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({
    wrapLines: false,
    stickyColumns: { first: 1, last: 0 },
  });

  const { items, actions, filteredItemsCount, collectionProps, propertyFilterProps, paginationProps } = useCollection(
    instances,
    {
      propertyFiltering: {
        filteringProperties: filteringProperties,
        empty: <TableEmptyState resourceName="EC2 Instances" />,
        noMatch: (
          <TableNoMatchState
            onClearFilter={() =>
              actions.setPropertyFiltering({ tokens: [], operation: propertyFilterProps.query.operation })
            }
          />
        ),
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[0] } },
      selection: {},
    }
  );

  const { buttonDropdownProps, selectProps, actionModal } = useFilterSets({
    filterSets: savedFilterSets,
    query: propertyFilterProps.query,
    filteringProperties: propertyFilterProps.filteringProperties,
    selectRef,
    updateFilters: query => {
      actions.setPropertyFiltering(query);
    },
    updateSavedFilterSets: newFilterSets => {
      setSavedFilterSets(newFilterSets);

      // Persist the new filters here
    },
    showNotification: notification => {
      setFlashNotifications([
        {
          ...notification,
          onDismiss: () => {
            setFlashNotifications(currentNotifications =>
              currentNotifications.filter(item => item.id !== notification.id)
            );
          },
        },
        ...flashNotifications,
      ]);
    },
  });

  const onAddQuickFilter = (
    token: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup,
    onAdd: (
      prev: any,
      next: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
    ) => null | PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
  ) => {
    const query = propertyFilterProps.query;
    const matchToken = (
      source: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup,
      target: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
    ): boolean => {
      const sourceTokens = 'operator' in source ? [source] : (source.tokens as PropertyFilterProps.Token[]);
      const sourceKeys = sourceTokens.map(t => t.propertyKey ?? '');
      const targetTokens = 'operator' in target ? [target] : (target.tokens as PropertyFilterProps.Token[]);
      const targetKeys = targetTokens.map(t => t.propertyKey ?? '');
      return sourceKeys.some(key => targetKeys.includes(key));
    };
    const matched = (query.secondaryTokens ?? []).find(source => matchToken(source, token));
    const secondaryTokens = [...(query.secondaryTokens ?? [])];
    const matchedIndex = matched ? secondaryTokens.indexOf(matched) : secondaryTokens.length;
    const tokenToAdd = matched ? onAdd(matched, token) : token;
    if (tokenToAdd) {
      secondaryTokens.splice(matchedIndex, 1, tokenToAdd);
    } else {
      secondaryTokens.splice(matchedIndex, 1);
    }
    actions.setPropertyFiltering({ ...query, secondaryTokens });
  };

  const onAddStateQuickFilter = (value: string) => {
    onAddQuickFilter({ propertyKey: 'state', operator: '=', value: [value] }, (prev, next) => {
      let nextValue = prev.value.includes(value)
        ? prev.value.filter((v: string) => v !== value)
        : [...prev.value, value];
      nextValue = 'operator' in next && prev.operator === next.operator ? nextValue : [value];
      return nextValue.length === 0 ? null : { ...next, value: nextValue };
    });
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/instances" />}
      notifications={<Flashbar stackItems={true} items={flashNotifications} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <div>
          <FullPageHeader
            title="Instances"
            createButtonText="Launch instance"
            selectedItemsCount={collectionProps.selectedItems?.length || 0}
            counter={getHeaderCounterText(instances, collectionProps.selectedItems)}
            onInfoLinkClick={() => {
              setToolsOpen(true);
              appLayout.current?.focusToolsClose();
            }}
          />
          <Grid
            gridDefinition={
              quickPanelOpen
                ? [{ colspan: { default: 12, xs: 3, m: 2 } }, { colspan: { default: 12, xs: 9, m: 10 } }]
                : [{ colspan: 12 }]
            }
          >
            {quickPanelOpen ? (
              <Box margin={{ top: 'm' }}>
                <Container
                  header={
                    <div>
                      <Header
                        variant="h3"
                        actions={<Button variant="icon" iconName="close" onClick={() => setQuickPanelOpen(false)} />}
                      >
                        Quick filters
                      </Header>
                    </div>
                  }
                >
                  {/* Quick filters */}
                  <SpaceBetween size="m">
                    <div>
                      <Box variant="h4">Alarm state</Box>
                      <Badge color="severity-high">Alarm</Badge>
                    </div>

                    <ExpandableSection defaultExpanded={true} variant="footer" headerText="State">
                      {['Running', 'Pending', 'Terminated'].map(state => (
                        <Checkbox
                          key={state}
                          checked={
                            !!propertyFilterProps.query.secondaryTokens?.some(
                              t => 'operator' in t && t.operator === '=' && t.value.includes(state)
                            )
                          }
                          onChange={() => onAddStateQuickFilter(state)}
                        >
                          {state}
                        </Checkbox>
                      ))}
                    </ExpandableSection>
                  </SpaceBetween>
                </Container>
              </Box>
            ) : null}
            <div>
              <Table
                {...collectionProps}
                enableKeyboardNavigation={true}
                columnDefinitions={COLUMN_DEFINITIONS}
                columnDisplay={preferences.contentDisplay}
                items={items}
                variant="borderless"
                stickyHeader={true}
                resizableColumns={true}
                wrapLines={preferences.wrapLines}
                stripedRows={preferences.stripedRows}
                contentDensity={preferences.contentDensity}
                stickyColumns={preferences.stickyColumns}
                selectionType="multi"
                ariaLabels={tableAriaLabels}
                renderAriaLive={renderAriaLive}
                loading={loading}
                loadingText="Loading distributions"
                filter={
                  <PropertyFilter
                    {...propertyFilterProps}
                    filteringAriaLabel="Find resources"
                    filteringPlaceholder="Find resources"
                    i18nStrings={propertyFilterI18nStrings}
                    countText={filteredItemsCount ? getTextFilterCounterText(filteredItemsCount) : ''}
                    expandToViewport={true}
                    enableTokenGroups={true}
                    customControl={
                      <SpaceBetween size="xs" direction="horizontal">
                        {quickPanelOpen ? null : (
                          <Box margin={{ top: 'xs' }}>
                            <Button
                              ariaLabel="Quick filters panel"
                              iconName="filter"
                              variant="icon"
                              onClick={() => setQuickPanelOpen(true)}
                            />
                          </Box>
                        )}
                        <Select
                          {...selectProps}
                          inlineLabelText="Saved filter sets"
                          data-testid="saved-filters"
                          ref={selectRef}
                        />
                      </SpaceBetween>
                    }
                    customFilterActions={<ButtonDropdown {...buttonDropdownProps} data-testid="filter-actions" />}
                  />
                }
                pagination={<Pagination {...paginationProps} />}
                preferences={<TablePreferences preferences={preferences} setPreferences={setPreferences} />}
              />
            </div>
          </Grid>
          {actionModal}
        </div>
      }
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
}

createRoot(document.getElementById('app')!).render(<App />);
