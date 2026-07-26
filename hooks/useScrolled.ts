'use client';

import { useEffect, useState } from 'react';

/**
 * Mirrors `initScrollHeader()`: true once the page is scrolled past `threshold`
 * pixels. Listens passively and settles on the correct value on mount.
 */
export function useScrolled(threshold = 36): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
