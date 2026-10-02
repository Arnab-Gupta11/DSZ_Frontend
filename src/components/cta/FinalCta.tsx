"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../ui/Container';
import { AnimatedText } from '../ui/AnimatedText';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/MagneticButton';
import { useParallax } from '@/hooks/useParallax';

interface FinalCtaProps {
  title?: string;
  description?: string;
  accent?: string[];
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function FinalCta({
  title = "Let's Build Something That Matters.",
  description = 'Have a brand, product or idea ready to move forward?',
  accent = ['Matters.'],
  primaryLabel = 'Get a Free Quote',
  primaryTo = '/contact',
  secondaryLabel = 'Book a Call',
  secondaryTo = '/contact?topic=call'
}: FinalCtaProps) {
  const reduce = useReducedMotion();
  const { ref, y } = useParallax<HTMLElement>(40);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden py-28 lg:py-44"
      style={{ background: 'radial-gradient(120% 90% at 50% 100%, #06423F 0%, #052D35 38%, #041C26 78%)' }}>
      
      <motion.div aria-hidden style={{ y }} suppressHydrationWarning className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-pattern mask-radial absolute inset-0 opacity-50" />
        <motion.div
          className="absolute left-[8%] top-[18%] h-24 w-24 rounded-3xl border border-line-accent lg:h-32 lg:w-32"
          animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        
        <motion.div
          className="absolute bottom-[16%] right-[10%] h-28 w-28 rounded-full border border-line lg:h-40 lg:w-40"
          animate={reduce ? undefined : { y: [0, 16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[760px] max-w-[120vw] rounded-full"
        style={{ x: '-50%', y: '-50%', background: 'radial-gradient(ellipse, rgba(2,224,223,0.22) 0%, rgba(5,216,181,0.06) 45%, transparent 70%)' }}
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      

      <Container className="relative text-center">
        <div id="cta-title">
          <AnimatedText
            as="h2"
            text={title}
            accent={accent}
            className="mx-auto max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white" />
          
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-fg-2">{description}</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Button to={primaryTo} size="lg">
                {primaryLabel}
              </Button>
            </MagneticButton>
            <Button to={secondaryTo} size="lg" variant="secondary">
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>);

}