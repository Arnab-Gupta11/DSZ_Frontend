import { Container } from "@/components/ui/Container";

export default function InsightDetailLoading() {
  return (
    <>
      <div className="bg-navy pb-24 pt-32 lg:pb-32 lg:pt-44">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="h-4 w-24 animate-pulse rounded bg-navy-700 mb-8"></div>
            <div className="h-4 w-48 animate-pulse rounded bg-navy-700 mb-4"></div>
            <div className="h-20 w-full animate-pulse rounded bg-navy-700 mb-6"></div>
            <div className="h-6 w-3/4 animate-pulse rounded bg-navy-700"></div>
          </div>
        </Container>
      </div>

      <article className="bg-paper pb-24 lg:pb-32 min-h-[50vh]">
        <Container>
          <div className="mx-auto -mt-14 max-w-5xl aspect-[16/9] animate-pulse overflow-hidden rounded-[28px] bg-line-dark shadow-2xl"></div>

          <div className="mx-auto mt-14 max-w-[68ch] space-y-6">
            <div className="h-4 w-full animate-pulse rounded bg-line-dark"></div>
            <div className="h-4 w-full animate-pulse rounded bg-line-dark"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-line-dark"></div>
            <div className="h-4 w-full animate-pulse rounded bg-line-dark"></div>
            <div className="h-4 w-4/5 animate-pulse rounded bg-line-dark"></div>
          </div>
        </Container>
      </article>
    </>
  );
}

