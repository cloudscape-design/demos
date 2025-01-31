// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import FileDropzone, { useFilesDragging } from '@cloudscape-design/components/file-dropzone';
import FileInput from '@cloudscape-design/components/file-input';
import FileTokenGroup from '@cloudscape-design/components/file-token-group';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import Link from '@cloudscape-design/components/link';
import PromptInput from '@cloudscape-design/components/prompt-input';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { isVisualRefresh } from '../../common/apply-mode';
import { FittedContainer, ScrollableContainer } from './common-components';
import {
  getInvalidPromptResponse,
  getLoadingMessage,
  INITIAL_MESSAGES,
  Message,
  VALID_PROMPTS,
  validLoadingPrompts,
} from './config';
import Messages from './messages';

import '../../styles/chat.scss';

export default function Chat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [prompt, setPrompt] = useState('');
  const [isGenAiResponseLoading, setIsGenAiResponseLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageContent = messages[messages.length - 1].content;
  const [files, setFiles] = useState<File[]>([]);

  const { areFilesDragging } = useFilesDragging();

  useEffect(() => {
    // Scroll to the bottom to show the new/latest message
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 0);
  }, [lastMessageContent]);

  const onPromptSend = ({ detail: { value } }: { detail: { value: string } }) => {
    if (!value || value.length === 0 || isGenAiResponseLoading) {
      return;
    }

    const newMessage: Message = {
      type: 'chat-bubble',
      authorId: 'user-jane-doe',
      content: value,
      timestamp: new Date().toLocaleTimeString(),
      files,
    };

    let fileValue = files;

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setPrompt('');
    setFiles([]);

    const waitTimeBeforeLoading = 300;

    // Show loading state
    setTimeout(() => {
      setIsGenAiResponseLoading(true);
      setMessages(prevMessages => [...prevMessages, getLoadingMessage()]);
    }, waitTimeBeforeLoading);

    const lowerCasePrompt = value.toLowerCase();

    const isLoadingPrompt = validLoadingPrompts.includes(lowerCasePrompt);

    // The loading state will be shown for 4 seconds for loading prompt and 1.5 seconds for rest of the prompts
    const waitTimeBeforeResponse = isLoadingPrompt ? 4000 : 1500;

    // Send Gen-AI response, replacing the loading chat bubble

    setTimeout(() => {
      const validPrompt =
        fileValue.length > 0
          ? VALID_PROMPTS.find(({ prompt }) => prompt.includes('file'))
          : VALID_PROMPTS.find(({ prompt }) => prompt.includes(lowerCasePrompt));

      setMessages(prevMessages => {
        const response = validPrompt ? validPrompt.getResponse() : getInvalidPromptResponse();

        prevMessages.splice(prevMessages.length - 1, 1, response);
        return prevMessages;
      });
      setIsGenAiResponseLoading(false);
      fileValue = [];
    }, waitTimeBeforeResponse + waitTimeBeforeLoading);
  };

  return (
    <div className={`chat-container ${!isVisualRefresh && 'classic'}`}>
      {showAlert && (
        <Alert dismissible statusIconAriaLabel="Info" onDismiss={() => setShowAlert(false)}>
          This demo showcases how to use generative AI components to build a generative AI chat. The interactions and
          functionality are limited.
          <div>
            1. To see how an incoming response from generative AI is displayed, ask "Show a loading state example".
          </div>
          <div>2. To see an error alert that appears when something goes wrong, ask "Show an error state example".</div>
        </Alert>
      )}

      <FittedContainer>
        <Container
          header={<Header variant="h3">Generative AI chat</Header>}
          fitHeight
          disableContentPaddings
          footer={
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
              {/* During loading, action button looks enabled but functionality is disabled. */}
              {/* This will be fixed once prompt input receives an update where the action button can receive focus while being disabled. */}
              {/* In the meantime, changing aria labels of prompt input and action button to reflect this. */}
              <PromptInput
                onChange={({ detail }) => setPrompt(detail.value)}
                onAction={onPromptSend}
                value={prompt}
                actionButtonAriaLabel={isGenAiResponseLoading ? 'Send message button - suppressed' : 'Send message'}
                actionButtonIconName="send"
                ariaLabel={isGenAiResponseLoading ? 'Prompt input - suppressed' : 'Prompt input'}
                placeholder="Ask a question"
                autoFocus
                disableSecondaryActionsPaddings
                secondaryActions={
                  <Box padding={{ left: 'xxs', top: 'xs' }}>
                    <FileInput
                      variant="icon"
                      multiple={true}
                      value={files}
                      onChange={({ detail }) => setFiles(prev => [...prev, ...detail.value])}
                    />
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
                        onDismiss={({ detail }) =>
                          setFiles(files => files.filter((_, index) => index !== detail.fileIndex))
                        }
                        alignment="horizontal"
                        showFileSize={true}
                        showFileLastModified={true}
                        showFileThumbnail={true}
                        i18nStrings={{
                          removeFileAriaLabel: () => 'Remove file',
                          limitShowFewer: 'Show fewer files',
                          limitShowMore: 'Show more files',
                          errorIconAriaLabel: 'Error',
                          warningIconAriaLabel: 'Warning',
                        }}
                      />
                    )
                  )
                }
              />
            </FormField>
          }
        >
          <ScrollableContainer ref={messagesContainerRef}>
            <Messages messages={messages} />
          </ScrollableContainer>
        </Container>
      </FittedContainer>
    </div>
  );
}
