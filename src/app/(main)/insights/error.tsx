"use client";

import { Container } from "@/components/ui/Container";

export default function InsightsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 font-display text-2xl font-bold text-ink">Something went wrong!</h2>
      <p className="mb-8 text-ink-2">We couldn't load the articles right now. Please try again shortly.</p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-ink-teal px-6 py-3 font-medium text-white transition-colors hover:bg-ink"
      >
        Try again
      </button>
    </Container>
  );
}

