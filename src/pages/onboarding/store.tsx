// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import { Tutorial, useAvailableTutorials } from './tutorial-data';

interface StoreContextType {
  state: {
    tutorials: Tutorial[];
    toolsOpen: boolean;
    toolsTab: string;
    helpPanelTopic: string;
  };
  actions: {
    makeHelpPanelHandler(topic: string): () => void;
    setHelpPanelTopic(helpPanelTopic: string): void;
    setToolsTab(toolsTab: string): void;
    setToolsOpen(toolsOpen: boolean): void;
    setTutorialCompleted(tutorial: Tutorial, completed: boolean): void;
  };
  appLayoutRef: MutableRefObject<AppLayoutProps.Ref | null>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('Context is not initialized');
  }
  return context;
}

export function StoreProvider({ children }: PropsWithChildren) {
  const [toolsOpen, setToolsOpen] = useState(true);
  const [toolsTab, setToolsTab] = useState('tutorials-panel');
  const [helpPanelTopic, setHelpPanelTopic] = useState('create-transcription-job');
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  const makeHelpPanelHandler = useCallback(
    (topic: string) => () => {
      setHelpPanelTopic(topic);
      setToolsTab('help-panel');
      setToolsOpen(true);
      appLayoutRef.current?.focusToolsClose();
    },
    [],
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
