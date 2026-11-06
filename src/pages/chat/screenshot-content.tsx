// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import CodeView from '@cloudscape-design/code-view/code-view';
import jsonHighlight from '@cloudscape-design/code-view/highlight/json';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import ItemCard from '@cloudscape-design/components/item-card';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextContent from '@cloudscape-design/components/text-content';

import { createMessage, Message } from '../chat-common/config';
import { Citation, citationSources } from '../chat-common/scripted-responses';
import SuggestionPrompts from '../chat-common/suggestion-prompts';

const followUpItems = [
  { id: 'more-sources', text: 'Show sources and citations' },
  { id: 'more-code', text: 'Give me another code example' },
];

// Kept short (a handful of lines) so the artifact doesn't dominate the screenshot's vertical space.
const bucketConfigSnippet = `{
  "BucketName": "my-app-assets",
  "VersioningConfiguration": { "Status": "Enabled" },
  "PublicAccessBlockConfiguration": { "BlockPublicAcls": true },
  "BucketEncryption": { "SSEAlgorithm": "aws:kms" }
}`;

// Screenshot mode renders a static snapshot, so selecting a support prompt doesn't need to do anything.
const noop = () => {
  /* static content — no interaction needed */
};

// A fixed set of messages for screenshot mode (`?screenshot=true`), covering the building blocks of the
// Cloudscape generative AI chat pattern (citations, sources, feedback actions, code artifacts, support
// prompts) in a single AI turn, since the conversation itself doesn't need to be realistic for a screenshot.
export const screenshotMessages: Message[] = [
  createMessage({
    type: 'chat-bubble',
    authorId: 'user-jane-doe',
    content: 'How can I create an S3 bucket configuration?',
    timestamp: '10:00:00 AM',
  }),
  createMessage({
    type: 'chat-bubble',
    authorId: 'gen-ai',
    content: (
      <TextContent>
        <p>
          Creating a configuration for Amazon S3 involves setting up a bucket and configuring its properties{' '}
          <Citation index={1} />. Here's a step-by-step guide:
        </p>
        <ol>
          <li>Sign in to the AWS Management Console</li>
          <li>Access the Amazon S3 console</li>
          <li>Create a new S3 bucket</li>
          <li>
            Configure bucket settings <Citation index={2} />
          </li>
          <li>Review and create</li>
        </ol>
        <Box padding={{ top: 'xs' }}>
          <ExpandableSection headerText="Sources" defaultExpanded>
            <SpaceBetween size="s">
              {citationSources.slice(0, 2).map((source, i) => (
                <div key={source.href}>
                  <Link href={source.href} external variant="primary">
                    [{i + 1}] {source.title}
                  </Link>
                  <Box fontSize="body-s" color="text-body-secondary">
                    {source.description} — {source.datePublished}
                  </Box>
                </div>
              ))}
            </SpaceBetween>
          </ExpandableSection>
        </Box>
      </TextContent>
    ),
    timestamp: '10:00:05 AM',
    actions: 'feedback',
    contentToCopy:
      'Creating a configuration for Amazon S3 involves setting up a bucket and configuring its properties. Steps: sign in to the console, access S3, create a bucket, configure settings, review and create.',
  }),
  createMessage({
    type: 'chat-bubble',
    authorId: 'gen-ai',
    content: "Here's a sample bucket configuration with versioning, blocked public access, and KMS encryption:",
    timestamp: '10:00:06 AM',
    hideAvatar: true,
    actions: 'feedback',
    contentToCopy: "Here's a sample bucket configuration with versioning, blocked public access, and KMS encryption:",
    supportPrompts: <SuggestionPrompts items={followUpItems} onSelect={noop} />,
  }),
  createMessage({
    type: 'artifact',
    content: (
      <ItemCard
        variant="embedded"
        header={
          <Box fontSize="heading-xs" fontWeight="bold">
            JSON
          </Box>
        }
        actions={
          <SpaceBetween direction="horizontal" size="xxs">
            <Button iconName="download" variant="icon" ariaLabel="Download code" />
            <CopyToClipboard
              copyButtonText="Copy"
              copyErrorText="Code failed to copy"
              copySuccessText="Code copied"
              textToCopy={bucketConfigSnippet}
              variant="icon"
            />
          </SpaceBetween>
        }
      >
        <CodeView content={bucketConfigSnippet} highlight={jsonHighlight} ariaLabel="S3 bucket configuration JSON" />
      </ItemCard>
    ),
  }),
];
