// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Undo and redo stacks of snapshots. The current value lives outside the history.
export interface History<T> {
  past: T[];
  future: T[];
}
