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
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

const containerVariantsBottom: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12,
      staggerDirection: -1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

const letterVariantsTop: Variants = {
  hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const letterVariantsBottom: Variants = {
  hidden: { opacity: 0, x: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
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

    // Lock body scroll during text reveal
    document.body.style.overflow = "hidden";

    // Optimized Timeline:
    // 0.0s: Reveal animation starts
    // 1.0s: Text fades out
    // 1.3s: Curtain panels start sliding open
    // 1.4s: Hero is triggered & body scroll unlocked immediately as curtains part
    // 2.05s: Curtain fully opened, preloader unmounts

    const fadeTimer = setTimeout(() => {
      setPhase("exit");
    }, 1000);

    const finishTimer = setTimeout(() => {
      completePreloader(); // Signals Hero to animate in
      document.body.style.overflow = ""; // Instant scroll restore as curtains open
    }, 1400);

    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2050);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, [hasVisited, shouldReduceMotion, completePreloader]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 1.3 }}
        style={{ willChange: "transform" }}
        className={`absolute left-0 top-0 bottom-0 w-1/2 bg-navy border-r border-line/10 ${phase === "exit" ? "pointer-events-none" : "pointer-events-auto"}`}
      />

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 1.3 }}
        style={{ willChange: "transform" }}
        className={`absolute right-0 top-0 bottom-0 w-1/2 bg-navy ${phase === "exit" ? "pointer-events-none" : "pointer-events-auto"}`}
      />

      {/* CONTENT */}
      <div className={`relative z-10 flex flex-col items-center justify-center px-4 ${phase === "exit" ? "pointer-events-none" : "pointer-events-auto"}`}>
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
