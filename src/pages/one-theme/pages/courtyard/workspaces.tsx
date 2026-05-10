// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import Tabs from '@cloudscape-design/components/tabs';
import TextFilter from '@cloudscape-design/components/text-filter';
import * as awsui from '@cloudscape-design/design-tokens';

type ViewMode = 'grid' | 'list';
type Role = 'owner' | 'collaborator';

interface Workspace {
  id: string;
  name: string;
  accountId: string;
  role: Role;
  status: 'Active' | 'Pending' | 'Suspended';
  monthToDateSpend: string;
}

const WORKSPACES: Workspace[] = [
  {
    id: '111122223333',
    name: 'starter-home-alice',
    accountId: '1111-2222-3333',
    role: 'owner',
    status: 'Active',
    monthToDateSpend: '$24.18',
  },
  {
    id: '444455556666',
    name: 'prototyping',
    accountId: '4444-5555-6666',
    role: 'owner',
    status: 'Active',
    monthToDateSpend: '$12.04',
  },
  {
    id: '777788889999',
    name: 'team-sandbox',
    accountId: '7777-8888-9999',
    role: 'collaborator',
    status: 'Active',
    monthToDateSpend: '$0.00',
  },
  {
    id: '000011112222',
    name: 'analytics-ws',
    accountId: '0000-1111-2222',
    role: 'collaborator',
    status: 'Pending',
    monthToDateSpend: '$0.00',
  },
];

const MAX_WORKSPACES = 5;

function WorkspaceOverview({ ownedCount, onSelectMine }: { ownedCount: number; onSelectMine: () => void }) {
  return (
    <Container header={<Header variant="h2">Overview</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="xxs">
          <Box variant="awsui-key-label">Total project accounts</Box>
          <Box fontSize="heading-xl" fontWeight="bold">
            {WORKSPACES.length}
          </Box>
        </SpaceBetween>
        <SpaceBetween size="xxs">
          <Box variant="awsui-key-label">Owned by me</Box>
          <Link
            variant="primary"
            href="#"
            onFollow={e => {
              e.preventDefault();
              onSelectMine();
            }}
          >
            <Box fontSize="heading-xl" fontWeight="bold">
              {ownedCount}
            </Box>
          </Link>
        </SpaceBetween>
        <SpaceBetween size="xxs">
          <Box variant="awsui-key-label">Month-to-date spend</Box>
          <Box fontSize="heading-xl" fontWeight="bold">
            $36.22
          </Box>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
}

function LegendItem({ color, label, swatch }: { color: string; label: string; swatch: 'solid' | 'dotted' | 'line' }) {
  const baseSwatch = {
    inlineSize: 16,
    blockSize: 8,
    borderRadius: 2,
    flexShrink: 0,
  };
  let swatchStyle: React.CSSProperties;
  if (swatch === 'solid') {
    swatchStyle = { ...baseSwatch, background: color };
  } else if (swatch === 'dotted') {
    swatchStyle = {
      ...baseSwatch,
      backgroundImage: `repeating-linear-gradient(-45deg, ${color} 0 3px, transparent 3px 6px)`,
    };
  } else {
    swatchStyle = { ...baseSwatch, borderInlineStart: `2px solid ${color}`, background: 'transparent' };
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: awsui.spaceStaticXs }}>
      <span style={swatchStyle} aria-hidden="true" />
      <Box variant="small">{label}</Box>
    </div>
  );
}

