// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import { ButtonProps } from '@cloudscape-design/components/button';
import { SelectProps } from '@cloudscape-design/components/select';
import SplitPanel from '@cloudscape-design/components/split-panel';

import { resourceCreateBreadcrumbs } from '../../common/breadcrumbs';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import useCreateCachePolicy from '../form/components/cache-behavior-panel/use-create-cache-policy';
import UnsavedChangesModal from '../form/components/unsaved-changes-modal';
import { EXISTING_CACHE_POLICIES } from '../form/form-config';
import CreateCachePolicy from './components/cache-behavior-panel/create-cache-policy';
import { FormFull, FormHeader } from './components/form';
import ToolsContent from './components/tools-content';

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceCreateBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [
    createCachePolicyData,
    setCreateCachePolicyData,
    createCachePolicyDataErrors,
    setCreateCachePolicyErrors,
    isCreateCachePolicyDataChanged,
    resetCreateCachePolicyData,
  ] = useCreateCachePolicy();
  const [selectedCachePolicy, setSelectedCachePolicy] = useState<SelectProps.Option | null>(null);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const createCachePolicyButtonRef = useRef<ButtonProps.Ref>(null);

  useEffect(() => {
    // Focus is moved here instead of toggleSplitPanel to allow split panel to open before focusing
    if (splitPanelOpen) {
      appLayout.current?.focusSplitPanel();
    }
  }, [splitPanelOpen]);

  const loadHelpPanelContent = (index: number) => {
    setToolsIndex(index);
    setToolsOpen(true);
    appLayout.current?.focusToolsClose();
  };

  const toggleSplitPanel = (isOpen: boolean) => {
    if (!isOpen) {
      if (isCreateCachePolicyDataChanged && !showUnsavedChangesModal) {
        return setShowUnsavedChangesModal(true);
      }

      resetCreateCachePolicyData();
      createCachePolicyButtonRef.current?.focus();
    }

    return setSplitPanelOpen(isOpen);
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="form"
      content={
        <>
          <FormFull
            loadHelpPanelContent={loadHelpPanelContent}
            header={<FormHeader loadHelpPanelContent={loadHelpPanelContent} />}
            cachePolicyProps={{
              buttonRef: createCachePolicyButtonRef,
              policies: EXISTING_CACHE_POLICIES,
              selectedPolicy: selectedCachePolicy,
              setSelectedPolicy: setSelectedCachePolicy,
              toggleSplitPanel,
            }}
          />

          <UnsavedChangesModal
            isVisible={showUnsavedChangesModal}
            onDismiss={() => setShowUnsavedChangesModal(false)}
            onLeave={() => {
              resetCreateCachePolicyData();
              setShowUnsavedChangesModal(false);
              toggleSplitPanel(false);
            }}
          />
        </>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      tools={ToolsContent[toolsIndex]}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
      splitPanelOpen={splitPanelOpen}
      splitPanel={
        <SplitPanel header="Create cache policy" closeBehavior="hide" hidePreferencesButton={true}>
          <CreateCachePolicy
            data={createCachePolicyData}
            setData={setCreateCachePolicyData}
            errors={createCachePolicyDataErrors}
            setErrors={setCreateCachePolicyErrors}
            validation={false}
            onSubmit={() => ({})}
            onCancel={() => toggleSplitPanel(false)}
          />
        </SplitPanel>
      }
      onSplitPanelToggle={({ detail }) => toggleSplitPanel(detail.open)}
      splitPanelPreferences={{ position: 'side' }}
    />
  );
}
