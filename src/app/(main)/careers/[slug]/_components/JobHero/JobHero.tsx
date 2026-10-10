"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, BanknoteIcon, CalendarIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/Button';
import { JobMetaChips } from '@/components/careers/JobMetaChips/JobMetaChips';
import { formatDate } from '@/utils/date';
import { easeOut } from '@/utils/motion';
import type { IJob } from "@/types/api";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut, delay }
});

export function JobHero({ job, closed }: {job: IJob;closed: boolean;}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy pb-16 pt-32 lg:pb-24 lg:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-[10%] -top-[40%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(2,224,223,0.11) 0%, rgba(5,45,53,0.45) 40%, transparent 70%)' }} />
        
        <div className="grid-pattern mask-radial absolute inset-0 opacity-60" />
      </div>

      <Container>
        <motion.div {...fade(0)}>
          <Link
            href="/careers#openings"
            className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-fg-2 transition-colors duration-200 hover:text-white">
            
            <ArrowLeftIcon
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            
            All openings
          </Link>
        </motion.div>

        <motion.p {...fade(0.05)} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
          {job.openings} opening{job.openings > 1 ? 's' : ''}
        </motion.p>

        <AnimatedText
          as="h1"
          onMount
          delay={0.1}
          text={job.title}
          className="mt-5 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white" />
        

        <motion.p {...fade(0.35)} className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2 lg:text-xl">
          {job.short}
        </motion.p>

        <motion.div {...fade(0.45)} className="mt-8 flex flex-wrap items-center gap-2">
          <JobMetaChips job={job} tone="dark" showOpenings={false} showExperience />
          {job.salary &&
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fg-2">
              <BanknoteIcon aria-hidden className="h-3.5 w-3.5" />
              {job.salary}
            </span>
          }
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-accent bg-cyan/5 px-3 py-1.5 text-xs font-medium text-cyan">
            <CalendarIcon aria-hidden className="h-3.5 w-3.5" />
            {closed ? 'Applications closed' : `Apply by ${formatDate(job.deadline)}`}
          </span>
        </motion.div>

        {!closed &&
        <motion.div {...fade(0.55)} className="mt-10">
            <Button href="#apply" size="lg">
              Apply for this role
            </Button>
          </motion.div>
        }
      </Container>
    </section>);

}
