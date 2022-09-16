// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useAvailableTutorials } from './tutorial-data';

const StoreContext = createContext({});

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [toolsOpen, setToolsOpen] = useState(true);
  const [toolsTab, setToolsTab] = useState('tutorials-panel');
  const [helpPanelTopic, setHelpPanelTopic] = useState('create-transcription-job');

  const makeHelpPanelHandler = useCallback(
    topic => () => {
      setHelpPanelTopic(topic);
      setToolsTab('help-panel');
      setToolsOpen(true);
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
