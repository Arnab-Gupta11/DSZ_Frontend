"use client";

import { useEffect, useState, useSyncExternalStore } from 'react';

// Hydration safe useMediaQuery
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  // Return false during SSR and initial hydration to prevent mismatch
  return mounted ? matches : false;
}

export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
