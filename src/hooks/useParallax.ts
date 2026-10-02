"use client";

import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from './useMediaQuery';

/**
 * Subtle scroll-linked vertical parallax. Disabled on mobile and for reduced motion.
 * `distance` is the max px offset in each direction.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(distance: number) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const enabled = !reduce && isDesktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, (v) => enabled ? (0.5 - v) * 2 * distance : 0);
  return { ref, y };
}