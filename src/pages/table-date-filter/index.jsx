// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { useColumnWidths } from '../commons/use-column-widths';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import {
  CONTENT_DISPLAY_OPTIONS,
  COLUMN_DEFINITIONS,
  FILTERING_PROPERTIES,
  DEFAULT_PREFERENCES,
} from './table-date-filter-config';
import { PropertyFilterTable } from '../table-property-filter/property-filter-table';

import '../../styles/table-date-filter.scss';
import { useLocalStorage } from '../commons/use-local-storage';

function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableDateFilter-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TableDateFilter-Preferences', DEFAULT_PREFERENCES);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <PropertyFilterTable
          loadHelpPanelContent={() => {
            setToolsOpen(true);
            appLayout.current?.focusToolsClose();
          }}
          columnDefinitions={columnDefinitions}
          contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
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

createRoot(document.getElementById('app')).render(<App />);
