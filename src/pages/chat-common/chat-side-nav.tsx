// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Tabs, { TabsProps } from '@cloudscape-design/components/tabs';

import { ConversationsList, EventLog } from './chat-nav-data';

export interface ChatSideNavProps {
  title?: string;
  tabsStyle?: TabsProps.Style;
  onNewChat?: () => void;
}

export default function ChatSideNav({ title = 'Generative AI chat', tabsStyle, onNewChat }: ChatSideNavProps) {
  return (
    <div className="chat-side-nav chat-side-nav--tabs">
      <div className="chat-side-nav__header">
        <Box variant="h2">{title}</Box>
      </div>

      <Tabs
        ariaLabel="Chat navigation"
        disableContentPaddings
        {...(tabsStyle ? { style: tabsStyle } : {})}
        tabs={[
          {
            id: 'conversations',
            label: 'Conversations',
            content: (
              <div className="chat-side-nav__section">
                <ConversationsList onNewChat={onNewChat} />
              </div>
            ),
          },
          {
            id: 'event-log',
            label: 'Event log',
            content: (
              <div className="chat-side-nav__section">
                <EventLog />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
