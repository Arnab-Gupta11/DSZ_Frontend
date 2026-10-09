"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ProjectCard } from '@/app/(main)/work/_components/ProjectCard';
import type { IWork } from '@/types/api';

export function FeaturedWorkParallax({ works }: { works: IWork[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Split into two columns
  const leftCol = works.filter((_, i) => i % 2 === 0);
  const rightCol = works.filter((_, i) => i % 2 !== 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax effect where columns move at slightly different speeds
  const leftY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [30, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-30, 80]);

  return (
    <div ref={containerRef} className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-0 items-start">
      <motion.div style={{ y: leftY }} className="flex flex-col gap-y-16 lg:gap-y-24">
        {leftCol.map(work => (
          <ProjectCard key={work._id || work.slug} project={work} size="wide" />
        ))}
      </motion.div>
      <motion.div style={{ y: rightY }} className="flex flex-col gap-y-16 lg:gap-y-24 lg:mt-32">
        {rightCol.map(work => (
          <ProjectCard key={work._id || work.slug} project={work} size="wide" />
        ))}
      </motion.div>
    </div>
  );
}

