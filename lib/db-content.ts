import { db } from './db';
import { insightsData } from '@/data/insights';
import { InsightArticle } from '@/types';

export async function getPublishedInsights(): Promise<InsightArticle[]> {
  try {
    const dbPosts = await db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishAt: 'desc' },
      include: { category: true, author: true },
    });

    if (!dbPosts || dbPosts.length === 0) {
      return insightsData;
    }

    return dbPosts.map((post) => {
      let sections: any[] = [];
      try {
        sections = typeof post.content === 'string' ? JSON.parse(post.content) : [];
        if (!Array.isArray(sections)) {
          sections = [{ heading: 'Overview', paragraphs: [post.content] }];
        }
      } catch {
        sections = [{ heading: 'Overview', paragraphs: [post.content] }];
      }

      const validCategory = (['SEO', 'Paid Ads', 'Social Media', 'Websites', 'Growth Strategy'].includes(post.category?.name || '')
        ? post.category?.name
        : 'Websites') as InsightArticle['category'];

      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.excerpt || post.metaDescription || '',
        category: validCategory,
        publishedDate: post.publishAt
          ? new Date(post.publishAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'August 2026',
        readTime: '5 min read',
        author: post.author?.name || 'Creativee World Editorial Team',
        image: post.featuredImage || '/images/insights/cw-insight-website-2026-01.webp',
        summary: post.excerpt || '',
        sections,
        keyTakeaways: [
          'High-intent search traffic drives verified local conversions.',
          'A dedicated website establishes brand authority and customer trust.',
          'Data-driven performance tracking ensures measurable ROI.',
        ],
        relatedServices: ['website-development', 'seo', 'performance-marketing'],
        keywords: ['digital marketing agency Jaipur', 'business growth Jaipur'],
      };
    });
  } catch {
    return insightsData;
  }
}

export async function getPublishedInsightBySlug(slug: string): Promise<InsightArticle | null> {
  try {
    const post = await db.post.findUnique({
      where: { slug },
      include: { category: true, author: true },
    });

    if (post && post.status === 'PUBLISHED') {
      let sections: any[] = [];
      try {
        sections = typeof post.content === 'string' ? JSON.parse(post.content) : [];
        if (!Array.isArray(sections)) {
          sections = [{ heading: 'Overview', paragraphs: [post.content] }];
        }
      } catch {
        sections = [{ heading: 'Overview', paragraphs: [post.content] }];
      }

      const validCategory = (['SEO', 'Paid Ads', 'Social Media', 'Websites', 'Growth Strategy'].includes(post.category?.name || '')
        ? post.category?.name
        : 'Websites') as InsightArticle['category'];

      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.excerpt || post.metaDescription || '',
        category: validCategory,
        publishedDate: post.publishAt
          ? new Date(post.publishAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'August 2026',
        readTime: '5 min read',
        author: post.author?.name || 'Creativee World Editorial Team',
        image: post.featuredImage || '/images/insights/cw-insight-website-2026-01.webp',
        summary: post.excerpt || '',
        sections,
        keyTakeaways: [
          'High-intent search traffic drives verified local conversions.',
          'A dedicated website establishes brand authority and customer trust.',
          'Data-driven performance tracking ensures measurable ROI.',
        ],
        relatedServices: ['website-development', 'seo', 'performance-marketing'],
        keywords: ['digital marketing agency Jaipur', 'business growth Jaipur'],
      };
    }
  } catch {
    // fallback to static file if DB unavailable
  }

  return insightsData.find((a) => a.slug === slug) || null;
}
