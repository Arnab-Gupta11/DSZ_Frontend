import { Container } from "@/components/ui/Container";

export default function WorkDetailLoading() {
  return (
    <section className="bg-navy pt-32 lg:pt-40 pb-24 min-h-screen">
      <Container>
        <div className="h-4 w-24 animate-pulse rounded bg-navy-700 mb-8"></div>
        <div className="h-4 w-32 animate-pulse rounded bg-cyan/20 mb-4"></div>
        <div className="h-20 w-3/4 animate-pulse rounded bg-navy-700 max-w-5xl"></div>
        
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
             <div key={i}>
                <div className="h-3 w-16 animate-pulse rounded bg-navy-700 mb-2"></div>
                <div className="h-4 w-24 animate-pulse rounded bg-navy-600"></div>
             </div>
          ))}
        </div>
        
        <div className="mt-16 aspect-16/10 w-full animate-pulse rounded-[28px] bg-navy-700 lg:aspect-21/10"></div>
      </Container>
    </section>
  );
}

