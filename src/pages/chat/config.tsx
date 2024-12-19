// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import CodeView from '@cloudscape-design/code-view/code-view';
import typescriptHighlight from '@cloudscape-design/code-view/highlight/typescript';
import Box from '@cloudscape-design/components/box';
import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Link from '@cloudscape-design/components/link';
import Popover from '@cloudscape-design/components/popover';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CodeViewActions } from './common-components';

export type Message = ChatBubbleMessage | AlertMessage;

type ChatBubbleMessage = {
  type: 'chat-bubble';
  authorId: string;
  content: React.ReactNode;
  timestamp: string;
  actions?: React.ReactNode;
  hideAvatar?: boolean;
  avatarLoading?: boolean;
};

type AlertMessage = {
  type: 'alert';
  content: React.ReactNode;
  header?: string;
};

// added as function so that timestamp is evaluated when function is called
export const getInvalidPromptResponse = (): Message => ({
  type: 'chat-bubble',
  authorId: 'gen-ai',
  content: (
    <>
      The interactions and functionality of this demo are limited.
      <div>1. To see how an incoming response from generative AI is displayed, ask "Show a loading state example".</div>
      <div>2. To see an error alert that appears when something goes wrong, ask "Show an error state example".</div>
    </>
  ),
  timestamp: new Date().toLocaleTimeString(),
});

export const getLoadingMessage = (): Message => ({
  type: 'chat-bubble',
  authorId: 'gen-ai',
  content: <Box color="text-status-inactive">Generating a response</Box>,
  timestamp: new Date().toLocaleTimeString(),
  avatarLoading: true,
});

const getLoadingStateResponseMessage = (): Message => ({
  type: 'chat-bubble',
  authorId: 'gen-ai',
  content: 'That was the loading state. To see the loading state again, ask "Show a loading state example".',
  timestamp: new Date().toLocaleTimeString(),
  avatarLoading: false,
});

const getErrorStateResponseMessage = (): Message => ({
  type: 'alert',
  header: 'Access denied',
  content: (
    <SpaceBetween size="s">
      <span>
        You don't have permission to [AWSS3:ListBuckets]. To request access, copy the following text and send it to your
        AWS administrator.{' '}
        <Link href="#" external variant="primary">
          Learn more about troubleshooting access denied errors.
        </Link>
      </span>
      <div className="access-denied-alert-wrapper">
        <div className="access-denied-alert-wrapper__box">
          <SpaceBetween size="xxxs">
            <Box variant="code">
              <div>User: [arn:aws:iam::123456789000:user/awsgenericuser]</div>
              <div>Service: [AWSS3]</div>
              <div>Action: [ListBuckets]</div>
              <div>On resource(s): [arn:aws:S3:us-east-1:09876543211234567890]</div>
              <div>Context: [no identity-based policy allows the AWSS3:ListBuckets action.]</div>
            </Box>
          </SpaceBetween>
        </div>
        <div>
          <CopyToClipboard
            copyButtonText="Copy"
            copyErrorText="Text failed to copy"
            copySuccessText="Text copied"
            textToCopy={`User: [arn:aws:iam::123456789000:user/awsgenericuser]
Service: [AWSS3]
Action: [ListBuckets]
On resource(s): [arn:aws:S3:us-east-1:09876543211234567890]
Context: [no identity-based policy allows the AWSS3:ListBuckets action.]
`}
          />
        </div>
      </div>
    </SpaceBetween>
  ),
});

type ValidPromptType = {
  prompt: Array<string>;
  getResponse: () => Message;
};

export const validLoadingPrompts = ['show a loading state example', 'loading state', 'loading'];

export const VALID_PROMPTS: Array<ValidPromptType> = [
  {
    prompt: validLoadingPrompts,
    getResponse: getLoadingStateResponseMessage,
  },
  {
    prompt: ['show an error state example', 'error state', 'error'],
    getResponse: getErrorStateResponseMessage,
  },
];

// Needed only for the existing messages upon page load.
function getTimestampMinutesAgo(minutesAgo: number) {
  const d = new Date();
  d.setMinutes(d.getMinutes() - minutesAgo);

  return d.toLocaleTimeString();
}

