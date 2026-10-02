"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCanHover } from "@/hooks/useMediaQuery";
import { useCursor } from "../../contexts/CursorContext";
import { easeOut } from "@/utils/motion";

export function CustomCursor() {
  const canHover = useCanHover();
  const reduce = useReducedMotion();
  const { label } = useCursor();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });
  const enabled = canHover && !reduce;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      let onScrollbar = false;
      if (window.innerWidth - e.clientX <= 15) {
        onScrollbar = true;
      } else {
        const t = e.target as HTMLElement | null;
        if (t) {
          const scrollContainer = t.closest(
            ".custom-scrollbar",
          ) as HTMLElement | null;
          if (
            scrollContainer &&
            scrollContainer.scrollHeight > scrollContainer.clientHeight
          ) {
            const rect = scrollContainer.getBoundingClientRect();
            if (e.clientX >= rect.right - 15) {
              onScrollbar = true;
            }
          }
        }
      }

      if (onScrollbar) {
        root.classList.remove("has-custom-cursor");
        setHidden(true);
      } else {
        root.classList.add("has-custom-cursor");
        const t = e.target as HTMLElement | null;
        if (t && t.closest("input, textarea, select, iframe")) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("input, textarea, select, iframe")) {
        setHidden(true);
        return;
      }
      setHidden(false);
      setHovering(
        Boolean(t.closest('a, button, [role="button"], label, summary')),
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y, mounted]);

  if (!mounted || !enabled) return null;
  const showLabel = Boolean(label) && !hidden;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-ml-1 -mt-1 h-2 w-2 rounded-full"
        animate={{
          scale: hovering ? 4.5 : 1,
          opacity: hidden || showLabel ? 0 : 1,
          backgroundColor: hovering
            ? "rgba(2,224,223,0.14)"
            : "rgba(2,224,223,1)",
          boxShadow: hovering
            ? "inset 0 0 0 0.25px rgba(2,224,223,0.9)"
            : "inset 0 0 0 0px rgba(2,224,223,0)",
        }}
        transition={{ duration: 0.18, ease: easeOut }}
      />

      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence>
          {showLabel && (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: easeOut }}
              className="block whitespace-nowrap rounded-full bg-cyan px-4 py-2.5 text-xs font-semibold text-navy shadow-[0_10px_30px_-10px_rgba(2,224,223,0.8)]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
