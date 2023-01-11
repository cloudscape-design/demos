// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export const tutorialPanelI18nStrings = {
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
  taskTitle: (taskIndex, taskTitle) => `Task ${taskIndex + 1}: ${taskTitle}`,
  stepTitle: (stepIndex, stepTitle) => `Step ${stepIndex + 1}: ${stepTitle}`,
  labelTotalSteps: totalStepCount => `Total steps: ${totalStepCount}`,
  labelLearnMoreExternalIcon: 'Opens in a new tab',
  labelTutorialListDownloadLink: 'Download PDF version of this tutorial',
  labelLearnMoreLink: 'Learn more about transcribe audio (opens new tab)',
};

export const overlayI18nStrings = {
  stepCounterText: (stepIndex, totalStepCount) => `Step ${stepIndex + 1}/${totalStepCount}`,
  taskTitle: (taskIndex, taskTitle) => `Task ${taskIndex + 1}: ${taskTitle}`,
  labelHotspot: (openState, stepIndex, totalStepCount) =>
    openState
      ? `close annotation for step ${stepIndex + 1} of ${totalStepCount}`
      : `open annotation for step ${stepIndex + 1} of ${totalStepCount}`,
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  finishButtonText: 'Finish',
  labelDismissAnnotation: 'hide annotation',
};
