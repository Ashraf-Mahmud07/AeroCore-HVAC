'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Tracks the user's reduced-motion preference, updating if it changes. */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setPrefersReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
