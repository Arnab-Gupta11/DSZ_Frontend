"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { easeOut } from '@/utils/motion';

interface JobSectionProps {
  title: string;
  items: string[];
  variant?: 'check' | 'plus';
}

/** Reusable titled bullet list for job details. */
export function JobSection({ title, items, variant = 'check' }: JobSectionProps) {
  if (!items.length) return null;
  const Icon = variant === 'check' ? CheckIcon : PlusIcon;

  return (
    <section className="border-t border-line-dark pt-10">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
        
        {title}
      </motion.h2>
      <ul className="mt-6 space-y-4">
        {items.map((item, i) =>
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: easeOut, delay: i * 0.05 }}
          className="flex gap-4 text-[17px] leading-relaxed text-ink-2">
          
            <span
            className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            variant === 'check' ? 'bg-ink text-cyan' : 'border border-line-dark text-ink-teal'}`
            }>
            
              <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span>{item}</span>
          </motion.li>
        )}
      </ul>
    </section>);

}
