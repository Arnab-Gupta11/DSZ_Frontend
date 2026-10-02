"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BellIcon, MessageSquareIcon, PlayIcon, ShoppingBagIcon, TableIcon } from 'lucide-react';
import { images } from '@/constants/images';
import { easeOut } from '@/utils/motion';
import type { ServiceVisualKind } from '@/types/content';

export function ServiceVisual({ kind }: {kind: ServiceVisualKind;}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-line bg-navy-800">
      
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="relative h-full w-full p-5 sm:p-8">
        {kind === 'brand' && renderBrand()}
        {kind === 'marketing' && renderMarketing()}
        {kind === 'design' && renderDesign()}
        {kind === 'video' && renderVideo()}
        {kind === 'web' && renderWeb()}
        {kind === 'automation' && renderAutomation(Boolean(reduce))}
      </div>
    </div>);

}

function renderBrand() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
      <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-2xl border border-line bg-navy p-5">
        <span className="text-xs text-fg-3">Primary typeface</span>
        <span className="font-display text-[clamp(4rem,11vw,8rem)] font-bold leading-none tracking-[-0.05em] text-white">
          Aa
        </span>
        <span className="text-xs text-fg-2">Headlines · Bold</span>
      </div>
      <div className="flex items-end rounded-2xl bg-cyan p-4">
        <span className="text-[11px] font-medium text-navy">Primary</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-turq" />
        <div className="rounded-2xl bg-white" />
      </div>
    </div>);

}

function renderMarketing() {
  const bars = [34, 48, 42, 60, 55, 72, 66, 90];
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-navy p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">Campaign performance</span>
        <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] text-fg-2">8 weeks</span>
      </div>
      <div className="mt-6 flex flex-1 items-end gap-2">
        {bars.map((h, i) =>
        <motion.span
          key={i}
          className={`flex-1 origin-bottom rounded-t-md ${i === bars.length - 1 ? 'bg-cyan' : 'bg-white/15'}`}
          style={{ height: `${h}%` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: i * 0.05 }} />

        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-xs">
        {['Reach', 'Clicks', 'Orders'].map((l) =>
        <div key={l}>
            <p className="text-fg-3">{l}</p>
            <p className="mt-1 font-display text-base font-bold text-white">[XX]</p>
          </div>
        )}
      </div>
    </div>);

}

function renderDesign() {
  const frames = [images.perfume, images.skincare, images.earbuds];
  return (
    <div className="flex h-full items-center justify-center gap-3 sm:gap-4">
      {frames.map((src, i) =>
      <div
        key={src}
        className={`w-[30%] overflow-hidden rounded-2xl border border-line bg-navy shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ${
        i === 1 ? '-translate-y-3 scale-105' : 'translate-y-3'}`
        }>
        
          <img src={src} alt="" loading="lazy" className="aspect-[9/16] w-full object-cover" />
        </div>
      )}
    </div>);

}

function renderVideo() {
  const clips = [22, 14, 30, 18, 16];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative flex-1 overflow-hidden rounded-2xl">
        <img src={images.videoShoot} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan text-navy">
          <PlayIcon className="ml-0.5 h-5 w-5 fill-current" />
        </span>
        <span className="absolute bottom-3 left-3 rounded bg-navy/80 px-2 py-1 text-[11px] tabular-nums text-white">
          00:12 / 00:20
        </span>
      </div>
      <div className="rounded-xl border border-line bg-navy p-3">
        <div className="flex gap-1.5">
          {clips.map((w, i) =>
          <span key={i} className={`h-6 rounded ${i === 2 ? 'bg-cyan/80' : 'bg-white/15'}`} style={{ width: `${w}%` }} />
          )}
        </div>
      </div>
    </div>);

}

function renderWeb() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-navy">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 h-5 flex-1 rounded-full bg-surface" />
      </div>
      <div className="flex items-center justify-between px-5 py-3">
        <span className="h-2.5 w-16 rounded-full bg-white/40" />
        <span className="flex gap-3">
          <span className="h-2 w-8 rounded-full bg-white/15" />
          <span className="h-2 w-8 rounded-full bg-white/15" />
          <span className="h-2 w-8 rounded-full bg-cyan/70" />
        </span>
      </div>
      <div className="relative mx-5 mb-5 flex-1 overflow-hidden rounded-xl">
        <img src={images.watch} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute bottom-4 left-4 space-y-2">
          <span className="block h-3 w-32 rounded-full bg-white/80" />
          <span className="block h-3 w-20 rounded-full bg-white/40" />
          <span className="mt-3 block h-7 w-24 rounded-full bg-cyan" />
        </div>
      </div>
    </div>);

}

function renderAutomation(reduce: boolean) {
  const nodes = [
  { icon: ShoppingBagIcon, label: 'New order received' },
  { icon: MessageSquareIcon, label: 'Confirmation sent' },
  { icon: TableIcon, label: 'Order sheet updated' },
  { icon: BellIcon, label: 'Team notified' }];

  return (
    <div className="relative mx-auto flex h-full max-w-sm flex-col justify-between py-1">
      <div className="absolute bottom-6 left-6 top-6 w-px bg-line">
        {!reduce &&
        <motion.span
          className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-cyan shadow-[0_0_12px_rgba(2,224,223,0.9)]"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />

        }
      </div>
      {nodes.map(({ icon: Icon, label }, i) =>
      <div key={label} className="relative flex items-center gap-4">
          <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-navy ${
          i === 0 ? 'border-cyan text-cyan' : 'border-line text-fg-2'}`
          }>
          
            <Icon className="h-5 w-5" />
          </span>
          <span className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-navy px-4 py-3">
            <span className="text-sm text-white">{label}</span>
            <span className="text-[11px] text-turq">Auto</span>
          </span>
        </div>
      )}
    </div>);

}