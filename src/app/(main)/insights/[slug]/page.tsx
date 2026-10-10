import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { InsightDetailClient } from './_components/InsightDetailClient';
import { api } from '@/lib/api/client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await params;
  try {
    const response = await api.getArticleBySlug(p.slug);
    const article = response.data?.article;
    if (!article) return {};

    return {
      title: article.seo?.metaTitle || `${article.title} | DSZ Insights`,
      description: article.seo?.metaDescription || article.excerpt,
      openGraph: {
        images: article.seo?.ogImage ? [article.seo.ogImage] : [],
      },
      robots: article.seo?.noIndex ? "noindex, nofollow" : "index, follow",
    };
  } catch (error) {
    return {};
  }
}

export default async function InsightDetailPage({ params }: PageProps) {
  const p = await params;

  try {
    const response = await api.getArticleBySlug(p.slug);
    const article = response.data?.article;
    const related = response.data?.related || [];

    if (!article) {
      notFound();
    }

    return <InsightDetailClient article={article} related={related} />;
  } catch (error) {
    notFound();
  }
}