function SpendingLimit() {
  const currentAmount = 36.22;
  const forecastAmount = 48.5;
  const limit = 100;
  const currentPct = Math.min(100, (currentAmount / limit) * 100);
  const forecastPct = Math.min(100, (forecastAmount / limit) * 100);
  const remainingPct = Math.max(0, 100 - currentPct);

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Set by your management account. When this limit is reached, new launches are blocked."
        >
          Spending limit
        </Header>
      }
    >
      <SpaceBetween size="s">
        <div
          aria-label={`Current spend ${currentAmount} dollars out of ${limit} dollars, forecast ${forecastAmount}`}
          role="img"
          style={{
            position: 'relative',
            display: 'flex',
            inlineSize: '100%',
            blockSize: 12,
            borderRadius: awsui.borderRadiusContainer,
            overflow: 'hidden',
            background: awsui.colorBackgroundInputDisabled,
          }}
        >
          {/* Filled "Current" segment */}
          <div
            style={{
              inlineSize: `${currentPct}%`,
              background: awsui.colorChartsPaletteCategorical1,
            }}
          />
          {/* Dotted "Forecasted" segment — spans from current to forecast */}
          <div
            style={{
              inlineSize: `${remainingPct}%`,
              // A diagonal striped pattern in the same palette color, faded, to
              // visually distinguish it from the solid "current" portion.
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                ${awsui.colorChartsPaletteCategorical1} 0 4px,
                transparent 4px 8px
              )`,
            }}
          />
          {/* Forecast marker line */}
          <div
            style={{
              position: 'absolute',
              insetBlockStart: 0,
              insetBlockEnd: 0,
              insetInlineStart: `calc(${forecastPct}% - 1px)`,
              inlineSize: 2,
              background: awsui.colorTextBodyDefault,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: awsui.spaceStaticL, flexWrap: 'wrap' }}>
          <LegendItem
            color={awsui.colorChartsPaletteCategorical1}
            label={`Current $${currentAmount.toFixed(2)}`}
            swatch="solid"
          />
          <LegendItem
            color={awsui.colorChartsPaletteCategorical1}
            label={`Forecasted $${forecastAmount.toFixed(2)}`}
            swatch="dotted"
          />
          <LegendItem color={awsui.colorTextBodyDefault} label={`Limit $${limit.toFixed(2)}`} swatch="line" />
        </div>

        <Box variant="small" color="text-body-secondary">
          Resets at Jun 1, 2026. Updated 15 mins ago.
        </Box>
      </SpaceBetween>
    </Container>
  );
}

export default function WorkspacesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredByTab = activeTab === 'mine' ? WORKSPACES.filter(w => w.role === 'owner') : WORKSPACES;
  const filtered = filteredByTab.filter(w => w.name.toLowerCase().includes(filterText.toLowerCase()));
  const ownedCount = WORKSPACES.filter(w => w.role === 'owner').length;
  const isAtMax = ownedCount >= MAX_WORKSPACES;

  const sharedHeader = (
    <Header
      counter={`(${filtered.length})`}
      actions={
        <SegmentedControl
          selectedId={viewMode}
          onChange={({ detail }) => setViewMode(detail.selectedId as ViewMode)}
          label="View mode"
          options={[
            { id: 'grid', iconName: 'grid-view', iconAlt: 'Grid view' },
            { id: 'list', iconName: 'list-view', iconAlt: 'List view' },
          ]}
        />
      }
    >
      {activeTab === 'mine' ? 'Owned by me' : 'All project accounts'}
    </Header>
  );

  const sharedFilter = (
    <TextFilter
      filteringText={filterText}
      filteringPlaceholder="Find project accounts"
      onChange={({ detail }) => setFilterText(detail.filteringText)}
    />
  );

  const sharedPagination = (
    <Pagination
      currentPageIndex={currentPage}
      pagesCount={1}
      onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
    />
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Project accounts are isolated AWS environments for teams, projects, or stages."
        actions={
          <Button variant="primary" disabled={isAtMax}>
            Create project account
          </Button>
        }
      >
        Project accounts
      </Header>
      {isAtMax && (
        <Alert
          type="warning"
          header="Project account limit reached"
          action={
            <Button iconName="external" iconAlign="right" href="https://console.aws.amazon.com/support" target="_blank">
              Contact AWS Support
            </Button>
          }
        >
          You have reached the maximum number of project accounts ({MAX_WORKSPACES}). Contact support to request an
          increase.
        </Alert>
      )}
      <WorkspaceOverview ownedCount={ownedCount} onSelectMine={() => setActiveTab('mine')} />
      <SpendingLimit />
      <Tabs
        activeTabId={activeTab}
        onChange={({ detail }) => setActiveTab(detail.activeTabId)}
        tabs={[
          { id: 'all', label: 'All' },
          { id: 'mine', label: 'Mine' },
        ]}
      />

      {viewMode === 'grid' ? (
        <Cards
          header={sharedHeader}
          filter={sharedFilter}
          pagination={sharedPagination}
          cardDefinition={{
            header: w => (
              <Link
                variant="secondary"
                fontSize="heading-m"
                href={`#/workspaces/${w.id}`}
                onFollow={e => {
                  e.preventDefault();
                  navigate(`/workspaces`);
                }}
              >
                {w.name}
              </Link>
            ),
            sections: [
              {
                id: 'info',
                content: w => (
                  <KeyValuePairs
                    columns={2}
                    items={[
                      { label: 'Account ID', value: w.accountId },
                      { label: 'Role', value: w.role === 'owner' ? 'Owner' : 'Collaborator' },
                      {
                        label: 'Status',
                        value: (
                          <StatusIndicator type={w.status === 'Active' ? 'success' : 'pending'}>
                            {w.status}
                          </StatusIndicator>
                        ),
                      },
                      { label: 'MTD spend', value: w.monthToDateSpend },
                    ]}
                  />
                ),
              },
            ],
          }}
          cardsPerRow={[{ cards: 1 }, { minWidth: 700, cards: 2 }, { minWidth: 1200, cards: 3 }]}
          items={filtered}
          trackBy="id"
          entireCardClickable={true}
          renderAriaLive={({ totalItemsCount }) => `${totalItemsCount} project accounts`}
          empty={
            <Box textAlign="center" color="inherit" padding="l">
              <b>No project accounts</b>
              <Box variant="p" color="text-body-secondary">
                {filterText ? 'No project accounts match your filter.' : 'Create a project account to get started.'}
              </Box>
            </Box>
          }
        />
      ) : (
        <Table
          header={sharedHeader}
          filter={sharedFilter}
          pagination={sharedPagination}
          items={filtered}
          trackBy="id"
          columnDefinitions={[
            {
              id: 'name',
              header: 'Name',
              sortingField: 'name',
              cell: w => (
                <Link
                  href={`#/workspaces/${w.id}`}
                  onFollow={e => {
                    e.preventDefault();
                    navigate('/workspaces');
                  }}
                >
                  {w.name}
                </Link>
              ),
            },
            { id: 'accountId', header: 'Account ID', sortingField: 'accountId', cell: w => w.accountId },
            {
              id: 'role',
              header: 'Role',
              sortingField: 'role',
              cell: w => (w.role === 'owner' ? 'Owner' : 'Collaborator'),
            },
            {
              id: 'status',
              header: 'Status',
              sortingField: 'status',
              cell: w => (
                <StatusIndicator type={w.status === 'Active' ? 'success' : 'pending'}>{w.status}</StatusIndicator>
              ),
            },
            {
              id: 'mtd',
              header: 'MTD spend',
              sortingField: 'monthToDateSpend',
              cell: w => w.monthToDateSpend,
            },
          ]}
        />
      )}
    </SpaceBetween>
  );
}
