// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Alert } from '@cloudscape-design/components';

export function ErrorAlert({ error }) {
  const [visible, setVisible] = useState(true);

  return (
    <Alert
      statusIconAriaLabel="Error"
      type={error.type || 'error'}
      header={error.header}
      dismissible={true}
      visible={visible}
      onDismiss={() => setVisible(false)}
    >
      {error.message}
    </Alert>
  );
}
