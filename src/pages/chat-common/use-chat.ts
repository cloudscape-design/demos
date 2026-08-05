// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useCallback, useEffect, useRef, useState } from 'react';

import { PromptInputProps } from '@cloudscape-design/components/prompt-input';

import { createMessage, fileTokenGroupI18nStrings, getLoadingMessage, Message } from './config';
import { asyncCallback } from './pending-callbacks';
import { buildScriptedResponse, DemoPrompt, ScriptedResponse } from './scripted-responses';

export { fileTokenGroupI18nStrings };

export const menus: PromptInputProps.MenuDefinition[] = [
  {
    id: 'commands',
    trigger: '/',
    useAtStart: true,
    filteringType: 'auto',
    empty: 'No commands found',
    options: [
      {
        label: 'Modes',
        // Pinned mode tokens stay sticky across submissions; the scripted matcher keys off any pinned reference token.
        options: [
          {
            value: 'developer-mode',
            label: 'Developer Mode',
            description: 'Bias responses toward code examples and technical depth',
            iconName: 'script',
          },
          {
            value: 'concise-mode',
            label: 'Concise Mode',
            description: 'Short, direct answers without elaboration',
            iconName: 'status-positive',
          },
          {
            value: 'creative-mode',
            label: 'Creative Mode',
            description: 'Looser tone with more illustrative examples',
            iconName: 'gen-ai',
          },
        ],
      },
      {
        label: 'Quick actions',
        options: [
          {
            value: 'clear',
            label: 'Clear conversation',
            description: 'Start a new conversation',
            iconName: 'remove',
          },
          {
            value: 'help',
            label: 'Help',
            description: 'Show available commands and shortcuts',
            iconName: 'status-info',
          },
        ],
      },
    ],
  },
  {
    id: 'references',
    trigger: '@',
    filteringType: 'auto',
    empty: 'No references found',
    options: [
      {
        label: 'Files',
        options: [
          {
            value: 's3-config.json',
            label: 's3-config.json',
            description: 'S3 bucket configuration',
            iconName: 'file',
          },
          {
            value: 'lambda-handler.py',
            label: 'lambda-handler.py',
            description: 'Lambda function handler',
            iconName: 'file',
          },
          {
            value: 'cloudformation.yaml',
            label: 'cloudformation.yaml',
            description: 'CloudFormation template',
            iconName: 'file',
          },
        ],
      },
      {
        label: 'Resources',
        options: [
          { value: 'my-s3-bucket', label: 'my-s3-bucket', description: 'Amazon S3 bucket', iconName: 'folder' },
          {
            value: 'api-gateway-prod',
            label: 'api-gateway-prod',
            description: 'API Gateway (production)',
            iconName: 'globe',
          },
        ],
      },
    ],
  },
];

export const promptInputI18nStrings: PromptInputProps.I18nStrings = {
  actionButtonAriaLabel: 'Send message',
  menuLoadingText: 'Loading options',
  menuFinishedText: 'All options loaded',
  menuErrorText: 'Failed to load options',
  menuErrorIconAriaLabel: 'Error',
  menuRecoveryText: 'Retry',
  tokenInsertedAriaLabel: (token: { label?: string; value: string }) => `${token.label || token.value} inserted`,
  tokenPinnedAriaLabel: (token: { label?: string; value: string }) => `${token.label || token.value} pinned as mode`,
  tokenRemovedAriaLabel: (token: { label?: string; value: string }) => `${token.label || token.value} removed`,
};

/** Converts tokens to display text (using labels for references). */
export function tokensToDisplayText(tokens: readonly PromptInputProps.InputToken[]): string {
  const parts = tokens.map(token => {
    if (token.type === 'reference') {
      return token.label;
    }
    if (token.type === 'trigger') {
      return token.triggerChar + token.value;
    }
    return token.value;
  });

  // Insert a space at a reference boundary when neither side supplies whitespace.
  return parts.reduce((acc, current, i) => {
    if (i === 0) {
      return current;
    }
    const prevToken = tokens[i - 1];
    const currentToken = tokens[i];
    const isBoundary = prevToken.type === 'reference' || currentToken.type === 'reference';
    const needsSpace = isBoundary && !/\s$/.test(acc) && !/^\s/.test(current);
    return needsSpace ? `${acc} ${current}` : acc + current;
  }, '');
}

