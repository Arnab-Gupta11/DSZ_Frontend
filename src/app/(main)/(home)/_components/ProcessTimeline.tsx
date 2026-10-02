"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/constants/process';

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const n = processSteps.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [activeCount, setActiveCount] = useState(reduce ? n : 0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    const count = v <= 0.01 ? 0 : Math.min(n, Math.floor(v * (n - 1) + 0.05) + 1);
    setActiveCount(count);
  });

  const lineStyle = reduce ? undefined : progress;

  return (
    <section aria-labelledby="process-title" className="bg-navy-700 py-24 lg:py-36">
      <Container>
        <div id="process-title">
          <SectionHeading
            title="How We Work"
            description="A simple, transparent process — so you always know what is happening and what comes next." />
          
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          <div aria-hidden className="absolute left-7 right-7 top-7 hidden h-px bg-line lg:block">
            <motion.div style={{ scaleX: lineStyle ?? 1 }} className="h-full origin-left bg-cyan shadow-[0_0_12px_rgba(2,224,223,0.8)]" />
          </div>
          <div aria-hidden className="absolute bottom-7 left-7 top-7 w-px bg-line lg:hidden">
            <motion.div style={{ scaleY: lineStyle ?? 1 }} className="h-full w-full origin-top bg-cyan shadow-[0_0_12px_rgba(2,224,223,0.8)]" />
          </div>
          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">

          {processSteps.map((step, i) => {
              const active = i < activeCount;
              return (
                <li key={step.number} className="relative flex gap-6 lg:flex-col lg:gap-8">
                <span
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-navy-700 font-display text-sm font-bold tabular-nums transition-[border-color,color,box-shadow] duration-300 ${
                    active ?
                    'border-cyan text-cyan shadow-[0_0_0_6px_rgba(2,224,223,0.08)]' :
                    'border-line text-fg-3'}`
                    }>
                    
                  {step.number}
                </span>
                <div className="pt-2 lg:pt-0">
                  <h3
                      className={`font-display text-2xl font-bold tracking-[-0.02em] transition-colors duration-300 ${
                      active ? 'text-white' : 'text-fg-2'}`
                      }>
                      
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-fg-2">{step.description}</p>
                </div>
              </li>);

            })}
          </ol>
        </div>
      </Container>
    </section>);

}