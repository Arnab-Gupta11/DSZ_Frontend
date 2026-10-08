"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from './ArticleCard';
import { formatDate } from '@/utils/date';
import { easeOut } from '@/utils/motion';
import type { IArticle } from '@/types/api';

type Filter = string;
const articleCategories = ['Marketing Tips', 'AI Tools', 'Case Studies', 'DSZ News'];

interface InsightListClientProps {
  initialArticles: IArticle[];
}

export function InsightListClient({ initialArticles }: InsightListClientProps) {
  const [active, setActive] = useState<Filter>('All');

  const filtered = useMemo(
    () => active === 'All' ? initialArticles : initialArticles.filter((a) => a.category === active),
    [active, initialArticles]
  );
  
  const [featured, ...rest] = filtered;

  return (
    <Container>
      <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Filter by category">
        {(['All', ...articleCategories] as Filter[]).map((c) => {
          const isActive = active === c;
          return (
            <li key={c} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'border-ink bg-ink text-white' : 'border-line-dark text-ink-2 hover:border-ink hover:text-ink'}`
                }>
                {c}
              </button>
            </li>);
        })}
      </ul>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: easeOut }}>
          
          {featured ? (
            <Link href={`/insights/${featured.slug}`}
              className="group mt-12 grid items-center gap-8 rounded-[28px] lg:grid-cols-12 lg:gap-12">
              <div className="relative overflow-hidden rounded-[28px] lg:col-span-7 aspect-[16/10]">
                <Image
                  src={featured.image || '/placeholder-image.jpg'}
                  alt={featured.imageAlt || featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]" />
              </div>
              <div className="lg:col-span-5">
                <p className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-ink-teal">{featured.category}</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-ink/30" />
                  <time dateTime={featured.publishedAt || featured.createdAt} className="text-ink-2">
                    {formatDate(featured.publishedAt || featured.createdAt)}
                  </time>
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-2">{featured.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium">
                  Read Article
                  <ArrowRightIcon
                    aria-hidden
                    className="h-4 w-4 text-ink-teal transition-transform duration-200 group-hover:translate-x-[5px]" />
                </span>
              </div>
            </Link>
          ) : (
            <p className="mt-12 text-ink-2">No articles in this category yet.</p>
          )}

          {rest.length > 0 &&
            <div className="mt-20 grid gap-x-6 gap-y-14 border-t border-line-dark pt-16 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) =>
                 <ArticleCard key={a._id || a.slug} article={a} tone="light" />
              )}
            </div>
          }
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}

