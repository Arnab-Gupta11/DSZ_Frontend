"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { CustomCursor } from './CustomCursor';
import { PageTransition } from './PageTransition';
import { CursorProvider } from '@/contexts/CursorContext';
import { MotionConfig } from 'framer-motion';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <CursorProvider>
        <div className="relative min-h-screen w-full bg-navy text-white">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-cyan focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-navy">
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0 })}>
              <PageTransition key={pathname || 'root'}>{children}</PageTransition>
            </AnimatePresence>
          </main>
          <Footer />
          <WhatsAppButton />
          <CustomCursor />
        </div>
      </CursorProvider>
    </MotionConfig>
  );
}