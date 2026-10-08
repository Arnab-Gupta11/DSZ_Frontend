import React from "react";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/cta/FinalCta";
import { WorkListClient } from "./_components/WorkListClient";
import { api } from "@/lib/api/client";

export const metadata = {
  title: "Work | Selected projects by Digital Soft Zone",
  description: "Brand, campaign, product and technology projects for growing brands.",
};

export default async function WorkPage() {
  const response = await api.getWorks();
  const initialWorks = response.data || [];

  return (
    <>
      <PageHero
        label="Work"
        title="Selected Work"
        description="Brand, campaign, product and technology projects for growing brands."
      />

      <section aria-label="Projects" className="bg-navy pb-24 lg:pb-36">
        <WorkListClient initialWorks={initialWorks} />
      </section>

      <FinalCta title="Your brand could be next." accent={["next."]} />
    </>
  );
}
