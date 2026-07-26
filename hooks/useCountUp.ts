'use client';

import { useEffect, useState } from 'react';
import { decimalPlaces, easeOutCubic, formatCounterValue } from '@/lib/utils';

/** Duration used by the original `initCounters()` animation. */
const DURATION_MS = 1300;

interface UseCountUpOptions {
  readonly target: number;
  readonly suffix: string;
  /** Pre-formatted value used before the animation starts. */
  readonly display: string;
  readonly active: boolean;
  readonly disabled: boolean;
}

/** Animates a numeric counter with the source's cubic ease-out and formatting. */
export function useCountUp({
  target,
  suffix,
  display,
  active,
  disabled,
}: UseCountUpOptions): string {
  const [text, setText] = useState(display);

  useEffect(() => {
    if (!active || disabled) return;

    const decimals = decimalPlaces(target);
    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setText(formatCounterValue(target * easeOutCubic(progress), decimals, suffix));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, disabled, suffix, target]);

  return text;
}
