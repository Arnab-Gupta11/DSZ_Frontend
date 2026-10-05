"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BriefcaseIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LinkedInIcon } from '@/components/ui/BrandIcons';
import { socialLinks } from '@/constants/site';
import { easeOut } from '@/utils/motion';

interface EmptyStateProps {
  /** true when there are no jobs at all; false when only the current filter is empty */
  global?: boolean;
  onReset?: () => void;
}

/** Animated placeholder shown when there are no open roles. */
export function EmptyState({ global = true, onReset }: EmptyStateProps) {
  const reduce = useReducedMotion();
  const linkedin = socialLinks.find((s) => s.key === 'linkedin')?.href ?? '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-center sm:px-12 sm:py-20">
      
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-pattern mask-radial absolute inset-0 opacity-50" />
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(2,224,223,0.16) 0%, transparent 65%)' }} />
        
      </div>

      {/* pulsing rings */}
      <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
        {[0, 1, 2].map((i) =>
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full border border-cyan/40"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={reduce ? { scale: 0.6 + i * 0.2, opacity: 0.4 } : { scale: [0.6, 1.25], opacity: [0.6, 0] }}
          transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeOut', delay: i * 1 }} />

        )}
        <motion.span
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-line-accent bg-navy-700 text-cyan shadow-[0_20px_60px_-20px_rgba(2,224,223,0.6)]">
          
          <BriefcaseIcon aria-hidden className="h-8 w-8" />
        </motion.span>
      </div>

      <div className="relative">
        <h3 className="mt-10 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-white">
          {global ? 'No open roles right now.' : 'Nothing in this team — yet.'}
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-fg-2">
          {global ?
          'We’re not actively hiring at the moment, but we’re always happy to meet talented people. Send us your CV and we’ll reach out when the right role opens up.' :
          'There are no openings in this department right now. Check the other teams or send us a general application.'}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button to="/contact?topic=careers" size="lg">
            Send your CV
          </Button>
          {global ?
          <Button
            href={linkedin}
            external
            size="lg"
            variant="secondary"
            arrow={false}
            icon={<LinkedInIcon className="h-4 w-4" />}>
            
              Follow on LinkedIn
            </Button> :

          <Button onClick={onReset} size="lg" variant="secondary" arrow={false}>
              View all openings
            </Button>
          }
        </div>
      </div>
    </motion.div>);

}
