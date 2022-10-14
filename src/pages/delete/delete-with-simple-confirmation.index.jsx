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
import { appLayoutLabels } from '../../common/labels';
import DataProvider from '../commons/data-provider';
import '../../styles/base.scss';

import DistributionsTable from './components/distributions-table';
import useLocationHash from './components/use-location-hash';
import useNotifications from './components/use-notifications';

function App() {
  const [distributions, setDistributions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deletedTotal, setDeletedTotal] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const locationHash = useLocationHash();
  const locationDistribution = distributions.find(it => it.id === locationHash);
  const { notifications } = useNotifications({ deletedTotal, resourceName: 'distribution' });

  const onDeleteInit = () => setShowDeleteModal(true);
  const onDeleteDiscard = () => setShowDeleteModal(false);
  const onDeleteConfirm = () => {
    const deleted = locationDistribution ? [locationDistribution] : selectedItems;
    setDistributions(distributions.filter(d => !deleted.includes(d)));
    setSelectedItems([]);
    setShowDeleteModal(false);
    setDeletedTotal(prev => prev + deleted.size);
  };

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
      setSelectedItems(distributions.sort((a, b) => a.id.localeCompare(b.id)).slice(0, 5));
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
    <AppLayout
      content={
        <DistributionsTable
          distributions={distributions}
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
            { text: 'Distributions', href: '#' },
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

function DistributionDetailsPage({ distribution, onDeleteInit, notifications }) {
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
              {distribution.id}
            </Header>
          }
        >
          <Container header={<Header variant="h2">Distribution settings</Header>}>
            <SettingsDetails distribution={distribution} />
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
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
      notifications={<Flashbar items={notifications} />}
      navigation={<Navigation activeHref="#" />}
      navigationOpen={false}
      toolsHide={true}
      ariaLabels={appLayoutLabels}
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
            <Button variant="primary" onClick={onDelete}>
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
              Delete{' '}
              <Box variant="span" fontWeight="bold">
                {distributions.length} distributions
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          ) : (
            <Box variant="span">
              Delete distribution{' '}
              <Box variant="span" fontWeight="bold">
                {distributions[0].id}
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          )}

          <Alert statusIconAriaLabel="Info">
            Proceeding with this action will delete distribution(s) with all content and can impact related resources.{' '}
            <Link external={true} href="#">
              Learn more
            </Link>
          </Alert>
        </SpaceBetween>
      )}
    </Modal>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
