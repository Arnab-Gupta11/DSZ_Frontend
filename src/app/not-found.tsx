import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.'
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy pt-24">
      <div aria-hidden className="grid-pattern mask-radial pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <Container className="text-center">
        <p className="font-display text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-[-0.06em] text-cyan">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
          This page has moved on.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-fg-2">The link may be broken, or the page may no longer exist.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to Home</Button>
          <Button to="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}