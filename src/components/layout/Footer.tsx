"use client";

import React from 'react';
import Link from 'next/link';

import { ArrowUpIcon } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { SocialIcon } from '../ui/BrandIcons';
import { navLinks, site, socialLinks } from '@/constants/site';
import { services } from '@/constants/services';

const serviceShortNames: Record<string, string> = {
  'brand-strategy': 'Brand Strategy',
  'digital-marketing': 'Digital Marketing',
  'graphic-design': 'Design',
  'video-production': 'Video',
  'web-app-development': 'Web & App',
  'business-automation': 'Automation'
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-navy pt-20 lg:pt-24">
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Digital Soft Zone — home" className="inline-block rounded-lg">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-fg-2">{site.tagline}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social media">
              {socialLinks.map((s) =>
              <li key={s.key}>
                  <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-2 transition-colors duration-200 hover:border-line-accent hover:text-cyan">
                  
                    <SocialIcon name={s.key} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-sm font-medium text-fg-3">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) =>
              <li key={l.to}>
                  <Link href={l.to} className="text-[15px] text-fg-2 transition-colors duration-200 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-fg-3">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) =>
              <li key={s.slug}>
                  <Link href={`/services#${s.slug}`}
                  className="text-[15px] text-fg-2 transition-colors duration-200 hover:text-white">
                  
                    {serviceShortNames[s.slug]}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-fg-3">Contact</h2>
            <address className="mt-5 space-y-3 text-[15px] not-italic text-fg-2">
              <p>
                {site.addressLine}
                <br />
                {site.city}
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-white">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phone}`} className="transition-colors duration-200 hover:text-white">
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan transition-colors duration-200 hover:text-cyan-soft">
                  
                  WhatsApp: {site.whatsappNumber}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-fg-3">
            © {year} Digital Soft Zone. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-fg-2 transition-colors duration-200 hover:text-white">
            
            Back to top
            <ArrowUpIcon
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            
          </button>
        </div>
      </Container>
    </footer>);

}