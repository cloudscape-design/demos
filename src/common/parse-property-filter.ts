// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as z from 'zod';

import { PropertyFilterQuery } from '@cloudscape-design/collection-hooks';

const PropertyFilterOperation = z.enum(['and', 'or']);

const propertyFilterTokenSchema = z.object({
  value: z.any(),
  propertyKey: z.string().optional(),
  operator: z.string(),
});

const propertyFilterQuerySchema = z.object({
  tokens: z.array(propertyFilterTokenSchema),
  operation: PropertyFilterOperation,
  get tokenGroups() {
    return z.array(z.union([propertyFilterTokenSchema, propertyFilterQuerySchema])).optional();
  },
});

export const parsePropertyFilterQuery = (stringifiedPropertyFilter: string): PropertyFilterQuery => {
  const defaultQuery = { operation: 'and', tokens: [] } as PropertyFilterQuery;

  if (!stringifiedPropertyFilter) {
    return defaultQuery;
  }
  try {
    const json = JSON.parse(stringifiedPropertyFilter);
    return propertyFilterQuerySchema.parse(json);
  } catch (error) {
    return defaultQuery;
  }
};
