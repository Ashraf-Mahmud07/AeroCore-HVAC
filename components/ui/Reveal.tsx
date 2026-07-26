'use client';

import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface RevealProps {
  readonly children: React.ReactNode;
  /** Milliseconds to hold before revealing — the source's `data-reveal-delay`. */
  readonly delay?: number;
  readonly className?: string;
  readonly as?: 'div' | 'li';
}

/**
 * Fade-and-rise on first intersection, ported from `initReveal()`. Children are
 * rendered on the server and simply wrapped, so markup stays crawlable; the
 * stylesheet reveals everything unconditionally under reduced motion and the
 * `<noscript>` block in the root layout covers JS-off.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLElement>({
    delay,
    disabled: prefersReducedMotion,
  });

  const Tag = as;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      className={cn('ac-reveal', className)}
      data-visible={inView ? 'true' : 'false'}
    >
      {children}
    </Tag>
  );
}
