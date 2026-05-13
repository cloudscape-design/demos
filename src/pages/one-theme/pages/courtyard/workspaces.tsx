// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
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
    name: 'Analytics dashboard',
    accountId: '1111-2222-3333',
    role: 'owner',
    status: 'Active',
    monthToDateSpend: '$24.18',
  },
  {
    id: '444455556666',
    name: 'Backend API service',
    accountId: '4444-5555-6666',
    role: 'owner',
    status: 'Active',
    monthToDateSpend: '$12.04',
  },
  {
    id: '777788889999',
    name: 'Data pipeline',
    accountId: '7777-8888-9999',
    role: 'collaborator',
    status: 'Active',
    monthToDateSpend: '$0.00',
  },
  {
    id: '000011112222',
    name: 'Design system library',
    accountId: '0000-1111-2222',
    role: 'collaborator',
    status: 'Active',
    monthToDateSpend: '$0.00',
  },
  {
    id: '333344445555',
    name: 'Front-end web app',
    accountId: '3333-4444-5555',
    role: 'owner',
    status: 'Active',
    monthToDateSpend: '$8.42',
  },
  {
    id: '666677778888',
    name: 'ML training sandbox',
    accountId: '6666-7777-8888',
    role: 'collaborator',
    status: 'Active',
    monthToDateSpend: '$0.00',
  },
  {
    id: '999900001111',
    name: 'Mobile app prototype',
    accountId: '9999-0000-1111',
    role: 'owner',
    status: 'Active',
    monthToDateSpend: '$3.17',
  },
];

const MAX_WORKSPACES = 5;

// AWS Management Console icon (gradient cube)
function ConsoleIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 2,
        flexShrink: 0,
        background:
          'radial-gradient(at 109% -9%, #b8e7ff 0%, #8ad4ff 7.5%, #5cc0ff 15%, #0099ff 30%, #0c96ff 32%, #2e8cff 37.5%, #5c7fff 45%, #8575ff 60%, #8e52ff 70%, #962eff 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 6l6-3 6 3-6 3-6-3z" fill="white" opacity="0.5" />
        <path d="M4 10l6 3 6-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 14l6 3 6-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 6l6 3 6-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Spend status badge
function SpendBadge() {
  return (
    <div
      style={{
        backgroundColor: '#080808',
        borderRadius: 4,
        padding: '2px 4px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="6.5" stroke="#787878" strokeWidth="1" fill="none" />
        <path
          d="M5 8l2 2 4-4"
          stroke="#787878"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span style={{ fontSize: 12, color: '#787878', lineHeight: '16px', whiteSpace: 'nowrap' }}>
        Within spend limit
      </span>
    </div>
  );
}

function WorkspaceCard({ workspace, onClick }: { workspace: Workspace; onClick: () => void }) {
  return (
    <div
      style={{
        backgroundColor: '#151515',
        border: `1px solid ${awsui.colorBorderDividerDefault}`,
        borderRadius: awsui.borderRadiusContainer,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        height: 134,
        padding: '15px 11px 12px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {/* Top row: name + spend badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: '1 1 0', minWidth: 80 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: awsui.colorTextLinkDefault,
              lineHeight: '22px',
              letterSpacing: '-0.2px',
              textDecoration: 'underline',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
            }}
          >
            {workspace.name}
          </span>
        </div>
        <div style={{ flexShrink: 0, height: 22, display: 'flex', alignItems: 'center', fontSize: 12 }}>
          <SpendBadge />
        </div>
      </div>

      {/* Bottom row: console link */}
      <div
        style={{
          backgroundColor: '#1E1E1E',
          border: `1px solid ${awsui.colorBorderDividerDefault}`,
          borderRadius: awsui.borderRadiusContainer,
          height: 48,
          padding: 8,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <ConsoleIcon />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 14, color: awsui.colorTextBodyDefault, lineHeight: '20px' }}>
            Create and manage cloud infrastructure
          </span>
          <span style={{ fontSize: 12, color: awsui.colorTextFormSecondary, lineHeight: '16px' }}>
            AWS Management Console
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkspaceGrid({ items, onNavigate }: { items: Workspace[]; onNavigate: (path: string) => void }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gridAutoRows: '134px',
        gap: 12,
        paddingBottom: 20,
      }}
    >
      {items.map(w => (
        <WorkspaceCard key={w.id} workspace={w} onClick={() => onNavigate('/workspaces')} />
      ))}
    </div>
  );
}

function WorkspaceOverview({ ownedCount, onSelectMine }: { ownedCount: number; onSelectMine: () => void }) {
  return (
    <Container header={<Header variant="h2">Overview</Header>}>
      <KeyValuePairs
        columns={3}
        items={[
          {
            label: 'Total project accounts',
            value: <Box fontSize="heading-xl">{WORKSPACES.length}</Box>,
          },
          {
            label: 'Owned by me',
            value: (
              <Link
                variant="primary"
                href="#"
                onFollow={e => {
                  e.preventDefault();
                  onSelectMine();
                }}
              >
                <Box fontSize="heading-xl">{ownedCount}</Box>
              </Link>
            ),
          },
          {
            label: 'Month-to-date spend',
            value: <Box fontSize="heading-xl">$36.22</Box>,
          },
        ]}
      />
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
      <Tabs
        activeTabId={activeTab}
        onChange={({ detail }) => setActiveTab(detail.activeTabId)}
        tabs={[
          {
            id: 'all',
            label: 'All',
            content:
              viewMode === 'grid' ? (
                <SpaceBetween size="l">
                  {sharedHeader}
                  {sharedFilter}
                  <WorkspaceGrid items={filtered} onNavigate={navigate} />
                  {sharedPagination}
                </SpaceBetween>
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
                        <StatusIndicator type={w.status === 'Active' ? 'success' : 'pending'}>
                          {w.status}
                        </StatusIndicator>
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
              ),
          },
          {
            id: 'mine',
            label: 'Mine',
            content:
              viewMode === 'grid' ? (
                <SpaceBetween size="l">
                  {sharedHeader}
                  {sharedFilter}
                  <WorkspaceGrid items={filtered} onNavigate={navigate} />
                  {sharedPagination}
                </SpaceBetween>
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
                        <StatusIndicator type={w.status === 'Active' ? 'success' : 'pending'}>
                          {w.status}
                        </StatusIndicator>
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
              ),
          },
        ]}
      />
    </SpaceBetween>
  );
}
