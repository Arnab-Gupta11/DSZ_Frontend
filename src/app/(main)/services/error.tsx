"use client";

import { Container } from "@/components/ui/Container";

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 font-display text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="mb-8 text-fg-3">We couldn't load the services right now. Please try again shortly.</p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-cyan px-6 py-3 font-medium text-navy transition-colors hover:bg-white"
      >
        Try again
      </button>
    </Container>
  );
}

