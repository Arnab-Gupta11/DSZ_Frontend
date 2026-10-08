import React from 'react';
import { Hero } from './_components/Hero';
import { ClientStrip } from './_components/ClientStrip';
import { ScrollVideoSection } from "./_components/ScrollVideoSection";
import { ServicesIntro } from './_components/ServicesIntro';
import { FeaturedWork } from './_components/FeaturedWork';
import { StatsSection } from './_components/StatsSection';
import { WhySection } from './_components/WhySection';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { AboutPreview } from './_components/AboutPreview';
import { ProcessTimeline } from './_components/ProcessTimeline';
import { InsightsPreview } from './_components/InsightsPreview';
import { FinalCta } from '@/components/cta/FinalCta';

export const metadata = {
  title: 'Digital Soft Zone — Digital Agency in Chittagong, Bangladesh',
  description: 'Digital Soft Zone (DSZ) brings brand strategy, digital marketing, design, video, web & app development and business automation together under one digital agency in Chittagong.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <ScrollVideoSection />
      <ServicesIntro />
      {/* We make FeaturedWork and InsightsPreview async server components */}
      <FeaturedWork />
      <StatsSection />
      <WhySection />
      <Testimonials />
      <AboutPreview />
      <ProcessTimeline />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}