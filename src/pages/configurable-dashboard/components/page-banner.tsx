// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Alert from '@cloudscape-design/components/alert';
import { ExternalLink } from '../../commons';

export function PageBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return null;
  }
  return null;
}
