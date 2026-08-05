// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createPortal } from 'react-dom';

import SupportPromptGroup from '@cloudscape-design/chat-components/support-prompt-group';
import CodeView from '@cloudscape-design/code-view/code-view';
import typescriptHighlight from '@cloudscape-design/code-view/highlight/typescript';
import ActionCard from '@cloudscape-design/components/action-card';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import Input from '@cloudscape-design/components/input';
import ItemCard from '@cloudscape-design/components/item-card';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Modal from '@cloudscape-design/components/modal';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Steps, { StepsProps } from '@cloudscape-design/components/steps';
import TextContent from '@cloudscape-design/components/text-content';

import { Message } from './config';
import SuggestionPrompts from './suggestion-prompts';
// A scripted response's output: the main bubble payload plus any messages appended after it.
export interface MessageOutput {
  content: React.ReactNode;
  contentToCopy?: string;
  extraMessages: Message[];
  supportPrompts?: React.ReactNode;
  // When true the main bubble carries no inline actions (used by e.g. Thinking, whose flow owns its own affordances).
  hideMainBubbleActions?: boolean;
  // When true the streaming (typewriter) reveal is skipped for this response — e.g. a live, self-animating component.
  disableStreaming?: boolean;
  loadingHint?: {
    /** Override the default 1.5s response delay (ms). */
    delayMs?: number;
    /** When true, the loading placeholder uses `avatarLoading` instead of `showLoadingBar`. */
    useAvatarLoading?: boolean;
    /** Overrides the default "Generating a response" text shown in the loading placeholder. */
    loadingLabel?: string;
  };
}
export type ScriptedResponseBuilder = (
  timestamp: string,
  sendAsUser: (text: string) => void,
  setPromptInputText: (text: string) => void,
  // Appends a follow-up assistant message to the end of the conversation (used to reveal a response after a
  // live, self-timed flow such as Thinking completes).
  appendMessage?: (message: Message) => void,
) => MessageOutput;
export interface ScriptedResponse {
  // Case-insensitive substring patterns matched against the prompt; use a RegExp to avoid colliding with other prompts.
  match: Array<string | RegExp>;
  build: ScriptedResponseBuilder;
}
// Follow-up suggestions beneath most replies; each routes back through the matcher.
const trailingPromptItems = [
  { id: 'thinking', text: 'Show thinking' },
  { id: 'artifacts', text: 'Show artifact previews' },
  { id: 'steps', text: 'Show progressive steps' },
];
const buildSupportPrompts = (sendAsUser: (text: string) => void) => (
  <SuggestionPrompts items={trailingPromptItems} onSelect={sendAsUser} />
);
// Support-prompt group listing a multi-variant pattern's variants; each dispatches its follow-up prompt.
const buildVariantChooser = (items: readonly { id: string; text: string }[], sendAsUser: (text: string) => void) => (
  <SuggestionPrompts items={items} onSelect={sendAsUser} />
);
// A demo catalogue entry (one per GenAI pattern) rendered as a clickable link in the greeting and fallback. Demos can append extra entries via `extraDemoPrompts`.
export interface DemoPrompt {
  prompt: string;
  label: string;
}
const DEMO_PROMPTS: DemoPrompt[] = [
  { prompt: 'Show thinking', label: 'Thinking' },
  { prompt: 'Show artifact previews', label: 'Artifact previews' },
  { prompt: 'Show user authorized actions', label: 'User authorized actions' },
  { prompt: 'Show loading states', label: 'Generative AI loading states' },
  { prompt: 'Show error state', label: 'Error state' },
  { prompt: 'Show progressive steps', label: 'Progressive steps' },
  { prompt: 'Show follow-up questions', label: 'Follow-up questions' },
  { prompt: 'Show the model selector', label: 'Model selector' },
  { prompt: 'Show variables', label: 'Variables' },
  { prompt: 'Show support prompts', label: 'Support prompts' },
  { prompt: 'Show in-flow user input', label: 'In-flow user input' },
];
const DemoPromptList = ({
  sendAsUser,
  extraPrompts = [],
}: {
  sendAsUser: (text: string) => void;
  /** Demo-specific catalogue entries appended after the shared list. */
  extraPrompts?: DemoPrompt[];
}) => (
  <ul>
    {[...DEMO_PROMPTS, ...extraPrompts].map(({ prompt, label }) => (
      <li key={prompt}>
        <Link onFollow={() => sendAsUser(prompt)}>{label}</Link>
      </li>
    ))}
  </ul>
);
// Greeting / first-time response.
const getGreetingResponse = (
  _: string,
  sendAsUser: (text: string) => void,
  __: (text: string) => void,
  extraDemoPrompts: DemoPrompt[] = [],
): MessageOutput => ({
  content: (
    <TextContent>
      <p>Hi! I&apos;m your AWS assistant. Here are some things I can help you with:</p>
      <DemoPromptList sendAsUser={sendAsUser} extraPrompts={extraDemoPrompts} />
      <p>
        You can also type <code>/</code> in the prompt input for slash commands and modes, or <code>@</code> to
        reference a file. Files dropped onto the input show as removable tokens.
      </p>
    </TextContent>
  ),
  contentToCopy:
    "Hi! I'm your AWS assistant. I can help with: Thinking, Artifact previews, User authorized actions, Generative AI loading states, Error state, Progressive steps, Follow-up questions, Model selector, Variables, Support prompts, In-flow user input.",
  extraMessages: [],
});
// Default fallback.
const getFallbackResponse = (
  _: string,
  sendAsUser: (text: string) => void,
  __: (text: string) => void,
  extraDemoPrompts: DemoPrompt[] = [],
): MessageOutput => ({
  content: (
    <TextContent>
      <p>I&apos;m not sure how to help with that one yet. Here are some things I can help you with:</p>
      <DemoPromptList sendAsUser={sendAsUser} extraPrompts={extraDemoPrompts} />
    </TextContent>
  ),
  contentToCopy:
    'Here are some things I can help you with: Thinking, Artifact previews, User authorized actions, Generative AI loading states, Error state, Progressive steps, Follow-up questions, Model selector, Variables, Support prompts, In-flow user input.',
  extraMessages: [],
});
// Thinking: artificial reasoning flow with progressive Steps inside a collapsible section.

