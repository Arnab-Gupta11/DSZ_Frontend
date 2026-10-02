"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from "framer-motion";

export function ScrollVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Determine if it's mobile for responsive animation bounds
  const isMobile = useMediaQuery('(max-width: 768px)');
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'] // Use a slightly wider range so animation finishes properly
  });

  // We want the actual animation to happen while the section is fully in view,
  // but `start end` means when the top of the section hits the bottom of the viewport.
  // We should use a sticky container.
  // The section is 300vh tall.
  // So when it hits `start start`, the top is at the top. The sticky container stays for 200vh.
  const { scrollYProgress: stickyProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Add smoothing
  const smoothProgress = useSpring(stickyProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.8
  });

  // Desktop values
  const deskWidth = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['65vw', '100vw', '100vw', '65vw']);
  const deskHeight = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['60vh', '100vh', '100vh', '60vh']);
  const deskRadius = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['24px', '0px', '0px', '24px']);

  // Mobile values
  const mobWidth = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['92vw', '100vw', '100vw', '92vw']);
  const mobHeight = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['45vh', '85vh', '85vh', '45vh']);
  const mobRadius = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['16px', '0px', '0px', '16px']);

  const width = isMobile ? mobWidth : deskWidth;
  const height = isMobile ? mobHeight : deskHeight;
  const borderRadius = isMobile ? mobRadius : deskRadius;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  if (shouldReduceMotion) {
    return (
      <section className="relative w-full bg-navy py-16 lg:py-24">
        <div className="mx-auto w-[92vw] lg:w-[65vw] max-w-6xl overflow-hidden rounded-2xl lg:rounded-3xl bg-navy-800 shadow-2xl relative group">
          <video
            ref={videoRef}
            src="/dsz.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
            className="w-full h-auto aspect-video object-cover"
            aria-label="Digital Soft Zone Cinematic Video"
          />
          <div className="absolute bottom-4 right-4 z-20 opacity-100 lg:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={toggleMute}
              className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              aria-label={muted ? 'Unmute video' : 'Mute video'}
            >
              {muted ? <><VolumeXIcon className="h-4 w-4" /><span>Sound Off</span></> : <><Volume2Icon className="h-4 w-4" /><span>Sound On</span></>}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-navy">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        <motion.div
          style={{ width, height, borderRadius }}
          className="group relative overflow-hidden bg-navy-800 shadow-2xl transition-[filter] duration-500 ease-out"
        >
          {/* Subtle overlay text during contained state */}
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.2], [1, 0])
            }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-center font-display text-4xl sm:text-6xl font-bold text-white opacity-80 tracking-tight drop-shadow-xl">
              DIGITAL<br/>WITHOUT<br/>LIMITS
            </h2>
          </motion.div>

          <video
            ref={videoRef}
            src="/dsz.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
            className="h-full w-full object-cover"
            aria-label="Digital Soft Zone Cinematic Video"
          />

          {/* Sound Control Button */}
          <div className="absolute bottom-6 right-6 z-20 opacity-100 lg:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={toggleMute}
              className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              aria-label={muted ? 'Unmute video' : 'Mute video'}
            >
              {muted ? (
                <>
                  <VolumeXIcon className="h-4 w-4" />
                  <span>Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2Icon className="h-4 w-4" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}
