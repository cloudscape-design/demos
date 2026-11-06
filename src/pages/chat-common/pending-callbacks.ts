// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export interface WindowWithPendingCallbacks extends Window {
  __usePendingCallbacks: boolean;
  __pendingCallbacks: Array<() => void>;
  __flushOne: () => void;
  __flushAll: () => void;
}
const pendingWindow = window as unknown as WindowWithPendingCallbacks;

pendingWindow.__usePendingCallbacks = pendingWindow.__usePendingCallbacks ?? false;
pendingWindow.__pendingCallbacks = [];
pendingWindow.__flushOne = () => {
  const nextCallback = pendingWindow.__pendingCallbacks.shift();
  if (nextCallback) {
    nextCallback();
  } else {
    throw new Error('The callbacks queue is empty.');
  }
};
pendingWindow.__flushAll = () => {
  while (pendingWindow.__pendingCallbacks.length) {
    pendingWindow.__flushOne();
  }
};

export const asyncCallback = (callback: () => void, delay: number) => {
  if (pendingWindow.__usePendingCallbacks) {
    pendingWindow.__pendingCallbacks.push(callback);
  } else {
    setTimeout(callback, delay);
  }
};
