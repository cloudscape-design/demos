// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import Flashbar from '@cloudscape-design/components/flashbar';

import { useDisclaimerFlashbarItem } from '../commons/disclaimer-flashbar-item';
import BaseNavigation from './base-navigation';
import CloudscapeChat from './cloudscape-chat';

// Base chat demo.
export default function Chat() {
  const [dismissedMessages, setDismissedMessages] = useState<Set<string>>(new Set());
  const [navigationOpen, setNavigationOpen] = useState(true);
  const disclaimerItem = useDisclaimerFlashbarItem(id => setDismissedMessages(prev => new Set(prev).add(id)));
  const resetChatRef = useRef<() => void>();

  const notifications = (
    <Flashbar items={disclaimerItem && !dismissedMessages.has(disclaimerItem.id!) ? [disclaimerItem] : []} />
  );

  return (
    <AppLayoutToolbar
      navigation={<BaseNavigation onNewChat={() => resetChatRef.current?.()} />}
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      navigationWidth={360}
      toolsHide
      notifications={notifications}
      content={<CloudscapeChat resetRef={resetChatRef} />}
    />
  );
}
