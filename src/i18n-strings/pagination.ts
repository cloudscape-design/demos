// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { PaginationProps } from '@cloudscape-design/components';

export const paginationAriaLabels: PaginationProps.Labels = {
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
};
