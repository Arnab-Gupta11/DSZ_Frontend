import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/app/(main)/work/_components/ProjectCard';
import { api } from '@/lib/api/client';

export async function FeaturedWork() {
  const response = await api.getWorks();
  const works = response.data || [];
  
  // Need at least 4 works, else handle gracefully
  const first = works[0];
  const second = works[1];
  const third = works[2];
  const fourth = works[3];

  return (
    <section aria-labelledby="work-title" className="bg-navy py-24 lg:py-36">
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
        <div className="mt-16 grid gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-y-20">
          {first && <ProjectCard project={first} size="wide" className="lg:col-span-7" />}
          {second && <ProjectCard project={second} size="tall" className="lg:col-span-5 lg:mt-28" />}
          {third && <ProjectCard project={third} size="tall" className="lg:col-span-5" />}
          {fourth && <ProjectCard project={fourth} size="wide" className="lg:col-span-7 lg:mt-28" />}
        </div>
      </Container>
    </section>
  );
}