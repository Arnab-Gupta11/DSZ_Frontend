import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function WorkLoading() {
  return (
    <>
      <PageHero
        label="Work"
        title="Selected Work"
        description="Brand, campaign, product and technology projects for growing brands."
      />
      <section aria-label="Loading projects" className="bg-navy pb-24 lg:pb-36">
        <Container>
          <div className="flex gap-4 pb-6">
            <div className="h-11 w-24 animate-pulse rounded-full bg-navy-700"></div>
            <div className="h-11 w-24 animate-pulse rounded-full bg-navy-700"></div>
            <div className="h-11 w-24 animate-pulse rounded-full bg-navy-700"></div>
          </div>
          
          <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] w-full rounded-[20px] bg-navy-700"></div>
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-1/3 rounded bg-navy-700"></div>
                  <div className="h-6 w-2/3 rounded bg-navy-700"></div>
                  <div className="h-4 w-1/4 rounded bg-navy-700"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

