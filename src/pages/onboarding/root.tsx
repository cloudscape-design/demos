// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { PropsWithChildren, useState } from 'react';

import AnnotationContext from '@cloudscape-design/components/annotation-context';

import { overlayI18nStrings } from './i18n';
import { useRouter } from './router';
import { useStore } from './store';
import { Tutorial } from './tutorial-data';

import '../../styles/onboarding.scss';

export function App({ children }: PropsWithChildren) {
  const { navigate } = useRouter();
  const { state, actions } = useStore();
  /*
  In this demo, we're tracking the current tutorial by index. In your application,
  you might want to use an ID instead. */
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState<number | undefined>(undefined);
  const currentTutorial = currentTutorialIndex !== undefined ? state.tutorials[currentTutorialIndex] : null;

  return (
    <AnnotationContext
      currentTutorial={currentTutorial}
      onStepChange={() => actions.setToolsTab('tutorials-panel')}
      onStartTutorial={event => {
        const tutorial = event.detail.tutorial;
        actions.setTutorialCompleted(tutorial as Tutorial, false);

        navigate('create-transcription-job');
        setCurrentTutorialIndex(state.tutorials.indexOf(tutorial as Tutorial));
      }}
      onExitTutorial={() => setCurrentTutorialIndex(undefined)}
      onFinish={() => {
        if (!currentTutorial) {
          return;
        }
        actions.setTutorialCompleted(currentTutorial, true);
      }}
      i18nStrings={overlayI18nStrings}
    >
      {children}
    </AnnotationContext>
  );
}
