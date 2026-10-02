import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from './ServiceCard';
import { services } from '@/constants/services';

const parallaxOffsets = [0, 10, 5, 15, 8, 12];

export function ServicesIntro() {
  return (
    <section aria-labelledby="services-title" className="bg-navy-800 py-24 lg:py-36">
      <Container>
        <div id="services-title">
          <SectionHeading
            title="What We Do"
            description="Strategy, creativity and technology in one team — so your brand, your marketing and your systems finally work together."
            action={
            <Button to="/services" variant="secondary">
                All Services
              </Button>
            } />
          
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) =>
          <ServiceCard key={service.slug} service={service} index={i} parallax={parallaxOffsets[i]} />
          )}
        </div>
      </Container>
    </section>);

}