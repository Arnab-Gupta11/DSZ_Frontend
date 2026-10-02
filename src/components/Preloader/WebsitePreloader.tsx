"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { usePreloader } from "@/contexts/PreloaderContext";

const topWord = "DIGITAL";
const bottomWord = "SOFT ZONE";

const containerVariantsTop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const containerVariantsBottom: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
      staggerDirection: -1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const letterVariantsTop: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const letterVariantsBottom: Variants = {
  hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function WebsitePreloader() {
  const { hasVisited, completePreloader } = usePreloader();
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"reveal" | "exit">("reveal");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If returning visitor or reduced motion, skip the long animation
    if (hasVisited || shouldReduceMotion) {
      completePreloader();
      setIsVisible(false);
      return;
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Timeline
    // 0.0s: Reveal animation starts
    // 1.8s: Text fades out
    // 2.2s: Curtain opens
    // 2.6s: Hero is notified to start
    // 3.2s: Preloader unmounts

    const fadeTimer = setTimeout(() => {
      setPhase("exit");
    }, 1800);

    const finishTimer = setTimeout(() => {
      completePreloader(); // Signals Hero to animate in
    }, 2600);

    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto"; // Restore scroll
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "auto";
    };
  }, [hasVisited, shouldReduceMotion, completePreloader]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 2.2 }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-navy pointer-events-auto border-r border-line/10"
      />

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 2.2 }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-navy pointer-events-auto"
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-auto px-4">
        {/* Top Line: DIGITAL */}
        <motion.div
          variants={containerVariantsTop}
          initial="hidden"
          animate={phase === "reveal" ? "visible" : "exit"}
          className="flex overflow-hidden font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white uppercase leading-none tracking-[0.1em] sm:tracking-[0.2em]"
        >
          {topWord.split("").map((char, index) => (
            <motion.span
              key={`top-${index}`}
              variants={letterVariantsTop}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom Line: SOFT ZONE */}
        <motion.div
          variants={containerVariantsBottom}
          initial="hidden"
          animate={phase === "reveal" ? "visible" : "exit"}
          className="flex overflow-hidden font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white uppercase leading-none tracking-widest sm:tracking-[0.2em] mt-2 sm:mt-4"
        >
          {bottomWord.split("").map((char, index) => (
            <motion.span
              key={`bottom-${index}`}
              variants={letterVariantsBottom}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
