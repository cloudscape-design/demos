// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  AppLayoutProps,
  TextFilter,
  Box,
  Button,
  Badge,
  Container,
  Link,
  Cards,
  CollectionPreferencesProps,
  Flashbar,
  Header,
  Grid,
  Pagination,
  SpaceBetween,
  PropertyFilterProps,
  TokenGroup,
} from '@cloudscape-design/components';

import { useDisclaimerFlashbarItem } from '../commons/disclaimer-flashbar-item';
import { MarketPlaceItem } from './interface';

import { CustomAppLayout, TableEmptyState, TableNoMatchState, Navigation } from '../commons/common-components';
import { Breadcrumbs, ToolsContent } from '../table/common-components';

import { COLUMN_DEFINITIONS, filteringProperties, CustomPrefs, cardsAriaLabels } from './cards-config';
import '../../styles/table-select.scss';
import { QuickFilterEnum, QuickFilterRange } from '../table-quick-saved-filters/quick-filters';
import GOODS from '../../resources/marketplace';

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const disclaimerItem = useDisclaimerFlashbarItem(() => {
    setFlashNotifications(currentNotifications => currentNotifications.filter(item => item.id !== disclaimerItem?.id));
  });
  const [flashNotifications, setFlashNotifications] = useState(disclaimerItem ? [disclaimerItem] : []);

  const [goods, setGoods] = useState<MarketPlaceItem[]>(GOODS);
  const [loading] = useState(false);
  const [quickPanelOpen, setQuickPanelOpen] = useState(true);

  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences<CustomPrefs>>({
    custom: { andOrFilter: false },
  });

  const {
    items,
    allPageItems,
    actions,
    filterProps,
    filteredItemsCount,
    collectionProps,
    propertyFilterProps,
    paginationProps,
  } = useCollection(goods, {
    propertyFiltering: {
      defaultQuery: { operation: 'and', tokens: [] },
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
    pagination: { pageSize: 10 },
    selection: {},
  });

  // const paginated = paginationProps.

  const matchTokenApproximate = (
    source: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup,
    target: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
  ): boolean => {
    const sourceTokens = 'operator' in source ? [source] : (source.tokens as PropertyFilterProps.Token[]);
    const sourceKeys = sourceTokens.map(t => t.propertyKey ?? '');
    const targetTokens = 'operator' in target ? [target] : (target.tokens as PropertyFilterProps.Token[]);
    const targetKeys = targetTokens.map(t => t.propertyKey ?? '');
    return sourceKeys.some(key => targetKeys.includes(key));
  };

  const matchTokenExact = (
    source: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup,
    target: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
  ): boolean => {
    if ('operator' in source && 'operator' in target) {
      return source.propertyKey === target.propertyKey && source.operator === target.operator;
    }
    if (
      'operation' in source &&
      'operation' in target &&
      source.operation === target.operation &&
      source.tokens.length === target.tokens.length
    ) {
      for (let i = 0; i < source.tokens.length; i++) {
        if (!matchTokenExact(source.tokens[i], target.tokens[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const matchToken = preferences.custom?.andOrFilter ? matchTokenApproximate : matchTokenExact;

  const onAddQuickFilter = (
    token: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup,
    onAdd: (
      prev: any,
      next: PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
    ) => null | PropertyFilterProps.Token | PropertyFilterProps.TokenGroup
  ) => {
    const query = propertyFilterProps.query;
    const targetTokens = [...(preferences.custom?.andOrFilter ? query.secondaryTokens ?? [] : query.tokenGroups ?? [])];
    const matched = targetTokens.find(source => matchToken(source, token));
    const matchedIndex = matched ? targetTokens.indexOf(matched) : targetTokens.length;
    const tokenToAdd = matched ? onAdd(matched, token) : token;
    if (tokenToAdd) {
      targetTokens.splice(matchedIndex, 1, tokenToAdd);
    } else {
      targetTokens.splice(matchedIndex, 1);
    }
    const nextQuery = preferences.custom?.andOrFilter
      ? { ...query, secondaryTokens: targetTokens }
      : { ...query, tokenGroups: targetTokens };
    actions.setPropertyFiltering(nextQuery);
  };

  const addEnumQuickFilter = (propertyKey: string, value: string) => {
    onAddQuickFilter({ propertyKey, operator: '=', value: [value] }, (prev, next) => {
      let nextValue = prev.value.includes(value)
        ? prev.value.filter((v: string) => v !== value)
        : [...prev.value, value];
      nextValue = 'operator' in next && prev.operator === next.operator ? nextValue : [value];
      return nextValue.length === 0 ? null : { ...next, value: nextValue };
    });
  };
  console.log(propertyFilterProps.query);

  const targetTokens = preferences.custom?.andOrFilter
    ? propertyFilterProps.query.secondaryTokens ?? []
    : propertyFilterProps.query.tokenGroups ?? [];

  const checkEnumProperty = (propertyKey: string, value: string) =>
    targetTokens.some(
      t => 'operator' in t && t.propertyKey === propertyKey && t.operator === '=' && t.value.includes(value)
    );

  const operatingSystems = ['Ubuntu', 'Amazon Linux', 'Win2022', 'Linux'];
  const checkedOperatingSystems = operatingSystems.filter(os => checkEnumProperty('operatingSystem', os));

  const pricingModels = ['Usage based', 'Upfront commitment', 'Free'];
  const checkedPricingModels = pricingModels.filter(model => checkEnumProperty('pricingModel', model));

  const [price, setPrice] = useState({ min: 0, max: 300000 });
  const averageLatencyFilterDebounceTimerRef = useRef<null | any>(null);
  const onUpdateLatencyFilter = (value: { min: number; max: number }) => {
    if (averageLatencyFilterDebounceTimerRef.current) {
      clearTimeout(averageLatencyFilterDebounceTimerRef.current);
    }
    setPrice(value);
    averageLatencyFilterDebounceTimerRef.current = setTimeout(() => {
      onAddQuickFilter(
        {
          operation: 'and',
          tokens: [
            { propertyKey: 'yearlyPrice', operator: '>=', value: value.min },
            { propertyKey: 'yearlyPrice', operator: '<=', value: value.max },
          ],
        },
        (_prev, next) => next
      );
    }, 750);
  };
  const averageLatencyEnabled = targetTokens.some(source =>
    matchToken(source, {
      operation: 'or',
      tokens: [
        { propertyKey: 'yearlyPrice', operator: '>=', value: 0 },
        { propertyKey: 'yearlyPrice', operator: '<=', value: 0 },
      ],
    })
  );

  const hasFilterQuery = propertyFilterProps.query.tokenGroups && propertyFilterProps.query.tokenGroups?.length !== 0;
  let selectedFilterToken: string[] = [];
  propertyFilterProps.query.tokenGroups?.forEach(token => {
    if ('value' in token) {
      selectedFilterToken = selectedFilterToken.concat(token.value);
    } else {
      const tokenisedValues = token.tokens.map(option => {
        if ('propertyKey' in option) {
          return option.propertyKey === 'yearlyPrice' ? `Price ${option.operator} ${option.value}` : '';
        }
        return '';
      });
      selectedFilterToken = selectedFilterToken.concat(tokenisedValues);
    }
  });
  console.log(selectedFilterToken);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/instances" />}
      notifications={<Flashbar stackItems={true} items={flashNotifications} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <div>
          <Header variant="h1">AWS Marketplace</Header>
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
                  {hasFilterQuery ? (
                    <SpaceBetween size="xxs">
                      <SpaceBetween size="xs" direction="horizontal">
                        <Box variant="h4">Selected filters</Box>
                        <Box margin={{ top: 'xxs' }}>
                          <Link
                            onClick={() => {
                              actions.setPropertyFiltering({
                                tokens: [],
                                operation: propertyFilterProps.query.operation,
                              });
                            }}
                          >
                            Clear all
                          </Link>
                        </Box>
                      </SpaceBetween>
                      <TokenGroup
                        // onDismiss={({ detail: { itemIndex } }) => {}}
                        items={selectedFilterToken.map(token => ({ label: token }))}
                        limit={3}
                      />
                    </SpaceBetween>
                  ) : null}

                  {/* Quick filters */}
                  <QuickFilterEnum
                    title="Pricing model"
                    values={pricingModels}
                    checkedValues={checkedPricingModels}
                    getTotal={model => allPageItems.filter(i => i.pricingModel === model).length}
                    onChange={model => addEnumQuickFilter('pricingModel', model)}
                    renderValue={value => <Badge color={value === 'Free' ? 'green' : 'severity-low'}>{value}</Badge>}
                  />

                  <QuickFilterEnum
                    title="Has free trial"
                    expandable={false}
                    hideCounter={true}
                    values={['Yes']}
                    checkedValues={['Yes'].filter(state => checkEnumProperty('freeTrial', state))}
                    getTotal={() => allPageItems.filter(i => i.freeTrial === 'Yes').length}
                    onChange={() => addEnumQuickFilter('freeTrial', 'Yes')}
                  />

                  <QuickFilterEnum
                    title="Operating System"
                    values={operatingSystems}
                    checkedValues={checkedOperatingSystems}
                    getTotal={os => allPageItems.filter(i => i.operatingSystem === os).length}
                    onChange={os => addEnumQuickFilter('operatingSystem', os)}
                    limit={3}
                  />

                  <QuickFilterRange
                    title="Price ($/year)"
                    defaultExpanded={true}
                    value={price}
                    onChange={onUpdateLatencyFilter}
                    enabled={averageLatencyEnabled}
                    min={0}
                    max={40000}
                  />
                </Container>
              </Box>
            ) : null}
            <Box margin={{ top: 'm' }}>
              <Cards
                {...collectionProps}
                cardDefinition={COLUMN_DEFINITIONS}
                ariaLabels={cardsAriaLabels}
                items={items}
                stickyHeader={true}
                selectionType="multi"
                loading={loading}
                loadingText="Loading distributions"
                filter={
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {quickPanelOpen ? null : (
                        <Box margin={{ right: 'xs' }}>
                          <Button
                            ariaLabel="Quick filters panel"
                            iconName="filter"
                            variant="icon"
                            onClick={() => setQuickPanelOpen(true)}
                          />
                        </Box>
                      )}
                      <div style={{ flexGrow: '1' }}>
                        <TextFilter {...filterProps} filteringPlaceholder="Filter available products" />
                      </div>
                      {hasFilterQuery ? (
                        <Box margin={{ left: 'xs', top: 'xs' }}>{filteredItemsCount} matches</Box>
                      ) : null}
                    </div>
                  </div>
                }
                pagination={<Pagination {...paginationProps} />}
              />
            </Box>
          </Grid>
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
