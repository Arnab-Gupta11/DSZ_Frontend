"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { FinalCta } from '@/components/cta/FinalCta';
import { images } from '@/constants/images';
import { site } from '@/constants/site';
import { values, team } from '@/constants/about';
import { useParallax } from '@/hooks/useParallax';
import { easeOut } from '@/utils/motion';

export function AboutClient() {
  const { ref, y } = useParallax<HTMLDivElement>(40);

  return (
    <>
      <PageHero
        label="About DSZ"
        title="A digital team, built in Chittagong."
        accent={['Chittagong.']}
        description="Strategists, designers, video makers and developers working as one team for growing brands." />
      

      {/* Our story */}
      <section aria-labelledby="story-title" className="overflow-hidden bg-navy pb-24 lg:pb-36">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div ref={ref} className="lg:col-span-7">
            <motion.div
              initial={{ clipPath: 'inset(0% 100% 0% 0% round 28px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="aspect-[4/3] overflow-hidden rounded-[28px] bg-navy-700">
              
              <motion.img
                src={images.office}
                alt="The Digital Soft Zone team working together in the studio"
                style={{ y, scale: 1.12 }} suppressHydrationWarning
                className="h-full w-full object-cover" />
              
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <h2 id="story-title" className="font-display text-4xl font-bold tracking-[-0.03em] text-white lg:text-5xl">
              Our story
            </h2>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-fg-2">
                <p>
                  Digital Soft Zone started with a simple observation: growing brands in Bangladesh were working with one
                  agency for design, another for marketing and a freelancer for their website — and nothing quite fit together.
                </p>
                <p>
                  So we built one team for all of it, based at Software Technology Park in Chittagong. Founded in{' '}
                  <span className="text-white">[FOUNDING YEAR]</span>.
                </p>
                <p className="text-fg-3">[Add more of the founding story, milestones and people here.]</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="bg-paper py-24 text-ink lg:py-36">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {[
          {
            label: 'Mission',
            text: 'To give growing brands the strategy, creative and technology they need — from one team that genuinely cares about their results.'
          },
          {
            label: 'Vision',
            text: 'A future where brands from Bangladesh compete confidently with anyone, anywhere, online.'
          }].
          map((item, i) =>
          <Reveal key={item.label} delay={i * 0.1}>
              <h2 className="inline-flex items-center gap-2 text-sm font-medium text-ink-teal">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink-teal" />
                {item.label}
              </h2>
              <p className="mt-6 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                {item.text}
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-navy py-24 lg:py-36">
        <Container>
          <div id="values-title">
            <SectionHeading title="What we value" description="The principles behind how we work with every client." />
          </div>
          <ol className="mt-16 border-t border-line">
            {values.map((v, i) =>
            <li key={v.title} className="border-b border-line">
                <Reveal
                delay={i * 0.06}
                className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-10">
                
                  <span className="font-display text-sm font-medium tabular-nums text-cyan md:col-span-1">{v.number}</span>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:col-span-4 lg:text-3xl">
                    {v.title}
                  </h3>
                  <p className="text-base leading-relaxed text-fg-2 md:col-span-7">{v.text}</p>
                </Reveal>
              </li>
            )}
          </ol>
        </Container>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="bg-navy-800 py-24 lg:py-36">
        <Container>
          <div id="team-title">
            <SectionHeading title="The team" description="Team profiles are coming soon." />
          </div>
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) =>
            <li key={member.id}>
                <Reveal delay={i * 0.06} className="flex h-full flex-col">
                  <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-line bg-surface">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-700 font-display text-lg font-bold text-cyan">
                      TM
                    </span>
                  </div>
                  <p className="mt-4 font-display text-lg font-bold text-white">{member.name}</p>
                  <p className="text-sm text-fg-3">{member.role}</p>
                </Reveal>
              </li>
            )}
          </ul>
        </Container>
      </section>

      {/* Office */}
      <section aria-labelledby="office-title" className="bg-navy py-24 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 id="office-title" className="font-display text-4xl font-bold tracking-[-0.03em] text-white lg:text-5xl">
              Visit the studio
            </h2>
            <p className="mt-6 flex items-start gap-3 text-lg leading-relaxed text-fg-2">
              <MapPinIcon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-cyan" />
              <span>
                {site.addressLine}
                <br />
                {site.city}
              </span>
            </p>
            <div className="mt-10">
              <Button to="/contact">Plan a Visit</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="overflow-hidden rounded-[28px] border border-line">
              <iframe
                title="Map of Digital Soft Zone's location in Chittagong"
                src="https://www.openstreetmap.org/export/embed.html?bbox=91.76%2C22.32%2C91.86%2C22.39&layer=mapnik&marker=22.3569%2C91.7832"
                loading="lazy"
                className="h-[360px] w-full grayscale-[0.4] invert-[0.9] hue-rotate-180 lg:h-[420px]" />
              
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCta title="Let's build what's next, together." accent={['together.']} />
    </>);

}