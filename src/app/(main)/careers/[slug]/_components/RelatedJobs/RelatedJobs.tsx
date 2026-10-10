"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { JobRow } from '@/components/careers/JobRow/JobRow';
import type { IJob } from "@/types/api";

export function RelatedJobs({ job, allJobs }: {job: IJob; allJobs: IJob[]}) {
  const others = allJobs.filter((j) => j.slug !== job.slug);
  const related = others.slice(0, 3);

  if (!related.length) return null;

  return (
    <section aria-labelledby="related-jobs-title" className="bg-paper py-24 text-ink lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="related-jobs-title"
            className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1] tracking-[-0.04em]">
            
            Other openings
          </h2>
          <Button to="/careers#openings" variant="outline-dark" size="sm">
            View all
          </Button>
        </div>
        <ul className="mt-12 lg:pl-6">
          {related.map((j, i) =>
          <JobRow key={j.slug} job={j} index={i} />
          )}
        </ul>
      </Container>
    </section>);

}
