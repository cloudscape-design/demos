// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { TableProps } from '@cloudscape-design/components';

export const renderAriaLive: TableProps['renderAriaLive'] = ({ firstIndex, lastIndex, totalItemsCount }) =>
  `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`;
