"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '../../_components/ArticleCard';
import { ShareButtons } from '../../_components/ShareButtons';
import { FinalCta } from '@/components/cta/FinalCta';
import { formatDate } from '@/utils/date';
import { easeOut } from '@/utils/motion';
import type { IArticle } from '@/types/api';

interface InsightDetailClientProps {
  article: IArticle;
  related: IArticle[];
}

export function InsightDetailClient({ article, related }: InsightDetailClientProps) {
  const articleDate = article.publishedAt || article.createdAt;

  return (
    <>
      {/* Hero section matching theme */}
      <div className="bg-navy pb-24 pt-32 lg:pb-32 lg:pt-44">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link href="/insights"
              className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-fg-2 transition-colors duration-200 hover:text-white">
              <ArrowLeftIcon aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              All insights
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}>
              
              <p className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-medium text-cyan">{article.category}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
                <time dateTime={articleDate} className="text-fg-2">
                  {formatDate(articleDate)}
                </time>
                <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
                <span className="text-fg-2">{article.readTime}</span>
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white">
                {article.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-fg-2">{article.excerpt}</p>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Content section */}
      <article className="bg-paper pb-24 text-ink lg:pb-32">
        <Container>
          <motion.div
            initial={{ clipPath: 'inset(8% 4% 8% 4% round 28px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            className="mx-auto -mt-14 max-w-5xl overflow-hidden rounded-[28px] relative z-10 shadow-2xl aspect-[16/9]">
            
            <Image 
              src={article.image || '/placeholder-image.jpg'} 
              alt={article.imageAlt || article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover" 
            />
          </motion.div>

          <div className="mx-auto mt-14 max-w-[68ch] text-[1.125rem] leading-[1.8] text-ink/85">
            {article.body?.map((block, i) => {
              switch (block.type) {
                case 'h2':
                  return (
                    <h2 key={i} className="mt-12 font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-3xl">
                      {block.text}
                    </h2>);

                case 'quote':
                  return (
                    <blockquote
                      key={i}
                      className="my-10 border-l-2 border-ink-teal pl-6 font-display text-2xl font-medium leading-snug text-ink">
                      {block.text}
                    </blockquote>);

                case 'list':
                  return (
                    <ul key={i} className="mt-6 space-y-2 pl-5 [list-style:disc] marker:text-ink-teal">
                      {block.items.map((item) =>
                        <li key={item}>{item}</li>
                      )}
                    </ul>);
                    
                case 'html':
                  return (
                    <div key={i} className="mt-6 prose prose-lg prose-p:text-ink/85 prose-headings:text-ink prose-a:text-ink-teal max-w-none" dangerouslySetInnerHTML={{ __html: block.text }} />
                  );

                default:
                  return (
                    <p key={i} className="mt-6">
                      {block.text}
                    </p>);
              }
            })}

            <div className="mt-14 flex flex-col gap-6 border-t border-line-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-2">Written by {article.author}</p>
              <ShareButtons title={article.title} />
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-navy py-24 lg:py-32">
          <Container>
            <h2 id="related-title" className="font-display text-3xl font-bold tracking-[-0.03em] text-white lg:text-4xl">
              Related articles
            </h2>
            <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) =>
                <ArticleCard key={a._id || a.slug} article={a} />
              )}
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  );
}

