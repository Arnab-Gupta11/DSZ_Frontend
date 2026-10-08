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
    const article = response.data;
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
  let article;
  let allArticles = [];

  try {
    const response = await api.getArticleBySlug(p.slug);
    article = response.data;
    
    // We fetch all articles to determine related articles
    const articlesResponse = await api.getArticles();
    allArticles = articlesResponse.data || [];
  } catch (error) {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const sameCategory = allArticles.filter((a) => a.slug !== article.slug && a.category === article.category);
  const others = allArticles.filter((a) => a.slug !== article.slug && a.category !== article.category);
  const related = [...sameCategory, ...others].slice(0, 3);

  return <InsightDetailClient article={article} related={related} />;
}