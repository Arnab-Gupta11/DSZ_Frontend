import React from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceDetail } from "./_components/ServiceDetail";
import { ServicesNav } from "./_components/ServicesNav";
import { FinalCta } from "@/components/cta/FinalCta";
import { api } from "@/lib/api/client";

export const metadata = {
  title: "Services | Digital Soft Zone",
  description:
    "Brand strategy, digital marketing, graphic design, video production, web & app development and business automation from Digital Soft Zone.",
};

export default async function ServicesPage() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await api.getServices();
  const services = response.data || [];

  return (
    <>
      <PageHero
        label="Services"
        title="Our Services"
        description="Strategy, creativity and technology — working together."
      />

      <ServicesNav services={services} />

      {services.map((service, i) => (
        <ServiceDetail
          key={service._id || service.slug}
          service={service}
          index={i}
          total={services.length}
        />
      ))}

      {services.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-xl text-fg-3">No services found.</p>
        </div>
      )}

      <FinalCta
        title="Have a project in mind?"
        accent={["mind?"]}
        description="Tell us where you want to go. We'll come back with a clear plan and a quote."
        primaryLabel="Get a Quote"
        secondaryLabel="See Our Work"
        secondaryTo="/work"
      />
    </>
  );
}
