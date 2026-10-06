"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "./_components/ProjectCard";
import { FinalCta } from "@/components/cta/FinalCta";
import { projects } from "@/constants/projects";
import { useSeo } from "@/hooks/useSeo";
import { easeOut } from "@/utils/motion";
import type { ServiceCategory } from "@/types/content";

type Filter = "All" | ServiceCategory;
const filters: Filter[] = [
  "All",
  "Branding",
  "Marketing",
  "Design",
  "Video",
  "Web/App",
  "Automation",
];

export default function Work() {
  const [active, setActive] = useState<Filter>("All");

  useSeo({
    title: "Work",
    description:
      "Selected branding, marketing, design, video, web and automation projects by Digital Soft Zone.",
    path: "/work",
  });

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active],
  );

  return (
    <>
      <PageHero
        label="Work"
        title="Selected Work"
        description="Brand, campaign, product and technology projects for growing brands."
      />

      <section aria-label="Projects" className="bg-navy pb-24 lg:pb-36">
        <Container>
          <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
            <ul
              className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
              aria-label="Filter projects"
            >
              {filters.map((f) => {
                const isActive = active === f;
                return (
                  <li key={f} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActive(f)}
                      aria-pressed={isActive}
                      className={`relative flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
                        isActive ? "text-navy" : "text-fg-2 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="work-filter"
                          className="absolute inset-0 rounded-full bg-cyan"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 34,
                          }}
                        />
                      )}
                      <span className="relative">{f}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="text-sm text-fg-3" aria-live="polite">
              {visible.length} {visible.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <motion.div
            layout
            className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                >
                  <ProjectCard project={project} reveal={false} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center">
              <p className="font-display text-xl font-bold text-white">
                No projects in this category yet.
              </p>
              <button
                type="button"
                onClick={() => setActive("All")}
                className="mt-4 min-h-11 text-sm font-medium text-cyan hover:text-cyan-soft"
              >
                Show all work
              </button>
            </div>
          )}
        </Container>
      </section>

      <FinalCta title="Your brand could be next." accent={["next."]} />
    </>
  );
}
