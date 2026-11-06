// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { AvatarProps } from '@cloudscape-design/chat-components/avatar';
import ChatBubble from '@cloudscape-design/chat-components/chat-bubble';
import { ChatBubbleProps } from '@cloudscape-design/chat-components/chat-bubble';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import FileTokenGroup from '@cloudscape-design/components/file-token-group';
import LiveRegion from '@cloudscape-design/components/live-region';
import SpaceBetween from '@cloudscape-design/components/space-between';

import FeedbackDialog from './additional-info/feedback-dialog';
import { ChatBubbleAvatar, CodeViewActions, FeedbackActions } from './common-components';
import { AUTHORS, fileTokenGroupI18nStrings, Message } from './config';
import StreamingChatBubbleContent from './streaming-chat-bubble';

import '../../styles/chat.scss';
// Custom-theme spinning avatar wrapper.
function CustomLoadingAvatar({
  author,
  avatarStyle,
}: {
  author: { type: 'user' | 'gen-ai'; name: string; initials?: string };
  avatarStyle?: AvatarProps.Style;
}) {
  return (
    <div className="custom-loading-avatar">
      <div className="custom-loading-avatar__ring" />
      <ChatBubbleAvatar {...author} loading={false} style={avatarStyle} />
    </div>
  );
}
export default function Messages({
  messages = [],
  setShowFeedbackDialog,
  addMessage,
  clearStreamingFlag,
  customThemeActive = false,
  onRegenerate,
  avatarStyleGenAi,
  avatarStyleUser,
  chatBubbleStyleIncoming,
  chatBubbleStyleOutgoing,
}: {
  messages: Array<Message>;
  setShowFeedbackDialog: (index: number, show: boolean) => void;
  addMessage: (index: number, message: Message) => void;
  clearStreamingFlag?: (index: number) => void;
  customThemeActive?: boolean;
  // Regenerate handler; receives the assistant bubble's index so the hook can rebuild from that point.
  onRegenerate?: (index: number) => void;
  avatarStyleGenAi?: AvatarProps.Style;
  avatarStyleUser?: AvatarProps.Style;
  chatBubbleStyleIncoming?: ChatBubbleProps.Style;
  chatBubbleStyleOutgoing?: ChatBubbleProps.Style;
}) {
  const latestMessage: Message = messages[messages.length - 1];
  // Announce a running count of completed agent messages. The count never resets,
  // so sending 2 prompts and receiving 2 replies announces "2 new messages from agent".
  const completedAgentMessages = messages.filter(
    m => m.type === 'chat-bubble' && m.authorId === 'gen-ai' && !!m.content,
  ).length;

  const liveRegionText =
    latestMessage?.type === 'alert'
      ? latestMessage.header
      : completedAgentMessages > 0
        ? `${completedAgentMessages} new message${completedAgentMessages > 1 ? 's' : ''} from agent`
        : '';

  // Index of the trailing support prompts: the most recent chat bubble with supportPrompts, rendered after any sibling artifacts.
  let trailingPromptsIndex: number | null = null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.type === 'chat-bubble') {
      if (m.supportPrompts) {
        trailingPromptsIndex = i;
      }
      break;
    }
  }
  return (
    <div className="messages" role="region" aria-label="Chat">
      <LiveRegion hidden={true} assertive={latestMessage?.type === 'alert'}>
        {liveRegionText}
      </LiveRegion>
      {messages.map((message, index) => {
        if (message.type === 'alert') {
          return (
            <Alert
              key={message.id ?? `alert-fallback-${index}`}
              header={message.header}
              type="error"
              statusIconAriaLabel="Error"
              data-testid={'error-alert' + index}
            >
              {message.content}
            </Alert>
          );
        }
        if (message.type === 'artifact') {
          // Indented sibling block outside the bubble, aligned under the reply text via `chat-bubble-indentation`.
          return (
            <div className="chat-bubble-indentation" key={message.id ?? `artifact-fallback-${index}`}>
              {message.content}
            </div>
          );
        }
        const author = AUTHORS[message.authorId];
        const isGenAi = author.type === 'gen-ai';
        const isLoading = customThemeActive && isGenAi && message.avatarLoading && !message.showLoadingBar;
        const avatarStyle = isGenAi ? avatarStyleGenAi : avatarStyleUser;
        const bubbleStyle = isGenAi ? chatBubbleStyleIncoming : chatBubbleStyleOutgoing;
        const avatar = isLoading ? (
          <CustomLoadingAvatar author={author} avatarStyle={avatarStyleGenAi} />
        ) : (
          <ChatBubbleAvatar
            {...author}
            loading={customThemeActive ? false : message.avatarLoading}
            style={avatarStyle}
          />
        );
        const bubbleActions = message.streaming ? null : message.actions === 'code-view' ? (
          <CodeViewActions contentToCopy={message.contentToCopy || ''} />
        ) : message.actions === 'feedback' ? (
          <FeedbackActions
            contentToCopy={message.contentToCopy || ''}
            onNotHelpfulFeedback={() => setShowFeedbackDialog(index, true)}
            onRegenerate={onRegenerate ? () => onRegenerate(index) : undefined}
            customThemeActive={customThemeActive}
          />
        ) : null;
        return (
          <SpaceBetween size="xs" key={message.id ?? `msg-fallback-${index}`}>
            <div className={customThemeActive && !isGenAi ? 'custom-outgoing' : undefined}>
              <ChatBubble
                avatar={avatar}
                ariaLabel={`${author.name} at ${message.timestamp}`}
                type={isGenAi ? 'incoming' : 'outgoing'}
                hideAvatar={customThemeActive ? !isGenAi || message.hideAvatar : message.hideAvatar}
                showLoadingBar={message.showLoadingBar}
                style={bubbleStyle}
                actions={bubbleActions}
              >
                <SpaceBetween size="xs">
                  <div>
                    {customThemeActive && message.streaming ? (
                      <StreamingChatBubbleContent
                        shouldStream={true}
                        onStreamComplete={() => clearStreamingFlag?.(index)}
                      >
                        {message.content}
                      </StreamingChatBubbleContent>
                    ) : (message.showLoadingBar && !message.content) || (isLoading && !message.content) ? (
                      // Loading bubble label per the Cloudscape GenAI loading snippets.
                      <Box color="text-status-inactive">{message.loadingLabel ?? 'Generating a response'}</Box>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.files && message.files.length > 0 && (
                    <FileTokenGroup
                      readOnly
                      items={message.files.map(file => ({ file }))}
                      limit={3}
                      onDismiss={() => {
                        // read-only token
                      }}
                      alignment="horizontal"
                      showFileThumbnail={true}
                      i18nStrings={fileTokenGroupI18nStrings}
                    />
                  )}
                </SpaceBetween>
              </ChatBubble>
            </div>
            {message.showFeedbackDialog && (
              <div className="other-content-vertically-align">
                <FeedbackDialog
                  onDismiss={() => setShowFeedbackDialog(index, false)}
                  onSubmit={() => {
                    setShowFeedbackDialog(index, false);
                    addMessage(index + 1, {
                      type: 'chat-bubble',
                      authorId: 'gen-ai',
                      content: 'Your feedback has been submitted. Thank you for your additional feedback.',
                      timestamp: new Date().toLocaleTimeString(),
                      hideAvatar: true,
                    });
                  }}
                />
              </div>
            )}
          </SpaceBetween>
        );
      })}
      {trailingPromptsIndex !== null &&
        messages[trailingPromptsIndex].type === 'chat-bubble' &&
        // Render support prompts at the bottom of the region, beneath any trailing artifacts.
        (messages[trailingPromptsIndex] as Extract<Message, { type: 'chat-bubble' }>).supportPrompts && (
          <div className="other-content-vertically-align">
            {(messages[trailingPromptsIndex] as Extract<Message, { type: 'chat-bubble' }>).supportPrompts}
          </div>
        )}
    </div>
  );
}
