// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppLayout, Table, Pagination, SplitPanel, TextFilter } from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  appLayoutAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  paginationAriaLabels,
  splitPanelI18nStrings,
} from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import {
  Navigation,
  ec2NavItems,
  Notifications,
  TableNoMatchState,
  TableEmptyState,
} from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { EC2ToolsContent } from '../table/common-components';
import INSTANCES from '../../resources/ec2-instances';
import { COLUMN_DEFINITIONS_MAIN, SELECTION_LABELS, DEFAULT_PREFERENCES, EC2Preferences } from './table-config';
import { getPanelContent, Breadcrumbs, useSplitPanel } from './utils';

// It's necessary to import a scss file or the build will fail
import '../../styles/base.scss';

const App = () => {
  const [preferences, setPreferences] = useLocalStorage('React-InstancesTable-Preferences', DEFAULT_PREFERENCES);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    INSTANCES,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Instance" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    }
  );
  const { header: panelHeader, body: panelBody } = getPanelContent(collectionProps.selectedItems, 'comparison');
  const [toolsOpen, setToolsOpen] = useState(false);
  const { splitPanelOpen, onSplitPanelToggle, splitPanelSize, onSplitPanelResize } = useSplitPanel(
    collectionProps.selectedItems
  );
  const appLayout = useRef();
  return (
    <AppLayout
      ref={appLayout}
      contentType="table"
      headerSelector="#header"
      navigation={<Navigation items={ec2NavItems} activeHref="#/instances" />}
      breadcrumbs={<Breadcrumbs />}
      notifications={<Notifications successNotification={true} />}
      tools={<EC2ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      splitPanelOpen={splitPanelOpen}
      onSplitPanelToggle={onSplitPanelToggle}
      splitPanelSize={splitPanelSize}
      onSplitPanelResize={onSplitPanelResize}
      splitPanel={
        <SplitPanel header={panelHeader} i18nStrings={splitPanelI18nStrings}>
          {panelBody}
        </SplitPanel>
      }
      content={
        <Table
          {...collectionProps}
          header={
            <FullPageHeader
              title="Instances"
              createButtonText="Create instance"
              selectedItemsCount={collectionProps.selectedItems.length}
              counter={getHeaderCounterText(INSTANCES, collectionProps.selectedItems)}
              onInfoLinkClick={() => {
                setToolsOpen(true);
                appLayout.current?.focusToolsClose();
              }}
            />
          }
          columnDefinitions={COLUMN_DEFINITIONS_MAIN}
          items={items}
          variant="full-page"
          stickyHeader={true}
          selectionType="multi"
          ariaLabels={SELECTION_LABELS}
          filter={
            <TextFilter
              {...filterProps}
              filteringAriaLabel="Filter instances"
              filteringPlaceholder="Find instances"
              filteringClearAriaLabel="Clear"
              countText={getTextFilterCounterText(filteredItemsCount)}
            />
          }
          wrapLines={preferences.wrapLines}
          stripedRows={preferences.stripedRows}
          pagination={<Pagination {...paginationProps} ariaLabels={paginationAriaLabels} />}
          preferences={<EC2Preferences preferences={preferences} setPreferences={setPreferences} />}
        />
      }
      ariaLabels={appLayoutAriaLabels}
    />
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
