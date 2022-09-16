// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Box, Button, StatusIndicator, Popover } from '@cloudscape-design/components';
import { copyToClipboard } from '../../common/clipboard';
import '../../styles/components/copy-code.scss';

const SUCCESS_STATUS = 'success';
const ERROR_STATUS = 'error';

export default function CopyText({ copyText, copyButtonLabel, successText, errorText }) {
  const [status, setStatus] = useState(SUCCESS_STATUS);
  const [message, setMessage] = useState(successText);

  return (
    <div className="custom-wrapping">
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
