"use client";

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';
import { Container } from '@/components/ui/Container';
import { FinalCta } from '@/components/cta/FinalCta';
import { JobHero } from './_components/JobHero/JobHero';
import { JobContent } from './_components/JobContent/JobContent';
import { JobSidebar } from './_components/JobSidebar/JobSidebar';
import { ApplyForm } from './_components/ApplyForm/ApplyForm';
import { RelatedJobs } from './_components/RelatedJobs/RelatedJobs';
import { useSeo } from '@/hooks/useSeo';
import { api } from '@/lib/api/client';
import type { IJob } from '@/types/api';

export default function JobDetails() {
  const { slug } = useParams<{slug: string;}>();
  const [job, setJob] = useState<IJob | null>(null);
  const [allJobs, setAllJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, allJobsRes] = await Promise.all([
          api.getJobBySlug(slug),
          api.getJobs({ limit: 100 })
        ]);
        setJob(jobRes.data);
        setAllJobs(allJobsRes.data || []);
      } catch (e) {
        console.error("Job not found:", e);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  useSeo({
    title: job ? `${job.title} — Careers` : 'Position not found',
    description: job ? job.short : 'This position could not be found.',
    path: `/careers/${slug ?? ''}`
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <Container>
          <div className="flex flex-col gap-6">
            <div className="h-8 w-24 animate-pulse rounded-full bg-line-dark" />
            <div className="h-16 w-3/4 max-w-3xl animate-pulse rounded-2xl bg-line-dark" />
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="h-10 w-32 animate-pulse rounded-full bg-line-dark" />
              <div className="h-10 w-32 animate-pulse rounded-full bg-line-dark" />
              <div className="h-10 w-32 animate-pulse rounded-full bg-line-dark" />
            </div>
            <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                <div className="h-6 w-full animate-pulse rounded-md bg-line-dark" />
                <div className="h-6 w-full animate-pulse rounded-md bg-line-dark" />
                <div className="h-6 w-5/6 animate-pulse rounded-md bg-line-dark" />
                <div className="h-6 w-4/6 animate-pulse rounded-md bg-line-dark" />
              </div>
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="h-64 w-full animate-pulse rounded-2xl bg-line-dark" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!job) return notFound();

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
      <RelatedJobs job={job} allJobs={allJobs} />
      <FinalCta />
    </>);
}
