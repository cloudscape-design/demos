// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import { DistributionResource } from '../../resources/types';
import DataProvider from '../commons/data-provider';
import fakeDelay from '../commons/fake-delay';
import { DeleteModal } from './components/delete-modal';
import { DistributionDetailsPage } from './components/distribution-details-page';
import { DistributionsPage } from './components/distribution-page';
import useLocationHash from './use-location-hash';
import useNotifications from './use-notifications';

const delay = 3000;

export function App() {
  const [distributions, setDistributions] = useState<DistributionResource[]>([]);
  const [selectedItems, setSelectedItems] = useState<DistributionResource[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const failingDistributions = useRef<DistributionResource[]>([]);

  const locationHash = useLocationHash();
  const locationDistribution = distributions.find(it => it.id === locationHash);
  const { clearFailed, notifications, notifyDeleted, notifyFailed, notifyInProgress } = useNotifications({
    resourceName: 'distribution',
  });

  const deletionWillFail = (distribution: DistributionResource) =>
    !!failingDistributions.current.find(item => item.id === distribution.id);

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
    new DataProvider().getDataWithDates<DistributionResource>('distributions').then(distributions => {
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
