// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AttributeName, MetricName } from '../types/metrics';

export const namespace = 'AWS/Lambda';

export interface MetricDefinition {
  name: MetricName;
  fn: 'sum' | 'avg' | 'max';
  alias: string;
  range: [number, number];
}

export interface AttributeDefinition {
  name: AttributeName;
  values: string[];
}

export const metrics: MetricDefinition[] = [
  { name: 'Invocations', fn: 'sum', alias: 'invocations', range: [500, 3000] },
  { name: 'Errors', fn: 'sum', alias: 'errors', range: [0, 60] },
  { name: 'Throttles', fn: 'sum', alias: 'throttles', range: [0, 30] },
  { name: 'Duration', fn: 'avg', alias: 'avg_duration', range: [50, 900] },
  { name: 'ConcurrentExecutions', fn: 'max', alias: 'max_concurrency', range: [5, 120] },
  { name: 'UnreservedConcurrentExecutions', fn: 'max', alias: 'max_unreserved_concurrency', range: [100, 900] },
  { name: 'IteratorAge', fn: 'max', alias: 'max_iterator_age', range: [0, 5000] },
];

export const attributes: AttributeDefinition[] = [
  { name: 'FunctionName', values: ['checkout-api', 'payments-processor', 'order-worker', 'image-resizer'] },
  { name: 'Resource', values: ['checkout-api:prod', 'checkout-api:staging', 'payments-processor:prod'] },
  { name: 'ExecutedVersion', values: ['11', '12', '13'] },
];

export function getMetric(name: MetricName): MetricDefinition {
  return metrics.find(metric => metric.name === name)!;
}

export function getAttribute(name: AttributeName): AttributeDefinition {
  return attributes.find(attribute => attribute.name === name)!;
}
