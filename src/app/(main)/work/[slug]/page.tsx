"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { FinalCta } from '@/components/cta/FinalCta';
import { notFound } from 'next/navigation';
import { projects } from '@/constants/projects';
import { useSeo } from '@/hooks/useSeo';
import { easeOut } from '@/utils/motion';

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useSeo({
    title: project ? `${project.title} — Case Study` : 'Case study not found',
    description: project ? project.summary : 'This case study could not be found.',
    path: `/work/${slug ?? ''}`,
    image: project?.image,
    type: 'article'
  });

  if (!project) return notFound();
  const next = projects[(index + 1) % projects.length];

  const meta = [
  { label: 'Client', value: project.client },
  { label: 'Industry', value: project.industry },
  { label: 'Services', value: project.services.join(', ') },
  { label: 'Year', value: project.year }];


  const story = [
  { label: 'Challenge', question: 'What was the problem?', text: project.challenge },
  { label: 'Strategy', question: 'What did DSZ do?', text: project.strategy }];


  return (
    <>
      <section className="bg-navy pb-12 pt-32 lg:pt-44">
        <Container>
          <Link href="/work"
            className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-fg-2 transition-colors duration-200 hover:text-white">
            
            <ArrowLeftIcon aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All work
          </Link>
          <p className="mt-8 text-sm font-medium text-cyan">{project.industry}</p>
          <AnimatedText
            as="h1"
            onMount
            delay={0.1}
            text={project.title}
            className="mt-4 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white" />
          
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4">
            {meta.map((m, i) =>
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.35 + i * 0.06 }}>
              
                <dt className="text-sm text-fg-3">{m.label}</dt>
                <dd className="mt-1.5 text-[15px] text-white">{m.value}</dd>
              </motion.div>
            )}
          </dl>
        </Container>
      </section>

      <section aria-label="Project hero image" className="bg-navy">
        <Container>
          <motion.div
            initial={{ clipPath: 'inset(10% 6% 10% 6% round 28px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="overflow-hidden rounded-[28px] bg-navy-700">
            
            <img src={project.image} alt={project.imageAlt} className="aspect-[16/10] w-full object-cover lg:aspect-[21/10]" />
          </motion.div>
          <p className="mt-6 flex items-start gap-2 text-sm text-fg-3">
            <InfoIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            Case study copy is placeholder — replace bracketed content with the real project story and results.
          </p>
        </Container>
      </section>

      <section className="bg-navy py-24 lg:py-32">
        <Container className="space-y-20 lg:space-y-28">
          {story.map((s) =>
          <div key={s.label} className="grid gap-6 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-white lg:text-4xl">{s.label}</h2>
                <p className="mt-2 text-fg-3">{s.question}</p>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-8">
                <p className="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.35] tracking-[-0.01em] text-fg-2">
                  {s.text}
                </p>
              </Reveal>
            </div>
          )}
        </Container>
      </section>

      <section aria-labelledby="execution-title" className="bg-navy-800 py-24 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h2 id="execution-title" className="font-display text-3xl font-bold tracking-[-0.03em] text-white lg:text-4xl">
                Execution
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-2">{project.execution}</p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {project.executionPoints.map((pt) =>
                <li key={pt} className="py-3.5 text-[15px] text-white">
                    {pt}
                  </li>
                )}
              </ul>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {project.gallery.map((img, i) =>
              <motion.div
                key={img.src}
                initial={{ clipPath: 'inset(0% 0% 100% 0% round 20px)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: easeOut, delay: i * 0.1 }}
                className={`overflow-hidden rounded-[20px] bg-navy-700 ${i === 1 ? 'sm:mt-16' : ''}`}>
                
                  <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="results-title" className="bg-navy py-24 lg:py-32">
        <Container>
          <Reveal>
            <h2 id="results-title" className="font-display text-3xl font-bold tracking-[-0.03em] text-white lg:text-4xl">
              Results
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-10 sm:grid-cols-3">
            {project.results.map((r, i) =>
            <Reveal key={r.label} delay={i * 0.08} className="border-t border-line pt-8">
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-cyan">
                  {r.value}
                </dd>
                <dd className="mt-3 text-fg-2">{r.label}</dd>
              </Reveal>
            )}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="gallery-title" className="bg-navy pb-24 lg:pb-32">
        <Container>
          <h2 id="gallery-title" className="sr-only">
            Gallery
          </h2>
          <motion.div
            initial={{ clipPath: 'inset(8% 8% 8% 8% round 28px)', opacity: 0.4 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="overflow-hidden rounded-[28px]">
            
            <img src={project.gallery[0].src} alt={project.gallery[0].alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
          </motion.div>

          <Link href={`/work/${next.slug}`}
            className="group mt-20 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
            
            <div>
              <p className="text-sm text-fg-3">Next project</p>
              <p className="mt-2 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-cyan">
                {next.title}
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-white transition-[background-color,border-color,color] duration-200 group-hover:border-cyan group-hover:bg-cyan group-hover:text-navy">
              <ArrowRightIcon aria-hidden className="h-5 w-5" />
            </span>
          </Link>
        </Container>
      </section>

      <FinalCta
        title="Have a similar challenge?"
        accent={['challenge?']}
        description="Tell us about it. We'll show you how we'd approach it."
        primaryLabel="Let's Talk"
        secondaryLabel="View More Work"
        secondaryTo="/work" />
      
    </>);

}