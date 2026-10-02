"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '@/constants/testimonials';
import { easeOut } from '@/utils/motion';

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;
  const t = testimonials[index];

  const paginate = (delta: number) => setState(([i]) => [(i + delta + count) % count, delta]);
  const goTo = (next: number) => setState(([i]) => [next, next > i ? 1 : -1]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setState(([i]) => [(i + 1) % count, 1]), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) paginate(1);else
    if (info.offset.x > 60) paginate(-1);
  };

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="bg-paper py-24 text-ink lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      
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
              {testimonials.map((item, i) =>
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
                  i === index ? 'w-6 bg-ink' : 'w-1.5 bg-ink/25'}`
                  } />
                
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <span aria-hidden className="block font-display text-[7rem] font-bold leading-[0.6] text-ink-teal">
            &ldquo;
          </span>
          <div className="relative mt-6 min-h-[320px] overflow-hidden sm:min-h-[280px]" aria-live={paused ? 'polite' : 'off'}>
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
                className="cursor-grab touch-pan-y active:cursor-grabbing">
                
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
                  <span className="rounded-full border border-line-dark px-3 py-1 text-xs text-ink-2 sm:ml-auto">
                    Sample — replace with real client words
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>);

}