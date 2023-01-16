// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { useDisclaimerFlashbarItem } from './disclaimer-flashbar-item';
import { useId } from './use-id';

function useNotifications(showSuccessNotification = false) {
  const successId = useId();
  const [successDismissed, dismissSuccess] = useState(false);
  const [disclaimerDismissed, dismissDisclaimer] = useState(false);

  const disclaimerItem = useDisclaimerFlashbarItem(() => dismissDisclaimer(true));

  const notifications: Array<FlashbarProps.MessageDefinition> = [];

  if (disclaimerItem && !disclaimerDismissed) {
    notifications.push(disclaimerItem);
  }

  if (showSuccessNotification && !successDismissed) {
    notifications.push({
      type: 'success',
      content: 'Resource created successfully',
      statusIconAriaLabel: 'success',
      dismissLabel: 'Dismiss message',
      dismissible: true,
      onDismiss: () => dismissSuccess(true),
      id: successId,
    });
  }

  return notifications;
}

interface NotificationsProps {
  successNotification?: boolean;
}

export function Notifications({ successNotification }: NotificationsProps) {
  const notifications = useNotifications(successNotification);
  return <Flashbar items={notifications} />;
}
