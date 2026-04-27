// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Instance } from '../../resources/instances';

interface RebootModalProps {
  instances: Instance[];
  visible: boolean;
  onDiscard: () => void;
  onConfirm: () => void;
}

export function RebootModal({ instances, visible, onDiscard, onConfirm }: RebootModalProps) {
  const consentText = 'confirm';
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText('');
  }, [visible]);

  const inputMatches = inputText.toLowerCase() === consentText;
  const isMultiple = instances.length > 1;

  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={isMultiple ? 'Reboot DB instances' : 'Reboot DB instance'}
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDiscard}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm} disabled={!inputMatches}>
              Reboot
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {instances.length > 0 && (
        <SpaceBetween size="m">
          {isMultiple ? (
            <Box variant="span">
              Reboot{' '}
              <Box variant="span" fontWeight="bold">
                {instances.length} instances
              </Box>
              ? This action will temporarily interrupt database availability.
            </Box>
          ) : (
            <Box variant="span">
              Reboot instance{' '}
              <Box variant="span" fontWeight="bold">
                {instances[0].id}
              </Box>
              ? This action will temporarily interrupt database availability.
            </Box>
          )}

          <Alert type="warning" statusIconAriaLabel="Warning">
            Rebooting {isMultiple ? 'these instances' : 'this instance'} will cause a brief outage until the{' '}
            {isMultiple ? 'instances restart' : 'instance restarts'}. Active connections will be dropped.
          </Alert>

          <Box>To avoid accidental reboots, we ask you to provide additional written consent.</Box>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (inputMatches) {
                onConfirm();
              }
            }}
          >
            <FormField label={`To confirm this reboot, type "${consentText}".`}>
              <ColumnLayout columns={2}>
                <Input
                  placeholder={consentText}
                  onChange={event => setInputText(event.detail.value)}
                  value={inputText}
                  ariaRequired={true}
                />
              </ColumnLayout>
            </FormField>
          </form>
        </SpaceBetween>
      )}
    </Modal>
  );
}
