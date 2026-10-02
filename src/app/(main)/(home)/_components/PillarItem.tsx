"use client";

import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import type { Pillar } from '@/types/content';

interface PillarItemProps {
  pillar: Pillar;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
}

export function PillarItem({ pillar, index, active, onActivate }: PillarItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <li ref={ref} className="border-t border-line py-10 lg:flex lg:min-h-[56vh] lg:items-center lg:py-0">
      <div className="w-full">
        <img
          src={pillar.image}
          alt={pillar.imageAlt}
          loading="lazy"
          className="mb-8 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden" />
        
        <h3>
          <button
            type="button"
            onClick={() => onActivate(index)}
            aria-pressed={active}
            className="flex w-full items-baseline gap-5 text-left">
            
            <span
              className={`font-display text-sm font-medium tabular-nums transition-colors duration-300 ${
              active ? 'text-cyan' : 'text-fg-3'}`
              }>
              
              {pillar.number}
            </span>
            <span
              className={`font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] transition-colors duration-300 ${
              active ? 'text-white' : 'text-white lg:text-fg-3'}`
              }>
              
              {pillar.title}
            </span>
          </button>
        </h3>
        <div className="pl-10 sm:pl-11">
          <p className="mt-5 max-w-md text-base leading-relaxed text-fg-2">{pillar.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {pillar.points.map((p) =>
            <li
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-fg-2">
              
                <CheckIcon aria-hidden className="h-3.5 w-3.5 text-cyan" />
                {p}
              </li>
            )}
          </ul>
        </div>
      </div>
    </li>);

}