const THINKING_STEPS = [
  'Analyzing the multi-region deployment requirements',
  'Comparing Route 53 latency-based routing with Global Accelerator',
  'Evaluating DynamoDB global tables against Aurora Global Database',
  'Weighing replication overhead against cross-region consistency',
];
// Per-step dwell time; four steps make the reasoning visibly take a few seconds before it resolves.
const THINKING_STEP_MS = 1100;
const ThinkingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const total = THINKING_STEPS.length;
  const [completed, setCompleted] = React.useState(0);
  const [skipped, setSkipped] = React.useState(false);
  const startRef = React.useRef(Date.now());
  const [finalSeconds, setFinalSeconds] = React.useState<number | null>(null);
  const completedRef = React.useRef(false);
  const done = skipped || completed >= total;
  // Advance one step at a time while reasoning is active.
  React.useEffect(() => {
    if (done) {
      return;
    }
    const timer = setTimeout(() => setCompleted(c => Math.min(total, c + 1)), THINKING_STEP_MS);
    return () => clearTimeout(timer);
  }, [completed, done, total]);
  // On completion (finished or skipped): capture the elapsed duration and reveal the answer bubble, once.
  React.useEffect(() => {
    if (done && !completedRef.current) {
      completedRef.current = true;
      setFinalSeconds(Math.max(1, Math.round((Date.now() - startRef.current) / 1000)));
      onComplete();
    }
  }, [done, onComplete]);
  if (!done) {
    // Active state: chronological steps (completed = success, current = loading) plus a skip control.
    const activeSteps: StepsProps.Step[] = THINKING_STEPS.slice(0, completed + 1).map((header, i) => ({
      header,
      status: i < completed ? 'success' : 'loading',
      statusIconAriaLabel: i < completed ? 'Success' : 'Loading',
    }));
    return (
      // Skip thinking sits at the top-right of the expandable header row (per the pattern). The inline variant
      // of ExpandableSection doesn't support `headerActions`, so overlay it as a positioned sibling instead.
      <div className="thinking-flow">
        <div className="thinking-flow__skip">
          <Button variant="inline-link" onClick={() => setSkipped(true)}>
            Skip thinking
          </Button>
        </div>
        <ExpandableSection
          variant="inline"
          defaultExpanded
          headerText={
            <Box fontSize="body-m" fontWeight="normal">
              Thinking...
            </Box>
          }
        >
          <Steps steps={activeSteps} ariaLabel="Thinking steps" />
        </ExpandableSection>
      </div>
    );
  }
  // Completed state: a collapsed "Thought for Xs" summary of the reasoning that ran. The answer is revealed as its
  // own stacked response bubble (carrying the standard feedback/copy/regenerate actions) via `onComplete`.
  const shownCount = skipped ? Math.max(1, completed) : total;
  const completedSteps: StepsProps.Step[] = THINKING_STEPS.slice(0, shownCount).map(header => ({
    header,
    status: 'success',
    statusIconAriaLabel: 'Success',
  }));
  return (
    <ExpandableSection
      variant="inline"
      headerText={
        <Box fontSize="body-m" fontWeight="normal">
          {`Thought for ${finalSeconds ?? 1}s`}
        </Box>
      }
    >
      <Steps steps={completedSteps} ariaLabel="Completed thinking steps" />
    </ExpandableSection>
  );
};
const thinkingAnswerToCopy =
  'For a multi-region AWS deployment, Global Accelerator is the stronger choice over Route 53 latency-based routing. DynamoDB global tables have lower replication overhead than Aurora Global Database.';
