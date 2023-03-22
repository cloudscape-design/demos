// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface ResetButtonProps {
  children: React.ReactNode;
  onReset: () => void;
}

export function ResetButton({ children, onReset }: ResetButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  function onClick() {
    setShowDialog(true);
  }

  function onDismiss() {
    setShowDialog(false);
  }

  function onConfirm() {
    onReset();
    setShowDialog(false);
  }

  return (
    <>
      <Button onClick={onClick}>{children}</Button>
      {showDialog && (
        <Modal
          visible={true}
          header="Reset to default layout"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" formAction="none" onClick={onDismiss}>
                  Cancel
                </Button>
                <Button variant="primary" formAction="none" onClick={onConfirm}>
                  Reset
                </Button>
              </SpaceBetween>
            </Box>
          }
          onDismiss={onDismiss}
        >
          You will lose your customizations when you reset the layout.
        </Modal>
      )}
    </>
  );
}
