// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';

import { useDisclaimerFlashbarItem } from '../commons/disclaimer-flashbar-item';

function useNotifications() {
  const initialNotifications: Array<FlashbarProps.MessageDefinition> = [];
  const [notifications, setNotifications] = useState(initialNotifications);

  function dismissNotification(idToDismiss: string) {
    setNotifications(notifications => notifications.filter(notification => notification.id !== idToDismiss));
  }

  const disclaimerItem = useDisclaimerFlashbarItem(dismissNotification);

  if (disclaimerItem) {
    initialNotifications.push(disclaimerItem);
  }

  return notifications;
}

export function Notifications() {
  const notifications = useNotifications();
  return <Flashbar items={notifications} />;
}
