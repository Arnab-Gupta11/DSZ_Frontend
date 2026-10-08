"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { JobRow } from "@/components/careers/JobRow/JobRow";
import {
  JobFilters,
  type FilterOption,
} from "./_components/JobFilters/JobFilters";
import { EmptyState } from "./_components/EmptyState/EmptyState";
import { jobDepartments } from "@/constants/jobs";
import { easeOut } from "@/utils/motion";
import type { IJob } from "@/types/api";

const ALL = "View all";

interface JobOpeningsProps {
  jobs: IJob[];
  isLoading?: boolean;
}

export function JobOpenings({ jobs, isLoading = false }: JobOpeningsProps) {
  const [active, setActive] = useState(ALL);

  const options = useMemo<FilterOption[]>(() => {
    const depts = jobDepartments
      .map((d) => ({
        label: d,
        count: jobs.filter((j) => j.department === d).length,
      }))
      .filter((d) => d.count > 0);
    return [{ label: ALL, count: jobs.length }, ...depts];
  }, [jobs]);

  const visible =
    active === ALL ? jobs : jobs.filter((j) => j.department === active);

  return (
    <section
      id="openings"
      aria-labelledby="openings-title"
      className="scroll-mt-24 bg-paper py-20 text-ink lg:py-28"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-teal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-ink-teal"
              />
              Open positions
            </p>
            <h2
              id="openings-title"
              className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em]"
            >
              Find your role.
            </h2>
          </motion.div>
          {jobs.length > 0 && (
            <p className="text-ink-2">
              <span className="font-semibold text-ink tabular-nums">
                {visible.length}
              </span>{" "}
              {visible.length === 1 ? "opening" : "openings"}
              {active !== ALL && <> in {active}</>}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="mt-12 lg:pl-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 w-full animate-pulse rounded-2xl bg-ink/5"
              />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="mt-12">
            <EmptyState />
          </div>
        ) : (
          <>
            {/* <div className="mt-10">
              <JobFilters options={options} active={active} onChange={setActive} />
            </div> */}

            <div className="mt-12 lg:pl-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.length > 0 ? (
                  <motion.ul key="list" layout className="list-none">
                    <AnimatePresence mode="popLayout">
                      {visible.map((job, i) => (
                        <JobRow key={job.slug} job={job} index={i} />
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                ) : (
                  <EmptyState
                    key="empty"
                    global={false}
                    onReset={() => setActive(ALL)}
                  />
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
