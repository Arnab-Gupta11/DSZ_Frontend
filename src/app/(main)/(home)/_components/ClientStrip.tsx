import React from 'react';
import { Container } from '@/components/ui/Container';
import { clients } from '@/constants/clients';
import type { ClientPlaceholder } from '@/types/content';

export function ClientStrip() {
  const loop = [...clients, ...clients];

  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-navy py-14 lg:py-16">
      <Container>
        <h2 id="clients-title" className="text-center text-sm font-medium text-fg-2">
          Trusted by brands building what&apos;s next.
        </h2>
      </Container>
      <div className="group mask-fade-x mt-10 overflow-hidden motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((client, i) =>
          <li key={`${client.id}-${i}`} aria-hidden={i >= clients.length ? true : undefined}>
              <div className="flex h-16 w-52 items-center justify-center gap-3 rounded-xl border border-line px-6 text-fg-3 opacity-70 transition-[opacity,color,border-color] duration-200 hover:border-line-accent hover:text-white hover:opacity-100">
                {renderShape(client.shape)}
                <span className="text-xs font-semibold tracking-[0.14em]">{client.label}</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

function renderShape(shape: ClientPlaceholder['shape']) {
  const cls = 'h-5 w-5 shrink-0';
  switch (shape) {
    case 'circle':
      return <svg viewBox="0 0 20 20" className={cls} aria-hidden><circle cx="10" cy="10" r="8" fill="currentColor" /></svg>;
    case 'square':
      return <svg viewBox="0 0 20 20" className={cls} aria-hidden><rect x="2" y="2" width="16" height="16" rx="4" fill="currentColor" /></svg>;
    case 'triangle':
      return <svg viewBox="0 0 20 20" className={cls} aria-hidden><path d="M10 2l8 15H2z" fill="currentColor" /></svg>;
    case 'diamond':
      return <svg viewBox="0 0 20 20" className={cls} aria-hidden><path d="M10 1l9 9-9 9-9-9z" fill="currentColor" /></svg>;
    case 'bars':
      return <svg viewBox="0 0 20 20" className={cls} aria-hidden><rect x="2" y="4" width="4" height="12" rx="1" fill="currentColor" /><rect x="8" y="2" width="4" height="16" rx="1" fill="currentColor" /><rect x="14" y="6" width="4" height="8" rx="1" fill="currentColor" /></svg>;
    case 'ring':
      return <svg viewBox="0 0 20 20" className={cls} aria-hidden><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="3" /></svg>;
  }
}