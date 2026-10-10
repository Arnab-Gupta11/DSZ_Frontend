import React from "react";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/cta/FinalCta";
import { WorkListClient } from "./_components/WorkListClient";
import { api } from "@/lib/api/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Work | Selected projects by Digital Soft Zone",
  description:
    "Brand, campaign, product and technology projects for growing brands.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WorkPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const service =
    typeof resolvedParams.service === "string"
      ? resolvedParams.service
      : undefined;
  const page =
    typeof resolvedParams.page === "string"
      ? parseInt(resolvedParams.page, 10)
      : 1;

  // Fetch works and services in parallel
  const [worksResponse, servicesResponse] = await Promise.all([
    api.getWorks({ service, page, limit: 10 }),
    api.getServices()
  ]);

  const initialWorks = worksResponse.data || [];
  const meta = worksResponse.meta;
  const services = servicesResponse.data || [];

  return (
    <>
      <PageHero
        label="Work"
        title="Selected Work"
        description="Brand, campaign, product and technology projects for growing brands."
      />

      <section aria-label="Projects" className="bg-navy pb-24 lg:pb-36">
        <WorkListClient
          initialWorks={initialWorks}
          services={services}
          meta={meta}
          currentService={service}
        />
      </section>

      <FinalCta title="Your brand could be next." accent={["next."]} />
    </>
  );
}
