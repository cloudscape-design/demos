// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { BoardProps } from '@cloudscape-design/board-components/board';

import * as icons from '../icons';

export interface WidgetDataType {
  icon: keyof typeof icons;
  title: string;
  description: string;
  disableContentPaddings?: boolean;
  provider?: React.JSXElementConstructor<{ children: React.ReactElement }>;
  header: React.JSXElementConstructor<Record<string, never>>;
  content: React.JSXElementConstructor<Record<string, never>>;
  footer?: React.JSXElementConstructor<Record<string, never>>;
  staticMinHeight?: number;
}

export type DashboardWidgetItem = BoardProps.Item<WidgetDataType>;

export type WidgetConfig = Pick<DashboardWidgetItem, 'definition' | 'data'>;
