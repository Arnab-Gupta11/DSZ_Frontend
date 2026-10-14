"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPinIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useParallax } from "@/hooks/useParallax";
import { images } from "@/constants/images";
import { easeOut } from "@/utils/motion";

export function AboutPreview() {
  const { ref, y } = useParallax<HTMLDivElement>(36);

  return (
    <section
      aria-labelledby="about-title"
      className="overflow-hidden bg-navy py-24 lg:py-36"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        <div ref={ref} className="relative lg:col-span-6">
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0% round 28px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="relative aspect-5/4 overflow-hidden rounded-[28px] bg-navy-700 lg:aspect-4/5"
          >
            <motion.div
              style={{ y, scale: 1.12 }}
              suppressHydrationWarning
              className="relative h-full w-full"
            >
              <Image
                src={images.office}
                alt="The Digital Soft Zone team collaborating in the studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          {/* <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl border border-line bg-[rgba(5,45,53,0.9)] p-4 backdrop-blur-md sm:right-8 sm:p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-navy">
              <MapPinIcon className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-medium text-white">
                Software Technology Park
              </span>
              <span className="block text-xs text-fg-2">
                Chittagong, Bangladesh
              </span>
            </span>
          </div> */}
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <div id="about-title">
            <SectionHeading
              title="One team. Your brand. Wherever you are."
              accent={["brand."]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-fg-2 text-justify">
              Digital Soft Zone is a digital agency that works with product
              brands from the first idea to the final post. Strategy, design,
              video and content all come from one team, so you’re not juggling
              five freelancers or repeating your brief ten times.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-fg-2 text-justify">
              We work online, stay close to your brand, and make sure the people
              who understand your product are the ones making your content.
            </p>
            <div className="mt-10">
              <Button to="/about" variant="secondary">
                Our Story
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
