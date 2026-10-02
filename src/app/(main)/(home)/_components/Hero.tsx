"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { HeroVisual } from './HeroVisual';
import { useCanHover } from '@/hooks/useMediaQuery';
import { usePreloader } from '@/contexts/PreloaderContext';
import { easeOut } from '@/utils/motion';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const canHover = useCanHover();
  const { isReady } = usePreloader();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 20, mass: 0.6 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, (v) => reduce ? 0 : v * 90);
  const visualY = useTransform(scrollYProgress, (v) => reduce ? 0 : v * -50);

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!canHover || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.6, ease: easeOut, delay }
  });

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-16 pt-28 lg:pb-20 lg:pt-32">
      
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-[15%] -top-[25%] h-[80vw] max-h-[1000px] w-[80vw] max-w-[1000px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(2,224,223,0.13) 0%, rgba(5,45,53,0.5) 40%, transparent 70%)' }}
          animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
        
        <motion.div
          className="absolute -bottom-[35%] -left-[20%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(5,216,181,0.09) 0%, transparent 65%)' }}
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />
        
        <div className="grid-pattern mask-radial absolute inset-0 opacity-70" />
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: contentY }} suppressHydrationWarning className="lg:col-span-7">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3">
            <Logo compact markClassName="h-8 w-8" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-fg-2">Digital Soft Zone</span>
          </motion.div>

          <div id="hero-title">
            <AnimatedText
              as="h1"
              onMount
              delay={0.15}
              stagger={0.07}
              text="Digital experiences built to move brands forward."
              accent={['forward.']}
              className="mt-8 font-display text-[clamp(2.6rem,4.9vw,4.75rem)] font-bold leading-[1] tracking-[-0.045em] text-white" />
            
          </div>

          <motion.p {...fadeUp(0.55)} className="mt-7 max-w-xl text-lg leading-relaxed text-fg-2">
            <span className="text-white">Brand strategy, digital marketing, design, video, web &amp; app development</span>{' '}
            and <span className="text-white">business automation</span> — brought together under one digital agency.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <motion.div {...fadeUp(0.68)}>
              <MagneticButton>
                <Button to="/contact" size="lg">
                  Get a Free Quote
                </Button>
              </MagneticButton>
            </motion.div>
            <motion.div {...fadeUp(0.76)}>
              <Button to="/work" size="lg" variant="secondary">
                View Our Work
              </Button>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp(0.9)}
            className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-fg-3">
            
            <span>Strategy</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-cyan" />
            <span>Creative</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-turq" />
            <span>Technology</span>
          </motion.p>
        </motion.div>

        <motion.div style={{ y: visualY }} suppressHydrationWarning className="lg:col-span-5">
          <HeroVisual mx={sx} my={sy} />
        </motion.div>
      </Container>
    </section>);

}