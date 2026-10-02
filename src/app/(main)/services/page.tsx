"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { ServiceDetail } from './_components/ServiceDetail';
import { FinalCta } from '@/components/cta/FinalCta';
import { services } from '@/constants/services';
import { useSeo } from '@/hooks/useSeo';

export default function Services() {
  const pathname = usePathname();

  useSeo({
    title: 'Services',
    description:
    'Brand strategy, digital marketing, graphic design, video production, web & app development and business automation from Digital Soft Zone.',
    path: '/services'
  });

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
    <>
      <PageHero
        label="Services"
        title="Our Services"
        description="Strategy, creativity and technology — working together." />
      

      <nav
        aria-label="Services"
        className="sticky top-[72px] z-30 border-y border-line bg-[rgba(4,28,38,0.88)] backdrop-blur-xl lg:top-20">
        
        <Container>
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-3 sm:mx-0 sm:px-0">
            {services.map((s) =>
            <li key={s.slug} className="shrink-0">
                <a
                href={`#${s.slug}`}
                onClick={(e) => jumpTo(e, s.slug)}
                className="flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-fg-2 transition-colors duration-200 hover:border-line-accent hover:text-white">
                
                  <span className="font-display text-xs tabular-nums text-cyan">{s.number}</span>
                  {s.title}
                </a>
              </li>
            )}
          </ul>
        </Container>
      </nav>

      {services.map((service, i) =>
      <ServiceDetail key={service.slug} service={service} index={i} />
      )}

      <FinalCta
        title="Have a project in mind?"
        accent={['mind?']}
        description="Tell us where you want to go. We'll come back with a clear plan and a quote."
        primaryLabel="Get a Quote"
        secondaryLabel="See Our Work"
        secondaryTo="/work" />
      
    </>);

}