"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "./ProjectCard";

import { easeOut } from "@/utils/motion";
import type { IWork, IService, ApiResponse } from "@/types/api";

interface WorkListClientProps {
  initialWorks: IWork[];
  services: IService[];
  meta?: ApiResponse<any>["meta"];
  currentService?: string;
}

export function WorkListClient({
  initialWorks,
  services,
  meta,
  currentService,
}: WorkListClientProps) {
  const searchParams = useSearchParams();
  const [isFetching, setIsFetching] = React.useState(false);

  const [active, setActive] = React.useState(currentService || "All");
  const [works, setWorks] = React.useState<IWork[]>(initialWorks);
  const [currentMeta, setCurrentMeta] = React.useState(meta);

  const scrollContainerRef = React.useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, services]);

  // Sync with server initial data when it changes
  React.useEffect(() => {
    setWorks(initialWorks);
    setCurrentMeta(meta);
    setActive(currentService || "All");
  }, [initialWorks, meta, currentService]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const amount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const fetchWorks = async (serviceId: string, page: number) => {
    setIsFetching(true);
    try {
      const { api } = await import("@/lib/api/client");
      const response = await api.getWorks({
        service: serviceId === "All" ? undefined : serviceId,
        page,
        limit: 10,
      });
      setWorks(response.data || []);
      setCurrentMeta(response.meta);
    } catch (e: any) {
      console.error("Failed to fetch works:", e);
      setWorks([]);
      import("sonner").then((mod) => mod.toast.error(e?.message || "Failed to load projects."));
    } finally {
      setIsFetching(false);
    }
  };

  const handleFilter = (serviceId: string) => {
    setActive(serviceId); // Optimistic update

    // Update URL shallowly without triggering Next.js routing
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (serviceId === "All") {
      params.delete("service");
    } else {
      params.set("service", serviceId);
    }
    window.history.pushState(null, "", `?${params.toString()}`);

    // Fetch data directly on the client
    fetchWorks(serviceId, 1);
  };

  const handlePage = (page: number) => {
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);

    // Fetch data directly on the client
    fetchWorks(active, page);
  };

  return (
    <Container>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center w-full min-w-0 overflow-hidden">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={`hidden shrink-0 mr-3 h-9 w-9 items-center justify-center rounded-full bg-navy border border-line text-cyan transition-colors hover:bg-cyan hover:text-navy lg:flex ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll left"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <ul
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className={`no-scrollbar flex flex-1 gap-2 overflow-x-auto ${isFetching ? "opacity-50" : "transition-opacity duration-300"}`}
            aria-label="Filter projects"
          >
            <li className="shrink-0">
              <button
                type="button"
                onClick={() => handleFilter("All")}
                aria-pressed={active === "All"}
                className={`relative flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors duration-200 ${
                  active === "All" ? "text-navy" : "text-fg-2 hover:text-white"
                }`}
              >
                {active === "All" && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-cyan"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">All</span>
              </button>
            </li>
            {services.map((service) => {
              const isActive = active === service._id;
              return (
                <li key={service._id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => handleFilter(service._id)}
                    aria-pressed={isActive}
                    className={`relative flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors duration-200 ${
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
                    <span className="relative whitespace-nowrap">
                      {service.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className={`hidden shrink-0 ml-3 h-9 w-9 items-center justify-center rounded-full bg-navy border border-line text-cyan transition-colors hover:bg-cyan hover:text-navy lg:flex ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Scroll right"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <p
          className="shrink-0 text-sm font-medium text-fg-3 lg:pl-4"
          aria-live="polite"
        >
          {currentMeta?.total || 0}{" "}
          {currentMeta?.total === 1 ? "project" : "projects"}
        </p>
      </div>

      <motion.div
        layout
        className={`mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 transition-opacity duration-300 ${isFetching ? "opacity-50" : "opacity-100"}`}
      >
        <AnimatePresence mode="popLayout">
          {works.map((project) => (
            <motion.div
              key={project._id || project.slug}
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

      {works.length === 0 && !isFetching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-12 flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-line bg-navy/20 p-16 text-center relative"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-navy border border-line shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-50 rounded-2xl" />
            <svg
              className="relative z-10 h-10 w-10 text-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </motion.div>

          <h3 className="font-display text-2xl font-bold text-white tracking-wide">
            No projects found
          </h3>
          <p className="mt-3 max-w-md text-fg-2 text-sm leading-relaxed">
            We haven't uploaded any projects for this category yet. Please check
            back later or explore our other works.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleFilter("All")}
            className="mt-8 group relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-cyan px-8 font-medium text-navy transition-all hover:bg-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Show all work
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Pagination */}
      {currentMeta && currentMeta.totalPages > 1 && (
        <div className="mt-20 flex justify-center gap-2">
          {Array.from({ length: currentMeta.totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = currentMeta.page === page;
            return (
              <button
                key={page}
                onClick={() => handlePage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan text-navy"
                    : "border border-line text-fg-2 hover:border-cyan hover:text-cyan"
                }`}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </Container>
  );
}
