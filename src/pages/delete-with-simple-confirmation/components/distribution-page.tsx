// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';

import { DistributionResource } from '../../../resources/types';
import { Navigation } from '../../commons';
import { CustomAppLayout } from '../../commons/common-components';
import DistributionsTable from './distributions-table';

interface DistributionsPageProps {
  distributions: DistributionResource[];
  selectedItems: DistributionResource[];
  setSelectedItems: (items: DistributionResource[]) => void;
  onDeleteInit: () => void;
  notifications: FlashbarProps.MessageDefinition[];
  splitPanelOpen: boolean;
  onSplitPanelToggle: AppLayoutProps['onSplitPanelToggle'];
  splitPanelSize: number;
  onSplitPanelResize: AppLayoutProps['onSplitPanelResize'];
  splitPanelPreferences: AppLayoutProps['splitPanelPreferences'];
  splitPanel: ReactNode;
}
export function DistributionsPage({
  distributions,
  selectedItems,
  setSelectedItems,
  onDeleteInit,
  notifications,
  splitPanelOpen,
  onSplitPanelToggle,
  splitPanelSize,
  onSplitPanelResize,
  splitPanelPreferences,
  splitPanel,
}: DistributionsPageProps) {
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
      splitPanelOpen={splitPanelOpen}
      onSplitPanelToggle={onSplitPanelToggle}
      splitPanelSize={splitPanelSize}
      onSplitPanelResize={onSplitPanelResize}
      splitPanelPreferences={splitPanelPreferences}
      splitPanel={splitPanel}
    />
  );
}
