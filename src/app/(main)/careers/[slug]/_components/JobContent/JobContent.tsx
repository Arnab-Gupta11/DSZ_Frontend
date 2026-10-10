"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { JobSection } from './_components/JobSection/JobSection';
import { HiringProcess } from './_components/HiringProcess/HiringProcess';
import { easeOut } from '@/utils/motion';
import type { IJob } from "@/types/api";

export function JobContent({ job }: {job: IJob;}) {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeOut }}>
        
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">About the role</h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-2 lg:text-xl">{job.overview}</p>
      </motion.section>

      <JobSection title="What you’ll do" items={job.responsibilities} />
      <JobSection title="What we’re looking for" items={job.requirements} />
      <JobSection title="Nice to have" items={job.niceToHave} variant="plus" />

      {job.tools.length > 0 &&
      <section className="border-t border-line-dark pt-10">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Tools you’ll use</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {job.tools.map((tool, i) =>
          <motion.li
            key={tool}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: easeOut, delay: i * 0.04 }}
            className="rounded-full border border-line-dark bg-white/60 px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white">
            
                {tool}
              </motion.li>
          )}
          </ul>
        </section>
      }

      <JobSection title="What we offer" items={job.benefits} />
      <HiringProcess />
    </div>);

}
