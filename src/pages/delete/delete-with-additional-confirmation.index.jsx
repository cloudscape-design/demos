// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  AppLayout,
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
import { appLayoutLabels } from '../../common/labels';
import INSTANCES from '../../resources/ec2-instances';
import '../../styles/base.scss';

import ItemState from './components/item-state';
import InstancesTable from './components/instances-table';
import useLocationHash from './components/use-location-hash';
import useNotifications from './components/use-notifications';

function App() {
  const [instances, setInstances] = useState(INSTANCES);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deletedTotal, setDeletedTotal] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(true);

  const locationHash = useLocationHash();
  const locationInstance = instances.find(it => it.id === locationHash);
  const { notifications, notifyInProgress } = useNotifications({ deletedTotal, resourceName: 'instance' });

  const onDeleteInit = () => setShowDeleteModal(true);
  const onDeleteDiscard = () => setShowDeleteModal(false);
  const onDeleteConfirm = () => {
    const deleted = locationInstance ? [locationInstance] : selectedItems;
    const updated = instances.map(it =>
      deleted.includes(it) ? { ...it, state: 'deleting', timestamp: Date.now() } : it
    );
    setInstances(updated);
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setSelectedItems([]);
  }, [locationHash]);

  useEffect(() => {
    setSelectedItems(INSTANCES.slice(0, 3));
  }, []);

  useEffect(() => {
    setDeletedTotal(INSTANCES.length - instances.length);
    notifyInProgress(instances.filter(it => it.state === 'deleting').length);
  }, [instances, notifyInProgress]);

  useEffect(() => {
    setInterval(() => {
      setInstances(instances => instances.filter(it => it.state !== 'deleting' || Date.now() - it.timestamp < 5000));
    }, 5000);
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
    <AppLayout
      content={
        <InstancesTable
          instances={instances}
          selectedItems={selectedItems}
          onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
          onDelete={onDeleteInit}
        />
      }
      headerSelector="#header"
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
      notifications={<Flashbar items={notifications} />}
      navigation={<Navigation activeHref="#" />}
      navigationOpen={false}
      toolsHide={true}
      ariaLabels={appLayoutLabels}
      contentType="table"
    />
  );
}

function InstanceDetailsPage({ instance, onDeleteInit, notifications }) {
  return (
    <AppLayout
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
      headerSelector="#header"
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
      notifications={<Flashbar items={notifications} />}
      navigation={<Navigation activeHref="#" />}
      navigationOpen={false}
      toolsHide={true}
      ariaLabels={appLayoutLabels}
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
            <Button variant="primary" onClick={onDelete} disabled={!inputMatchesConsentText}>
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
              Delete{' '}
              <Box variant="span" fontWeight="bold">
                {instances.length} instances
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          ) : (
            <Box variant="span">
              Delete instance{' '}
              <Box variant="span" fontWeight="bold">
                {instances[0].id}
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          )}

          <Alert type="warning" statusIconAriaLabel="Warning">
            Proceeding with this action will delete instance(s) with all content and can impact related resources.{' '}
            <Link external={true} href="#">
              Learn more
            </Link>
          </Alert>

          <Box>To avoid accidental deletions we ask you to provide additional written consent.</Box>

          <ColumnLayout columns={2}>
            <form onSubmit={handleDeleteSubmit}>
              <FormField label={`Type "${deleteConsentText}" to agree.`}>
                <Input
                  placeholder={deleteConsentText}
                  onChange={event => setDeleteInputText(event.detail.value)}
                  value={deleteInputText}
                  ariaRequired={true}
                />
              </FormField>
            </form>
          </ColumnLayout>
        </SpaceBetween>
      )}
    </Modal>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
