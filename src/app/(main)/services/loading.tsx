import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function ServicesLoading() {
  return (
    <>
      <PageHero
        label="Services"
        title="Our Services"
        description="Strategy, creativity and technology — working together."
      />

      <nav className="sticky top-18 z-30 border-y border-line bg-[rgba(4,28,38,0.88)] backdrop-blur-xl lg:top-20">
        <Container>
          <ul className="flex gap-2 overflow-x-auto py-3">
            {[...Array(6)].map((_, i) => (
              <li
                key={i}
                className="shrink-0 h-11 w-32 animate-pulse rounded-full bg-navy-700"
              ></li>
            ))}
          </ul>
        </Container>
      </nav>

      {[...Array(2)].map((_, i) => (
        <section
          key={i}
          className={`py-20 lg:py-32 ${i % 2 === 1 ? "bg-navy-800" : "bg-navy"}`}
        >
          <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="h-12 w-12 animate-pulse rounded-xl bg-navy-700 mb-8"></div>
              <div className="h-12 w-3/4 animate-pulse rounded bg-navy-700 mb-8"></div>
              <div className="h-20 w-full animate-pulse rounded bg-navy-700 mb-12"></div>

              <div className="grid gap-10 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="h-6 w-1/2 animate-pulse rounded bg-navy-700"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-navy-700"></div>
                  <div className="h-4 w-5/6 animate-pulse rounded bg-navy-700"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 w-1/2 animate-pulse rounded bg-navy-700"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-navy-700"></div>
                  <div className="h-4 w-5/6 animate-pulse rounded bg-navy-700"></div>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="aspect-[4/3] w-full animate-pulse rounded-[28px] bg-navy-700"></div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
