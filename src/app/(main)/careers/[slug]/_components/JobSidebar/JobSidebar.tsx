"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { ShareButtons } from '@/app/(main)/insights/_components/ShareButtons';
import { formatDate } from '@/utils/date';
import { easeOut } from '@/utils/motion';
import type { IJob } from "@/types/api";

export function JobSidebar({ job, closed }: {job: IJob;closed: boolean;}) {
  const daysLeft = differenceInCalendarDays(parseISO(job.deadline), new Date());

  const rows = [
  { label: 'Department', value: job.department },
  { label: 'Location', value: `${job.location} · ${job.city}` },
  { label: 'Employment', value: job.type },
  { label: 'Experience', value: job.experience },
  ...(job.salary ? [{ label: 'Salary', value: job.salary }] : []),
  { label: 'Posted', value: formatDate(job.postedAt) },
  { label: 'Deadline', value: formatDate(job.deadline) }];


  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
      className="lg:sticky lg:top-28">
      
      <div className="overflow-hidden rounded-[28px] bg-navy p-7 text-white shadow-[0_30px_80px_-40px_rgba(4,28,38,0.6)] sm:p-8">
        <p className="text-sm font-medium text-fg-3">Job summary</p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.03em]">{job.title}</h2>

        <dl className="mt-6 divide-y divide-line border-y border-line">
          {rows.map((r) =>
          <div key={r.label} className="flex items-center justify-between gap-4 py-3 text-sm">
              <dt className="text-fg-3">{r.label}</dt>
              <dd className="text-right font-medium text-white">{r.value}</dd>
            </div>
          )}
        </dl>

        <p suppressHydrationWarning className="mt-5 flex items-center gap-2 text-sm text-fg-2">
          <span className={`h-2 w-2 rounded-full ${closed ? 'bg-[#FF8A8A]' : 'bg-cyan shadow-[0_0_10px_rgba(2,224,223,0.9)]'}`} />
          {closed ?
          'Applications for this role are closed.' :
          daysLeft === 0 ?
          'Last day to apply!' :
          `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left to apply`}
        </p>

        {!closed &&
        <Button href="#apply" className="mt-6 w-full" size="lg">
            Apply now
          </Button>
        }
      </div>

      <div className="mt-6 px-2">
        <ShareButtons title={`${job.title} — Digital Soft Zone careers`} />
      </div>
    </motion.aside>);

}
