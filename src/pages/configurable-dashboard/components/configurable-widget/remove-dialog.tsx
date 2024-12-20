// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface RemoveDialogProps {
  title: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

export function RemoveDialog({ title, onConfirm, onDismiss }: RemoveDialogProps) {
  return (
    <Modal
      visible={true}
      header="Remove widget"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" formAction="none" onClick={onDismiss}>
              Cancel
            </Button>
            <Button variant="primary" formAction="none" onClick={onConfirm}>
              Confirm
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={onDismiss}
    >
      <Box variant="span">
        Remove <Box variant="strong">{title}</Box> widget from the dashboard? Its content preferences will be lost.
      </Box>
    </Modal>
  );
}
