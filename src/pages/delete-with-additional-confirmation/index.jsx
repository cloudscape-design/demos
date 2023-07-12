// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  Box,
  BreadcrumbGroup,
  Button,
  ColumnLayout,
  Container,
  ContentLayout,
  Flashbar,
  FormField,
  Header,
  Input,
  Link,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components';
import { Navigation } from '../commons/common-components';
import { CustomAppLayout } from '../commons/common-components';
import INSTANCES from '../../resources/ec2-instances';
import '../../styles/base.scss';

import ItemState from '../delete-with-simple-confirmation/item-state';
import useLocationHash from '../delete-with-simple-confirmation/use-location-hash';
import useNotifications from '../delete-with-simple-confirmation/use-notifications';
import InstancesTable from './instances-table';
import fakeDelay from '../commons/fake-delay';

const delay = 3000;
const failingInstances = [INSTANCES[0]];

function App() {
  const [instances, setInstances] = useState(INSTANCES);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(true);

  const locationHash = useLocationHash();
  const locationInstance = instances.find(it => it.id === locationHash);
  const { clearFailed, notifications, notifyDeleted, notifyFailed, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });

  const deletionWillFail = instance => {
    return !!failingInstances.find(item => item.id === instance.id);
  };

  const onDeleteInit = () => setShowDeleteModal(true);
  const onDeleteDiscard = () => setShowDeleteModal(false);
  const onDeleteConfirm = async () => {
    const itemsToDelete = locationInstance ? [locationInstance] : selectedItems;
    const itemsThatWillSucceed = itemsToDelete.filter(item => !deletionWillFail(item));
    const itemsThatWillFail = itemsToDelete.filter(deletionWillFail);
    setSelectedItems([]);
    setShowDeleteModal(false);
    notifyInProgress(itemsToDelete);
    await fakeDelay(delay);
    const deletedIds = new Set(itemsThatWillSucceed.map(({ id }) => id));
    setInstances(instances => instances.filter(({ id }) => !deletedIds.has(id)));
    notifyInProgress(itemsThatWillFail);
    notifyDeleted(itemsThatWillSucceed);
    await fakeDelay(delay / 2);
    notifyFailed(itemsThatWillFail, {
      retry: async instance => {
        notifyInProgress([instance]);
        clearFailed(instance);
        await fakeDelay(delay);
        setInstances(instances => instances.filter(({ id }) => id !== instance.id));
        notifyInProgress([]);
        notifyDeleted([instance]);
      },
    });
    notifyInProgress([]);
  };

  useEffect(() => {
    setSelectedItems([]);
  }, [locationHash]);

  useEffect(() => {
    setSelectedItems(INSTANCES.slice(0, 3));
  }, []);

  return (
    <>
      {locationInstance ? (
        <InstanceDetailsPage instance={locationInstance} onDeleteInit={onDeleteInit} notifications={notifications} />
      ) : (
        <InstancesPage
          instances={instances}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          onDeleteInit={onDeleteInit}
          notifications={notifications}
        />
      )}
      <DeleteModal
        visible={showDeleteModal}
        onDiscard={onDeleteDiscard}
        onDelete={onDeleteConfirm}
        instances={locationInstance ? [locationInstance] : selectedItems}
      />
    </>
  );
}

function InstancesPage({ instances, selectedItems, setSelectedItems, onDeleteInit, notifications }) {
  return (
    <CustomAppLayout
      content={
        <InstancesTable
          instances={instances}
          selectedItems={selectedItems}
          onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
          onDelete={onDeleteInit}
        />
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Instances', href: '#' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      notifications={<Flashbar items={notifications} stackItems={true} />}
      navigation={<Navigation activeHref="#" />}
      navigationOpen={false}
      toolsHide={true}
      contentType="table"
    />
  );
}

function InstanceDetailsPage({ instance, onDeleteInit, notifications }) {
  return (
    <CustomAppLayout
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button>Edit</Button>
                  <Button onClick={onDeleteInit}>Delete</Button>
                </SpaceBetween>
              }
            >
              {instance.id}
            </Header>
          }
        >
          <Container header={<Header variant="h2">Instance details</Header>}>
            <ColumnLayout columns={4} variant="text-grid">
              <SpaceBetween size="l">
                <div>
                  <Box variant="awsui-key-label">Instance ID</Box>
                  <div>{instance.id}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Instance type</Box>
                  <div>{instance.type}</div>
                </div>
              </SpaceBetween>
              <div>
                <Box variant="awsui-key-label">Public DNS</Box>
                <div>{instance.publicDns}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Monitoring</Box>
                <div>{instance.monitoring}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Instance state</Box>
                <div>
                  <ItemState state={instance.state} />
                </div>
              </div>
            </ColumnLayout>
          </Container>
        </ContentLayout>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Instances', href: '#' },
            { text: instance.id, href: '#' + instance.id },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      notifications={<Flashbar items={notifications} stackItems={true} />}
      navigation={<Navigation activeHref="#" />}
      navigationOpen={false}
      toolsHide={true}
    />
  );
}

function DeleteModal({ instances, visible, onDiscard, onDelete }) {
  const deleteConsentText = 'confirm';

  const [deleteInputText, setDeleteInputText] = useState('');
  useEffect(() => {
    setDeleteInputText('');
  }, [visible]);

  const handleDeleteSubmit = event => {
    event.preventDefault();
    if (inputMatchesConsentText) {
      onDelete();
    }
  };

  const inputMatchesConsentText = deleteInputText.toLowerCase() === deleteConsentText;

  const isMultiple = instances.length > 1;
  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={isMultiple ? 'Delete instances' : 'Delete instance'}
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDiscard}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onDelete} disabled={!inputMatchesConsentText} data-testid="submit">
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {instances.length > 0 && (
        <SpaceBetween size="m">
          {isMultiple ? (
            <Box variant="span">
              Permanently delete{' '}
              <Box variant="span" fontWeight="bold">
                {instances.length} instances
              </Box>
              ? You can’t undo this action.
            </Box>
          ) : (
            <Box variant="span">
              Permanently delete instance{' '}
              <Box variant="span" fontWeight="bold">
                {instances[0].id}
              </Box>
              ? You can’t undo this action.
            </Box>
          )}

          <Alert type="warning" statusIconAriaLabel="Warning">
            Proceeding with this action will delete the
            {isMultiple ? ' instances with all their content ' : ' instance with all its content'} and can affect
            related resources.{' '}
            <Link external={true} href="#" ariaLabel="Learn more about resource management, opens in new tab">
              Learn more
            </Link>
          </Alert>

          <Box>To avoid accidental deletions, we ask you to provide additional written consent.</Box>

          <form onSubmit={handleDeleteSubmit}>
            <FormField label={`To confirm this deletion, type "${deleteConsentText}".`}>
              <ColumnLayout columns={2}>
                <Input
                  placeholder={deleteConsentText}
                  onChange={event => setDeleteInputText(event.detail.value)}
                  value={deleteInputText}
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

createRoot(document.getElementById('app')).render(<App />);
