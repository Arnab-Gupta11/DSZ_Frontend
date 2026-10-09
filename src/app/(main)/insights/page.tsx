import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { InsightListClient } from './_components/InsightListClient';
import { api } from '@/lib/api/client';

export const metadata = {
  title: 'Insights | Digital Soft Zone',
  description: 'Marketing tips, AI tools, case studies and news from the Digital Soft Zone team.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function InsightsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const category =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : undefined;
  const pageParam =
    typeof resolvedParams.page === "string"
      ? parseInt(resolvedParams.page, 10)
      : 1;

  const [articlesRes, servicesRes] = await Promise.all([
    api.getArticles({ limit: 6, page: pageParam, category }),
    api.getServices(),
  ]);
  
  const initialArticles = articlesRes.data || [];
  const initialMeta = articlesRes.meta || { page: pageParam, limit: 6, total: 0, totalPages: 1 };
  const services = servicesRes.data || [];

  return (
    <>
      <PageHero
        label="Insights"
        title="Insights"
        description="Practical ideas on marketing, design, technology and growth — from the DSZ team." 
      />

      <section aria-label="Articles" className="bg-paper py-16 text-ink lg:py-24">
        <InsightListClient 
          initialArticles={initialArticles} 
          initialMeta={initialMeta}
          services={services} 
          currentCategory={category}
        />
      </section>
    </>
  );
}