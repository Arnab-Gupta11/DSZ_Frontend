"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView, type PanInfo } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '@/constants/testimonials';
import { easeOut } from '@/utils/motion';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.1 });
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const count = testimonials.length;
  const t = testimonials[index];

  const paginate = useCallback((delta: number) => {
    setState(([i]) => [(i + delta + count) % count, delta]);
  }, [count]);

  const goTo = useCallback((next: number) => {
    setState(([i]) => [next, next > i ? 1 : -1]);
  }, []);

  useEffect(() => {
    // Only auto-slide if section is currently visible in viewport AND not paused/hovered
    if (isPaused || !isSectionInView || count <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isSectionInView, index, count, paginate]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="bg-paper py-24 text-ink lg:py-36"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}>
      
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-4">
          <div id="testimonials-title">
            <SectionHeading tone="light" title="What Our Clients Say" />
          </div>
          <div className="mt-10 flex items-center gap-3 lg:mt-auto">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white">
              <ArrowLeftIcon className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white">
              <ArrowRightIcon className="h-5 w-5" aria-hidden />
            </button>
            <div className="ml-4 flex items-center" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${count}`}
                  onClick={() => goTo(i)}
                  className="flex h-11 w-7 items-center justify-center">
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                      i === index ? 'w-6 bg-ink' : 'w-1.5 bg-ink/25'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <span aria-hidden className="block font-display text-[7rem] font-bold leading-[0.6] text-ink-teal">
            &ldquo;
          </span>
          <div className="relative mt-6" aria-live={isPaused ? 'polite' : 'off'}>
            {/* Invisible grid sizer: Locks the container height to the tallest quote across all responsive breakpoints */}
            <div className="invisible pointer-events-none select-none grid grid-cols-1 grid-rows-1" aria-hidden="true">
              {testimonials.map((item) => (
                <div key={item.id} className="col-start-1 row-start-1">
                  <blockquote className="font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.02em]">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-10 flex flex-wrap items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full font-display text-sm font-bold">
                      {item.initials}
                    </span>
                    <span>
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-sm">
                        {item.role}, {item.company}
                      </span>
                    </span>
                  </figcaption>
                </div>
              ))}
            </div>

            {/* Active animated testimonial */}
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={t.id}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -40 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: easeOut }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
                  className="cursor-grab touch-pan-y active:cursor-grabbing w-full">
                  
                  <blockquote className="font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-10 flex flex-wrap items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-cyan">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{t.name}</span>
                      <span className="block text-sm text-ink-2">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}