const thinkingAnswerContent = (
  <Box variant="p">
    For a multi-region AWS deployment, Global Accelerator is the stronger choice over Route 53 latency-based routing for
    consistent low-latency routing. For your data layer, DynamoDB global tables will give you lower replication overhead
    than Aurora Global Database, though Aurora is worth considering if you need complex relational queries across
    regions.
  </Box>
);
// Thinking response: reveals the answer as a stacked bubble once reasoning completes.
const getThinkingResponse: ScriptedResponseBuilder = (_, sendAsUser, __, appendMessage) => {
  // The message content is also mounted inside the hidden LiveRegion (for screen-reader announcement), which
  // instantiates a second ThinkingFlow. Both instances share this `onComplete`, so guard the reveal with a
  // closure flag to append the answer exactly once.
  let revealed = false;
  const revealAnswer = () => {
    if (revealed) {
      return;
    }
    revealed = true;
    appendMessage?.({
      type: 'chat-bubble',
      authorId: 'gen-ai',
      content: thinkingAnswerContent,
      timestamp: new Date().toLocaleTimeString(),
      hideAvatar: true,
      actions: 'feedback',
      contentToCopy: thinkingAnswerToCopy,
      supportPrompts: buildSupportPrompts(sendAsUser),
    });
  };
  return {
    content: <ThinkingFlow onComplete={revealAnswer} />,
    contentToCopy: thinkingAnswerToCopy,
    // The thinking bubble itself carries no actions; the revealed answer bubble owns the response actions.
    hideMainBubbleActions: true,
    // The flow is a live, self-animating component, so skip the typewriter reveal in the custom theme.
    disableStreaming: true,
    // Keep the pre-thinking loading brief so the live reasoning steps appear quickly rather than a blank spinner.
    loadingHint: { useAvatarLoading: true, loadingLabel: 'Thinking...', delayMs: 400 },
    extraMessages: [],
  };
};
// Artifact previews (chooser + 3 variants).
const artifactVariants = [
  { id: 'artifact-code', text: 'Code snippet' },
  { id: 'artifact-media', text: 'Media (image)' },
  { id: 'artifact-selectable', text: 'Selectable preview' },
];
const getArtifactChooserResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <Box>
      Artifacts sit outside the chat bubble, indented to align under the reply. Pick the artifact type you want to see:
    </Box>
  ),
  contentToCopy: 'Artifact preview variants: Code snippet, Media (image), Selectable preview.',
  supportPrompts: buildVariantChooser(artifactVariants, sendAsUser),
  extraMessages: [],
});
// Code snippet: a sibling ItemCard with download/copy actions.
const codeSnippet = `// Print a friendly greeting and return the time of day.
function greet(name: string): string {
  const hour = new Date().getHours();
  const partOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  return \`Good \${partOfDay}, \${name}!\`;
}
console.log(greet('Cloudscape'));`;
const getCodeSnippetResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: "Here's a TypeScript snippet that prints a time-aware greeting.",
  contentToCopy: "Here's a TypeScript snippet that prints a time-aware greeting.",
  extraMessages: [
    {
      type: 'artifact',
      content: (
        <ItemCard
          variant="embedded"
          header={
            <Box fontSize="heading-xs" fontWeight="bold">
              TypeScript
            </Box>
          }
          actions={
            <SpaceBetween direction="horizontal" size="xxs">
              <Button iconName="download" variant="icon" ariaLabel="Download code" />
              <CopyToClipboard
                copyButtonText="Copy"
                copyErrorText="Code failed to copy"
                copySuccessText="Code copied"
                textToCopy={codeSnippet}
                variant="icon"
              />
            </SpaceBetween>
          }
        >
          <CodeView content={codeSnippet} highlight={typescriptHighlight} ariaLabel="TypeScript greet function" />
        </ItemCard>
      ),
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Media: an image artifact in an ItemCard with download/fullscreen actions.
const MediaArtifactStateful: React.FC = () => {
  const [fullscreen, setFullscreen] = React.useState(false);
  const imageSrc = 'https://placedog.net/640/360?random&id=corgi';
  const imageAlt = 'A portrait of a happy corgi dog';

  return (
    <div className="media-card">
      <ItemCard
        variant="embedded"
        header={
          <Box fontSize="heading-xs" fontWeight="bold">
            dog-portrait.jpg
          </Box>
        }
        description="886 × 408 – 487 KB"
        disableContentPaddings
        actions={
          <SpaceBetween direction="horizontal" size="xxs">
            <Button iconName="download" variant="icon" ariaLabel="Download image" />
            <Button iconName="expand" variant="icon" ariaLabel="View fullscreen" onClick={() => setFullscreen(true)} />
          </SpaceBetween>
        }
      >
        <div className="chat-media-image">
          <img src={imageSrc} alt={imageAlt} className="chat-media-image__img" />
        </div>
      </ItemCard>
      <Modal
        visible={fullscreen}
        onDismiss={() => setFullscreen(false)}
        closeAriaLabel="Close fullscreen"
        size="large"
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xxs">
                <Button iconName="download" variant="icon" ariaLabel="Download image" />
              </SpaceBetween>
            }
          >
            dog-portrait.jpg
          </Header>
        }
      >
        <img src={imageSrc} alt={imageAlt} style={{ width: '100%', display: 'block' }} />
      </Modal>
    </div>
  );
};
const getMediaArtifactResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: 'Here you go, I generated an image.',
  contentToCopy: 'Here you go, I generated an image.',
  extraMessages: [
    {
      type: 'artifact',
      content: <MediaArtifactStateful />,
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Selectable preview: an ActionCard opening a right-rail drawer, portalled to body and inert while closed.
const ArtifactCanvas: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (typeof document === 'undefined') {
    return null;
  }
  return createPortal(
    <div
      className={open ? 'chat-canvas chat-canvas--open' : 'chat-canvas'}
      aria-hidden={!open}
      // `inert` isn't in this package's React types; `''` sets it, omitting removes it.
      {...(!open ? { inert: '' as unknown as boolean } : {})}
    >
      <Box padding="l">
        <SpaceBetween size="m">
          <Header
            variant="h3"
            actions={
              <SpaceBetween direction="horizontal" size="xxs">
                <Button iconName="share" variant="icon" ariaLabel="Share document" />
                <Button iconName="download" variant="icon" ariaLabel="Download document" />
                <Button iconName="close" variant="icon" ariaLabel="Close artifact" onClick={onClose} />
              </SpaceBetween>
            }
          >
            multi-region-architecture.md
          </Header>
          <TextContent>
            <h4>Multi-Region Architecture Overview</h4>
            <p>
              This document describes the architecture for deploying the application across multiple AWS Regions to
              improve availability, reduce latency, and meet data residency requirements.
            </p>
            <h4>Regional topology</h4>
            <p>
              The primary Region is us-east-1, with active-active deployments in eu-west-1 and ap-southeast-1. Each
              Region runs an independent stack consisting of an Application Load Balancer, Amazon ECS services on
              Fargate, and a Regional Amazon DynamoDB table with global tables enabled.
            </p>
            <h4>Data replication</h4>
            <ol>
              <li>
                <strong>DynamoDB global tables</strong> — Provides multi-Region, multi-active replication with eventual
                consistency.
              </li>
              <li>
                <strong>Amazon S3 cross-Region replication</strong> — Static assets and user uploads replicate from the
                primary bucket to Regional buckets.
              </li>
              <li>
                <strong>Amazon ElastiCache Global Datastore</strong> — Session data replicates across Regions with
                sub-second lag.
              </li>
            </ol>
            <h4>Failover strategy</h4>
            <p>
              Automated failover is handled at the DNS layer through Route 53 health checks. If a Region becomes
              unhealthy, traffic shifts to the next-lowest-latency Region within 60–90 seconds.
            </p>
          </TextContent>
        </SpaceBetween>
      </Box>
    </div>,
    document.body,
  );
};
const ArtifactCanvasStateful: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fit-content">
      <ActionCard
        variant="embedded"
        header={
          <Box fontSize="heading-xs" fontWeight="bold">
            multi-region-architecture.md
          </Box>
        }
        description="18.7 KB"
        icon={<Icon name="arrow-right" />}
        onClick={() => setOpen(true)}
        ariaLabel="Open multi-region architecture preview"
      />
      <ArtifactCanvas open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
const getSelectablePreviewResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <Box variant="p">
      I&apos;ve drafted an architecture overview covering multi-region topology, data replication, failover strategy,
      and observability for your deployment. Select the card below to open the artifact in a side panel.
    </Box>
  ),
  contentToCopy:
    "I've drafted an architecture overview covering multi-region topology, data replication, failover strategy, and observability.",
  extraMessages: [
    {
      type: 'artifact',
      content: <ArtifactCanvasStateful />,
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// User authorized actions: prep Steps, then a consent dialog surrogate (ItemCard with title in the header slot and confirm/cancel in the actions slot).
const ConsentDialogStateful: React.FC = () => {
  const [confirmed, setConfirmed] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);
  const resolved = confirmed || cancelled;
  return (
    <ItemCard
      variant="embedded"
      nativeAttributes={{ 'aria-label': 'Human consent dialog' }}
      header={
        <Box fontSize="heading-xs" fontWeight="bold">
          Add cost allocation tags
        </Box>
      }
      actions={
        !resolved ? (
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setConfirmed(true)}>Add tags</Button>
            <Button variant="link" onClick={() => setCancelled(true)}>
              Cancel
            </Button>
          </SpaceBetween>
        ) : undefined
      }
    >
      <SpaceBetween size="m">
        <Box variant="p">
          I notice your EC2 instance i-1234abcd doesn&apos;t have proper cost allocation tags. Adding these tags would
          make it easier to track Atlas project costs. This can be easily reversed.
        </Box>
        <div>
          <Box variant="p">
            <Box variant="span" fontWeight="bold">
              EC2 instance:
            </Box>{' '}
            i-1234abcd
          </Box>
          <Box variant="p">
            <Box variant="span" fontWeight="bold">
              Project:
            </Box>{' '}
            Atlas
          </Box>
          <Box variant="p">
            <Box variant="span" fontWeight="bold">
              Environment:
            </Box>{' '}
            Development
          </Box>
          <Box variant="p">
            <Box variant="span" fontWeight="bold">
              Action:
            </Box>{' '}
            Add cost allocation tags
          </Box>
        </div>
        {!resolved && <Box variant="p">Would you like me to add the tags?</Box>}
        {confirmed && (
          <Box color="text-status-success" fontWeight="bold">
            Tags added. You can revert this action from the EC2 console.
          </Box>
        )}
        {cancelled && (
          <Box color="text-body-secondary" fontWeight="bold">
            Action cancelled. No tags were added.
          </Box>
        )}
      </SpaceBetween>
    </ItemCard>
  );
};
const getConsentResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <Steps
      ariaLabel="Pre-consent reasoning steps"
      steps={[
        { status: 'success', header: 'Analyzed Billing application' },
        { status: 'success', header: 'Checked EC2 instances' },
        { status: 'pending', header: 'Authorization required from user to add cost allocation tags' },
      ]}
    />
  ),
  contentToCopy:
    'Pre-consent steps: Analyzed Billing application, Checked EC2 instances, Authorization required from user to add cost allocation tags.',
  hideMainBubbleActions: true,
  extraMessages: [
    {
      type: 'artifact',
      content: <ConsentDialogStateful />,
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Generative AI loading states (chooser + 2 variants).
const loadingVariants = [
  { id: 'loading-bar', text: 'Loading bar' },
  { id: 'loading-avatar', text: 'Loading avatar' },
];
const getLoadingChooserResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <Box>
      Loading states set expectations while the assistant works. Pick the state you want to see — the loading bar for
      responses that render UI elements, or the avatar animation while a reply is composed:
    </Box>
  ),
  contentToCopy: 'Generative AI loading states: Loading bar, Loading avatar.',
  supportPrompts: buildVariantChooser(loadingVariants, sendAsUser),
  extraMessages: [],
});
// Loading bar: shows a loading bar with label while the response streams in.
// content (a code artifact) is being prepared. The loading bar appears in the chat bubble where that content
//
const loadingBarCodeSnippet = `import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
const client = new S3Client({ region: 'us-east-1' });
const { Buckets } = await client.send(new ListBucketsCommand({}));
for (const bucket of Buckets ?? []) {
  console.log(bucket.Name);
}`;
const getLoadingBarResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content:
    'This response used a loading bar with the label "Generating code" while preparing the result. Here\'s the generated snippet:',
  contentToCopy:
    'This response used a loading bar with the label "Generating code" while preparing the result. Here\'s the generated snippet:',
  // Extended placeholder delay with a descriptive loading label so the loading bar state is clearly visible
  // before the UI-rich content (the code artifact) replaces it.
  loadingHint: { delayMs: 5000, loadingLabel: 'Generating code' },
  extraMessages: [
    {
      type: 'artifact',
      content: (
        <ItemCard
          variant="embedded"
          header={
            <Box fontSize="heading-xs" fontWeight="bold">
              TypeScript
            </Box>
          }
          actions={
            <SpaceBetween direction="horizontal" size="xxs">
              <Button iconName="download" variant="icon" ariaLabel="Download code" />
              <CopyToClipboard
                copyButtonText="Copy"
                copyErrorText="Code failed to copy"
                copySuccessText="Code copied"
                textToCopy={loadingBarCodeSnippet}
                variant="icon"
              />
            </SpaceBetween>
          }
        >
          <CodeView
            content={loadingBarCodeSnippet}
            highlight={typescriptHighlight}
            ariaLabel="TypeScript S3 list buckets snippet"
          />
        </ItemCard>
      ),
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Loading avatar: extends the delay and flips the placeholder to the spinning gen-ai avatar.
const getLoadingAvatarResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <TextContent>
      <p>
        That spinning gen-ai avatar you just saw is the <code>Avatar loading=&#123;true&#125;</code> state, paired with
        a <code>text-status-inactive</code> label like &ldquo;Generating a response&rdquo;. Use it when the assistant is
        composing a reply.
      </p>
      <p>
        Add <code>showLoadingBar</code> to the same bubble for the &ldquo;loading with loading bar&rdquo; variant when a
        follow-on chunk is still streaming.
      </p>
    </TextContent>
  ),
  contentToCopy:
    'The loading avatar is Avatar loading={true} with a text-status-inactive label. Add showLoadingBar for the loading-with-loading-bar variant.',
  // Loading text in the bubble references the avatar's loading animation while the response is composed.
  loadingHint: {
    delayMs: 4500,
    useAvatarLoading: true,
    loadingLabel: 'The avatar is animating while I generate a response',
  },
  extraMessages: [],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Error state: an access-denied Alert with a copyable permission summary.
const accessDeniedText = `User: [arn:aws:iam::123456789000:user/awsgenericuser]
Service: [AWSS3]
Action: [ListBuckets]
On resource(s): [arn:aws:S3:us-east-1:09876543211234567890]
Context: [no identity-based policy allows the AWSS3:ListBuckets action.]
`;
const getErrorStateResponse: ScriptedResponseBuilder = () => ({
  content: '',
  extraMessages: [
    {
      type: 'alert',
      header: 'Access denied',
      content: (
        <SpaceBetween size="s">
          <span>
            You don&apos;t have permission to [AWSS3:ListBuckets]. To request access, copy the following text and send
            it to your AWS administrator.&nbsp;
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
                textToCopy={accessDeniedText}
              />
            </div>
          </div>
        </SpaceBetween>
      ),
    },
  ],
});
// Progressive steps: two completed steps then an in-flight loading step.
const getProgressiveStepsResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <SpaceBetween size="s">
      <Box>Working on your personalized recommendation — the last step shows a loading status:</Box>
      <Steps
        ariaLabel="Progressive steps"
        steps={[
          { status: 'success', statusIconAriaLabel: 'Success', header: 'Evaluated' },
          { status: 'success', statusIconAriaLabel: 'Success', header: 'Checked 5 nodes' },
          { status: 'loading', statusIconAriaLabel: 'Loading', header: 'Checking EKS clusters' },
        ]}
      />
    </SpaceBetween>
  ),
  contentToCopy: 'Progressive steps: Evaluated (success), Checked 5 nodes (success), Checking EKS clusters (loading).',
  extraMessages: [],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Follow-up questions (clarify intent): an answer then a stacked bubble asking clarifying questions.
