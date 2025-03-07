// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button, { ButtonProps } from '@cloudscape-design/components/button';
import { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { SelectProps } from '@cloudscape-design/components/select';
import SplitPanel from '@cloudscape-design/components/split-panel';

import { resourceCreateBreadcrumbs } from '../../common/breadcrumbs';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import CreateCachePolicy from '../form/components/cache-behavior-panel/create-cache-policy';
import useCreateCachePolicy from '../form/components/cache-behavior-panel/use-create-cache-policy';
import { FormHeader, FormWithValidation } from '../form/components/form';
import ToolsContent from '../form/components/tools-content';
import UnsavedChangesModal from '../form/components/unsaved-changes-modal';
import { EXISTING_CACHE_POLICIES } from '../form/form-config';

const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourceCreateBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

export function App() {
  const [toolsIndex, setToolsIndex] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [customNotifications, setCustomNotifications] = useState<Array<FlashbarProps.MessageDefinition>>([]);
  const [
    createCachePolicyData,
    setCreateCachePolicyData,
    createCachePolicyDataErrors,
    setCreateCachePolicyErrors,
    isCreateCachePolicyDataChanged,
    resetCreateCachePolicyData,
  ] = useCreateCachePolicy();
  // These two cache policy states moved to parent to add the new option when created and select it if there isn't an already selected option
  const [selectedCachePolicy, setSelectedCachePolicy] = useState<SelectProps.Option | null>(null);
  const [cachePolicies, setCachePolicies] = useState(EXISTING_CACHE_POLICIES);
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

  const onSubmitCreateCachePolicy = () => {
    // Add success notification
    setCustomNotifications(prevData => [
      ...prevData,
      {
        type: 'success',
        content: (
          <>
            {createCachePolicyData.name} created successfully.{' '}
            {!selectedCachePolicy && <>Create cache policy {createCachePolicyData.name} is selected.</>}
          </>
        ),
        action: (
          <Button
            ariaLabel="View resource (opens new tab)"
            href="#"
            iconAlign="right"
            iconName="external"
            target="_blank"
          >
            View resource
          </Button>
        ),
        analyticsMetadata: { suppressFlowMetricEvents: true },
        statusIconAriaLabel: 'success',
        dismissLabel: 'Dismiss message',
        dismissible: true,
        onDismiss: () => setCustomNotifications(customNotifications.splice(0)),
      },
    ]);

    // Reset
    setSplitPanelOpen(false);
    resetCreateCachePolicyData();
    createCachePolicyButtonRef.current?.focus();

    // Add the policy to the select options and if there isn't an option selected, select the new policy.
    const newPolicyOption = { label: createCachePolicyData.name, value: createCachePolicyData.name };
    setCachePolicies(prevData => [...prevData, newPolicyOption]);
    if (!selectedCachePolicy) {
      setSelectedCachePolicy(newPolicyOption);
    }
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="form"
      content={
        <>
          <FormWithValidation
            loadHelpPanelContent={loadHelpPanelContent}
            header={<FormHeader loadHelpPanelContent={loadHelpPanelContent} />}
            cachePolicyProps={{
              buttonRef: createCachePolicyButtonRef,
              policies: cachePolicies,
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
      notifications={<Notifications customNotifications={customNotifications} />}
      // Split panel props for sub-resource creation
      splitPanelOpen={splitPanelOpen}
      splitPanel={
        <SplitPanel header="Create cache policy" closeBehavior="hide" hidePreferencesButton={true}>
          <CreateCachePolicy
            data={createCachePolicyData}
            setData={setCreateCachePolicyData}
            errors={createCachePolicyDataErrors}
            setErrors={setCreateCachePolicyErrors}
            onSubmit={onSubmitCreateCachePolicy}
            onCancel={() => toggleSplitPanel(false)}
            validation={true}
          />
        </SplitPanel>
      }
      onSplitPanelToggle={({ detail }) => toggleSplitPanel(detail.open)}
      splitPanelPreferences={{ position: 'side' }}
      stickyNotifications={true}
    />
  );
}
