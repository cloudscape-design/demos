// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';

function useNotifications() {
  const initialNotifications: Array<FlashbarProps.MessageDefinition> = [];
  const [notifications] = useState(initialNotifications);

  return notifications;
}

export function Notifications() {
  const notifications = useNotifications();
  return <Flashbar items={notifications} />;
}
