// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { FILTERING_PROPERTIES } from './table-property-filter-config';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES } from '../commons/table-config';
import { PropertyFilterTable } from './property-filter-table';
import '../../styles/base.scss';

function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TablePropertyFilter-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TablePropertyFilter-Preferences', DEFAULT_PREFERENCES);
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
