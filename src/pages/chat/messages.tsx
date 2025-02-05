// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import ChatBubble from '@cloudscape-design/chat-components/chat-bubble';
import Alert from '@cloudscape-design/components/alert';
import FileTokenGroup from '@cloudscape-design/components/file-token-group';
import LiveRegion from '@cloudscape-design/components/live-region';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ChatBubbleAvatar } from './common-components';
import { AUTHORS, fileTokenGroupI18nStrings, Message, supportPromptItems } from './config';

import '../../styles/chat.scss';

export default function Messages({ messages = [] }: { messages: Array<Message> }) {
  const latestMessage: Message = messages[messages.length - 1];

  const promptText = supportPromptItems.map(item => item.text);

  return (
    <div className="messages" role="region" aria-label="Chat">
      <LiveRegion hidden={true} assertive={latestMessage?.type === 'alert'}>
        {latestMessage?.type === 'alert' && latestMessage.header}
        {latestMessage?.content}
        {latestMessage.type === 'chat-bubble' &&
          latestMessage.supportPrompts &&
          `There are ${promptText.length} support prompts accompanying this message. ${promptText}`}
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
          <>
            <ChatBubble
              key={message.authorId + message.timestamp}
              avatar={<ChatBubbleAvatar {...author} loading={message.avatarLoading} />}
              ariaLabel={`${author.name} at ${message.timestamp}`}
              type={author.type === 'gen-ai' ? 'incoming' : 'outgoing'}
              hideAvatar={message.hideAvatar}
              actions={message.actions}
            >
              <SpaceBetween size="xs">
                {message.content}
                {message.files && message.files.length > 0 && (
                  <FileTokenGroup
                    readOnly
                    items={message.files.map(file => ({ file }))}
                    limit={3}
                    onDismiss={() => {}}
                    alignment="horizontal"
                    showFileThumbnail={true}
                    i18nStrings={fileTokenGroupI18nStrings}
                  />
                )}
              </SpaceBetween>
            </ChatBubble>
            {latestMessage.type === 'chat-bubble' && latestMessage.supportPrompts && index === messages.length - 1 && (
              <div style={{ marginInlineStart: '36px' }}>{message.supportPrompts}</div>
            )}
          </>
        );
      })}
    </div>
  );
}
