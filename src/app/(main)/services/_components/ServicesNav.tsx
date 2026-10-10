"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import type { IService } from '@/types/api';

export function ServicesNav({ services }: { services: IService[] }) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (!(typeof window !== 'undefined' ? window.location.hash : '')) return;
    const id = (typeof window !== 'undefined' ? window.location.hash : '').slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(t);
  }, [(typeof window !== 'undefined' ? window.location.hash : '')]);

  const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${slug}`);
  };

  return (
    <nav
      aria-label="Services"
      className="sticky top-[72px] z-30 border-y border-line bg-[rgba(4,28,38,0.88)] backdrop-blur-xl lg:top-20">
      
      <Container>
        <div className="flex w-full items-center min-w-0 overflow-hidden py-3">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={`hidden shrink-0 mr-3 h-9 w-9 items-center justify-center rounded-full bg-navy border border-line text-cyan transition-colors hover:bg-cyan hover:text-navy lg:flex ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <ul 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="no-scrollbar -mx-5 flex flex-1 gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          >
            {services.map((s, index) => {
              const formattedNumber = (index + 1).toString().padStart(2, '0');
              return (
                <li key={s.slug} className="shrink-0">
                  <a
                    href={`#${s.slug}`}
                    onClick={(e) => jumpTo(e, s.slug)}
                    className="flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-fg-2 transition-colors duration-200 hover:border-line-accent hover:text-white">
                    <span className="font-display text-xs tabular-nums text-cyan">{formattedNumber}</span>
                    {s.title}
                  </a>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </Container>
    </nav>
  );
}

