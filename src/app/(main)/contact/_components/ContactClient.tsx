"use client";

import React, { Suspense } from 'react';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from './ContactForm';
import { SocialIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import { site, socialLinks } from '@/constants/site';

export function ContactClient() {
  const details = [
  { icon: MapPinIcon, label: 'Office', value: `${site.addressLine}, ${site.city}`, href: undefined },
  { icon: MailIcon, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: PhoneIcon, label: 'Phone', value: site.phone, href: `tel:${site.phone}` }];


  return (
    <section className="relative isolate overflow-hidden bg-navy pb-24 pt-32 lg:pb-36 lg:pt-44">
      <div aria-hidden className="grid-pattern mask-radial pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Contact
            </p>
            <AnimatedText
              as="h1"
              onMount
              delay={0.1}
              text="Let's Talk About Your Next Project."
              accent={['Next', 'Project.']}
              className="mt-6 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[1] tracking-[-0.045em] text-white" />
            
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-2">
                Four quick fields. We&apos;ll reply with next steps and a free quote.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="mt-14">
              <Suspense fallback={<div className="h-40 w-full animate-pulse bg-surface rounded-3xl" />}><ContactForm /></Suspense>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:col-span-5" aria-label="Other ways to reach us">
            <Reveal delay={0.2}>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-[24px] bg-turq p-6 text-navy transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-turq-2 sm:p-7">
                
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-turq">
                  <WhatsAppIcon className="h-7 w-7" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold">Prefer to chat?</span>
                  <span className="block text-sm text-navy/75">Message us on WhatsApp — {site.whatsappNumber}</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.28}>
              <ul className="divide-y divide-line rounded-[24px] border border-line bg-surface">
                {details.map(({ icon: Icon, label, value, href }) =>
                <li key={label} className="flex items-start gap-4 p-6">
                    <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <div className="min-w-0">
                      <p className="text-sm text-fg-3">{label}</p>
                      {href ?
                    <a href={href} className="mt-1 block break-words text-white transition-colors duration-200 hover:text-cyan">
                          {value}
                        </a> :

                    <p className="mt-1 text-white">{value}</p>
                    }
                    </div>
                  </li>
                )}
                <li className="flex flex-wrap items-center gap-2 p-6">
                  {socialLinks.map((s) =>
                  <a
                    key={s.key}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-2 transition-colors duration-200 hover:border-line-accent hover:text-cyan">
                    
                      <SocialIcon name={s.key} className="h-[18px] w-[18px]" />
                    </a>
                  )}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="overflow-hidden rounded-[24px] border border-line">
                <iframe
                  title="Map showing Digital Soft Zone in Chittagong"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=91.76%2C22.32%2C91.86%2C22.39&layer=mapnik&marker=22.3569%2C91.7832"
                  loading="lazy"
                  className="h-64 w-full grayscale-[0.4] invert-[0.9] hue-rotate-180" />
                
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>);

}