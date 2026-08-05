// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useCallback, useRef, useState } from 'react';

import AppLayoutToolbar from '@cloudscape-design/components-core/app-layout-toolbar';
import Box from '@cloudscape-design/components-core/box';
import Button from '@cloudscape-design/components-core/button';
import Dropdown from '@cloudscape-design/components-core/dropdown';
import Icon, { IconProps } from '@cloudscape-design/components-core/icon';
import Link from '@cloudscape-design/components-core/link';
import { PromptInputProps } from '@cloudscape-design/components-core/prompt-input';
import SpaceBetween from '@cloudscape-design/components-core/space-between';

import ChatPromptInput from '../chat-common/chat-prompt-input';
import Messages from '../chat-common/messages';
import { tokensToDisplayText, useChat } from '../chat-common/use-chat';
import { comparisonTableDemoPrompt, comparisonTableResponse } from './comparison-table';
import CustomNavigation from './custom-navigation';
import {
  getCustomAvatarStyleGenAi,
  getCustomAvatarStyleUser,
  getCustomChatBubbleStyleIncoming,
  getCustomChatBubbleStyleOutgoing,
  getCustomControlIconColor,
  getCustomControlSecondaryTextColor,
  getCustomControlTextColor,
  getCustomPromptInputStyle,
} from './custom-theme-styles';
import { useDarkMode } from './use-chat-theme';

import '../../styles/chat.scss';

// Tools dropdown.
const toolItems = [
  { id: 'create-image', text: 'Create image', iconName: 'edit-gen-ai' as const, labelTag: 'New' },
  { id: 'analyze-data', text: 'Analyze data', iconName: 'view-horizontal' as const },
  { id: 'research', text: 'Research', iconName: 'search-gen-ai' as const },
  { id: 'summarize', text: 'Summarize', iconName: 'list-view' as const, labelTag: 'New' },
  { id: 'learn', text: 'Learn', iconName: 'status-info' as const },
];

function ToolsDropdown({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleOutsideClick = useCallback(() => setOpen(false), []);
  const handleEscape = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(prev => {
      if (!prev) {
        setActiveIndex(0);
        setTimeout(() => itemRefs.current[0]?.focus(), 0);
      }
      return !prev;
    });
  }, []);

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (activeIndex + 1) % toolItems.length;
        setActiveIndex(next);
        itemRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (activeIndex - 1 + toolItems.length) % toolItems.length;
        setActiveIndex(prev);
        itemRefs.current[prev]?.focus();
      }
    },
    [activeIndex],
  );

  return (
    <Dropdown
      expandToViewport
      open={open}
      onOutsideClick={handleOutsideClick}
      onEscape={handleEscape}
      minWidth={220}
      trigger={
        <button
          ref={triggerRef}
          className="custom-dropdown-trigger__button"
          style={{ color: getCustomControlTextColor(isDark) }}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          <Icon name="settings" /> Tools
        </button>
      }
      content={
        <div className="custom-dropdown-content" role="menu" aria-label="Tools" onKeyDown={handleMenuKeyDown}>
          <Box color="text-body-secondary" fontSize="body-m" padding={{ vertical: 'xs', horizontal: 's' }}>
            <span style={{ fontWeight: 500 }}>Tools</span>
          </Box>
          {toolItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className="custom-tools-item"
              role="menuitem"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              <span style={{ color: getCustomControlIconColor(isDark), display: 'inline-flex' }}>
                <Icon name={item.iconName} />
              </span>
              <span className="custom-tools-item__text" style={{ color: getCustomControlTextColor(isDark) }}>
                {item.text}
              </span>
              {item.labelTag && <span className="custom-label-tag">{item.labelTag}</span>}
            </div>
          ))}
        </div>
      }
    />
  );
}

// Model selector dropdown.
const models: Array<{ id: string; text: string; secondaryText: string; iconName: IconProps.Name }> = [
  { id: 'fast', text: 'Fast', secondaryText: 'Answers quickly', iconName: 'play' },
  { id: 'smart', text: 'Smart', secondaryText: 'Balances speed and quality', iconName: 'gen-ai' },
  { id: 'advanced', text: 'Advanced', secondaryText: 'Best for complex reasoning and code', iconName: 'star-filled' },
];

