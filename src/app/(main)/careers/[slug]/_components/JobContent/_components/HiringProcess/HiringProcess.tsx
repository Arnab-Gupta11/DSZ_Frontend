"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { hiringSteps } from '@/constants/jobs';
import { easeOut } from '@/utils/motion';

/** Four-step hiring timeline. */
export function HiringProcess() {
  return (
    <section className="border-t border-line-dark pt-10">
      <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Hiring process</h2>
      <ol className="relative mt-8 grid gap-6 sm:grid-cols-2">
        {hiringSteps.map(({ icon: Icon, title, text }, i) =>
        <motion.li
          key={title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: easeOut, delay: i * 0.08 }}
          className="group relative rounded-[22px] border border-line-dark bg-white/50 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-ink/30">
          
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-cyan">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <span className="font-display text-sm font-semibold tabular-nums text-ink-2/60">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.02em] text-ink">{title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{text}</p>
          </motion.li>
        )}
      </ol>
    </section>);

}
