"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useCanHover } from '@/hooks/useMediaQuery';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({ children, strength = 0.25, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 22, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}>
      
      {children}
    </motion.div>);

}