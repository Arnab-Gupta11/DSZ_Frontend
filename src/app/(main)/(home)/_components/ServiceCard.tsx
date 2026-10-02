"use client";

import React from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { useParallax } from '@/hooks/useParallax';
import type { Service } from '@/types/content';

interface ServiceCardProps {
  service: Service;
  index: number;
  parallax: number;
}

export function ServiceCard({ service, index, parallax }: ServiceCardProps) {
  const { ref, y } = useParallax<HTMLDivElement>(parallax);
  const Icon = service.icon;

  return (
    <motion.div ref={ref} style={{ y }} className="h-full" suppressHydrationWarning>
      <Reveal delay={index % 3 * 0.08} className="h-full">
        <Link href={`/services#${service.slug}`}
          className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-line-accent hover:bg-surface-hover hover:shadow-[0_28px_60px_-30px_rgba(2,224,223,0.45)] lg:p-8">
          
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'radial-gradient(circle, rgba(2,224,223,0.16), transparent 70%)' }} />
          
          <div className="relative flex items-start justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-navy-700 text-cyan transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-6 group-hover:scale-105">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-sm font-medium tabular-nums text-fg-3">{service.number}</span>
          </div>
          <h3 className="relative mt-10 font-display text-2xl font-bold tracking-[-0.02em] text-white">
            {service.title}
          </h3>
          <p className="relative mt-3 text-[15px] leading-relaxed text-fg-2">{service.short}</p>
          <span className="relative mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-white">
            Explore service
            <ArrowRightIcon
              aria-hidden
              className="h-4 w-4 text-cyan transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[5px]" />
            
          </span>
        </Link>
      </Reveal>
    </motion.div>);

}