// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import DataProvider from '../commons/data-provider';
import { useColumnWidths } from '../commons/use-column-widths';
import { Breadcrumbs, ToolsContent } from './common-components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import { COLUMN_DEFINITIONS, FILTERING_PROPERTIES } from './table-property-filter-config';
import { DEFAULT_PREFERENCES } from './table-config';
import { PropertyFilterTable } from './property-filter-table';

import '../../styles/base.scss';
import { useLocalStorage } from '../../common/localStorage';

function App() {
  const [distributions, setDistributions] = useState([]);
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableServerSide-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-DistributionsTable-Preferences', DEFAULT_PREFERENCES);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
    });
  }, []);

  return (
    <CustomAppLayout
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <PropertyFilterTable
          data={distributions}
          updateTools={() => setToolsOpen(true)}
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

ReactDOM.render(<App />, document.getElementById('app'));
