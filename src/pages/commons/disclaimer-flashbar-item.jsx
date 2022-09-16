// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useId } from './use-id';

export function useDisclaimerFlashbarItem(onDismiss) {
  const id = useId();

  return {
    type: 'info',
    dismissible: true,
    dismissLabel: 'Dismiss message',
    onDismiss: () => onDismiss(id),
    statusIconAriaLabel: 'info',
    content: (
      <>
        This demo is an example of Cloudscape Design System patterns and components, and may not reflect the current
        patterns and components of AWS services.
      </>
    ),
    id,
  };
}
