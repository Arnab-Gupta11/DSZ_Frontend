"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import type { IService } from "@/types/api";
import { MonitorIcon } from "lucide-react"; // Fallback icon

interface ServiceDetailProps {
  service: IService;
  index: number;
  total: number;
}

export function ServiceDetail({ service, index, total }: ServiceDetailProps) {
  const reversed = index % 2 === 1;

  // Format number (01, 02, etc.)
  const formattedNumber = (index + 1).toString().padStart(2, "0");

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={`scroll-mt-32 py-20 lg:py-32 ${reversed ? "bg-navy-800" : "bg-navy"}`}
    >
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : ""}`}>
          <Reveal y={16} className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-accent bg-navy-700 text-cyan">
              <MonitorIcon className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-sm font-medium tabular-nums text-fg-3">
              {formattedNumber} / {total.toString().padStart(2, "0")}
            </span>
          </Reveal>
          <div id={`${service.slug}-title`}>
            <AnimatedText
              as="h2"
              text={service.title}
              className="mt-8 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-none tracking-[-0.04em] text-white"
            />
          </div>

          <Reveal
            delay={0.2}
            className="mt-8 text-lg leading-relaxed text-fg-2"
          >
            <p>{service.description}</p>
          </Reveal>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.3}>
              <h3 className="font-medium text-white">What we do</h3>
              <ul className="mt-4 space-y-3">
                {service.whatWeDo?.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-fg-2">
                    <CheckIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4}>
              <h3 className="font-medium text-white">Deliverables</h3>
              <ul className="mt-4 space-y-3">
                {service.deliverables?.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-fg-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.5} className="mt-12">
            <p className="text-[15px] font-medium text-white">
              Who it's for:{" "}
              <span className="font-normal text-fg-2">{service.whoFor}</span>
            </p>
            <Button
              href={`/contact?service=${service.slug}`}
              variant="primary"
              className="mt-8"
            >
              Start a Project
            </Button>
          </Reveal>
        </div>

        <div
          className={`lg:col-span-6 lg:sticky lg:top-32 ${reversed ? "lg:order-1" : ""}`}
        >
          <Reveal delay={0.3}>
            <div
              aria-hidden
              className="relative aspect-4/3 w-full overflow-hidden rounded-[28px] border border-line bg-navy-800 p-5"
            >
              <Image
                src={service.image || "/placeholder-image.jpg"}
                alt={service.imageAlt || service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover p-2 md:p-5 rounded-[32px]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
