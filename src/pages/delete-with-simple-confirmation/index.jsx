// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  Box,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  Link,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components';
import { SettingsDetails } from '../details/common-components';
import { Navigation } from '../commons/common-components';
import { CustomAppLayout } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import '../../styles/base.scss';

import DistributionsTable from './distributions-table';
import useLocationHash from './use-location-hash';
import useNotifications from './use-notifications';
import fakeDelay from '../commons/fake-delay';

const delay = 3000;

function App() {
  const [distributions, setDistributions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const failingDistributions = useRef([]);

  const locationHash = useLocationHash();
  const locationDistribution = distributions.find(it => it.id === locationHash);
  const { clearFailed, notifications, notifyDeleted, notifyFailed, notifyInProgress } = useNotifications({
    resourceName: 'distribution',
  });

  const deletionWillFail = distribution => !!failingDistributions.current.find(item => item.id === distribution.id);

  const onDeleteInit = () => setShowDeleteModal(true);
  const onDeleteDiscard = () => setShowDeleteModal(false);
  const onDeleteConfirm = async () => {
    const itemsToDelete = locationDistribution ? [locationDistribution] : selectedItems;
    const itemsThatWillSucceed = itemsToDelete.filter(item => !deletionWillFail(item));
    const itemsThatWillFail = itemsToDelete.filter(deletionWillFail);
    setSelectedItems([]);
    setShowDeleteModal(false);
    notifyInProgress(itemsToDelete);
    await fakeDelay(delay);
    const deletedIds = new Set(itemsThatWillSucceed.map(({ id }) => id));
    setDistributions(distributions => distributions.filter(({ id }) => !deletedIds.has(id)));
    notifyInProgress(itemsThatWillFail);
    notifyDeleted(itemsThatWillSucceed);
    await fakeDelay(delay / 2);
    notifyFailed(itemsThatWillFail, {
      retry: async distribution => {
        notifyInProgress([distribution]);
        clearFailed(distribution);
        await fakeDelay(delay);
        setDistributions(distributions => distributions.filter(({ id }) => id !== distribution.id));
        notifyInProgress([]);
        notifyDeleted([distribution]);
      },
    });
    notifyInProgress([]);
  };

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
      const sorted = [...distributions].sort((a, b) => a.id.localeCompare(b.id));
      failingDistributions.current = [sorted[0]];
      setSelectedItems(sorted.slice(0, 5));
      setShowDeleteModal(true);
    });
  }, []);

  useEffect(() => {
    setSelectedItems([]);
  }, [locationHash]);

  return (
    <>
      {locationDistribution ? (
        <DistributionDetailsPage
          distribution={locationDistribution}
          onDeleteInit={onDeleteInit}
          notifications={notifications}
        />
      ) : (
        <DistributionsPage
          distributions={distributions}
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
        distributions={locationDistribution ? [locationDistribution] : selectedItems}
      />
    </>
  );
}

function DistributionsPage({ distributions, selectedItems, setSelectedItems, onDeleteInit, notifications }) {
  return (
    <CustomAppLayout
      content={
        <DistributionsTable
          distributions={distributions}
          selectedItems={selectedItems}
          onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
          onDelete={onDeleteInit}
        />
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Distributions', href: '#' },
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

function DistributionDetailsPage({ distribution, onDeleteInit, notifications }) {
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
              {distribution.id}
            </Header>
          }
        >
          <Container header={<Header variant="h2">Distribution settings</Header>}>
            <SettingsDetails distribution={distribution} />
          </Container>
        </ContentLayout>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Distributions', href: '#' },
            { text: distribution.id, href: '#' + distribution.id },
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

function DeleteModal({ distributions, visible, onDiscard, onDelete }) {
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

createRoot(document.getElementById('app')).render(<App />);
