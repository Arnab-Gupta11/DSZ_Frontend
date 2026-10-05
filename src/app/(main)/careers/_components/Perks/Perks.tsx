"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { perks } from '@/constants/jobs';
import { easeOut } from '@/utils/motion';

export function Perks() {
  return (
    <section aria-labelledby="perks-title" className="relative isolate overflow-hidden bg-navy py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] bottom-0 -z-10 h-[60vw] max-h-[700px] w-[60vw] max-w-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(5,216,181,0.09) 0%, transparent 65%)' }} />
      
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:col-span-4">
            
            <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Perks & benefits
            </p>
            <h2
              id="perks-title"
              className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1] tracking-[-0.04em] text-white">
              
              We take care of <span className="text-cyan">our people.</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-fg-2">
              Great work comes from people who feel supported. Here’s what you get when you join DSZ.
            </p>
          </motion.div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {perks.map(({ icon: Icon, title, text }, i) =>
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: easeOut, delay: i * 0.07 }}
              className="group rounded-[24px] border border-line bg-surface p-7 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-line-accent hover:bg-surface-hover">
              
                <Icon aria-hidden className="h-6 w-6 text-cyan transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 font-display text-lg font-bold tracking-[-0.02em] text-white">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{text}</p>
              </motion.li>
            )}
          </ul>
        </div>
      </Container>
    </section>);

}
