"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ArrowRightIcon } from 'lucide-react';
import { formatDate } from '@/utils/date';
import type { IArticle } from '@/types/api';

interface ArticleCardProps {
  article: IArticle;
  tone?: 'dark' | 'light';
}

export function ArticleCard({ article, tone = 'dark' }: ArticleCardProps) {
  const light = tone === 'light';

  // Fallback date
  const articleDate = article.publishedAt || article.createdAt;

  return (
    <article className="group h-full">
      <Link href={`/insights/${article.slug}`}
        className="flex h-full flex-col rounded-2xl transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5">
        
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-navy-700">
          <Image
            src={article.image || '/placeholder-image.jpg'}
            alt={article.imageAlt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]" />
        </div>
        <div className="mt-5 flex items-center gap-3 text-sm">
          <span className={`font-medium ${light ? 'text-ink-teal' : 'text-cyan'}`}>
            {typeof article.category === 'object' ? article.category?.title : article.category}
          </span>
          <span aria-hidden className={`h-1 w-1 rounded-full ${light ? 'bg-ink/30' : 'bg-white/30'}`} />
          <time dateTime={articleDate} className={light ? 'text-ink-2' : 'text-fg-3'}>
            {articleDate ? formatDate(articleDate) : 'Unknown date'}
          </time>
        </div>
        <h3
          className={`mt-3 font-display text-xl font-bold leading-snug tracking-[-0.02em] ${
          light ? 'text-ink' : 'text-white'}`
          }>
          
          {article.title}
        </h3>
        <p className={`mt-2 line-clamp-2 text-[15px] leading-relaxed ${light ? 'text-ink-2' : 'text-fg-2'}`}>
          {article.excerpt}
        </p>
        <span
          className={`mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium ${light ? 'text-ink' : 'text-white'}`}>
          
          Read Article
          <ArrowRightIcon
            aria-hidden
            className={`h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[5px] ${
            light ? 'text-ink-teal' : 'text-cyan'}`
            } />
          
        </span>
      </Link>
    </article>);
}