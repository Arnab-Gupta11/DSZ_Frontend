import React from 'react';
import { Container } from '@/components/ui/Container';

export default function JobDetailsLoading() {
  return (
    <>
      {/* ── Job Hero Skeleton ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy pb-16 pt-32 lg:pb-24 lg:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -right-[10%] -top-[40%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(2,224,223,0.11) 0%, rgba(5,45,53,0.45) 40%, transparent 70%)',
            }}
          />
          <div className="grid-pattern mask-radial absolute inset-0 opacity-60" />
        </div>

        <Container>
          {/* Back link */}
          <div className="h-5 w-24 animate-pulse rounded-md bg-navy-700" />

          {/* Openings chip */}
          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan/40 animate-pulse" />
            <div className="h-4 w-24 animate-pulse rounded bg-cyan/20" />
          </div>

          {/* Job Title */}
          <div className="mt-5 space-y-3 max-w-4xl">
            <div className="h-12 sm:h-16 lg:h-20 w-11/12 animate-pulse rounded-xl bg-navy-700" />
            <div className="h-12 sm:h-16 lg:h-20 w-3/5 animate-pulse rounded-xl bg-navy-700" />
          </div>

          {/* Short description */}
          <div className="mt-6 max-w-2xl space-y-2.5">
            <div className="h-5 w-full animate-pulse rounded bg-navy-700/80" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-navy-700/80" />
          </div>

          {/* Meta Chips */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <div className="h-8 w-24 animate-pulse rounded-full bg-navy-700" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-navy-700" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-navy-700" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-navy-700" />
            <div className="h-8 w-32 animate-pulse rounded-full bg-cyan/15" />
          </div>

          {/* Apply button */}
          <div className="mt-10 h-12 w-48 animate-pulse rounded-full bg-cyan/20" />
        </Container>
      </section>

      {/* ── Main Details & Sidebar Skeleton ─────────────────────────────────── */}
      <section className="bg-paper py-20 text-ink lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Job Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              {/* About the role */}
              <div className="space-y-4">
                <div className="h-8 w-44 animate-pulse rounded-lg bg-ink/10" />
                <div className="space-y-2.5 pt-2">
                  <div className="h-5 w-full animate-pulse rounded bg-ink/10" />
                  <div className="h-5 w-11/12 animate-pulse rounded bg-ink/10" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-ink/10" />
                </div>
              </div>

              {/* What you'll do */}
              <div className="space-y-5 border-t border-line-dark pt-10">
                <div className="h-8 w-40 animate-pulse rounded-lg bg-ink/10" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 h-5 w-5 shrink-0 animate-pulse rounded-full bg-cyan/20" />
                      <div
                        className="h-5 animate-pulse rounded bg-ink/10"
                        style={{ width: `${85 - i * 6}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* What we're looking for */}
              <div className="space-y-5 border-t border-line-dark pt-10">
                <div className="h-8 w-56 animate-pulse rounded-lg bg-ink/10" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 h-5 w-5 shrink-0 animate-pulse rounded-full bg-cyan/20" />
                      <div
                        className="h-5 animate-pulse rounded bg-ink/10"
                        style={{ width: `${88 - i * 5}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools you'll use */}
              <div className="space-y-5 border-t border-line-dark pt-10">
                <div className="h-8 w-44 animate-pulse rounded-lg bg-ink/10" />
                <div className="flex flex-wrap gap-2 pt-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-9 w-24 animate-pulse rounded-full bg-ink/10"
                    />
                  ))}
                </div>
              </div>

              {/* What we offer */}
              <div className="space-y-5 border-t border-line-dark pt-10">
                <div className="h-8 w-36 animate-pulse rounded-lg bg-ink/10" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 h-5 w-5 shrink-0 animate-pulse rounded-full bg-cyan/20" />
                      <div
                        className="h-5 animate-pulse rounded bg-ink/10"
                        style={{ width: `${80 - i * 8}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Job Sidebar Card */}
            <div className="lg:col-span-5 xl:col-span-4">
              <aside className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[28px] bg-navy p-7 sm:p-8 text-white shadow-[0_30px_80px_-40px_rgba(4,28,38,0.6)]">
                  <div className="h-4 w-24 animate-pulse rounded bg-navy-700" />
                  <div className="mt-3 h-7 w-3/4 animate-pulse rounded-lg bg-navy-700" />

                  <div className="mt-6 divide-y divide-line border-y border-line">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <div className="h-4 w-20 animate-pulse rounded bg-navy-700" />
                        <div className="h-4 w-28 animate-pulse rounded bg-navy-600" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan/50 animate-pulse" />
                    <div className="h-4 w-36 animate-pulse rounded bg-navy-700" />
                  </div>

                  <div className="mt-6 h-12 w-full animate-pulse rounded-full bg-cyan/20" />
                </div>

                {/* Share buttons placeholder */}
                <div className="mt-6 flex items-center gap-3 px-2">
                  <div className="h-4 w-12 animate-pulse rounded bg-ink/15" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-ink/10" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-ink/10" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-ink/10" />
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Apply Form Skeleton ────────────────────────────────────────────── */}
      <section className="border-t border-line-dark bg-paper-2 py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-3">
              <div className="h-9 w-64 animate-pulse rounded-lg bg-ink/15" />
              <div className="h-5 w-80 animate-pulse rounded bg-ink/10" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="h-12 animate-pulse rounded-xl bg-ink/10" />
              <div className="h-12 animate-pulse rounded-xl bg-ink/10" />
              <div className="h-12 animate-pulse rounded-xl bg-ink/10" />
              <div className="h-12 animate-pulse rounded-xl bg-ink/10" />
            </div>

            <div className="h-32 animate-pulse rounded-2xl bg-ink/10" />
            <div className="h-12 w-48 animate-pulse rounded-full bg-cyan/30" />
          </div>
        </Container>
      </section>
      {/* ── Other Openings Skeleton ───────────────────────────────────────── */}
      <section className="bg-paper py-24 text-ink lg:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="h-10 w-56 animate-pulse rounded-lg bg-ink/15" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-ink/10" />
          </div>
          <div className="mt-12 space-y-4 lg:pl-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-line-dark py-6"
              >
                <div className="space-y-2">
                  <div className="h-6 w-48 animate-pulse rounded bg-ink/15" />
                  <div className="h-4 w-32 animate-pulse rounded bg-ink/10" />
                </div>
                <div className="h-9 w-28 animate-pulse rounded-full bg-ink/10" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
