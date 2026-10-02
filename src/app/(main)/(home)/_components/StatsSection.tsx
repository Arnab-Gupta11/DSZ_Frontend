"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { StatCounter } from '@/components/ui/StatCounter';
import { stats } from '@/constants/stats';

export function StatsSection() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="stats-title" className="relative isolate overflow-hidden border-t border-line bg-navy py-24 lg:py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] rounded-full"
        style={{ x: '-50%', y: '-50%', background: 'radial-gradient(ellipse, rgba(2,224,223,0.10) 0%, transparent 65%)' }}
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h2 id="stats-title" className="font-display text-3xl font-bold tracking-[-0.03em] text-white lg:text-4xl">
              Progress you can measure.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-fg-2">
              We report on outcomes, not activity — and we hold ourselves to the same standard.
            </p>
            <p className="mt-6 text-xs text-fg-3">Figures are placeholders pending verification.</p>
          </Reveal>
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:col-span-8">
            {stats.map((stat, i) =>
            <Reveal key={stat.label} delay={i * 0.08} className="border-t border-line pt-8">
                <StatCounter {...stat} />
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>);

}