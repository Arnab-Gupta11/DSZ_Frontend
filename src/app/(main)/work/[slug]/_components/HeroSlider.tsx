"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { IProjectImage } from "@/types/api";

interface HeroSliderProps {
  images: IProjectImage[];
  title: string;
}

export function HeroSlider({ images, title }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length, nextSlide]);

  if (!images || images.length === 0) {
    return (
      <Image
        src="/placeholder-image.jpg"
        alt={title}
        width={1600}
        height={900}
        priority
        className="aspect-16/10 w-full object-cover lg:aspect-21/10"
      />
    );
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0].src}
        alt={images[0].alt || title}
        width={1600}
        height={900}
        priority
        className="aspect-16/10 w-full object-cover lg:aspect-21/10"
      />
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="group relative h-full w-full overflow-hidden aspect-16/10 lg:aspect-21/10">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.8 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 90vw"
            priority={currentIndex === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={(e) => {
          e.preventDefault();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-navy/50 text-white backdrop-blur transition-all hover:bg-cyan hover:text-navy opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-navy/50 text-white backdrop-blur transition-all hover:bg-cyan hover:text-navy opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-cyan" : "w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

