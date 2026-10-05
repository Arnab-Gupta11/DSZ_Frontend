"use client";

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';
import { Container } from '@/components/ui/Container';
import { FinalCta } from '@/components/cta/FinalCta';
import { JobHero } from './_components/JobHero/JobHero';
import { JobContent } from './_components/JobContent/JobContent';
import { JobSidebar } from './_components/JobSidebar/JobSidebar';
import { ApplyForm } from './_components/ApplyForm/ApplyForm';
import { RelatedJobs } from './_components/RelatedJobs/RelatedJobs';
import { jobs } from '@/constants/jobs';
import { useSeo } from '@/hooks/useSeo';

export default function JobDetails() {
  const { slug } = useParams<{slug: string;}>();
  const job = jobs.find((j) => j.slug === slug);

  useSeo({
    title: job ? `${job.title} — Careers` : 'Position not found',
    description: job ? job.short : 'This position could not be found.',
    path: `/careers/${slug ?? ''}`
  });

  if (!job) notFound();

  const closed = parseISO(job.deadline) < startOfDay(new Date());

  return (
    <>
      <JobHero job={job} closed={closed} />

      <section className="bg-paper py-20 text-ink lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <JobContent job={job} />
            </div>
            <div className="lg:col-span-5 xl:col-span-4">
              <JobSidebar job={job} closed={closed} />
            </div>
          </div>
        </Container>
      </section>

      {!closed && <ApplyForm job={job} />}
      <RelatedJobs job={job} />
      <FinalCta />
    </>);

}
