import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { FeaturedWorkParallax } from './FeaturedWorkParallax';
import { api } from '@/lib/api/client';

export async function FeaturedWork() {
  const response = await api.getWorks({ isFeatured: true, limit: 4 });
  const works = response.data || [];

  return (
    <section aria-labelledby="work-title" className="bg-navy py-24 lg:py-36 overflow-hidden">
      <Container>
        <div id="work-title">
          <SectionHeading
            title="Work That Speaks For Itself."
            accent={['Itself.']}
            description="Brand, campaign, product and web work for growing brands."
            action={
              <Button to="/work" variant="secondary">
                View All Work
              </Button>
            } 
          />
        </div>

        {works.length > 0 ? (
          <FeaturedWorkParallax works={works} />
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-[32px] bg-navy-700 px-6 py-20 text-center sm:px-12 border border-line-accent">
            <h3 className="font-display text-2xl font-bold text-white mb-3">More Work Coming Soon</h3>
            <p className="text-fg-2 max-w-md mx-auto mb-8">We are currently crafting some amazing new projects. Check back later to see our latest featured work.</p>
            <Button to="/work" variant="primary">
              View All Past Work
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}