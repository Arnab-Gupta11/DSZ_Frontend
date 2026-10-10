import { MetadataRoute } from 'next';
import { site } from '@/constants/site';
import { api } from '@/lib/api/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;

  const routes = ['', '/services', '/work', '/about', '/careers', '/insights', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const [worksRes, articlesRes, servicesRes, jobsRes] = await Promise.all([
      api.getWorks({ limit: 100 }),
      api.getArticles({ limit: 100 }),
      api.getServices(),
      api.getJobs({ limit: 100 }),
    ]).catch(() => [null, null, null, null]);

    const works = worksRes?.data || [];
    const articles = articlesRes?.data || [];
    const services = servicesRes?.data || [];
    const jobs = jobsRes?.data || [];

    const workRoutes = works.map((work) => ({
      url: `${baseUrl}/work/${work.slug}`,
      lastModified: work.updatedAt ? new Date(work.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const articleRoutes = articles.map((article) => ({
      url: `${baseUrl}/insights/${article.slug}`,
      lastModified: article.updatedAt ? new Date(article.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const serviceRoutes = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt ? new Date(service.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    const jobRoutes = jobs.map((job) => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...workRoutes, ...articleRoutes, ...serviceRoutes, ...jobRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}

