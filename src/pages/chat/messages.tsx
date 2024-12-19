// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import ChatBubble from '@cloudscape-design/chat-components/chat-bubble';
import Alert from '@cloudscape-design/components/alert';
import LiveRegion from '@cloudscape-design/components/live-region';

import { ChatBubbleAvatar } from './common-components';
import { AUTHORS, Message } from './config';

import '../../styles/chat.scss';

export default function Messages({ messages = [] }: { messages: Array<Message> }) {
  const latestMessage: Message = messages[messages.length - 1];

  return (
    <div className="messages" role="region" aria-label="Chat">
      <LiveRegion hidden={true} assertive={latestMessage?.type === 'alert'}>
        {latestMessage?.type === 'alert' && latestMessage.header}
        {latestMessage?.content}
      </LiveRegion>

      {messages.map((message, index) => {
        if (message.type === 'alert') {
          return (
            <Alert
              key={'error-alert' + index}
              header={message.header}
              type="error"
              statusIconAriaLabel="Error"
              data-testid={'error-alert' + index}
            >
              {message.content}
            </Alert>
          );
        }

        const author = AUTHORS[message.authorId];

        return (
          <ChatBubble
            key={message.authorId + message.timestamp}
            avatar={<ChatBubbleAvatar {...author} loading={message.avatarLoading} />}
            ariaLabel={`${author.name} at ${message.timestamp}`}
            type={author.type === 'gen-ai' ? 'incoming' : 'outgoing'}
            hideAvatar={message.hideAvatar}
            actions={message.actions}
          >
            {message.content}
          </ChatBubble>
        );
      })}
    </div>
  );
}
