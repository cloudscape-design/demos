// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { DistributionResource } from '../../../resources/types';

interface DeleteModalProps {
  distributions: DistributionResource[];
  visible: boolean;
  onDiscard: () => void;
  onDelete: () => void;
}
export function DeleteModal({ distributions, visible, onDiscard, onDelete }: DeleteModalProps) {
  const isMultiple = distributions.length > 1;
  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={isMultiple ? 'Delete distributions' : 'Delete distribution'}
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDiscard}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onDelete} data-testid="submit">
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {distributions.length > 0 && (
        <SpaceBetween size="m">
          {isMultiple ? (
            <Box variant="span">
              Permanently delete{' '}
              <Box variant="span" fontWeight="bold">
                {distributions.length} distributions
              </Box>
              ? You can’t undo this action.
            </Box>
          ) : (
            <Box variant="span">
              Permanently delete distribution{' '}
              <Box variant="span" fontWeight="bold">
                {distributions[0].id}
              </Box>
              ? You can’t undo this action.
            </Box>
          )}

          <Alert statusIconAriaLabel="Info">
            Proceeding with this action will delete the
            {isMultiple ? ' distributions with all their content ' : ' distribution with all its content'} and can
            affect related resources.{' '}
            <Link external={true} href="#" ariaLabel="Learn more about distributions management, opens in new tab">
              Learn more
            </Link>
          </Alert>
        </SpaceBetween>
      )}
    </Modal>
  );
}
