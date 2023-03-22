// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnnotationContext } from '@cloudscape-design/components';
import { Router, useRouter } from './router';
import { StoreProvider, useStore } from './store';
import { overlayI18nStrings } from './i18n';
import '../../styles/onboarding.scss';

function App({ children }) {
  const { navigate } = useRouter();
  const { state, actions } = useStore();
  /*
  In this demo, we're tracking the current tutorial by index. In your application,
  you might want to use an ID instead. */
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(undefined);
  const currentTutorial = currentTutorialIndex !== undefined ? state.tutorials[currentTutorialIndex] : undefined;

  return (
    <AnnotationContext
      currentTutorial={currentTutorial}
      onStepChange={() => actions.setToolsTab('tutorials-panel')}
      onStartTutorial={event => {
        const tutorial = event.detail.tutorial;
        actions.setTutorialCompleted(tutorial, false);

        navigate('create-transcription-job');
        setCurrentTutorialIndex(state.tutorials.indexOf(tutorial));
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

createRoot(document.getElementById('app')).render(
  <StoreProvider>
    <App>
      <Router initialPage="create-transcription-job" />
    </App>
  </StoreProvider>
);
