"use client";

import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/Button';
import { ServiceVisual } from './ServiceVisual';
import type { Service } from '@/types/content';

interface ServiceDetailProps {
  service: Service;
  index: number;
}

export function ServiceDetail({ service, index }: ServiceDetailProps) {
  const reversed = index % 2 === 1;
  const Icon = service.icon;

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={`scroll-mt-32 py-20 lg:py-32 ${reversed ? 'bg-navy-800' : 'bg-navy'}`}>
      
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
          <Reveal y={16} className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-accent bg-navy-700 text-cyan">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-sm font-medium tabular-nums text-fg-3">{service.number} / 06</span>
          </Reveal>
          <div id={`${service.slug}-title`}>
            <AnimatedText
              as="h2"
              text={service.title}
              className="mt-8 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1] tracking-[-0.04em] text-white" />
            
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-2">{service.description}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-fg-3">What we do</h3>
              <ul className="mt-4 space-y-3">
                {service.whatWeDo.map((item) =>
                <li key={item} className="flex items-start gap-3 text-[15px] text-white">
                    <CheckIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {item}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-fg-3">Deliverables</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.deliverables.map((item) =>
                <li key={item} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-fg-2">
                    {item}
                  </li>
                )}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 border-l-2 border-cyan pl-5">
            <h3 className="text-sm font-medium text-fg-3">Who it&apos;s for</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white">{service.whoFor}</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <Button to={`/contact?service=${service.slug}`}>Start a Project</Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className={`lg:sticky lg:top-32 lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
          <ServiceVisual kind={service.visual} />
        </Reveal>
      </Container>
    </section>);

}