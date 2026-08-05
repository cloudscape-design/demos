// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components-core/box';
import FileDropzone, { useFilesDragging } from '@cloudscape-design/components-core/file-dropzone';
import FileInput from '@cloudscape-design/components-core/file-input';
import FileTokenGroup from '@cloudscape-design/components-core/file-token-group';
import Icon from '@cloudscape-design/components-core/icon';
import PromptInput, { PromptInputProps } from '@cloudscape-design/components-core/prompt-input';
import SpaceBetween from '@cloudscape-design/components-core/space-between';

import { fileTokenGroupI18nStrings, menus, promptInputI18nStrings, tokensToDisplayText } from './use-chat';

interface ChatPromptInputProps {
  tokens: readonly PromptInputProps.InputToken[];
  setTokens: (tokens: readonly PromptInputProps.InputToken[]) => void;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isGenAiResponseLoading: boolean;
  promptInputRef: React.RefObject<PromptInputProps.Ref>;
  onPromptSend: NonNullable<PromptInputProps['onAction']>;
  onMenuItemSelect: PromptInputProps['onMenuItemSelect'];
  stopResponse: () => void;
  placeholder: string;
  /** Accessible label for the file-upload trigger (wording differs per theme). */
  fileInputAriaLabel: string;
  /** Optional theme Style API overrides (Custom theme only). */
  style?: PromptInputProps.Style;
  /** Optional primary-action slot content (Custom theme's model selector + mic). */
  customPrimaryAction?: React.ReactNode;
  /** Optional extra controls rendered alongside the file input (Custom theme's Tools dropdown). */
  secondaryActionsExtra?: React.ReactNode;
}

// Shared chat prompt input; theme-specific pieces (placeholder, Style API, action slots) are passed in.
export default function ChatPromptInput({
  tokens,
  setTokens,
  files,
  setFiles,
  isGenAiResponseLoading,
  promptInputRef,
  onPromptSend,
  onMenuItemSelect,
  stopResponse,
  placeholder,
  fileInputAriaLabel,
  style,
  customPrimaryAction,
  secondaryActionsExtra,
}: ChatPromptInputProps) {
  const { areFilesDragging } = useFilesDragging();

  // While a response is in flight the action button doubles as a Stop control.
  const handleAction: NonNullable<PromptInputProps['onAction']> = event => {
    if (isGenAiResponseLoading) {
      stopResponse();
      return;
    }
    onPromptSend(event);
  };

  return (
    <PromptInput
      ref={promptInputRef}
      tokens={tokens}
      menus={menus}
      onChange={({ detail }) => {
        if (detail.tokens) {
          setTokens(detail.tokens);
        }
      }}
      onAction={handleAction}
      onMenuItemSelect={onMenuItemSelect}
      tokensToText={tokensToDisplayText}
      i18nStrings={{
        ...promptInputI18nStrings,
        actionButtonAriaLabel: isGenAiResponseLoading ? 'Stop response' : 'Send message',
      }}
      actionButtonIconName={isGenAiResponseLoading ? 'stop-circle' : 'send'}
      ariaLabel="Prompt input"
      placeholder={placeholder}
      autoFocus
      maxRows={6}
      maxMenuHeight={300}
      style={style}
      customPrimaryAction={customPrimaryAction}
      disableSecondaryActionsPaddings
      secondaryActions={
        <Box padding={{ left: 'xxs', top: 'xs' }}>
          <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
            <FileInput
              ariaLabel={fileInputAriaLabel}
              variant="icon"
              multiple={true}
              value={files}
              onChange={({ detail }) => setFiles(prev => [...prev, ...detail.value])}
            />
            {secondaryActionsExtra}
          </SpaceBetween>
        </Box>
      }
      secondaryContent={
        areFilesDragging ? (
          <FileDropzone onChange={({ detail }) => setFiles(prev => [...prev, ...detail.value])}>
            <SpaceBetween size="xs" alignItems="center">
              <Icon name="upload" />
              <Box>Drop files here</Box>
            </SpaceBetween>
          </FileDropzone>
        ) : (
          files.length > 0 && (
            <FileTokenGroup
              items={files.map(file => ({ file }))}
              onDismiss={({ detail }) => {
                setFiles(f => f.filter((_, i) => i !== detail.fileIndex));
                if (files.length === 1) {
                  promptInputRef.current?.focus();
                }
              }}
              limit={3}
              alignment="horizontal"
              showFileThumbnail={true}
              i18nStrings={fileTokenGroupI18nStrings}
            />
          )
        )
      }
    />
  );
}