interface UseChatOptions {
  // When true, completed prose messages are flagged `streaming` for a visual reveal; false finalises immediately.
  streamingReveal?: boolean;
  // Demo-specific scripted responses matched ahead of the shared registry. Pass a stable reference.
  extraResponses?: ScriptedResponse[];
  // Demo-specific catalogue links appended to the greeting/fallback lists.
  extraDemoPrompts?: DemoPrompt[];
}

const LOADING_DELAY_MS = 300;
const RESPONSE_DELAY_MS = 1500;

// Stable empty defaults so callers that pass no extras don't churn the dispatch callback's deps.
const NO_EXTRA_RESPONSES: ScriptedResponse[] = [];
const NO_EXTRA_DEMO_PROMPTS: DemoPrompt[] = [];

export function useChat({
  streamingReveal = false,
  extraResponses = NO_EXTRA_RESPONSES,
  extraDemoPrompts = NO_EXTRA_DEMO_PROMPTS,
}: UseChatOptions = {}) {
  const [isGenAiResponseLoading, setIsGenAiResponseLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const promptInputRef = useRef<PromptInputProps.Ref>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tokens, setTokens] = useState<readonly PromptInputProps.InputToken[]>([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  // Abort flag for the "stop" action; inspected between async phases to tear down the loading bubble on cancel.
  const abortRef = useRef(false);

  // Swaps the loading placeholder for the scripted response once its delay elapses (shared by the slash-command and submit paths).
  const dispatchScriptedResponse = useCallback(
    (prompt: string, hasPinnedMode: boolean, sendAsUser: (text: string) => void) => {
      // Reset the abort flag so a previous stop doesn't carry over to the next prompt.
      abortRef.current = false;
      asyncCallback(() => {
        if (abortRef.current) {
          return;
        }
        setIsGenAiResponseLoading(true);
        const timestamp = new Date().toLocaleTimeString();

        // Resolve the response up front to tailor the placeholder bubble via `loadingHint`.
        const response = buildScriptedResponse({
          prompt,
          hasPinnedMode,
          timestamp,
          sendAsUser,
          extraResponses,
          extraDemoPrompts,
          // Reveal a follow-up assistant bubble once a live flow (e.g. Thinking) finishes, so it carries the
          // standard response actions rather than being folded into the flow component.
          appendMessage: (message: Message) =>
            setMessages(prev => [...prev, message.id ? message : createMessage(message)]),
          // Drop content into the prompt input without sending — used by editable support prompts.
          setPromptInputText: (text: string) => {
            const ref = promptInputRef.current;
            if (!ref) {
              return;
            }
            ref.focus();
            ref.insertText(text, 0);
          },
        });
        const {
          content,
          contentToCopy,
          extraMessages: rawExtraMessages,
          supportPrompts,
          loadingHint,
          hideMainBubbleActions,
          disableStreaming,
        } = response;

        // Ensure all extra messages carry stable IDs for React reconciliation.
        const extraMessages = rawExtraMessages.map(m => (m.id ? m : createMessage(m)));

        // Responses that render additional content (artifact cards like ItemCard/ActionCard) omit the trailing
        // support prompt group, so the suggestions don't compete with the card's own actions.
        const hasArtifactContent = extraMessages.some(m => m.type === 'artifact');
        const trailingSupportPrompts = hasArtifactContent ? undefined : supportPrompts;

        const placeholder: Message = loadingHint?.useAvatarLoading
          ? createMessage({
              type: 'chat-bubble',
              authorId: 'gen-ai',
              content: '',
              timestamp,
              showLoadingBar: false,
              avatarLoading: true,
              loadingLabel: loadingHint?.loadingLabel,
            })
          : { ...getLoadingMessage(), loadingLabel: loadingHint?.loadingLabel };

        setMessages(prev => [...prev, placeholder]);

        asyncCallback(() => {
          if (abortRef.current) {
            // Stop was triggered between phases — bail; stopResponse already swapped in an interrupted marker.
            return;
          }
          setMessages(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.type === 'chat-bubble') {
              if (!content && extraMessages.length > 0) {
                const firstExtra = extraMessages[0];
                if (firstExtra.type === 'alert' || firstExtra.type === 'artifact') {
                  // Alert/artifact first — collapse the loading bubble; artifacts render as their own non-bubble surfaces.
                  updated.splice(updated.length - 1, 1, ...extraMessages);
                } else {
                  // Non-alert extras (e.g. code-view bubble): replace placeholder with the first extra, append the rest.
                  const isCodeBlock = firstExtra.type === 'chat-bubble' && firstExtra.actions === 'code-view';
                  updated[updated.length - 1] = {
                    ...last,
                    ...firstExtra,
                    showLoadingBar: false,
                    avatarLoading: false,
                    streaming: streamingReveal && !isCodeBlock,
                  };
                  for (let i = 1; i < extraMessages.length; i++) {
                    updated.push(extraMessages[i]);
                  }
                }
              } else {
                // Has prose — fill the placeholder and append any extras.
                updated[updated.length - 1] = {
                  ...last,
                  content,
                  contentToCopy,
                  showLoadingBar: false,
                  avatarLoading: false,
                  // `hideMainBubbleActions` (e.g. Thinking) suppresses the main bubble toolbar; the flow owns its affordances.
                  actions: hideMainBubbleActions ? undefined : 'feedback',
                  streaming: streamingReveal && !disableStreaming,
                  supportPrompts: extraMessages.length > 0 ? undefined : trailingSupportPrompts,
                };
                for (const extra of extraMessages) {
                  updated.push(extra);
                }
              }

              // Anchor support prompts to the last chat bubble so they sit beneath the freshest assistant message.
              if (trailingSupportPrompts) {
                for (let i = updated.length - 1; i >= 0; i--) {
                  const msg = updated[i];
                  if (msg.type === 'chat-bubble' && !msg.supportPrompts) {
                    updated[i] = { ...msg, supportPrompts: trailingSupportPrompts };
                    break;
                  }
                }
              }
            }
            return updated;
          });

          setIsGenAiResponseLoading(false);
        }, loadingHint?.delayMs ?? RESPONSE_DELAY_MS);
      }, LOADING_DELAY_MS);
    },
    [streamingReveal, extraResponses, extraDemoPrompts],
  );

  // Send text as a user message and route it to the scripted set. Ref-backed so builders can dispatch follow-ups without stale closures.
  const sendAsUserRef = useRef<(text: string) => void>(() => {
    /* no-op until wired below */
  });

  const sendAsUser = useCallback(
    (text: string) => {
      if (isGenAiResponseLoading) {
        return;
      }
      const userMessage: Message = createMessage({
        type: 'chat-bubble',
        authorId: 'user-jane-doe',
        content: text,
        timestamp: new Date().toLocaleTimeString(),
      });
      setMessages(prev => [...prev, userMessage]);
      setHasStartedChat(true);
      promptInputRef.current?.focus();
      // Programmatic follow-ups never carry a pinned mode token, so pass `false`.
      dispatchScriptedResponse(text, false, (followup: string) => sendAsUserRef.current(followup));
    },
    [isGenAiResponseLoading, dispatchScriptedResponse],
  );

  useEffect(() => {
    sendAsUserRef.current = sendAsUser;
  }, [sendAsUser]);

  // Response regeneration & stop: regenerate strips from the assistant message forward and re-dispatches the triggering prompt; stop flips the abort flag.
  const regenerateResponse = useCallback(
    (assistantIndex: number) => {
      // Walk back to the triggering user bubble; bail if none.
      let promptText: string | null = null;
      for (let i = assistantIndex - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.type === 'chat-bubble' && msg.authorId === 'user-jane-doe') {
          promptText = typeof msg.content === 'string' ? msg.content : (msg.contentToCopy ?? '');
          break;
        }
      }
      if (promptText === null) {
        return;
      }

      // Strip from the assistant message forward, then re-dispatch; the trim commits before the loading bubble appends.
      setMessages(prev => prev.slice(0, assistantIndex));
      dispatchScriptedResponse(promptText, false, (followup: string) => sendAsUserRef.current(followup));
    },
    [messages, dispatchScriptedResponse],
  );

  const stopResponse = useCallback(() => {
    if (!isGenAiResponseLoading) {
      return;
    }
    abortRef.current = true;
    setMessages(prev => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last && last.type === 'chat-bubble' && (last.showLoadingBar || last.avatarLoading)) {
        // Replace the loading placeholder with an interrupted-response marker.
        updated[updated.length - 1] = {
          ...last,
          showLoadingBar: false,
          avatarLoading: false,
          content: 'Response stopped by user.',
          contentToCopy: 'Response stopped by user.',
          actions: 'feedback',
        };
      }
      return updated;
    });
    setIsGenAiResponseLoading(false);
  }, [isGenAiResponseLoading]);

  // Message helpers
  const setShowFeedbackDialog = (index: number, show: boolean) => {
    setMessages(prev => {
      const updated = [...prev];
      updated.splice(index, 1, { ...prev[index], showFeedbackDialog: show } as Message);
      return updated;
    });
  };

  const addMessage = (index: number, message: Message) => {
    setMessages(prev => {
      const updated = [...prev];
      updated.splice(index, 0, message.id ? message : createMessage(message));
      return updated;
    });
  };

  const clearStreamingFlag = (index: number) => {
    setMessages(prev => {
      const updated = [...prev];
      if (updated[index] && updated[index].type === 'chat-bubble') {
        updated[index] = { ...updated[index], streaming: false } as Message;
      }
      return updated;
    });
  };

  // Auto-scroll on new messages
  const lastMessageContent = messages[messages.length - 1]?.content;
  useEffect(() => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 0);
  }, [lastMessageContent]);

  // Slash command handler
  const onMenuItemSelect: PromptInputProps['onMenuItemSelect'] = ({ detail }) => {
    if (detail.menuId === 'commands' && detail.option.value === 'clear') {
      setMessages([]);
      setHasStartedChat(false);
      setTokens([]);
      return;
    }
    if (detail.menuId === 'commands' && detail.option.value === 'help') {
      sendAsUser('Help');
      setTokens([]);
      return;
    }
  };

  // Main send handler
  const onPromptSend: PromptInputProps['onAction'] = ({ detail }) => {
    const value = detail.value;
    const currentTokens = detail.tokens;
    if ((!value && files.length === 0) || isGenAiResponseLoading) {
      return;
    }

    const displayText = currentTokens ? tokensToDisplayText(currentTokens) : value;
    const attachedFiles = [...files];

    const newMessage: Message = createMessage({
      type: 'chat-bubble',
      authorId: 'user-jane-doe',
      content: displayText,
      timestamp: new Date().toLocaleTimeString(),
      files: attachedFiles,
    });

    setMessages(prev => [...prev, newMessage]);
    setHasStartedChat(true);

    // Keep pinned reference tokens (e.g. modes) sticky across submissions.
    const pinnedTokens = currentTokens
      ? currentTokens.filter((t): t is PromptInputProps.ReferenceToken => t.type === 'reference' && !!t.pinned)
      : [];
    setTokens(pinnedTokens);
    setFiles([]);

    dispatchScriptedResponse(displayText, pinnedTokens.length > 0, (followup: string) =>
      sendAsUserRef.current?.(followup),
    );
  };

  return {
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
    sendAsUser,
    regenerateResponse,
    stopResponse,
    resetChat: () => {
      abortRef.current = true;
      setIsGenAiResponseLoading(false);
      setMessages([]);
      setHasStartedChat(false);
      setTokens([]);
    },
  };
}
