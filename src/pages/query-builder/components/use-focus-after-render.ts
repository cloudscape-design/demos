// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState } from 'react';

// Runs a focus callback after the next render, once the target is shown. Never on mount.
export function useFocusAfterRender() {
  const [request, setRequest] = useState<{ focus: () => void } | null>(null);
  useEffect(() => {
    request?.focus();
  }, [request]);
  return (focus: () => void) => setRequest({ focus });
}
