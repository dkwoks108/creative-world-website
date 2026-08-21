import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Ceativee World Admin & Content database...');

  // 1. Seed Admin User
  const defaultEmail = process.env.ADMIN_EMAIL || 'admin@ceativeeworld.com';
  const defaultPassword = 'CeativeeAdmin2026!';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: defaultEmail },
    update: { passwordHash: hashedPassword },
    create: {
      email: defaultEmail,
      name: 'Agency Admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Admin account verified: ${admin.email}`);

  // 2. Seed Default Author
  const author = await prisma.author.upsert({
    where: { id: 'author-cw-editorial' },
    update: {},
    create: {
      id: 'author-cw-editorial',
      name: 'Ceativee World Editorial Team',
      role: 'Growth & Strategy Team',
      bio: 'Growth strategists and performance marketers at Ceativee World Jaipur.',
      avatarUrl: '/logo-symbol.png',
    },
  });

  // 3. Seed Default Categories
  const categoryNames = [
    'Websites',
    'SEO',
    'Social Media',
    'Digital Marketing',
    'Local SEO',
    'Google Ads',
    'Business Growth',
  ];

  const categoryMap: Record<string, string> = {};

  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const cat = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        description: `Strategic insights and guides for ${name} in Jaipur.`,
      },
    });
    categoryMap[name] = cat.id;
  }

  // 4. Seed Existing Insights Articles
  const articles = [
    {
      id: 'why-jaipur-businesses-need-a-website-2026',
      slug: 'why-jaipur-businesses-need-a-website-2026',
      title: 'Why Jaipur Businesses Need More Than an Instagram Page in 2026',
      excerpt: 'Relying solely on social media leaves your business vulnerable to algorithm changes. Learn why a fast, high-converting website is essential for sustainable growth in Jaipur.',
      categoryName: 'Websites',
      featuredImage: '/images/insights/cw-insight-website-2026-01.webp',
      featuredImageAlt: 'Business owner looking at digital growth dashboard website',
      status: 'PUBLISHED',
      seoTitle: 'Why Jaipur Businesses Need More Than an Instagram Page in 2026 | Ceativee World',
      metaDescription: 'Relying solely on social media leaves your business vulnerable to algorithm changes. Learn why a fast, high-converting website is essential for sustainable growth in Jaipur.',
      content: JSON.stringify([
        {
          heading: 'The Risk of Social-Only Digital Presence',
          paragraphs: [
            'Many business owners in Jaipur start their digital journey with an Instagram profile. While social media is fantastic for visual discovery, relying exclusively on social platforms creates significant business risk. Organic social reach fluctuates unpredictably based on algorithm changes.',
            'Furthermore, high-intent buyers looking for immediate services—such as hiring a real estate developer, enrolling in a coaching institute, or booking a clinic consultation—turn to Google Search, not Instagram DMs.',
          ],
        },
        {
          heading: 'A Website as Conversion & Search Infrastructure',
          paragraphs: [
            'A modern business website acts as your 24/7 sales representative. It controls your brand narrative, presents your service offerings clearly without distraction, and provides direct enquiry triggers such as click-to-call, WhatsApp messaging, and audit request forms.',
            'Additionally, a search-optimized website builds long-term organic equity on Google, capturing local customers searching for solutions in Jaipur every day.',
          ],
        },
      ]),
    },
    {
      id: 'seo-vs-google-ads-jaipur-local-businesses',
      slug: 'seo-vs-google-ads-jaipur-local-businesses',
      title: 'Local SEO vs. Google Ads: Which Should Your Jaipur Business Choose?',
      excerpt: 'A practical comparison of immediate paid search acquisition versus long-term organic Google rankings for local Jaipur companies.',
      categoryName: 'SEO',
      featuredImage: '/images/insights/cw-insight-seo-vs-ads-01.webp',
      featuredImageAlt: 'Local SEO vs Google Ads search comparison for Jaipur business',
      status: 'PUBLISHED',
      seoTitle: 'Local SEO vs. Google Ads: Which Should Your Jaipur Business Choose? | Ceativee World',
      metaDescription: 'A practical comparison of immediate paid search acquisition versus long-term organic Google rankings for local Jaipur companies.',
      content: JSON.stringify([
        {
          heading: 'Understanding the Difference in Intent and Speed',
          paragraphs: [
            'Google Search Ads allow your business to appear at the top of search results immediately for competitive commercial terms in Jaipur. You pay only when a user clicks your ad, making it ideal for immediate lead generation and promotional campaigns.',
            'Local SEO, on the other hand, optimizes your Google Business Profile and website structure to rank organically in the Google 3-Pack Map listing and natural search results. While organic rankings take time to build, they generate consistent leads without a per-click fee.',
          ],
        },
        {
          heading: 'Building a Hybrid Growth Strategy',
          paragraphs: [
            'For most Jaipur businesses, the most effective strategy isn\'t choosing one over the other—it\'s combining them. Use Google Ads for immediate lead flow while your Local SEO foundation matures over 3 to 6 months.',
          ],
        },
      ]),
    },
    {
      id: '3-instagram-reels-mistakes-local-brands',
      slug: '3-instagram-reels-mistakes-local-brands',
      title: '3 Instagram Reel Mistakes Costing Jaipur Local Brands Customers',
      excerpt: 'Are your video reels getting views but zero enquiries? Here is how to fix local content strategy and drive actual business walk-ins.',
      categoryName: 'Social Media',
      featuredImage: '/images/insights/cw-insight-reels-mistakes-01.webp',
      featuredImageAlt: 'Instagram reels camera recording video for Jaipur business',
      status: 'PUBLISHED',
      seoTitle: '3 Instagram Reel Mistakes Costing Jaipur Local Brands Customers | Ceativee World',
      metaDescription: 'Are your video reels getting views but zero enquiries? Here is how to fix local content strategy and drive actual business walk-ins.',
      content: JSON.stringify([
        {
          heading: 'Mistake 1: Chasing Generic Trends Instead of Local Customer Value',
          paragraphs: [
            'Participating in global audio trends might get video views, but if the content doesn\'t highlight your actual products, facility, or local Jaipur presence, scrollers will move on without remembering your brand name.',
          ],
        },
        {
          heading: 'Mistake 2: Missing Clear Call-To-Actions (CTAs)',
          paragraphs: [
            'Every reel should guide the viewer on what to do next—whether that is visiting your store in C-Scheme, calling for a consultation, or sending a direct message for catalog details.',
          ],
        },
      ]),
    },
  ];

  for (const article of articles) {
    const categoryId = categoryMap[article.categoryName];
    await prisma.post.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        authorId: author.id,
        categoryId: categoryId,
        featuredImage: article.featuredImage,
        featuredImageAlt: article.featuredImageAlt,
        status: article.status,
        publishAt: new Date(),
        seoTitle: article.seoTitle,
        metaDescription: article.metaDescription,
        canonicalUrl: `https://ceativeeworld.com/insights/${article.slug}`,
      },
    });
  }

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
