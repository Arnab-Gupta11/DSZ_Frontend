"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { cultureValues } from '@/constants/jobs';
import { easeOut } from '@/utils/motion';

export function CultureValues() {
  return (
    <section aria-label="How we work" className="bg-navy pb-20 lg:pb-28">
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cultureValues.map(({ icon: Icon, title, text }, i) =>
          <motion.li
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
            className="group relative bg-navy p-8 transition-colors duration-300 hover:bg-navy-800">
            
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-accent bg-cyan/5 text-cyan transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.02em] text-white">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{text}</p>
            </motion.li>
          )}
        </ul>
      </Container>
    </section>);

}
