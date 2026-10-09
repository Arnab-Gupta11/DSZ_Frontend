import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArticleCard } from '@/app/(main)/insights/_components/ArticleCard';
import { api } from '@/lib/api/client';

export async function InsightsPreview() {
  const response = await api.getArticles({ isFeatured: true, limit: 3 });
  const articles = response.data || [];

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
            } 
          />
        </div>

        {articles.length > 0 ? (
          <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article, i) => (
              <Reveal key={article._id || article.slug} delay={i * 0.08} className="h-full">
                <ArticleCard article={article} tone="light" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-[32px] bg-paper-100 px-6 py-20 text-center sm:px-12 border border-line-accent/10">
            <h3 className="font-display text-2xl font-bold text-navy mb-3">More Insights Coming Soon</h3>
            <p className="text-fg-2 max-w-md mx-auto mb-8">We are actively writing new thoughts and case studies. Check back soon for more insights.</p>
            <Button to="/insights" variant="primary">
              View All Insights
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}