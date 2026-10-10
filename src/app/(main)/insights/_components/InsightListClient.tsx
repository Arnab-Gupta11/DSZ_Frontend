"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from './ArticleCard';
import { formatDate } from '@/utils/date';
import { easeOut } from '@/utils/motion';
import { api } from '@/lib/api/client';
import { useSearchParams } from 'next/navigation';
import type { IArticle, IService } from '@/types/api';

export interface InsightListClientProps {
  initialArticles: IArticle[];
  initialMeta: { page: number; limit: number; total: number; totalPages: number };
  services: IService[];
  currentCategory?: string;
}

export function InsightListClient({ initialArticles, initialMeta, services, currentCategory }: InsightListClientProps) {
  const searchParams = useSearchParams();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(currentCategory || 'All');
  const [articles, setArticles] = useState<IArticle[]>(initialArticles);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isInitialLoad = React.useRef(true);

  const scrollContainerRef = React.useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, services]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const amount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const fetchArticles = useCallback(async (categoryId: string, pageNum: number) => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page: pageNum, limit: 6 };
      if (categoryId !== 'All') {
        params.category = categoryId;
      }
      const response = await api.getArticles(params);
      if (pageNum === 1) {
        setArticles(response.data || []);
      } else {
        setArticles(prev => [...prev, ...(response.data || [])]);
      }
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (error: any) {
      console.error('Failed to load articles:', error);
      if (pageNum === 1) setArticles([]);
      import("sonner").then((mod) => mod.toast.error(error?.message || "Failed to load insights."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    fetchArticles(activeCategoryId, page);
  }, [activeCategoryId, page, fetchArticles]);

  const handleCategoryChange = (categoryId: string) => {
    if (activeCategoryId !== categoryId) {
      setActiveCategoryId(categoryId);
      setPage(1);

      // Update URL without triggering Next.js routing
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      if (categoryId === "All") {
        params.delete("category");
      } else {
        params.set("category", categoryId);
      }
      window.history.pushState(null, "", `?${params.toString()}`);

      // Fetch will be triggered by useEffect
    }
  };

  const handleLoadMore = () => {
    if (page < meta.totalPages && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const [featured, ...rest] = articles;

  const filters = [
    { _id: 'All', title: 'All' },
    ...services.map(s => ({ _id: s._id, title: s.title }))
  ];

  return (
    <Container>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center w-full min-w-0 overflow-hidden">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={`hidden shrink-0 mr-3 h-9 w-9 items-center justify-center rounded-full bg-navy border border-line text-cyan transition-colors hover:bg-cyan hover:text-navy lg:flex ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll left"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <ul
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className={`no-scrollbar flex flex-1 gap-2 overflow-x-auto ${(loading && page === 1) ? "opacity-50" : "transition-opacity duration-300"}`}
            aria-label="Filter by category"
          >
            {filters.map((c) => {
              const isActive = activeCategoryId === c._id;
              return (
                <li key={c._id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(c._id)}
                    disabled={loading && page === 1}
                    aria-pressed={isActive}
                    className={`relative flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-navy" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="insight-filter"
                        className="absolute inset-0 rounded-full bg-cyan"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative whitespace-nowrap">{c.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className={`hidden shrink-0 ml-3 h-9 w-9 items-center justify-center rounded-full bg-navy border border-line text-cyan transition-colors hover:bg-cyan hover:text-navy lg:flex ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll right"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <p
          className="shrink-0 text-sm font-medium text-ink-2 lg:pl-4"
          aria-live="polite"
        >
          {meta?.total || 0} {meta?.total === 1 ? "article" : "articles"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategoryId} // Reset animation when category changes
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: easeOut }}>
          
          {loading && page === 1 ? (
            <ArticleSkeletonLoader />
          ) : (
            <>
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
                      <span className="font-medium text-ink-teal">
                        {typeof featured.category === 'object' ? featured.category?.title : featured.category}
                      </span>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-ink/30" />
                      <time dateTime={featured.publishedAt || featured.createdAt} className="text-ink-2">
                        {(featured.publishedAt || featured.createdAt) ? formatDate(featured.publishedAt || featured.createdAt) : 'Unknown date'}
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="mt-12 flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-line-dark bg-cyan/5 p-16 text-center relative"
                >
                  {/* Decorative background glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full pointer-events-none" />

                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-navy border border-line shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-50 rounded-2xl" />
                    <svg
                      className="relative z-10 h-10 w-10 text-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold text-navy tracking-wide">
                    No articles found
                  </h3>
                  <p className="mt-3 max-w-md text-ink-2 text-sm leading-relaxed">
                    We haven't published any articles for this category yet. Please check
                    back later or explore our other insights.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleCategoryChange("All")}
                    className="mt-8 group relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-cyan px-8 font-medium text-navy transition-all hover:bg-white"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Show all articles
                    </span>
                  </motion.button>
                </motion.div>
              )}

              {rest.length > 0 &&
                <div className="mt-20 grid gap-x-6 gap-y-14 border-t border-line-dark pt-16 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a) =>
                    <ArticleCard key={a._id || a.slug} article={a} tone="light" />
                  )}
                </div>
              }
              
              {/* Load More Button */}
              {page < meta.totalPages && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="rounded-full border border-line-dark px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Load More Articles'}
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}

function ArticleSkeletonLoader() {
  return (
    <div className="animate-pulse">
      {/* Featured Skeleton */}
      <div className="mt-12 grid items-center gap-8 rounded-[28px] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7 aspect-[16/10] rounded-[28px] bg-ink/10" />
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="h-4 w-32 rounded-full bg-ink/10" />
          <div className="h-12 w-full rounded-lg bg-ink/10" />
          <div className="h-12 w-3/4 rounded-lg bg-ink/10" />
          <div className="h-20 w-full rounded-lg bg-ink/10" />
          <div className="h-4 w-24 rounded-full bg-ink/10 mt-4" />
        </div>
      </div>
      
      {/* Rest Skeleton */}
      <div className="mt-20 grid gap-x-6 gap-y-14 border-t border-line-dark pt-16 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col gap-4">
            <div className="aspect-[3/2] w-full rounded-2xl bg-ink/10" />
            <div className="h-4 w-24 rounded-full bg-ink/10" />
            <div className="h-8 w-full rounded-lg bg-ink/10" />
            <div className="h-16 w-full rounded-lg bg-ink/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
