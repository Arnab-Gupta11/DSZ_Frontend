"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { AnimatedText } from './AnimatedText';
import { easeOut } from '@/utils/motion';

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  accent?: string[];
  children?: React.ReactNode;
}

export function PageHero({ label, title, description, accent = [], children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy pb-16 pt-36 lg:pb-24 lg:pt-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-[10%] -top-[40%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(2,224,223,0.11) 0%, rgba(5,45,53,0.45) 40%, transparent 70%)' }} />
        
        <div className="grid-pattern mask-radial absolute inset-0 opacity-60" />
      </div>
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
          
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
          {label}
        </motion.p>
        <AnimatedText
          as="h1"
          onMount
          delay={0.1}
          text={title}
          accent={accent}
          className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,7.5vw,7rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white" />
        
        {description &&
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2 lg:text-xl">
          
            {description}
          </motion.p>
        }
        {children}
      </Container>
    </section>);

}