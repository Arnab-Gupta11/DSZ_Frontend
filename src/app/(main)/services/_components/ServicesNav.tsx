"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import type { IService } from '@/types/api';

export function ServicesNav({ services }: { services: IService[] }) {
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
        <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-3 sm:mx-0 sm:px-0">
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
      </Container>
    </nav>
  );
}