const getFollowUpClarifyResponse: ScriptedResponseBuilder = (timestamp, sendAsUser) => ({
  content: (
    <TextContent>
      <p>
        Optimizing EC2 costs across multiple regions is an important task for managing cloud expenses. Here are
        strategies you can implement to optimize your EC2 costs:
      </p>
      <ol>
        <li>Use Reserved Instances (RIs) for predictable, long-term workloads</li>
        <li>Implement Auto Scaling so capacity adjusts to demand</li>
        <li>Right-size instances based on real CloudWatch metrics</li>
      </ol>
    </TextContent>
  ),
  contentToCopy:
    'Strategies: 1. Use Reserved Instances for predictable workloads. 2. Implement Auto Scaling. 3. Right-size based on CloudWatch metrics.',
  extraMessages: [
    {
      type: 'chat-bubble',
      authorId: 'gen-ai',
      content: (
        <TextContent>
          <p>To provide targeted recommendations to optimize your EC2 costs, could you tell me:</p>
          <ol>
            <li>What&apos;s your main goal? (Reduce dev costs, optimize production workload spending)</li>
            <li>Any specific constraints? (Must maintain high availability, certain instances must run 24/7)</li>
          </ol>
        </TextContent>
      ),
      timestamp,
      hideAvatar: true,
      actions: 'feedback',
      contentToCopy:
        "What's your main goal? Any specific constraints? (Reduce dev costs, optimize production spending, must maintain HA, etc.)",
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Model selector: a browsable model list rendered as selectable ActionCards.
interface ModelOption {
  id: string;
  name: string;
  description: string;
  iconName: 'gen-ai' | 'edit-gen-ai' | 'search-gen-ai';
}
const modelOptions: ModelOption[] = [
  {
    id: 'fast',
    name: 'Fast',
    description: 'Sub-second responses for everyday questions and lookups.',
    iconName: 'gen-ai',
  },
  {
    id: 'thinking',
    name: 'Thinking',
    description: 'Higher reasoning depth for problem-solving and analysis.',
    iconName: 'search-gen-ai',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced math, multi-step reasoning, and code generation.',
    iconName: 'edit-gen-ai',
  },
];
const getModelSelectorResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content:
    'Choose a model below to change how I respond. Each option balances response speed against reasoning depth differently.',
  contentToCopy:
    'Model selector: Fast (sub-second responses), Thinking (higher reasoning depth), Pro (advanced math and code).',
  extraMessages: [
    {
      type: 'artifact',
      content: (
        <div className="chat-model-grid">
          {modelOptions.map(model => (
            <ActionCard
              key={model.id}
              variant="embedded"
              icon={<Icon name={model.iconName} />}
              header={model.name}
              description={model.description}
              ariaLabel={`Select ${model.name} model`}
              onClick={() => sendAsUser(`I picked the ${model.name} model`)}
            />
          ))}
        </div>
      ),
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Variables: editable prompt templates with <variable-name> placeholders that pre-fill the input.
interface EditablePrompt {
  id: string;
  title: string;
  description: string;
  template: string;
}
const editablePrompts: EditablePrompt[] = [
  {
    id: 'explain-cost-trends',
    title: 'Explain my cost trends',
    description: 'Visualizes spending over time',
    template:
      'Analyze my AWS cost trends over the past <time-period>. Break down spending by <breakdown-dimension>, identify any significant increases or decreases, and highlight the top <number> cost drivers.',
  },
  {
    id: 'analyze-ec2-performance',
    title: 'Analyze my EC2 instance performance',
    description: 'Reviews compute metrics and optimization',
    template:
      'Analyze the performance of my EC2 instances in <region> over the past <time-period>. Review CPU utilization, memory usage, and network throughput, and recommend <number> optimization actions.',
  },
  {
    id: 'cost-optimization-report',
    title: 'Generate a cost optimization report',
    description: 'Actionable recommendations to reduce spending',
    template:
      'Generate a cost optimization report for the past <time-period>. Identify unused or underutilized resources, highlight potential savings by <savings-category>, and provide the top <number> recommendations.',
  },
];
const getVariablesResponse: ScriptedResponseBuilder = (_, sendAsUser, setPromptInputText) => ({
  content: (
    <SpaceBetween size="s">
      <Box>
        Each suggestion below pre-fills the prompt input with a template that uses{' '}
        <Box variant="code" fontSize="body-s">
          &lt;variable-name&gt;
        </Box>{' '}
        placeholders. Select one to load it, then edit the variables before submitting.
      </Box>
      <SupportPromptGroup
        ariaLabel="Editable prompt templates"
        alignment="horizontal"
        items={editablePrompts.map(item => ({
          id: item.id,
          text: (
            <SpaceBetween direction="vertical" size="xxxs">
              <span>{item.title}</span>
              <Box fontSize="body-s" color="text-body-secondary">
                {item.description}
              </Box>
            </SpaceBetween>
          ),
          iconName: 'edit',
          iconPosition: 'right',
        }))}
        onItemClick={({ detail }) => {
          const item = editablePrompts.find(p => p.id === detail.id);
          if (item) {
            setPromptInputText(item.template);
          }
        }}
      />
    </SpaceBetween>
  ),
  contentToCopy:
    'Variables: select a template to load it into the prompt input with <variable-name> placeholders for editing.',
  extraMessages: [],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Support prompts: suggested follow-ups below a reply so the user can continue without retyping.
const supportPromptContinuation = [
  { id: 'comprehensive-cost-report', text: 'Create comprehensive cost report' },
  { id: 'individual-cost-report', text: 'Create individual cost report for my service' },
];
const getSupportPromptsResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content:
    "I've analyzed your billing data and identified cost increases across multiple regions and services. To help you investigate further, I can generate a comprehensive cost report covering both EC2 and S3, or create a workflow one service at a time.",
  contentToCopy:
    "I've analyzed your billing data and identified cost increases across multiple regions and services. I can generate a comprehensive cost report, or create one service at a time.",
  extraMessages: [],
  supportPrompts: <SuggestionPrompts items={supportPromptContinuation} onSelect={sendAsUser} />,
});
// In-flow user input: an inline form (ItemCard + ExpandableSection); on submit it collapses to a KeyValuePairs summary.
const FormInputFollowUp: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const [functionName, setFunctionName] = React.useState('nightly-cleanup');
  const [functionNameError, setFunctionNameError] = React.useState('');
  const [runtime, setRuntime] = React.useState<SelectProps.Option | null>({ value: 'python312', label: 'Python 3.12' });
  const [memory, setMemory] = React.useState<SelectProps.Option | null>({ value: '256', label: '256 MB' });
  const [timeoutSeconds, setTimeoutSeconds] = React.useState('30');
  const [schedule, setSchedule] = React.useState<SelectProps.Option | null>({
    value: 'midnight',
    label: 'Every night at midnight UTC',
  });
  const handleSubmit = () => {
    if (!functionName.trim()) {
      setFunctionNameError('Function name is required.');
      return;
    }
    if (!/^[a-zA-Z0-9\-_]+$/.test(functionName)) {
      setFunctionNameError('Function name can only contain letters, numbers, hyphens, and underscores.');
      return;
    }
    setSubmitted(true);
    setExpanded(true);
  };
  return (
    <ItemCard variant="embedded">
      <ExpandableSection
        variant="inline"
        expanded={expanded}
        onChange={({ detail }) => setExpanded(detail.expanded)}
        headingTagOverride="h4"
        headerText={
          <SpaceBetween direction="horizontal" size="xs" alignItems="center">
            <Box fontSize="body-m" fontWeight="bold">
              Lambda function setup
            </Box>
            <span style={{ visibility: submitted ? 'visible' : 'hidden' }}>
              <StatusIndicator type="success">Complete</StatusIndicator>
            </span>
          </SpaceBetween>
        }
      >
        {!submitted ? (
          <SpaceBetween size="s">
            <FormField label="Function name" errorText={functionNameError}>
              <Input
                value={functionName}
                onChange={({ detail }) => {
                  setFunctionName(detail.value);
                  setFunctionNameError('');
                }}
                placeholder="my-function-name"
                invalid={!!functionNameError}
              />
            </FormField>
            <FormField label="Runtime">
              <Select
                placeholder="Choose runtime"
                selectedOption={runtime}
                onChange={({ detail }) => setRuntime(detail.selectedOption)}
                options={[
                  { value: 'nodejs20', label: 'Node.js 20.x' },
                  { value: 'python312', label: 'Python 3.12' },
                  { value: 'java21', label: 'Java 21' },
                  { value: 'go', label: 'Go 1.x' },
                ]}
              />
            </FormField>
            <FormField label="Memory (MB)">
              <Select
                selectedOption={memory}
                onChange={({ detail }) => setMemory(detail.selectedOption)}
                options={[
                  { value: '128', label: '128 MB' },
                  { value: '256', label: '256 MB' },
                  { value: '512', label: '512 MB' },
                  { value: '1024', label: '1024 MB' },
                ]}
              />
            </FormField>
            <FormField label="Timeout (seconds)">
              <Input value={timeoutSeconds} onChange={({ detail }) => setTimeoutSeconds(detail.value)} type="number" />
            </FormField>
            <FormField label="Schedule">
              <Select
                selectedOption={schedule}
                onChange={({ detail }) => setSchedule(detail.selectedOption)}
                options={[
                  { value: 'midnight', label: 'Every night at midnight UTC' },
                  { value: '2am', label: 'Every night at 2:00 AM UTC' },
                  { value: '4am', label: 'Every night at 4:00 AM UTC' },
                  { value: 'custom', label: 'Custom cron expression' },
                ]}
              />
            </FormField>
            <Box padding={{ top: 's' }} float="right">
              <Button variant="primary" onClick={handleSubmit}>
                Create function
              </Button>
            </Box>
          </SpaceBetween>
        ) : (
          <KeyValuePairs
            columns={2}
            items={[
              { label: 'Function name', value: functionName },
              { label: 'Runtime', value: runtime?.label ?? '' },
              { label: 'Memory (MB)', value: memory?.label ?? '' },
              { label: 'Timeout (seconds)', value: timeoutSeconds },
              { label: 'Schedule', value: schedule?.label ?? '' },
            ]}
          />
        )}
      </ExpandableSection>
    </ItemCard>
  );
};
const getFormInputResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <Box variant="p">
      I&apos;ll create a Lambda function triggered by an EventBridge schedule rule to run your cleanup job every night.
      I just need a few configuration details.
    </Box>
  ),
  contentToCopy:
    "I'll create a Lambda function triggered by an EventBridge schedule rule to run your cleanup job every night. I just need a few configuration details.",
  extraMessages: [
    {
      type: 'artifact',
      content: <FormInputFollowUp />,
    },
  ],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Mode acknowledgement: triggered by a pinned `useAtStart` mode token from the slash menu.
const getModeAckResponse: ScriptedResponseBuilder = (_, sendAsUser) => ({
  content: (
    <TextContent>
      <p>
        You&apos;ve pinned a mode, so I&apos;ll shift my responses to match it. The pinned mode stays active across
        submissions until you remove it from the input.
      </p>
    </TextContent>
  ),
  contentToCopy:
    "You've pinned a mode, so I'll shift my responses to match it. It stays active across submissions until you remove it from the input.",
  extraMessages: [],
  supportPrompts: buildSupportPrompts(sendAsUser),
});
// Lookup table, matched in order — the first entry whose keywords appear in the prompt wins.
const SCRIPTED_RESPONSES: ScriptedResponse[] = [
  // Artifact preview variants
  { match: ['code snippet'], build: getCodeSnippetResponse },
  { match: ['media', 'image artifact', 'corgi'], build: getMediaArtifactResponse },
  { match: ['selectable preview', 'canvas', 'document preview', 'side panel'], build: getSelectablePreviewResponse },
  // User authorized actions
  {
    match: [
      'authorized action',
      'authorised action',
      'user authorized',
      'user authorised',
      'consent',
      'add cost allocation tag',
    ],
    build: getConsentResponse,
  },
  // Loading state variants
  { match: ['loading bar'], build: getLoadingBarResponse },
  { match: ['loading avatar', 'avatar loading'], build: getLoadingAvatarResponse },
  // Error state (own pattern)
  { match: ['error state', 'access denied', /\berror\b/], build: getErrorStateResponse },
  // Thinking (single example)
  { match: [/\bthinking\b/], build: getThinkingResponse },
  // Chooser entries (multi-variant patterns)
  { match: ['artifact preview'], build: getArtifactChooserResponse },
  { match: ['loading state'], build: getLoadingChooserResponse },
  // Direct patterns
  { match: ['progressive', 'progressive step', /\bsteps\b/], build: getProgressiveStepsResponse },
  {
    match: ['follow-up question', 'follow up question', 'clarify intent', 'clarifying question'],
    build: getFollowUpClarifyResponse,
  },
  { match: ['model selector', 'select model', 'switch model', 'change model'], build: getModelSelectorResponse },
  { match: ['variable', 'prompt template', 'editable prompt'], build: getVariablesResponse },
  { match: ['support prompt', 'suggested follow'], build: getSupportPromptsResponse },
  {
    match: ['in-flow', 'inflow', 'form input', 'scheduled lambda', 'launch template'],
    build: getFormInputResponse,
  },
];
// Greeting keywords are tried last (in buildScriptedResponse) so they can't shadow longer prompts or caller extras.
const GREETING_PATTERN = /\b(hello|hi|hey|help|greeting)\b/;
export function buildScriptedResponse({
  prompt,
  hasPinnedMode,
  timestamp,
  sendAsUser,
  setPromptInputText,
  appendMessage,
  extraResponses = [],
  extraDemoPrompts = [],
}: {
  prompt: string;
  hasPinnedMode: boolean;
  timestamp: string;
  sendAsUser: (text: string) => void;
  setPromptInputText: (text: string) => void;
  // Appends a follow-up assistant message, used to reveal a response after a live flow (e.g. Thinking) completes.
  appendMessage: (message: Message) => void;
  // Demo-specific responses matched before the shared registry and greeting/fallback; use non-colliding keywords.
  extraResponses?: ScriptedResponse[];
  // Demo-specific catalogue links appended to the greeting/fallback lists.
  extraDemoPrompts?: DemoPrompt[];
}): MessageOutput {
  // A pinned mode token is acknowledged before keyword matching.
  if (hasPinnedMode) {
    return getModeAckResponse(timestamp, sendAsUser, setPromptInputText, appendMessage);
  }
  const lower = prompt.toLowerCase();
  // Caller extras then the shared registry, both before greeting/fallback.
  const matched = [...extraResponses, ...SCRIPTED_RESPONSES].find(entry =>
    entry.match.some(keyword => (keyword instanceof RegExp ? keyword.test(lower) : lower.includes(keyword))),
  );
  if (matched) {
    return matched.build(timestamp, sendAsUser, setPromptInputText, appendMessage);
  }
  if (GREETING_PATTERN.test(lower)) {
    return getGreetingResponse(timestamp, sendAsUser, setPromptInputText, extraDemoPrompts);
  }
  return getFallbackResponse(timestamp, sendAsUser, setPromptInputText, extraDemoPrompts);
}
