// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import ButtonGroup from '@cloudscape-design/components/button-group';
import FormField from '@cloudscape-design/components/form-field';
import Icon from '@cloudscape-design/components/icon';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { isVisualRefresh } from '../../common/apply-mode';
import ChatPromptInput from '../chat-common/chat-prompt-input';
import Messages from '../chat-common/messages';
import { useChat } from '../chat-common/use-chat';

import '../../styles/chat.scss';

export default function CloudscapeChat({ resetRef }: { resetRef?: React.MutableRefObject<(() => void) | undefined> }) {
  const {
    messages,
    tokens,
    setTokens,
    files,
    setFiles,
    isGenAiResponseLoading,
    messagesContainerRef,
    promptInputRef,
    onPromptSend,
    onMenuItemSelect,
    setShowFeedbackDialog,
    addMessage,
    hasStartedChat,
    regenerateResponse,
    stopResponse,
    resetChat,
  } = useChat();

  // Expose resetChat to parent via ref
  if (resetRef) {
    resetRef.current = resetChat;
  }

  // Insert "/" or "@" at the caret; insertText also triggers the slash-command / file-reference menu.
  const symbolButtons = (
    <ButtonGroup
      ariaLabel="Insert prompt symbols"
      variant="icon"
      items={[
        { type: 'icon-button', id: 'slash', text: 'Insert / for slash commands', iconName: 'slash' },
        { type: 'icon-button', id: 'at', text: 'Insert @ to reference a file', iconName: 'at-symbol' },
      ]}
      onItemClick={({ detail }) => {
        promptInputRef.current?.focus();
        promptInputRef.current?.insertText(detail.id === 'slash' ? '/' : '@');
      }}
    />
  );

  // Policy disclaimer via the prompt input's FormField constraintText, per the Cloudscape generative AI chat pattern.
  const promptInput = (
    <FormField
      stretch
      constraintText={
        <>
          Use of this service is subject to the{' '}
          <Link href="#" external variant="primary" fontSize="inherit">
            AWS Responsible AI Policy
          </Link>
          .
        </>
      }
    >
      <ChatPromptInput
        tokens={tokens}
        setTokens={setTokens}
        files={files}
        setFiles={setFiles}
        isGenAiResponseLoading={isGenAiResponseLoading}
        promptInputRef={promptInputRef}
        onPromptSend={onPromptSend}
        onMenuItemSelect={onMenuItemSelect}
        stopResponse={stopResponse}
        placeholder="Ask a question"
        fileInputAriaLabel="Chat file upload"
        secondaryActionsExtra={symbolButtons}
      />
    </FormField>
  );

  // Landing page (before first message).
  if (!hasStartedChat) {
    return (
      <div className={`chat-container ${!isVisualRefresh ? 'classic' : ''}`}>
        <div className="cloudscape-landing">
          <SpaceBetween size="l">
            <Box textAlign="center">
              <SpaceBetween size="s" alignItems="center">
                <Box padding={{ top: 'xs' }}>
                  <Icon name="gen-ai" size="big" variant="link" />
                </Box>
                <div>
                  <Box variant="h1" textAlign="center" margin={{ bottom: 'n' }}>
                    How can I help you today?
                  </Box>
                  <Box variant="p" color="text-body-secondary" textAlign="center" margin={{ top: 'xxs' }}>
                    Ask about your AWS resources, costs, and architecture.
                  </Box>
                </div>
              </SpaceBetween>
            </Box>

            {promptInput}
          </SpaceBetween>
        </div>
      </div>
    );
  }

  // Chat view (after first message) — full-page layout, no container.
  return (
    <div className="base-chat">
      <div className="base-chat__scroll" ref={messagesContainerRef}>
        <div className="base-chat__messages">
          <Messages
            messages={messages}
            setShowFeedbackDialog={setShowFeedbackDialog}
            addMessage={addMessage}
            onRegenerate={regenerateResponse}
          />
        </div>
      </div>

      <div className="base-chat__input">{promptInput}</div>
    </div>
  );
}
