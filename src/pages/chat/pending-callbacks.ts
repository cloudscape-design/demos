// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WindowWithPendingCallbacks extends Window {
  __usePendingCallbacks: boolean;
  __pendingCallbacks: Array<() => void>;
  __flushOne: () => void;
  __flushAll: () => void;
}
declare const window: WindowWithPendingCallbacks;

window.__usePendingCallbacks = false;
window.__pendingCallbacks = [];
window.__flushOne = () => window.__pendingCallbacks.shift()?.();
window.__flushAll = () => {
  for (const cb of window.__pendingCallbacks) {
    cb();
  }
  window.__pendingCallbacks = [];
};

export const asyncCallback = (cb: () => void, delay: number) => {
  if (window.__usePendingCallbacks) {
    window.__pendingCallbacks.push(cb);
  } else {
    setTimeout(cb, delay);
  }
};