export type AuthorAvatarProps = {
  type: 'user' | 'gen-ai';
  name: string;
  initials?: string;
  loading?: boolean;
};
type AuthorsType = {
  [key: string]: AuthorAvatarProps;
};
export const AUTHORS: AuthorsType = {
  'user-jane-doe': { type: 'user', name: 'Jane Doe', initials: 'JD' },
  'gen-ai': { type: 'gen-ai', name: 'Generative AI assistant' },
};

const CitationPopover = ({ count, href }: { count: number; href: string }) => (
  <Box color="text-status-info" display="inline">
    <Popover
      header="Source"
      content={
        <Link href={href} external variant="primary">
          {href}
        </Link>
      }
      position="right"
    >
      [{count}]
    </Popover>
  </Box>
);

export const INITIAL_MESSAGES: Array<Message> = [
  {
    type: 'chat-bubble',
    authorId: 'user-jane-doe',
    content: 'What can I do with Amazon S3?',
    timestamp: getTimestampMinutesAgo(10),
  },
  {
    type: 'chat-bubble',
    authorId: 'gen-ai',
    content:
      'Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data, at any time, from anywhere. Using this service, you can easily build applications that make use of cloud native storage. Since Amazon S3 is highly scalable and you only pay for what you use, you can start small and grow your application as you wish, with no compromise on performance or reliability.',
    timestamp: getTimestampMinutesAgo(9),
  },
  {
    type: 'chat-bubble',
    authorId: 'user-jane-doe',
    content: 'How can I create an S3 bucket configuration?',
    timestamp: getTimestampMinutesAgo(8),
  },
  {
    type: 'chat-bubble',
    authorId: 'gen-ai',
    content: (
      <>
        Creating a configuration for Amazon S3 involves setting up a bucket and configuring its properties{' '}
        <CitationPopover count={1} href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html" />
        . Here's a step-by-step guide to help you create an S3 configuration:
        <div>1. Sign in to AWS Management Console</div>
        <div>2. Access Amazon S3 console</div>
        <div>3. Create a new S3 bucket</div>
        <div>
          4. Configure bucket settings{' '}
          <CitationPopover
            count={2}
            href="https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-S3-source.html"
          />
        </div>
        <div>5. Review and create</div>
        <Box padding={{ top: 'xs' }}>
          <ExpandableSection headerText="Sources">
            <div>
              <Link
                href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html"
                external
                variant="primary"
              >
                [1] Getting started with Amazon S3 - Amazon Simple Storage Service
              </Link>
            </div>
            <div>
              <Link
                href="https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-S3-source.html"
                external
                variant="primary"
              >
                [2] Understanding configurations stored in Amazon S3 - AWS AppConfig
              </Link>
            </div>
            <div>
              <Link
                href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html"
                external
                variant="primary"
              >
                [3] Tutorial: Configuring a static website on Amazon S3 - Amazon Simple Storage Service
              </Link>
            </div>
          </ExpandableSection>
        </Box>
      </>
    ),
    timestamp: getTimestampMinutesAgo(7),
  },
  {
    type: 'chat-bubble',
    authorId: 'user-jane-doe',
    content: 'Give me an example of a Typescript code block.',
    timestamp: getTimestampMinutesAgo(6),
  },
  {
    type: 'chat-bubble',
    authorId: 'gen-ai',
    content: "Here's a simple TypeScript code example that implements the 'Hello, World!' functionality:",
    timestamp: getTimestampMinutesAgo(5),
  },
  {
    type: 'chat-bubble',
    authorId: 'gen-ai',
    content: (
      <CodeView
        content={`// This is the main function that will be executed when the script runs
function main(): void {
  // Use console.log to print "Hello, World!" to the console
  console.log("Hello, World!");
}
// Call the main function to execute the program
main();`}
        highlight={typescriptHighlight}
      />
    ),
    actions: <CodeViewActions />,
    timestamp: getTimestampMinutesAgo(4),
    hideAvatar: true,
  },
];
