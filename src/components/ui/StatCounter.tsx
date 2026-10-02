"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { easeOut } from '@/utils/motion';
import type { Stat } from '../../types/content';

export function StatCounter({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: easeOut,
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div className="flex flex-col">
      <p className="font-display text-[clamp(3.25rem,7vw,6rem)] font-bold leading-none tracking-[-0.04em] tabular-nums text-white">
        <span ref={ref}>{value === null ? '[X]' : display}</span>
        <span className="text-cyan">{suffix}</span>
      </p>
      <p className="mt-4 text-base text-fg-2">{label}</p>
    </div>);

}