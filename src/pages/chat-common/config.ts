// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { FileTokenGroupProps } from '@cloudscape-design/components/file-token-group';

export type Message = ChatBubbleMessage | AlertMessage | ArtifactMessage;

type ChatBubbleMessage = {
  id?: string;
  type: 'chat-bubble';
  authorId: string;
  content: React.ReactNode;
  timestamp: string;
  actions?: 'feedback' | 'code-view';
  hideAvatar?: boolean;
  avatarLoading?: boolean;
  showLoadingBar?: boolean;
  // Overrides the default "Generating a response" text shown in the loading placeholder bubble.
  loadingLabel?: string;
  files?: File[];
  supportPrompts?: React.ReactNode;
  showFeedbackDialog?: boolean;
  contentToCopy?: string;
  streaming?: boolean;
};

type AlertMessage = {
  id?: string;
  type: 'alert';
  content: React.ReactNode;
  header?: string;
};

// A non-bubble assistant message (artifact preview, consent dialog, card grid) rendered as an indented sibling outside the bubble.
type ArtifactMessage = {
  id?: string;
  type: 'artifact';
  content: React.ReactNode;
};

let nextMessageId = 0;
/** Creates a Message with a stable unique ID. */
export function createMessage<T extends Omit<Message, 'id'>>(msg: T): T & { id: string } {
  return { ...msg, id: `msg-${nextMessageId++}` };
}

export type AuthorAvatarProps = {
  type: 'user' | 'gen-ai';
  name: string;
  initials?: string;
  loading?: boolean;
};

export const AUTHORS: Record<string, AuthorAvatarProps> = {
  'user-jane-doe': { type: 'user', name: 'Jane Doe', initials: 'JD' },
  'gen-ai': { type: 'gen-ai', name: 'Generative AI assistant' },
};

// Loading placeholder shown while a scripted response is in flight; replaced in-place when it resolves.
export const getLoadingMessage = () =>
  createMessage({
    type: 'chat-bubble' as const,
    authorId: 'gen-ai',
    content: '',
    timestamp: new Date().toLocaleTimeString(),
    avatarLoading: true,
    showLoadingBar: true,
  });

// i18n strings

export const fileTokenGroupI18nStrings: FileTokenGroupProps.I18nStrings = {
  removeFileAriaLabel: index => `Remove file ${index + 1}`,
  limitShowFewer: 'Show fewer files',
  limitShowMore: 'Show more files',
  errorIconAriaLabel: 'Error',
  warningIconAriaLabel: 'Warning',
};
