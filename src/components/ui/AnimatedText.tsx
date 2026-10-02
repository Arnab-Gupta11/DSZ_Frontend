"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from '@/utils/motion';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  stagger?: number;
  accent?: string[];
  accentClassName?: string;
  onMount?: boolean;
}

export function AnimatedText({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.06,
  accent = [],
  accentClassName = 'text-cyan',
  onMount = false
}: AnimatedTextProps) {
  const Tag = as;
  const words = text.split(' ');
  const trigger = onMount ?
  { animate: 'visible' as const } :
  { whileInView: 'visible' as const, viewport: { once: true, margin: '-60px' } };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
        
        {words.map((word, i) =>
        <React.Fragment key={`${word}-${i}`}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
              <motion.span
              className={`inline-block ${accent.includes(word) ? accentClassName : ''}`}
              variants={{
                hidden: { y: '110%' },
                visible: { y: '0%', transition: { duration: 0.7, ease: easeOut } }
              }}>
              
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        )}
      </motion.span>
    </Tag>);

}