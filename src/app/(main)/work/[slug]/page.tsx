import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { WorkDetailClient } from "./_components/WorkDetailClient";
import { api } from "@/lib/api/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const p = await params;
  try {
    const response = await api.getWorkBySlug(p.slug);
    const work = response.data;
    console.log("Work============>", work);
    if (!work) return {};

    return {
      title: work.seo?.metaTitle || `${work.title} | DSZ Work`,
      description: work.seo?.metaDescription || work.summary,
      openGraph: {
        images: work.seo?.ogImage ? [work.seo.ogImage] : [],
      },
      robots: work.seo?.noIndex ? "noindex, nofollow" : "index, follow",
    };
  } catch (error) {
    return {};
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const p = await params;
  let project;
  let allWorks = [];

  try {
    const response = await api.getWorkBySlug(p.slug);
    project = response.data;

    // We fetch all works to determine the next project
    const worksResponse = await api.getWorks();
    allWorks = worksResponse.data || [];
  } catch (error) {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const currentIndex = allWorks.findIndex((w) => w.slug === project.slug);
  const nextProject =
    currentIndex >= 0 && currentIndex < allWorks.length - 1
      ? allWorks[currentIndex + 1]
      : allWorks[0] || null;

  return <WorkDetailClient project={project} nextProject={nextProject} />;
}
