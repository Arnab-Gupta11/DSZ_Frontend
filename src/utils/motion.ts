"use client";

import type { Transition } from 'framer-motion';

/** Strong ease-out used across the site for entrances and reveals. */
export const easeOut: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** For movement across the screen. */
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Low-bounce, high-damping spring for interactive elements. */
export const softSpring: Transition = { type: 'spring', stiffness: 260, damping: 30, mass: 0.6 };

export const revealTransition = (delay = 0): Transition => ({ duration: 0.6, ease: easeOut, delay });