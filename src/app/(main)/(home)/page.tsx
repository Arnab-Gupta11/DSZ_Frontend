import React, { Suspense } from 'react';
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

// Fallback skeletons could be added here for even better UX
function SectionSkeleton({ height = "400px" }: { height?: string }) {
  return (
    <div className="w-full bg-navy-800/50 animate-pulse flex items-center justify-center" style={{ minHeight: height }}>
      <div className="w-16 h-16 border-4 border-cyan/20 border-t-cyan rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <ScrollVideoSection />
      
      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <ServicesIntro />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="800px" />}>
        <FeaturedWork />
      </Suspense>
      
      <StatsSection />
      <WhySection />
      <Testimonials />
      <AboutPreview />
      <ProcessTimeline />
      
      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <InsightsPreview />
      </Suspense>
      
      <FinalCta />
    </>
  );
}