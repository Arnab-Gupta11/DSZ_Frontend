"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { JobMetaChips } from '../JobMetaChips/JobMetaChips';
import { easeOut } from '@/utils/motion';
import type { Job } from '@/types/content';

interface JobRowProps {
  job: Job;
  index?: number;
}

/** A single job opening row (reference-style list item) for light backgrounds. */
export function JobRow({ job, index = 0 }: JobRowProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: easeOut, delay: index * 0.06 }}
      className="border-t border-line-dark last:border-b">
      
      <Link
        href={`/careers/${job.slug}`}
        className="group relative flex flex-col gap-6 py-8 transition-colors duration-300 sm:flex-row sm:items-start sm:justify-between lg:py-10">
        
        {/* hover accent line */}
        <span
          aria-hidden
          className="absolute -left-4 top-8 bottom-8 w-[2px] origin-top scale-y-0 rounded-full bg-cyan shadow-[0_0_12px_rgba(2,224,223,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100 lg:-left-6" />
        

        <div className="min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2">
          <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-ink-teal">
            {job.title}
          </h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-base">{job.short}</p>
          <JobMetaChips job={job} className="mt-5" />
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 font-display text-lg font-semibold text-ink sm:text-xl">
          Apply
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line-dark transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cyan">
            <ArrowUpRightIcon
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            
          </span>
        </span>
      </Link>
    </motion.li>);

}
