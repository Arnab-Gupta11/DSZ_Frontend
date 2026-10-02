"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PillarItem } from './PillarItem';
import { pillars } from '@/constants/pillars';
import { easeOut } from '@/utils/motion';

export function WhySection() {
  const [active, setActive] = useState(0);
  const current = pillars[active];

  return (
    <section aria-labelledby="why-title" className="bg-navy-800 py-24 lg:py-36">
      <Container>
        <div id="why-title">
          <SectionHeading
            title="Why brands choose Digital Soft Zone."
            description="One team for strategy, creative and technology — so nothing gets lost between agencies." />
          
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-6">
            {pillars.map((pillar, i) =>
            <PillarItem key={pillar.number} pillar={pillar} index={i} active={active === i} onActivate={setActive} />
            )}
          </ol>

          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-navy-700">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.imageAlt}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="absolute inset-0 h-full w-full object-cover" />
                  
                </AnimatePresence>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 rounded-2xl border border-line bg-[rgba(4,28,38,0.78)] p-5 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-medium text-cyan">{current.number}</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">{current.caption}</p>
                  </div>
                  <div className="flex gap-1.5" aria-hidden>
                    {pillars.map((p, i) =>
                    <span
                      key={p.number}
                      className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                      i === active ? 'w-8 bg-cyan' : 'w-3 bg-white/20'}`
                      } />

                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>);

}