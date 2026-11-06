// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

interface StreamingChatBubbleContentProps {
  /** The final content to reveal */
  children: React.ReactNode;
  /** Whether this message should animate in */
  shouldStream: boolean;
  /** Called when streaming finishes */
  onStreamComplete?: () => void;
  /** Pixels to reveal per step — roughly one line height (default 24) */
  pxPerStep?: number;
  /** Milliseconds between reveal steps (default 80) */
  stepInterval?: number;
}

// Applies a vertical gradient mask: opaque up to `revealedPx`, a 20px fade at the leading edge, hidden below.
function applyMask(el: HTMLElement, revealedPx: number) {
  const fadeZone = 20;
  const solidEnd = Math.max(0, revealedPx - fadeZone);
  const mask = `linear-gradient(to bottom, black ${solidEnd}px, black ${solidEnd}px, transparent ${revealedPx}px, transparent 100%)`;
  el.style.maskImage = mask;
  el.style.webkitMaskImage = mask;
}

// Progressively reveals chat bubble content top-to-bottom via a growing CSS mask; full content stays in the DOM.
export default function StreamingChatBubbleContent({
  children,
  shouldStream,
  onStreamComplete,
  pxPerStep = 24,
  stepInterval = 80,
}: StreamingChatBubbleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(!shouldStream);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealedPxRef = useRef(0);
  const completeCalledRef = useRef(false);
  const onStreamCompleteRef = useRef(onStreamComplete);
  onStreamCompleteRef.current = onStreamComplete;

  useEffect(() => {
    if (!shouldStream || isComplete) {
      return;
    }

    const el = containerRef.current;
    if (!el) {
      setIsComplete(true);
      return;
    }

    // Start fully hidden
    revealedPxRef.current = 0;
    applyMask(el, 0);

    // Small delay to let layout settle after mount
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        const totalHeight = el.scrollHeight;
        revealedPxRef.current += pxPerStep;

        if (revealedPxRef.current >= totalHeight) {
          // Fully revealed — remove mask
          el.style.maskImage = 'none';
          el.style.webkitMaskImage = 'none';
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsComplete(true);
          if (!completeCalledRef.current) {
            completeCalledRef.current = true;
            onStreamCompleteRef.current?.();
          }
        } else {
          applyMask(el, revealedPxRef.current);
        }
      }, stepInterval);
    }, 80);

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!shouldStream || isComplete) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="streaming-reveal">
      {children}
    </div>
  );
}
