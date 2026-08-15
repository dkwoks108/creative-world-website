import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { servicesData } from '@/data/services';
import { industriesData } from '@/data/industries';
import { caseStudiesData } from '@/data/case-studies';
import { insightsData } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.websiteUrlPlaceholder;
  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/growth-audit`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Dynamic service detail routes
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic industry detail routes
  const industryRoutes: MetadataRoute.Sitemap = industriesData.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic work playbook routes
  const playbookRoutes: MetadataRoute.Sitemap = caseStudiesData.map((c) => ({
    url: `${baseUrl}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic insights article routes
  const insightRoutes: MetadataRoute.Sitemap = insightsData.map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...playbookRoutes,
    ...insightRoutes,
  ];
}
