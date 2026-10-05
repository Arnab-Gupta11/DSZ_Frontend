"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { easeOut } from '@/utils/motion';

export function ApplySuccess({ name, jobTitle, onReset }: {name: string;jobTitle: string;onReset: () => void;}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
      role="status"
      className="relative overflow-hidden rounded-[28px] border border-line-accent bg-surface p-8 text-center sm:p-14">
      
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-cyan/50"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', repeat: 2 }} />
        
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan text-navy shadow-[0_0_40px_rgba(2,224,223,0.5)]">
          
          <CheckIcon aria-hidden className="h-9 w-9" strokeWidth={3} />
        </motion.span>
      </div>
      <h3 className="mt-8 font-display text-3xl font-bold tracking-[-0.03em] text-white">
        Thanks{name ? `, ${name.split(' ')[0]}` : ''}! Application received.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-fg-2">
        We&apos;ve received your application for <span className="text-white">{jobTitle}</span>. Our team reviews every
        application and will get back to you within 5–7 working days.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/careers#openings" variant="secondary">
          See other openings
        </Button>
        <Button onClick={onReset} variant="ghost" arrow={false}>
          Submit another application
        </Button>
      </div>
    </motion.div>);

}
