"use client";

import React from 'react';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { images } from '@/constants/images';
import { easeOut } from '@/utils/motion';

interface HeroVisualProps {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

export function HeroVisual({ mx, my }: HeroVisualProps) {
  const reduce = useReducedMotion();
  const bgX = useTransform(mx, (v) => v * -16);
  const bgY = useTransform(my, (v) => v * -16);
  const midX = useTransform(mx, (v) => v * 22);
  const midY = useTransform(my, (v) => v * 22);
  const fgX = useTransform(mx, (v) => v * 42);
  const fgY = useTransform(my, (v) => v * 42);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
      className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[520px] lg:h-[600px]"
      aria-hidden>
      
      {/* Background layer */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(2,224,223,0.18) 0%, rgba(5,45,53,0.35) 45%, transparent 70%)' }} />
        
        <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
        <motion.div
          className="absolute left-1/2 top-1/2 aspect-square w-[64%] rounded-full border border-dashed border-line-accent"
          style={{ x: '-50%', y: '-50%' }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} />
        
      </motion.div>

      {/* Mid layer — hero project image */}
      <motion.figure style={{ x: midX, y: midY }} className="absolute right-0 top-[2%] w-[60%] sm:w-[56%]">
        <div className="rotate-[3deg] overflow-hidden rounded-2xl border border-line bg-navy-700 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <img
            src={images.perfume}
            alt=""
            className="aspect-[4/5] w-full object-cover"
            decoding="async" />
          
          <div className="flex items-center justify-between border-t border-line px-4 py-3">
            <span className="text-xs font-medium text-white">Fragrance launch</span>
            <span className="text-[11px] text-fg-3">Branding · Campaign</span>
          </div>
        </div>
      </motion.figure>

      {/* Foreground — browser mockup */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute bottom-[4%] left-0 w-[76%] sm:w-[72%]">
        <div className="-rotate-[2deg] overflow-hidden rounded-xl border border-line bg-navy-800 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-3 flex-1 truncate rounded-full bg-surface px-3 py-1 text-[10px] text-fg-3">
              yourbrand.com/collection
            </span>
          </div>
          <div className="relative">
            <img src={images.watch} alt="" className="aspect-[16/9] w-full object-cover" decoding="async" />
            <div className="absolute bottom-3 left-3 rounded-md bg-navy/80 px-2.5 py-1.5 backdrop-blur">
              <p className="font-display text-xs font-bold text-white">Precision, online.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Foreground — status chip */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute left-[4%] top-[10%] hidden sm:block">
        <div className="rounded-2xl border border-line bg-[rgba(5,45,53,0.75)] p-4 backdrop-blur-md">
          <p className="text-[11px] font-medium text-fg-3">In production</p>
          <ul className="mt-3 space-y-2">
            {['Identity', 'Campaign', 'Website'].map((t, i) =>
            <li key={t} className="flex items-center gap-2.5 text-xs text-white">
                <span className={`h-1.5 w-1.5 rounded-full ${i === 2 ? 'bg-turq' : 'bg-cyan'}`} />
                {t}
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </motion.div>);

}