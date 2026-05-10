// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';

type Role = 'Owner' | 'Collaborator';
type Status = 'Active' | 'Invited';

interface Member {
  name: string;
  email: string;
  role: Role;
  status: Status;
  workspaces: number;
}

const INITIAL_MEMBERS: Member[] = [
  { name: 'Alice Dev', email: 'alicedev@example.com', role: 'Owner', status: 'Active', workspaces: 4 },
  { name: 'Bob Builder', email: 'bob@example.com', role: 'Collaborator', status: 'Active', workspaces: 2 },
  { name: 'Charlie Chen', email: 'charlie@example.com', role: 'Collaborator', status: 'Invited', workspaces: 0 },
];

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selected, setSelected] = useState<Member[]>([]);

  const handleInvite = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      return;
    }
    setMembers(prev => [
      ...prev,
      { name: inviteEmail.split('@')[0], email: inviteEmail, role: 'Collaborator', status: 'Invited', workspaces: 0 },
    ]);
    setInviteEmail('');
  };

  return (
    <SpaceBetween size="l">
      <Header variant="h1" description="Manage and invite team members to work on your project accounts.">
        Team
      </Header>

      <div style={{ maxWidth: 560 }}>
        <FormField label="Invite teammate by email">
          <SpaceBetween direction="horizontal" size="xs">
            <Input
              value={inviteEmail}
              onChange={({ detail }) => setInviteEmail(detail.value)}
              placeholder="teammate@example.com"
              type="email"
            />
            <Button variant="primary" onClick={handleInvite} disabled={!inviteEmail.trim()}>
              Send invite
            </Button>
          </SpaceBetween>
        </FormField>
      </div>

      <Table
        header={
          <Header
            counter={`(${members.length})`}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button disabled={selected.length === 0}>Remove</Button>
                <Button variant="primary" onClick={handleInvite} disabled={!inviteEmail.trim()}>
                  Invite
                </Button>
              </SpaceBetween>
            }
          >
            Team members
          </Header>
        }
        items={members}
        trackBy="email"
        selectionType="multi"
        selectedItems={selected}
        onSelectionChange={({ detail }) => setSelected(detail.selectedItems)}
        columnDefinitions={[
          {
            id: 'name',
            header: 'Name',
            cell: m => <Link href="#">{m.name}</Link>,
            sortingField: 'name',
          },
          {
            id: 'email',
            header: 'Email',
            cell: m => m.email,
            sortingField: 'email',
          },
          {
            id: 'role',
            header: 'Role',
            cell: m => m.role,
            sortingField: 'role',
          },
          {
            id: 'status',
            header: 'Status',
            cell: m => (
              <StatusIndicator type={m.status === 'Active' ? 'success' : 'pending'}>{m.status}</StatusIndicator>
            ),
            sortingField: 'status',
          },
          {
            id: 'workspaces',
            header: 'Workspaces',
            cell: m => m.workspaces,
            sortingField: 'workspaces',
          },
        ]}
        empty={
          <Box textAlign="center" color="inherit" padding="l">
            <b>No team members</b>
            <Box variant="p" color="text-body-secondary">
              Invite teammates to collaborate on your project accounts.
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}
