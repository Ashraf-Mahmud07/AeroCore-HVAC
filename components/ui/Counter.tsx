'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CounterProps {
  /** Numeric target — the source's `data-count`. */
  readonly target: number;
  /** The source's `data-suffix`. */
  readonly suffix: string;
  /** Formatted value rendered on the server and before the animation runs. */
  readonly display: string;
  readonly className?: string;
}

/**
 * Counts up once the element scrolls into view, matching `initCounters()`:
 * 1300ms cubic ease-out, locale grouping, target-matching decimal places.
 * The formatted `display` value is what server-renders, so there is no CLS and
 * the number is correct with JavaScript disabled.
 */
export function Counter({ target, suffix, display, className }: CounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({
    threshold: 0.35,
    rootMargin: '0px',
    fallbackAfter: 1600,
    disabled: prefersReducedMotion,
  });

  const text = useCountUp({
    target,
    suffix,
    display,
    active: inView,
    disabled: prefersReducedMotion,
  });

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