function ModelSelectorDropdown({ isDark }: { isDark: boolean }) {
  const [selectedModel, setSelectedModel] = useState('smart');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => models.findIndex(m => m.id === 'smart'));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleOutsideClick = useCallback(() => setOpen(false), []);
  const handleEscape = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(prev => {
      if (!prev) {
        const selectedIndex = models.findIndex(m => m.id === selectedModel);
        const focusIndex = selectedIndex >= 0 ? selectedIndex : 0;
        setActiveIndex(focusIndex);
        setTimeout(() => optionRefs.current[focusIndex]?.focus(), 0);
      }
      return !prev;
    });
  }, [selectedModel]);

  const handleListboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (activeIndex + 1) % models.length;
        setActiveIndex(next);
        optionRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (activeIndex - 1 + models.length) % models.length;
        setActiveIndex(prev);
        optionRefs.current[prev]?.focus();
      }
    },
    [activeIndex],
  );

  return (
    <Dropdown
      expandToViewport
      open={open}
      onOutsideClick={handleOutsideClick}
      onEscape={handleEscape}
      minWidth={280}
      trigger={
        <button
          ref={triggerRef}
          className="custom-dropdown-trigger__button"
          style={{ color: getCustomControlTextColor(isDark) }}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={handleOpen}
        >
          {models.find(m => m.id === selectedModel)?.text ?? 'Smart'} <Icon name="caret-down" />
        </button>
      }
      content={
        <div
          className="custom-dropdown-content"
          role="listbox"
          aria-label="Model selector"
          onKeyDown={handleListboxKeyDown}
        >
          <Box fontSize="body-m" padding={{ vertical: 'xs', horizontal: 's' }}>
            <span style={{ fontWeight: 500, color: getCustomControlTextColor(isDark) }}>Models</span>
          </Box>
          {models.map((model, index) => {
            const isSelected = model.id === selectedModel;
            return (
              <div
                key={model.id}
                ref={el => {
                  optionRefs.current[index] = el;
                }}
                className="custom-model-item"
                role="option"
                aria-selected={isSelected}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => {
                  setSelectedModel(model.id);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedModel(model.id);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }
                }}
              >
                <span className="custom-model-item__icon" style={{ color: getCustomControlIconColor(isDark) }}>
                  <Icon name={model.iconName} />
                </span>
                <div className="custom-model-item__content">
                  <Box fontSize="body-m">
                    <span style={{ fontWeight: 500, color: getCustomControlTextColor(isDark) }}>{model.text}</span>
                  </Box>
                  {model.secondaryText && (
                    <Box fontSize="body-s">
                      <span style={{ color: getCustomControlSecondaryTextColor(isDark) }}>{model.secondaryText}</span>
                    </Box>
                  )}
                </div>
                {isSelected && (
                  <span className="custom-model-item__check">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      }
    />
  );
}

export default function CustomChat({ notifications }: { notifications?: React.ReactNode }) {
  const [navigationOpen, setNavigationOpen] = useState(true);
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
    clearStreamingFlag,
    hasStartedChat,
    regenerateResponse,
    stopResponse,
    resetChat,
  } = useChat({
    streamingReveal: true,
    // Custom-demo-only extra (sortable comparison table), kept out of the default demo via the composable seam.
    extraResponses: [comparisonTableResponse],
    extraDemoPrompts: [comparisonTableDemoPrompt],
  });

  const isDark = useDarkMode();

  // The custom primary-action slot replaces the built-in send button, so submit the current tokens directly.
  const handleSend = () => {
    onPromptSend({ detail: { value: tokensToDisplayText(tokens), tokens } } as Parameters<
      NonNullable<PromptInputProps['onAction']>
    >[0]);
  };

  const promptInput = (
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
      fileInputAriaLabel="Add files"
      style={getCustomPromptInputStyle(isDark)}
      customPrimaryAction={
        isGenAiResponseLoading ? undefined : (
          <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
            <ModelSelectorDropdown isDark={isDark} />
            <Button variant="icon" iconName="arrow-right" ariaLabel="Send message" onClick={handleSend} />
          </SpaceBetween>
        )
      }
      secondaryActionsExtra={<ToolsDropdown isDark={isDark} />}
    />
  );

  const footer = (
    <Box color="text-body-secondary" textAlign="center" margin={{ top: 'xs' }} fontSize="body-s">
      Use of this service is subject to the{' '}
      <Link href="#" external variant="primary" fontSize="inherit">
        AWS Responsible AI Policy
      </Link>
      .
    </Box>
  );

  // Landing page (before first message).
  if (!hasStartedChat) {
    return (
      <AppLayoutToolbar
        navigation={<CustomNavigation onNewChat={resetChat} />}
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        navigationWidth={360}
        toolsHide
        notifications={notifications}
        content={
          <div className="custom-landing">
            <div className="custom-landing__spacer" />

            <div className="custom-landing__hero">
              <div className="custom-landing__icon">
                <Icon name="gen-ai" size="big" />
              </div>
              <h1 className="custom-landing__heading">How can I help you today?</h1>
              <Box color="text-body-secondary" fontSize="body-m" textAlign="center">
                Ask about your AWS resources, costs, and architecture.
              </Box>
            </div>

            <div className="custom-landing__input">
              {promptInput}
              {footer}
            </div>

            <div className="custom-landing__spacer" />
          </div>
        }
      />
    );
  }

  // Chat view (after first message).
  return (
    <AppLayoutToolbar
      navigation={<CustomNavigation onNewChat={resetChat} />}
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      navigationWidth={360}
      toolsHide
      notifications={notifications}
      content={
        <div className="custom-chat">
          <div className="custom-chat__scroll" ref={messagesContainerRef}>
            <div className="custom-chat__messages">
              <Messages
                messages={messages}
                setShowFeedbackDialog={setShowFeedbackDialog}
                addMessage={addMessage}
                clearStreamingFlag={clearStreamingFlag}
                customThemeActive={true}
                onRegenerate={regenerateResponse}
                avatarStyleGenAi={getCustomAvatarStyleGenAi(isDark)}
                avatarStyleUser={getCustomAvatarStyleUser(isDark)}
                chatBubbleStyleIncoming={getCustomChatBubbleStyleIncoming(isDark)}
                chatBubbleStyleOutgoing={getCustomChatBubbleStyleOutgoing(isDark)}
              />
            </div>
          </div>

          <div className="custom-chat__input">
            {promptInput}
            {footer}
          </div>
        </div>
      }
    />
  );
}
