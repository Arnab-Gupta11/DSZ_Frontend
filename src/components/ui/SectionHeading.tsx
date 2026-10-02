import React from 'react';
import { AnimatedText } from './AnimatedText';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  title: string;
  description?: string;
  label?: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  accent?: string[];
  action?: React.ReactNode;
  className?: string;
  size?: 'md' | 'lg';
}

export function SectionHeading({
  title,
  description,
  label,
  as = 'h2',
  align = 'left',
  tone = 'dark',
  accent = [],
  action,
  className = '',
  size = 'md'
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  const centered = align === 'center';
  const titleSize =
  size === 'lg' ?
  'text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98]' :
  'text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.02]';

  return (
    <div
      className={`flex flex-col gap-8 ${
      action && !centered ? 'lg:flex-row lg:items-end lg:justify-between' : ''} ${
      centered ? 'items-center text-center' : ''} ${className}`}>
      
      <div className={centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
        {label &&
        <Reveal y={12}>
            <p
            className={`mb-5 inline-flex items-center gap-2 text-sm font-medium ${
            isLight ? 'text-ink-teal' : 'text-cyan'}`
            }>
            
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-ink-teal' : 'bg-cyan'}`} />
              {label}
            </p>
          </Reveal>
        }
        <AnimatedText
          as={as}
          text={title}
          accent={accent}
          accentClassName={isLight ? 'text-ink-teal' : 'text-cyan'}
          className={`font-display font-bold tracking-[-0.035em] ${titleSize} ${isLight ? 'text-ink' : 'text-white'}`} />
        
        {description &&
        <Reveal delay={0.15}>
            <p
            className={`mt-6 max-w-xl text-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${
            isLight ? 'text-ink-2' : 'text-fg-2'}`
            }>
            
              {description}
            </p>
          </Reveal>
        }
      </div>
      {action && <Reveal delay={0.2}>{action}</Reveal>}
    </div>);

}