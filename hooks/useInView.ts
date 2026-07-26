'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewOptions {
  readonly rootMargin?: string;
  readonly threshold?: number;
  /** Milliseconds to wait after intersection before reporting visibility. */
  readonly delay?: number;
  /** Fallback timeout that reveals content even if the observer never fires. */
  readonly fallbackAfter?: number;
  /** Skip observation entirely and report visible immediately. */
  readonly disabled?: boolean;
}

interface UseInViewResult<T extends HTMLElement> {
  readonly ref: RefObject<T | null>;
  readonly inView: boolean;
}

/**
 * One-shot IntersectionObserver, ported from `initReveal()` / `initCounters()`:
 * unobserves after the first intersection and keeps the same safety timeout so
 * content can never stay hidden.
 */
export function useInView<T extends HTMLElement>({
  rootMargin = '0px 0px -8% 0px',
  threshold = 0.04,
  delay = 0,
  fallbackAfter = 1400,
  disabled = false,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let delayTimer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          delayTimer = setTimeout(() => setInView(true), delay);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    const fallbackTimer = setTimeout(() => setInView(true), fallbackAfter);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [delay, disabled, fallbackAfter, rootMargin, threshold]);

  return { ref, inView };
}
