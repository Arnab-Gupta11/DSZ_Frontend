"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { FinalCta } from '@/components/cta/FinalCta';
import { CultureValues } from './_components/CultureValues/CultureValues';
import { JobOpenings } from './_components/JobOpenings/JobOpenings';
import { Perks } from './_components/Perks/Perks';
import { useSeo } from '@/hooks/useSeo';
import { easeOut } from '@/utils/motion';
import { api } from '@/lib/api/client';
import type { IJob } from '@/types/api';

export default function Careers() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.getJobs({ limit: 100 });
        setJobs(response.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);
  useSeo({
    title: 'Careers',
    description:
    'Join Digital Soft Zone. We’re looking for passionate people who value flat hierarchies, clear communication and full ownership.',
    path: '/careers'
  });

  return (
    <>
      <PageHero
        label="We're hiring"
        title="Be part of our mission."
        accent={['mission.']}
        description="We’re looking for passionate people to join us. We value flat hierarchies, clear communication, and full ownership and responsibility.">
        
        <motion.a
          href="#openings"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.55 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-line-accent hover:bg-surface-hover">
          
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-fg-3" />
              Loading open roles...
            </span>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                {jobs.length > 0 &&
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                }
                <span className={`relative inline-flex h-2 w-2 rounded-full ${jobs.length > 0 ? 'bg-cyan' : 'bg-fg-3'}`} />
              </span>
              {jobs.length > 0 ?
              `${jobs.length} open ${jobs.length === 1 ? 'role' : 'roles'}` :
              'No open roles right now'}
            </>
          )}
        </motion.a>
      </PageHero>
      <CultureValues />
      <JobOpenings jobs={jobs} isLoading={isLoading} />
      <Perks />
      <FinalCta />
    </>);
}
