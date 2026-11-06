// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import Flashbar from '@cloudscape-design/components/flashbar';

import { CustomAppLayout } from '../commons/common-components';
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
    <CustomAppLayout
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
