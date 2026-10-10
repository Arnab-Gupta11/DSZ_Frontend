import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "./ServiceCard";
import { api } from "@/lib/api/client";

const parallaxOffsets = [0, 10, 5, 15, 8, 12];

export async function ServicesIntro() {
  const response = await api.getServices({ isFeatured: true });
  const services = response.data || [];

  return (
    <section
      aria-labelledby="services-title"
      className="bg-navy-800 py-24 lg:py-36"
    >
      <Container>
        <div id="services-title">
          <SectionHeading
            title="What We Do"
            description="Strategy, creativity and technology in one team — so your brand, your marketing and your systems finally work together."
            action={
              <Button to="/services" variant="secondary">
                All Services
              </Button>
            }
          />
        </div>

        {services.length > 0 ? (
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service._id || service.slug}
                service={service}
                index={i}
                parallax={parallaxOffsets[i % parallaxOffsets.length]}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-[32px] bg-navy-700 px-6 py-20 text-center sm:px-12 border border-line-accent">
            <h3 className="font-display text-2xl font-bold text-white mb-3">Services Update in Progress</h3>
            <p className="text-fg-2 max-w-md mx-auto mb-8">We are updating our service offerings to serve you better. Please explore all services on our dedicated page.</p>
            <Button to="/services" variant="primary">
              View All Services
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
