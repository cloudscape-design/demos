// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { useAvailableTutorials } from './tutorial-data';

const StoreContext = createContext({});

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [toolsOpen, setToolsOpen] = useState(true);
  const [toolsTab, setToolsTab] = useState('tutorials-panel');
  const [helpPanelTopic, setHelpPanelTopic] = useState('create-transcription-job');
  const appLayoutRef = useRef();

  const makeHelpPanelHandler = useCallback(
    topic => () => {
      setHelpPanelTopic(topic);
      setToolsTab('help-panel');
      setToolsOpen(true);
      appLayoutRef.current?.focusToolsClose();
    },
    []
  );

  const [tutorials, setTutorialCompleted] = useAvailableTutorials(makeHelpPanelHandler);

  return (
    <StoreContext.Provider
      value={{
        state: {
          tutorials,
          toolsOpen,
          toolsTab,
          helpPanelTopic,
        },
        actions: {
          makeHelpPanelHandler,
          setHelpPanelTopic,
          setToolsTab,
          setToolsOpen,
          setTutorialCompleted,
        },
        appLayoutRef,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
