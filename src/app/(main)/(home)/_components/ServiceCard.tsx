"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";
import type { IService } from "@/types/api";

interface ServiceCardProps {
  service: IService;
  index: number;
  parallax: number;
}

export function ServiceCard({ service, index, parallax }: ServiceCardProps) {
  const { ref, y } = useParallax<HTMLDivElement>(parallax);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="h-full"
      suppressHydrationWarning
    >
      <Reveal delay={(index % 3) * 0.08} className="h-full">
        <Link
          href={`/services#${service.slug}`}
          className="group relative flex h-full min-h-85 flex-col overflow-hidden rounded-2xl bg-navy-800 transition-transform duration-300 hover:-translate-y-2"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={service.image || "/placeholder-image.jpg"}
              alt={service.imageAlt || service.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
            />
          </div>

          {/* Top Gradient */}
          <div className="absolute inset-x-0 top-0 z-10 h-[55%] bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

          {/* Content Container */}
          <div className="relative z-20 flex h-full flex-col justify-between p-5 lg:p-7">
            {/* Top Text (Service Title) */}
            <h3 className="max-w-[90%] font-display text-2xl font-bold leading-tight tracking-tight text-white lg:text-3xl">
              {service.title}
            </h3>

            {/* Bottom Content */}
            <div className="mt-auto flex flex-col gap-6">
              {/* Description */}
              {/* <p className="text-[15px] font-medium leading-relaxed text-white/90">
                {service.short}
              </p> */}

              {/* Footer Section */}
              <div className="flex items-end justify-between border-t border-white/20 pt-5">
                <div className="flex items-center gap-2 text-white">
                  <Compass className="h-5 w-5 text-cyan" />
                  <span className="font-display text-sm font-medium lowercase tracking-wide">
                    {service.tag || service.slug}
                  </span>
                </div>

                {/* Cyan Action Button matching theme */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-navy transition-[transform,background-color] duration-300 group-hover:rotate-45 group-hover:scale-105 group-hover:bg-white">
                  <ArrowUpRightIcon className="h-5 w-5" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    </motion.div>
  );
}
