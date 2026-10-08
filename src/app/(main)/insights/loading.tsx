import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function InsightsLoading() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Insights"
        description="Practical ideas on marketing, design, technology and growth — from the DSZ team." 
      />
      <section aria-label="Loading articles" className="bg-paper py-16 lg:py-24">
        <Container>
          <div className="flex gap-2 pb-6">
            <div className="h-11 w-24 animate-pulse rounded-full bg-line-dark"></div>
            <div className="h-11 w-24 animate-pulse rounded-full bg-line-dark"></div>
            <div className="h-11 w-24 animate-pulse rounded-full bg-line-dark"></div>
          </div>
          
          <div className="mt-12 w-full animate-pulse rounded-[28px] bg-line-dark aspect-[16/6] lg:aspect-[24/6]"></div>
          
          <div className="mt-20 grid gap-x-6 gap-y-14 border-t border-line-dark pt-16 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/2] w-full rounded-2xl bg-line-dark"></div>
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-1/3 rounded bg-line-dark"></div>
                  <div className="h-6 w-3/4 rounded bg-line-dark"></div>
                  <div className="h-4 w-full rounded bg-line-dark"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

