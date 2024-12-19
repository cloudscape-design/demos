// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState } from 'react';

import Alert, { AlertProps } from '@cloudscape-design/components/alert';

export interface ErrorAlertError {
  type: AlertProps.Type;
  header: ReactNode;
  message: string;
}

interface ErrorAlertProps {
  error: ErrorAlertError;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
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
