// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { BoardProps } from '@cloudscape-design/board-components/board';

import {
  alarms,
  events,
  featuresSpotlight,
  instanceHours,
  instanceLimits,
  networkTraffic,
  operationalMetrics,
  serviceHealth,
  serviceOverview,
  zoneStatus,
} from '../dashboard/widgets';
import { DashboardWidgetItem, WidgetConfig, WidgetDataType } from '../dashboard/widgets/interfaces';
import { StoredWidgetPlacement } from './interfaces';

export type { DashboardWidgetItem };
export { PaletteItem } from './components/palette-item';

export const allWidgets: Record<string, WidgetConfig> = {
  alarms,
  serviceOverview,
  featuresSpotlight,
  events,
  serviceHealth,
  operationalMetrics,
  instanceLimits,
  networkTraffic,
  instanceHours,
  zoneStatus,
};

const defaultLayout: ReadonlyArray<StoredWidgetPlacement> = [
  { id: 'serviceOverview' },
  { id: 'serviceHealth' },
  { id: 'instanceHours' },
  { id: 'networkTraffic' },
  { id: 'alarms' },
  { id: 'instanceLimits' },
  { id: 'events' },
  { id: 'zoneStatus' },
  { id: 'featuresSpotlight' },
];

function merge<T extends { id: string }>(
  src: ReadonlyArray<T>,
  overrides: ReadonlyArray<Partial<T> & { id: string }>,
): ReadonlyArray<T> {
  return src.map(item => {
    const match = overrides.find(override => override.id === item.id);
    return match ? { ...item, ...match } : item;
  });
}

export function getDefaultLayout(width: number) {
  if (width >= 2160) {
    // 6-col layout
    return merge(defaultLayout, [
      { id: 'serviceOverview', columnOffset: { '6': 0 } },
      { id: 'serviceHealth', columnOffset: { '6': 3 } },
      { id: 'instanceHours', columnOffset: { '6': 4 } },
      { id: 'networkTraffic', columnOffset: { '6': 0 } },
      { id: 'alarms', columnOffset: { '6': 2 } },
      { id: 'instanceLimits', columnOffset: { '6': 4 } },
      { id: 'zoneStatus', columnOffset: { '6': 2 } },
      { id: 'events', columnOffset: { '6': 0 } },
      { id: 'featuresSpotlight', columnOffset: { '6': 4 }, columnSpan: 2, rowSpan: 4 },
    ]);
  }
  if (width > 1045) {
    // 4-col layout with 4-col overview
    return defaultLayout;
  }
  if (width > 911) {
    // 4-col layout with 2-col overview
    return merge(defaultLayout, [
      { id: 'serviceOverview', rowSpan: 3 },
      { id: 'serviceHealth', rowSpan: 3 },
    ]);
  }
  if (width > 708) {
    // 2-col layout with 4-col overview
    return merge(defaultLayout, [
      { id: 'serviceOverview', rowSpan: 2 },
      { id: 'serviceHealth', columnSpan: 2 },
      { id: 'instanceHours', columnSpan: 1 },
      { id: 'networkTraffic', columnSpan: 1 },
    ]);
  }
  if (width > 687) {
    // 2-col layout with 2-col overview
    return merge(defaultLayout, [
      { id: 'serviceOverview', rowSpan: 3 },
      { id: 'serviceHealth', columnSpan: 2 },
      { id: 'featuresSpotlight', rowSpan: 4 },
    ]);
  }
  if (width > 485) {
    // 1-col layout with 2-col overview
    return merge(defaultLayout, [
      { id: 'serviceOverview', rowSpan: 3 },
      { id: 'featuresSpotlight', rowSpan: 4 },
    ]);
  }
  // 1-col layout with 1-col overview
  return merge(defaultLayout, [
    { id: 'serviceOverview', rowSpan: 5 },
    { id: 'featuresSpotlight', rowSpan: 5 },
  ]);
}

export function exportLayout(
  items: ReadonlyArray<BoardProps.Item<WidgetDataType>>,
): ReadonlyArray<StoredWidgetPlacement> {
  return items.map(item => ({
    id: item.id,
    columnSpan: item.columnSpan,
    columnOffset: item.columnOffset,
    rowSpan: item.rowSpan,
  }));
}

export function getBoardWidgets(layout: ReadonlyArray<StoredWidgetPlacement>) {
  return layout.map(position => {
    const widget = allWidgets[position.id];
    return {
      ...position,
      ...widget,
      columnSpan: position.columnSpan ?? widget.definition?.defaultColumnSpan ?? 1,
      rowSpan: position.rowSpan ?? widget.definition?.defaultRowSpan ?? 2,
    };
  });
}

export function getPaletteWidgets(layout: ReadonlyArray<StoredWidgetPlacement>) {
  return Object.entries(allWidgets)
    .filter(([id]) => !layout.find(position => position.id === id))
    .map(([id, widget]) => ({ id, ...widget }));
}
