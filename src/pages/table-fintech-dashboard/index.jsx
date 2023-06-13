// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useColumnWidths } from '../commons/use-column-widths';
import { BreadcrumbGroup, Header, SpaceBetween, AppLayout, ContentLayout } from '@cloudscape-design/components';
import {
  COLUMN_DEFINITIONS,
  CONTENT_DISPLAY_OPTIONS,
  PAGE_SIZE_OPTIONS,
  DEFAULT_PREFERENCES,
  genData,
} from './profit-and-loss-config';
import { ProfitAndLossTable } from './profit-and-loss-table';
import '../../styles/base.scss';
import FilterContainer from './filter-container';

const Breadcrumbs = () => {
  return (
    <BreadcrumbGroup
      items={[
        { text: 'Sample company', href: '#' },
        { text: 'Report list', href: '#' },
        { text: "Craig's Design and Landscaping Services", href: '#' },
      ]}
      ariaLabel="Breadcrumbs"
    />
  );
};

function App() {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableServerSide-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs />}
      content={
        <ContentLayout header={<Header variant="h1">Craig's Design and Landscaping Services</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <FilterContainer />
            <ProfitAndLossTable
              data={genData()}
              columnDefinitions={columnDefinitions}
              saveWidths={saveWidths}
              preferences={preferences}
              setPreferences={setPreferences}
              contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </SpaceBetween>
        </ContentLayout>
      }
      contentType="table"
      maxContentWidth={Number.MAX_VALUE}
      toolsHide
      navigationHide
    />
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
