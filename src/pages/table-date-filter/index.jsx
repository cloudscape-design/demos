// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import DataProvider from '../commons/data-provider';
import { useColumnWidths } from '../commons/use-column-widths';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { COLUMN_DEFINITIONS, FILTERING_PROPERTIES, DEFAULT_PREFERENCES } from './table-date-filter-config';
import { PropertyFilterTable } from '../table-property-filter/property-filter-table';

import '../../styles/table-date-filter.scss';
import { useLocalStorage } from '../commons/use-local-storage';

function App() {
  const [distributions, setDistributions] = useState([]);
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableDateFilter-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TableDateFilter-Preferences', DEFAULT_PREFERENCES);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
    });
  }, []);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <PropertyFilterTable
          data={distributions}
          loadHelpPanelContent={() => {
            setToolsOpen(true);
            appLayout.current?.focusToolsClose();
          }}
          columnDefinitions={columnDefinitions}
          saveWidths={saveWidths}
          preferences={preferences}
          setPreferences={setPreferences}
          filteringProperties={FILTERING_PROPERTIES}
        />
      }
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
