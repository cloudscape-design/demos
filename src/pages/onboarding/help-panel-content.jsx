// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Box, HelpPanel, SpaceBetween } from '@cloudscape-design/components';
import { ExternalLink, ExternalLinkGroup } from '../commons';

export const helpPanelContent = {
  default: (
    <SpaceBetween size="l">
      <Box
        fontWeight="bold"
        color="text-body-secondary"
        textAlign="center"
        margin={{ top: 'xxl', horizontal: 'xxl' }}
        fontSize="body-s"
      >
        No help content to show
      </Box>
      <Box color="text-body-secondary" textAlign="center" margin={{ horizontal: 'xxl' }} fontSize="body-s">
        There is no additional help content on this page. See{' '}
        <ExternalLink fontSize="body-s">AWS documentation</ExternalLink> for more.
      </Box>
    </SpaceBetween>
  ),
  name: (
    <HelpPanel
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'How Amazon Transcribe works' },
            { href: '#', text: 'Getting Started with Amazon Simple Storage Service' },
          ]}
        />
      }
    >
      <div>
        <h2>Name</h2>
        <p>
          When naming a transcription job you should choose a name that is relevant to you or your business. Avoid using
          names associated with others. For example, you should avoid using AWS or Amazon in your job name.
        </p>
      </div>
    </HelpPanel>
  ),
  'create-transcription-job': (
    <HelpPanel
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'How Amazon Transcribe works' },
            { href: '#', text: 'Getting Started with Amazon Simple Storage Service' },
            { href: '#', text: 'Working with Amazon S3 Buckets' },
          ]}
        />
      }
    >
      <div>
        <h2>Create transcription job</h2>
        <p>
          This page allows you to create a transcription job and add information about how it's set up. To add the
          information that allows you to start a transcription job, you must know which S3 bucket contains the audio
          input. You have the choice to either store the transcription results in an S3 bucket you specify or in an S3
          bucket managed by Amazon Transcribe. To manage your S3 buckets, use the Amazon Simple Storage Service console.
        </p>
      </div>
    </HelpPanel>
  ),
  'model-type': (
    <HelpPanel
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'Improving domain specific transcription accuracy with model training' },
            { href: '#', text: 'Custom vocabularies' },
          ]}
        />
      }
    >
      <div>
        <h2>Model type</h2>
        <p>
          You can run transcription jobs with either the general model, or with a custom language model. For improved
          accuracy when transcribing specialized text, use a custom language model.
        </p>
        <p>Some processing options, such as Custom vocabulary, are not supported with Custom language models.</p>
      </div>
    </HelpPanel>
  ),
  'language-settings': (
    <HelpPanel
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'How Amazon Transcribe Works' },
            { href: '#', text: 'What is Amazon Transcribe' },
          ]}
        />
      }
    >
      <div>
        <h2>Language settings</h2>
        <h3>Specific language</h3>
        <p>
          To transcribe your audio file in a specific language, choose <b>Specific language</b>, then choose the
          language. When you start a transcription job using the API, you specify the language code for that language.
          For example, to transcribe a file in US English, you use the language code en-US.
        </p>
        <p>Some processing options, such as Custom vocabulary, are not supported with Custom language models.</p>
        <h3>Automatic language identification</h3>
        <p>
          If you want Amazon Transcribe to automatically identify the predominant language in your source audio files,
          choose <b>Automatic language identification</b>. When you run a transcription job, you won't need to specify a
          language code.
        </p>
        <p>
          Use this option to transcribe audio files that are in different languages. For example, you can use automatic
          language identification to transcribe media for products or features that are launched in countries with
          several official languages.
        </p>
        <p>
          If two or more languages are spoken in an audio file, automatic language identification finds the predominant
          language and transcribes the file in that language. For example, if the predominant language is US English
          (en-US) in an audio file that has both US English (en-US) and US Spanish (es-US), Amazon Transcribe
          transcribes all audio in that file in US English. If you know which languages are spoken in your audio files,
          you might get more accurate results by specifying them in{' '}
          <b>Language options for automatic language identification</b>.
        </p>
      </div>
    </HelpPanel>
  ),
  'input-data': (
    <HelpPanel
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'Working with S3 buckets' },
            { href: '#', text: 'Recognizing voices' },
          ]}
        />
      }
    >
      <div>
        <h2>Input data</h2>
        <p>
          The Input data you add here is an audio file that must be in an S3 bucket, less than or equal to four hours in
          length and must be in MP3, MP4, WAV, FLAC, AMR, OGG, or WebM format. For best results, use a lossless format,
          such as FLAC or WAV with PCM 16-bit encoding. Your audio input can have a sample rate between 8,000 and 48,000
          Hz. We suggest that you use 8,000 Hz for low-quality audio and 16,000 Hz for high-quality audio.
        </p>
      </div>
    </HelpPanel>
  ),
  'choose-output-location': (
    <HelpPanel
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'Working with S3 buckets' },
            { href: '#', text: 'Recognizing voices' },
          ]}
        />
      }
    >
      <div>
        <h2>Choose output location</h2>
        <p>
          Specify where you want the output of your transcription job sent. You have two choices. When you choose
          "Amazon default bucket", Amazon Transcribe stores the transcription in a secure location and provides an
          authenticated URI that you use to access the transcription. When you choose "My own bucket", Amazon Transcribe
          stores the transcription in the S3 bucket that you specify.
        </p>
        <p>
          If you use your S3 bucket, you must grant Amazon Transcribe write access. You can use an AWS Identity and
          Access Management (IAM) policy to grant access to Amazon Transcribe.
        </p>
      </div>
    </HelpPanel>
  ),
  'transcription-jobs': (
    <HelpPanel footer={<ExternalLinkGroup items={[{ href: '#', text: 'How Amazon Transcribe works' }]} />}>
      <div>
        <h2>Transcription jobs</h2>
        <p>
          This jobs list page only shows your Amazon Transcribe transcription jobs. The table shows you the status of
          each job, including when it expires. The expiration date indicates the time remaining until the job is deleted
          and removed from the jobs list. To see more details about a job, select it.
        </p>
      </div>
    </HelpPanel>
  ),
  expiration: (
    <HelpPanel footer={<ExternalLinkGroup items={[{ href: '#', text: 'How Amazon Transcribe works' }]} />}>
      <div>
        <h2>Expiration</h2>
        <p>
          The number of days until the transcription job expires. Transcription jobs remain in the job list for 90 days.
          After 90 days, the job is removed from the list of transcription jobs. If the output of the job is stored in
          the default Amazon S3 bucket, the output from the job is removed as well. If you specified an S3 bucket, the
          output is not removed when the job expires.
        </p>
      </div>
    </HelpPanel>
  ),
};
