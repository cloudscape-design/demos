// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef } from 'react';

import Board from '@cloudscape-design/board-components/board';
import { useContainerQuery } from '@cloudscape-design/component-toolkit';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { EmptyState } from '../dashboard/components/empty-state';
import { DashboardHeader } from '../dashboard/components/header';
import { ConfigurableWidget } from './components/configurable-widget';
import { PageBanner } from './components/page-banner';
import { ResetButton } from './components/reset-button';
import { boardI18nStrings } from './i18n-strings';
import { StoredWidgetPlacement } from './interfaces';
import { exportLayout, getBoardWidgets, getDefaultLayout } from './widgets';

interface ContentProps {
  layout: ReadonlyArray<StoredWidgetPlacement> | null;
  setLayout: (newLayout: ReadonlyArray<StoredWidgetPlacement>) => void;
  resetLayout: (newLayout: ReadonlyArray<StoredWidgetPlacement>) => void;
  setSplitPanelOpen: (newOpen: boolean) => void;
}

export function Content({ layout, setLayout, resetLayout, setSplitPanelOpen }: ContentProps) {
  const [width, ref] = useContainerQuery(entry => entry.contentBoxWidth);
  const itemsChanged = useRef(layout !== null);

  useEffect(() => {
    if (itemsChanged.current || !width) {
      return;
    }
    resetLayout(getDefaultLayout(width));
  }, [resetLayout, width]);

  function handleLayoutChange(layout: ReadonlyArray<StoredWidgetPlacement>) {
    itemsChanged.current = true;
    setLayout(layout);
  }

  function handleResetLayout() {
    itemsChanged.current = false;
    resetLayout(getDefaultLayout(width!));
  }

  return (
    <SpaceBetween size="m">
      <DashboardHeader
        actions={
          <SpaceBetween size="xs" direction="horizontal">
            <ResetButton onReset={handleResetLayout}>Reset to default layout</ResetButton>
            <Button iconName="add-plus" onClick={() => setSplitPanelOpen(true)}>
              Add widget
            </Button>
          </SpaceBetween>
        }
      />
      <PageBanner />
      <div ref={ref}>
        <Board
          empty={
            <EmptyState
              title="No widgets"
              description="There are no widgets on the dashboard."
              verticalCenter={true}
              action={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button onClick={handleResetLayout}>Reset to default layout</Button>
                  <Button iconName="add-plus" onClick={() => setSplitPanelOpen(true)}>
                    Add widget
                  </Button>
                </SpaceBetween>
              }
            />
          }
          i18nStrings={boardI18nStrings}
          items={getBoardWidgets(layout ?? [])}
          onItemsChange={({ detail: { items } }) => {
            handleLayoutChange(exportLayout(items));
          }}
          renderItem={(item, actions) => {
            const Wrapper = item.data.provider ?? React.Fragment;
            return (
              <Wrapper>
                <ConfigurableWidget config={item.data} onRemove={actions.removeItem} />
              </Wrapper>
            );
          }}
        />
      </div>
    </SpaceBetween>
  );
}
