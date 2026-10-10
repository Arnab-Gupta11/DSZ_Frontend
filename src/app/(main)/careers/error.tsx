"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalMainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-navy py-24 text-center">
      <Container>
        <div className="mx-auto max-w-lg rounded-3xl border border-line-accent bg-navy-800 p-12 shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="mt-4 text-[15px] text-fg-3">
            {error.message ||
              "We encountered an unexpected error while loading this page. Please try again."}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={reset} variant="primary">
              Try again
            </Button>
            <Button to="/" variant="secondary">
              Go Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
