"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface FilterOption {
  label: string;
  count: number;
}

interface JobFiltersProps {
  options: FilterOption[];
  active: string;
  onChange: (value: string) => void;
}

/** Pill filter chips with a sliding active background. */
export function JobFilters({ options, active, onChange }: JobFiltersProps) {
  return (
    <ul
      aria-label="Filter by department"
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      
      {options.map(({ label, count }) => {
        const isActive = active === label;
        return (
          <li key={label} className="shrink-0">
            <button
              type="button"
              onClick={() => onChange(label)}
              aria-pressed={isActive}
              className={`relative flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
              isActive ? 'border-ink text-white' : 'border-line-dark text-ink-2 hover:border-ink hover:text-ink'}`
              }>
              
              {isActive &&
              <motion.span
                layoutId="job-filter-pill"
                aria-hidden
                className="absolute inset-0 -z-0 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }} />

              }
              <span className="relative z-10">{label}</span>
              <span
                className={`relative z-10 rounded-full px-1.5 text-[11px] tabular-nums transition-colors ${
                isActive ? 'bg-cyan text-navy' : 'bg-ink/5 text-ink-2'}`
                }>
                
                {count}
              </span>
            </button>
          </li>);

      })}
    </ul>);

}
