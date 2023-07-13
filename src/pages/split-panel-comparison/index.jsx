// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Table, Pagination, SplitPanel, TextFilter } from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { getHeaderCounterText, getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import { FullPageHeader } from '../commons';
import {
  CustomAppLayout,
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
  const [preferences, setPreferences] = useLocalStorage('React-SplitPanelComparison-Preferences', DEFAULT_PREFERENCES);
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
    <CustomAppLayout
      ref={appLayout}
      contentType="table"
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
      splitPanel={<SplitPanel header={panelHeader}>{panelBody}</SplitPanel>}
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
          columnDisplay={preferences.contentDisplay}
          items={items}
          variant="full-page"
          stickyHeader={true}
          selectionType="multi"
          ariaLabels={SELECTION_LABELS}
          renderAriaLive={renderAriaLive}
          filter={
            <TextFilter
              {...filterProps}
              filteringAriaLabel="Filter instances"
              filteringPlaceholder="Find instances"
              countText={getTextFilterCounterText(filteredItemsCount)}
            />
          }
          wrapLines={preferences.wrapLines}
          stripedRows={preferences.stripedRows}
          contentDensity={preferences.contentDensity}
          stickyColumns={preferences.stickyColumns}
          pagination={<Pagination {...paginationProps} />}
          preferences={<EC2Preferences preferences={preferences} setPreferences={setPreferences} />}
        />
      }
    />
  );
};

createRoot(document.getElementById('app')).render(<App />);

export default App;
