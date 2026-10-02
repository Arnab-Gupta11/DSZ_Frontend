import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArticleCard } from '@/app/(main)/insights/_components/ArticleCard';
import { articles } from '@/constants/articles';

export function InsightsPreview() {
  return (
    <section aria-labelledby="insights-title" className="bg-paper py-24 lg:py-36">
      <Container>
        <div id="insights-title">
          <SectionHeading
            tone="light"
            title="Insights That Move Brands Forward."
            accent={['Forward.']}
            action={
            <Button to="/insights" variant="outline-dark">
                All Insights
              </Button>
            } />
          
        </div>
        <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article, i) =>
          <Reveal key={article.slug} delay={i * 0.08} className="h-full">
              <ArticleCard article={article} tone="light" />
            </Reveal>
          )}
        </div>
      </Container>
    </section>);

}