// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AnnotationContextProps } from '@cloudscape-design/components/annotation-context';
import { TutorialPanelProps } from '@cloudscape-design/components/tutorial-panel';

export const tutorialPanelI18nStrings: TutorialPanelProps.I18nStrings = {
  labelsTaskStatus: { pending: 'Pending', 'in-progress': 'In progress', success: 'Success' },
  loadingText: 'Loading',
  tutorialListTitle: 'Choose a tutorial',
  tutorialListDescription:
    'Use our walk-through tutorials to learn how to achieve your desired objectives within Amazon Transcribe.',
  tutorialListDownloadLinkText: 'Download PDF version',
  tutorialCompletedText: 'Tutorial completed',
  labelExitTutorial: 'dismiss tutorial',
  learnMoreLinkText: 'Learn more',
  startTutorialButtonText: 'Start tutorial',
  restartTutorialButtonText: 'Restart tutorial',
  completionScreenTitle: 'Congratulations! You completed the tutorial',
  feedbackLinkText: 'Feedback',
  dismissTutorialButtonText: 'Dismiss tutorial',
  taskTitle: (taskIndex: number, taskTitle: string) => `Task ${taskIndex + 1}: ${taskTitle}`,
  stepTitle: (stepIndex: number, stepTitle: string) => `Step ${stepIndex + 1}: ${stepTitle}`,
  labelTotalSteps: (totalStepCount: number) => `Total steps: ${totalStepCount}`,
  labelLearnMoreExternalIcon: 'Opens in a new tab',
  labelTutorialListDownloadLink: 'Download PDF version of this tutorial',
  labelLearnMoreLink: 'Learn more about transcribe audio (opens new tab)',
};

export const overlayI18nStrings: AnnotationContextProps.I18nStrings = {
  stepCounterText: (stepIndex: number, totalStepCount: number) => `Step ${stepIndex + 1}/${totalStepCount}`,
  taskTitle: (taskIndex: number, taskTitle: string) => `Task ${taskIndex + 1}: ${taskTitle}`,
  labelHotspot: (openState: boolean, stepIndex: number, totalStepCount: number) =>
    openState
      ? `close annotation for step ${stepIndex + 1} of ${totalStepCount}`
      : `open annotation for step ${stepIndex + 1} of ${totalStepCount}`,
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  finishButtonText: 'Finish',
  labelDismissAnnotation: 'hide annotation',
};
