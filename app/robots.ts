import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cw-control-x7k9m2/', '/cw-control-*'],
    },
    sitemap: `${siteConfig.websiteUrlPlaceholder}/sitemap.xml`,
  };
}
