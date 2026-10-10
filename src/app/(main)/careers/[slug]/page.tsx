import React from 'react';
import { notFound } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FinalCta } from '@/components/cta/FinalCta';
import { JobHero } from './_components/JobHero/JobHero';
import { JobContent } from './_components/JobContent/JobContent';
import { JobSidebar } from './_components/JobSidebar/JobSidebar';
import { ApplyForm } from './_components/ApplyForm/ApplyForm';
import { RelatedJobs } from './_components/RelatedJobs/RelatedJobs';
import { api } from '@/lib/api/client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await params;
  try {
    const response = await api.getJobBySlug(p.slug);
    const job = response.data;
    if (!job) return {};

    return {
      title: `${job.title} — Careers`,
      description: job.seo?.metaDescription || job.short,
      robots: job.seo?.noIndex ? "noindex, nofollow" : "index, follow",
    };
  } catch (error) {
    return {};
  }
}

export default async function JobDetails({ params }: PageProps) {
  const p = await params;

  try {
    const [jobRes, allJobsRes] = await Promise.all([
      api.getJobBySlug(p.slug),
      api.getJobs({ limit: 100 })
    ]);
    
    const job = jobRes.data;
    const allJobs = allJobsRes.data || [];

    if (!job) {
      notFound();
    }

    const closed = parseISO(job.deadline.toString()) < startOfDay(new Date());

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
      </>
    );
  } catch (error) {
    notFound();
  }
}
