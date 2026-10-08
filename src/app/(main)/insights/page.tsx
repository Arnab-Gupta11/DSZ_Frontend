import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { InsightListClient } from './_components/InsightListClient';
import { api } from '@/lib/api/client';

export const metadata = {
  title: 'Insights | Digital Soft Zone',
  description: 'Marketing tips, AI tools, case studies and news from the Digital Soft Zone team.',
};

export default async function InsightsPage() {
  const response = await api.getArticles();
  const initialArticles = response.data || [];

  return (
    <>
      <PageHero
        label="Insights"
        title="Insights"
        description="Practical ideas on marketing, design, technology and growth — from the DSZ team." 
      />

      <section aria-label="Articles" className="bg-paper py-16 text-ink lg:py-24">
        <InsightListClient initialArticles={initialArticles} />
      </section>
    </>
  );
}