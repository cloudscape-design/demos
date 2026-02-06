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
  for (const callback of window.__pendingCallbacks) {
    callback();
  }
  window.__pendingCallbacks = [];
};

export const asyncCallback = (callback: () => void, delay: number) => {
  if (window.__usePendingCallbacks) {
    window.__pendingCallbacks.push(callback);
  } else {
    setTimeout(callback, delay);
  }
};
