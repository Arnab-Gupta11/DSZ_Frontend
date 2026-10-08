"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useCursorLabel } from "@/contexts/CursorContext";
import { easeOut } from "@/utils/motion";
import type { IWork } from "@/types/api";

interface ProjectCardProps {
  project: IWork;
  size?: "wide" | "tall" | "standard";
  className?: string;
  reveal?: boolean;
}

const aspects = {
  wide: "aspect-[4/3] lg:aspect-[16/11]",
  tall: "aspect-[4/3] lg:aspect-[4/5]",
  standard: "aspect-[4/3]",
};

export function ProjectCard({
  project,
  size = "standard",
  className = "",
  reveal = true,
}: ProjectCardProps) {
  const cursor = useCursorLabel("View Case Study →");

  const imageUrl = project.heroImages?.[0]?.src || "/placeholder-image.jpg";
  const imageAlt = project.heroImages?.[0]?.alt || project.title;

  return (
    <article className={`group ${className}`}>
      <Link
        href={`/work/${project.slug}`}
        {...cursor}
        className="block rounded-[20px]"
      >
        <motion.div
          initial={
            reveal
              ? { clipPath: "inset(16% 0% 0% 0% round 20px)", opacity: 0 }
              : false
          }
          whileInView={{
            clipPath: "inset(0% 0% 0% 0% round 20px)",
            opacity: 1,
          }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className={`relative overflow-hidden rounded-[20px] bg-navy-700 ${aspects[size]}`}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/40" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.services?.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-navy/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-5 flex items-start justify-between gap-6 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1">
          <div className="min-w-0">
            <p className="text-sm text-fg-3">
              {project.client} <span aria-hidden>·</span> {project.industry}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-cyan">
              {project.result}
            </p>
          </div>
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-white transition-[border-color,background-color,color] duration-200 group-hover:border-cyan group-hover:bg-cyan group-hover:text-navy">
            <ArrowRightIcon
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.75"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
