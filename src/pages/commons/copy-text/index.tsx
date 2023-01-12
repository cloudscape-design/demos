// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Box, Button, StatusIndicator, Popover, StatusIndicatorProps } from '@cloudscape-design/components';
import styles from './styles.module.scss';

const SUCCESS_STATUS = 'success';
const ERROR_STATUS = 'error';

interface CopyTextProps {
  copyText: string;
  copyButtonLabel: string;
  successText: string;
  errorText: string;
}

// Force function to return a promise even if it throws synchronously
// eslint-disable-next-line require-await
export async function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export default function CopyText({ copyText, copyButtonLabel, successText, errorText }: CopyTextProps) {
  const [status, setStatus] = useState<StatusIndicatorProps.Type>(SUCCESS_STATUS);
  const [message, setMessage] = useState(successText);

  return (
    <div className={styles['custom-wrapping']}>
      <Box margin={{ right: 'xxs' }} display="inline-block">
        <Popover
          size="small"
          position="top"
          dismissButton={false}
          triggerType="custom"
          content={<StatusIndicator type={status}>{message}</StatusIndicator>}
        >
          <Button
            variant="inline-icon"
            iconName="copy"
            ariaLabel={copyButtonLabel}
            onClick={() => {
              copyToClipboard(copyText).then(
                () => {
                  setStatus(SUCCESS_STATUS);
                  setMessage(successText);
                },
                () => {
                  setStatus(ERROR_STATUS);
                  setMessage(errorText);
                }
              );
            }}
          />
        </Popover>
      </Box>
      {copyText}
    </div>
  );
}
