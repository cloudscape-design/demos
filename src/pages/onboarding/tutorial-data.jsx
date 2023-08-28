// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Box, Link } from '@cloudscape-design/components';
import React, { useState, useCallback } from 'react';
import { ExternalLink } from '../commons';

const tutorialData = makeHelpPanelHandler => [
  {
    id: 1,
    title: 'Transcribe audio',
    description: (
      <>
        <Box variant="p" color="text-body-secondary" padding={{ top: 'n' }}>
          In this tutorial you will learn how to:
        </Box>
        <ul>
          <li>
            <Box variant="span" color="text-body-secondary">
              Transcribe an audio file from Amazon S3 to text
            </Box>
          </li>
          <li>
            <Box variant="span" color="text-body-secondary">
              View the transcribed text
            </Box>
          </li>
        </ul>
      </>
    ),
    completedScreenDescription: 'You now know how to transcribe text from audio with Amazon Transcribe.',
    prerequisitesAlert: null,
    learnMoreUrl: 'https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/',
    tasks: [
      {
        title: 'Create transcription job',
        steps: [
          {
            title: 'Name your transcription job',
            content: (
              <>
                <b>Name your transcription job.</b> Job names must begin and end with a letter or number.{' '}
                <Link
                  variant="info"
                  onFollow={makeHelpPanelHandler('name')}
                  ariaLabel={'Information about transcription job name.'}
                >
                  Info
                </Link>
              </>
            ),
            hotspotId: 'transcription-job-name',
          },
          {
            title: 'Choose a language',
            content: (
              <>
                <Box variant="p">
                  Choose the <b>spoken language</b> of the audio that you wish to transcribe.
                </Box>
                <Box variant="p">
                  If you don't know the language spoken, choose "Automatic language identification" above.{' '}
                  <Link
                    variant="info"
                    onFollow={makeHelpPanelHandler('automatic-language')}
                    ariaLabel={'Information about automatic language identification.'}
                  >
                    Info
                  </Link>
                </Box>
              </>
            ),
            hotspotId: 'language-selector',
          },
          {
            title: 'Add a file',
            content: (
              <>
                <Box variant="p">
                  <b>Select your input file</b> from an Amazon S3 bucket.{' '}
                  <Link
                    variant="info"
                    onFollow={makeHelpPanelHandler('input-data')}
                    ariaLabel={'Information about input file.'}
                  >
                    Info
                  </Link>
                </Box>
                <Box variant="p">
                  If you haven't yet uploaded your file, go to <ExternalLink variant="primary">Amazon S3</ExternalLink>{' '}
                  to upload it to a bucket.
                </Box>
              </>
            ),
            hotspotId: 'input-file-selector',
          },
          {
            title: 'Create job',
            content: 'Create transcription job',
            hotspotId: 'create-job-button',
          },
        ],
      },
      {
        title: 'View transcription details',
        steps: [
          {
            title: 'Navigate to details page',
            content: (
              <>
                <b>Click on the resource name</b> to see resource details.{' '}
                <Link
                  variant="info"
                  onFollow={makeHelpPanelHandler('transcription-jobs')}
                  ariaLabel={'Information about transcription jobs.'}
                >
                  Info
                </Link>
              </>
            ),
            hotspotId: 'transcription-jobs-new-transcription-job-name',
          },
          {
            title: 'See preview',
            content: 'Preview your transcribed text.',
            hotspotId: 'transcription-job-details-transcription-preview',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Catalog audio archives',
    description: (
      <>
        In this tutorial you will learn how to:
        <ul>
          <li>Index transcribed audio/video files</li>
          <li>Search across the file library</li>
        </ul>
      </>
    ),
    prerequisitesAlert: (
      <>
        Transcribe audio first to complete this tutorial.
        <br />
        <ExternalLink
          href="https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/"
          variant="primary"
        >
          Create an Audio Transcript
        </ExternalLink>
      </>
    ),
    prerequisitesNeeded: true,
    tasks: [],
  },
];

export const useAvailableTutorials = makeHelpPanelHandler => {
  const [tutorials, setTutorials] = useState(() =>
    tutorialData(makeHelpPanelHandler).map(t => ({
      ...t,
      completed: false,
    }))
  );

  const setCompleted = useCallback((tutorial, completed) => {
    setTutorials(tutorials => {
      return tutorials.map(t => {
        if (t.id === tutorial.id) {
          return { ...t, completed };
        }
        return t;
      });
    });
  }, []);

  return [tutorials, setCompleted];
};
