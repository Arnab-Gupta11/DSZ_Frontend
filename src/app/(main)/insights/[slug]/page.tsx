"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '../_components/ArticleCard';
import { ShareButtons } from '../_components/ShareButtons';
import { FinalCta } from '@/components/cta/FinalCta';
import { notFound } from 'next/navigation';
import { articles } from '@/constants/articles';
import { useSeo } from '@/hooks/useSeo';
import { formatDate } from '@/utils/date';
import { easeOut } from '@/utils/motion';

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  useSeo({
    title: article ? article.title : 'Article not found',
    description: article ? article.excerpt : 'This article could not be found.',
    path: `/insights/${slug ?? ''}`,
    image: article?.image,
    type: 'article'
  });

  if (!article) return notFound();

  const sameCategory = articles.filter((a) => a.slug !== article.slug && a.category === article.category);
  const others = articles.filter((a) => a.slug !== article.slug && a.category !== article.category);
  const related = [...sameCategory, ...others].slice(0, 3);

  return (
    <>
      <article className="bg-paper pb-24 pt-32 text-ink lg:pb-32 lg:pt-44">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link href="/insights"
              className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-2 transition-colors duration-200 hover:text-ink">
              
              <ArrowLeftIcon aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              All insights
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}>
              
              <p className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-medium text-ink-teal">{article.category}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-ink/30" />
                <time dateTime={article.date} className="text-ink-2">
                  {formatDate(article.date)}
                </time>
                <span aria-hidden className="h-1 w-1 rounded-full bg-ink/30" />
                <span className="text-ink-2">{article.readTime}</span>
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em]">
                {article.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-ink-2">{article.excerpt}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ clipPath: 'inset(8% 4% 8% 4% round 28px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[28px]">
            
            <img src={article.image} alt={article.imageAlt} className="aspect-[16/9] w-full object-cover" />
          </motion.div>

          <div className="mx-auto mt-14 max-w-[68ch] text-[1.125rem] leading-[1.8] text-ink/85">
            {article.body.map((block, i) => {
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

      <section aria-labelledby="related-title" className="bg-navy py-24 lg:py-32">
        <Container>
          <h2 id="related-title" className="font-display text-3xl font-bold tracking-[-0.03em] text-white lg:text-4xl">
            Related articles
          </h2>
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) =>
            <ArticleCard key={a.slug} article={a} />
            )}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>);

}