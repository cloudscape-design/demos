// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useState } from 'react';
import { useId } from '../../commons/use-id';
import { useDisclaimerFlashbarItem } from '../../commons/disclaimer-flashbar-item';

export default function useNotifications({ deletedTotal, resourceName }) {
  const [deletedDismissed, setDeletedDismissed] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const deletingFlashMessageId = useId();
  const successFlashMessageId = useId();
  const deleted = deletedTotal - deletedDismissed;
  const [disclaimerDismissed, dismissDisclaimer] = useState(false);
  const disclaimerItem = useDisclaimerFlashbarItem(() => dismissDisclaimer(true));

  const notifications = [];

  if (disclaimerItem && !disclaimerDismissed) {
    notifications.push(disclaimerItem);
  }

  if (inProgressCount) {
    notifications.push({
      loading: true,
      type: 'info',
      statusIconAriaLabel: 'info',
      dismissible: false,
      dismissLabel: 'Dismiss message',
      content: `Deleting ${inProgressCount} ${resourceName}${inProgressCount > 1 ? 's' : ''}.`,
      id: deletingFlashMessageId,
    });
  }

  if (deleted) {
    notifications.push({
      type: 'success',
      dismissible: true,
      statusIconAriaLabel: 'success',
      dismissLabel: 'Dismiss message',
      content: `Successfully deleted ${deleted} ${resourceName}${deleted > 1 ? 's' : ''}.`,
      onDismiss: () => setDeletedDismissed(deletedTotal),
      id: successFlashMessageId,
    });
  }

  const notifyInProgress = setInProgressCount;

  return { notifications, notifyInProgress };
}
