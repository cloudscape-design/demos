// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { hourMs, minuteMs } from '../utils/time-range';

export interface RunCycle {
  id: string;
  text: string;
  label: string;
  ms: number;
}

export const runCycles: RunCycle[] = [
  { id: 'cycle-1m', text: 'Every 1 minute', label: '1 minute', ms: minuteMs },
  { id: 'cycle-5m', text: 'Every 5 minutes', label: '5 minutes', ms: 5 * minuteMs },
  { id: 'cycle-10m', text: 'Every 10 minutes', label: '10 minutes', ms: 10 * minuteMs },
  { id: 'cycle-15m', text: 'Every 15 minutes', label: '15 minutes', ms: 15 * minuteMs },
  { id: 'cycle-30m', text: 'Every 30 minutes', label: '30 minutes', ms: 30 * minuteMs },
  { id: 'cycle-1h', text: 'Every 1 hour', label: '1 hour', ms: hourMs },
];
